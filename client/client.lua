local Bones = require "client.modules.bones"

local inMenu = false
local menuType = "Doors"

local currentVehOptions = {}


RegisterNUICallback(Receive.close, function(_, cb)
    SendNUIEvent(Send.visible, false)
    SetPauseMenuActive(false)
    inMenu = false
    cb(1)
end)

local function getOptions(veh)
    local numDoors = GetNumberOfVehicleDoors(veh)

    local model = GetEntityModel(veh)
    local numSeats = GetVehicleModelNumberOfSeats(model)

    ---@type table<string, ActiveOption>
    local existingBones = {}

    local GetEntityBoneIndexByName = GetEntityBoneIndexByName
    for bType, info in pairs(Bones) do

        if bType == "Doors" and numDoors == 0 then
            goto continue
        end

        for i, data in ipairs(info) do
            local icon, boneName, index in data
            
            if (bType == "Doors" or bType == "Windows") and i - 2 > numDoors then
                goto continue
            end

            if bType == "Seats" and i > numSeats then
                goto continue
            end

            local boneid = GetEntityBoneIndexByName(veh, boneName)
            if boneid == -1 then
                goto skipIteration
            end

            ---@type ActiveOption
            local option = {
                icon = icon,
                bone = boneid,
                boneName = boneName,
                index = index,
                active = false,
                type = bType
            }

            existingBones[boneName] = option

            ::skipIteration::
        end
        ::continue::
    end

    return existingBones
end

local function getMenuTypes()
    local types = {}

    for k, data in pairs(currentVehOptions) do
        local type = data.type

        if not types[type] then
            types[type] = true
        end
    end

    local arrTypes = {}
    for k, v in pairs(types) do
        arrTypes[#arrTypes+1] = k
    end

    return arrTypes
end

local function menuOpenThread()
    local veh = GetVehiclePedIsIn(PlayerPedId(), false)

    if veh == 0 then
        return
    end

    inMenu = true
    local resx, resy = GetActiveScreenResolution()

    currentVehOptions = getOptions(veh)

    SendNUIEvent(Send.visible, true)
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)

    SetTimeout(1, function()
        SendNUIEvent(Send.initialise, getMenuTypes())
    end)

    local camera = require "client.modules.camera"

    camera:StartCamera(veh)

    local model = GetEntityModel(veh)

    local isBike = IsThisModelABike(model) or IsThisModelABicycle(model) or IsThisModelAQuadbike(model)


    local GetVehiclePedIsIn, PlayerPedId, GetWorldPositionOfEntityBone, GetScreenCoordFromWorldCoord, IsVehicleDoorDamaged, DoesVehicleHaveDoor, GetVehicleDoorAngleRatio, IsVehicleSeatFree, GetIsVehicleEngineRunning, SendNUIEvent = GetVehiclePedIsIn, PlayerPedId, GetWorldPositionOfEntityBone, GetScreenCoordFromWorldCoord, IsVehicleDoorDamaged, DoesVehicleHaveDoor, GetVehicleDoorAngleRatio, IsVehicleSeatFree, GetIsVehicleEngineRunning, SendNUIEvent
    while inMenu do
        veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if veh == 0 then
            inMenu = false
        end

        ---@type Option[]
        local options = {}

        for _, data in pairs(currentVehOptions) do
            local type = data.type
            if type == menuType then
                local boneid = data.bone

                local bonePos = GetWorldPositionOfEntityBone(veh, boneid)

                local exists, x, y = GetScreenCoordFromWorldCoord(bonePos.x, bonePos.y, bonePos.z)
                -- DrawSprite("shared", "circle", x, y, 0.01, 0.01, 0.0, 255, 255, 255, 255)

                if bonePos.x ~= 0.0 and bonePos.y ~= 0.0 and bonePos.z ~= 0.0 or (type == "Seats" and isBike) then

                    if exists then
                        x = x * resx
                        y = y * resy

                        local icon, index, boneName, active in data

                        local visible = true
                        local active = data.active

                        if type == "Doors" then
                            visible = 
                            IsVehicleDoorDamaged(veh, index) == false and DoesVehicleHaveDoor(veh, index) == 1
                            if visible then
                                active = GetVehicleDoorAngleRatio(veh, index) > 0.0
                            end

                        elseif type == "Windows" then
                            visible = IsVehicleDoorDamaged(veh, index) == false and DoesVehicleHaveDoor(veh, index) == 1
                        elseif type == "Seats" then
                            active = not IsVehicleSeatFree(veh, index)
                        elseif type == "Extras" then
                            if boneName == "engine" then
                                active = GetIsVehicleEngineRunning(veh) == 1
                            end
                        end


                        ---@type Option
                        local option = {
                            icon = icon,
                            x = x,
                            y = y,
                            index = index,
                            type = data.type,
                            boneName = boneName,
                            active = active,
                            visible = visible,
                        }
                        
                        options[#options+1] = option
                    end
                end
            end
        end

        SendNUIEvent(Send.update, options)

        Wait(0)
    end

    SetTimeout(50, function()
        SetPauseMenuActive(false)
    end)

    SetNuiFocusKeepInput(false)
    SetNuiFocus(false, false)
    SendNUIEvent(Send.visible, false)

    camera:StopCamera()
end


---@param option Option
---@param cb function
RegisterNUICallback(Receive.click, function(option, cb)

    local veh = GetVehiclePedIsIn(PlayerPedId(), false)


    if veh == 0 then
        return
    end

    local boneName, type, index, active in option

    if not currentVehOptions[boneName] then
        return
    end

    if type == "Doors" then
        if active then
            SetVehicleDoorShut(veh, index, false)
        else
            SetVehicleDoorOpen(veh, index, false, false)
        end

        active = not active
    elseif type == "Windows" then
        if active then
            RollUpWindow(veh, index)
        else
            RollDownWindow(veh, index)
        end

        active = not active
    elseif type == "Seats" then
        SetPedIntoVehicle(PlayerPedId(), veh, index)
    elseif type == "Extras" then
        if boneName == "engine" then
            active = not active
            SetVehicleEngineOn(veh, active, false, true)
        elseif boneName == "interiorlight" then
            active = not active
            SetVehicleInteriorlight(veh, active)
        end
    end

    currentVehOptions[boneName].active = active

    cb(1)
end)

RegisterNUICallback(Receive.changeType, function(type, cb)
    menuType = type
    cb(1)
end)

RegisterCommand("vehiclemenu", function()
    if inMenu then
        inMenu = false
    else
        CreateThread(menuOpenThread)
    end
end, false)

RegisterKeyMapping("vehiclemenu", "Vehicle Menu", "keyboard", "end")


RegisterNetEvent('bl_vehiclemenu:client:open', function()
    if inMenu then return end
    CreateThread(menuOpenThread)
end)
