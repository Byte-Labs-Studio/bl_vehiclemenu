fx_version 'cerulean'

game "gta5"

author "Byte Labs"
version '1.0.0'
description 'Byte Labs Angular / CFX Lua template.'
repository 'https://github.com/Byte-Labs-Project/bl_angular_template'

lua54 'yes'

ui_page 'html/index.html'
-- ui_page 'http://localhost:4200/' --for dev

shared_script {
    -- 'shared/shared.lua'
}

server_script {
    -- 'server/server.lua',
}

client_script {
    'client/*.lua',
}

files {
    'build/**',
}
