local Camera = {
    running = false,
    camDistance = 5.0,
    cam = nil,
    angleY = 0.0,
    angleZ = 0.0,
    targetCoords = nil,
    oldCam = nil,
    currentVehicleEntity = nil,
    originalCoords = nil,
    changingCam = false,
}

local function degToRad(degrees)
    return math.rad(degrees)
end

local function cos(degrees)
    return math.cos(degToRad(degrees))
end

local function sin(degrees)
    return math.sin(degToRad(degrees))
end

local function clamp(value, min, max)
    return math.max(min, math.min(max, value))
end

local function vec3(x, y, z)
    return { x = x, y = y, z = z }
end

local function setCamPosition(mouseX, mouseY)
    if not Camera.running or not Camera.targetCoords or Camera.changingCam then
        return
    end

    mouseX = mouseX or 0.0
    mouseY = mouseY or 0.0

    Camera.angleZ = Camera.angleZ - mouseX
    Camera.angleY = clamp(Camera.angleY + mouseY, 0.0, 89.0)

    local angleY, angleZ, camDistance, targetCoords, cam in Camera

    local offset = vec3(
        ((cos(angleZ) * cos(angleY)) + (cos(angleY) * cos(angleZ))) / 2 * camDistance,
        ((sin(angleZ) * cos(angleY)) + (cos(angleY) * sin(angleZ))) / 2 * camDistance,
        sin(angleY) * camDistance
    )

    local camPos = vec3(
        targetCoords.x + offset.x,
        targetCoords.y + offset.y,
        targetCoords.z + offset.z
    )

    SetCamCoord(cam, camPos.x, camPos.y, camPos.z)
    PointCamAtCoord(cam, targetCoords.x, targetCoords.y, targetCoords.z)
end

RegisterNUICallback(Receive.camMove, function(data, cb)
    setCamPosition(data.x, data.y)
    cb(1)
end)

RegisterNUICallback(Receive.camZoom, function(data, cb)
    local distance = Camera.camDistance
    local config = require "shared.modules.config"
    local Min, Max in config.Zoom

    if distance + data < Min or distance + data > Max then
        return
    end

    Camera.camDistance = distance + data
    setCamPosition()
    cb(1)
end)

local function disableActions()
    CreateThread(function()
        while Camera.running do
            local disableActionsList = {
                1, 2, 24, 257, 25, 263, 47, 264, 257, 140, 141, 142,
                106, 199, 200, 298, 19, 81, 82, 83, 84, 85
            }

            for i = 1, #disableActionsList do
                local action = disableActionsList[i]
                DisableControlAction(0, action, true)
            end

            SetPauseMenuActive(false)
            Camera.targetCoords = GetEntityCoords(Camera.currentVehicleEntity)
            setCamPosition()

            Wait(0)
        end
    end)
end

function Camera:StartCamera(currentVehicleEntity)
    if self.running then
        return
    end

    self.running = true
    self.cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    RenderScriptCams(true, true, 500, true, false)

    self.targetCoords = GetEntityCoords(currentVehicleEntity)
    self.currentVehicleEntity = currentVehicleEntity
    self.originalCoords = self.targetCoords

    local vehHeading = GetEntityHeading(currentVehicleEntity)

    self.angleZ = vehHeading - 90.0

    self.angleY = 35.0

    setCamPosition()

    disableActions()
end

function Camera:StopCamera()
    if not self.running then
        return
    end

    self.running = false
    RenderScriptCams(false, true, 500, 1, 0)
    DestroyCam(self.cam, true)
end

function Camera:MoveCamera(coords, heading)
    self.changingCam = true
    self.camDistance = 2.0
    self.angleZ = heading or self.angleZ
    self.oldCam = self.cam

    local angleZ, angleY, camDistance = self.angleZ, self.angleY, self.camDistance

    local offset = vec3(
        ((cos(angleZ) * cos(angleY)) + (cos(angleY) * cos(angleZ))) / 2 * camDistance,
        ((sin(angleZ) * cos(angleY)) + (cos(angleY) * sin(angleZ))) / 2 * camDistance,
        sin(angleY) * camDistance
    )

    local camPos = vec3(
        coords.x + offset.x,
        coords.y + offset.y,
        coords.z + offset.z
    )

    local newcam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", camPos.x, camPos.y, camPos.z, 0.0, 0.0, 0.0, 70.0, false, 0)
    PointCamAtCoord(newcam, coords.x, coords.y, coords.z)
    SetCamActiveWithInterp(newcam, self.oldCam, 500, true, true)

    Wait(500)

    self.targetCoords = coords
    self.changingCam = false
    self.cam = newcam
    setCamPosition()

    DestroyCam(self.oldCam, true)
end

function Camera:ResetCamera()
    if not self.originalCoords then
        return
    end

    self.changingCam = true
    self.camDistance = 5.0
    self.oldCam = self.cam

    local angleZ, angleY, camDistance, originalCoords = self.angleZ, self.angleY, self.camDistance, self.originalCoords

    local offset = vec3(
        ((cos(angleZ) * cos(angleY)) + (cos(angleY) * cos(angleZ))) / 2 * camDistance,
        ((sin(angleZ) * cos(angleY)) + (cos(angleY) * sin(angleZ))) / 2 * camDistance,
        sin(angleY) * camDistance
    )

    local camPos = vec3(
        originalCoords.x + offset.x,
        originalCoords.y + offset.y,
        originalCoords.z + offset.z
    )

    if originalCoords then
        local newcam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", camPos.x, camPos.y, camPos.z, 0.0, 0.0, 0.0, 70.0, false, 0)
        PointCamAtCoord(newcam, originalCoords.x, originalCoords.y, originalCoords.z)
        SetCamActiveWithInterp(newcam, self.oldCam, 500, true, true)

        Wait(500)
        self.targetCoords = originalCoords
        self.changingCam = false
        self.cam = newcam
        setCamPosition()

        DestroyCam(self.oldCam, true)
    end
end

return Camera
