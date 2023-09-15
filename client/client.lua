RegisterNUICallback("resource:close", function(_, cb)
    SendNUIEvent("resource:visible", false)
    cb(1)
end)