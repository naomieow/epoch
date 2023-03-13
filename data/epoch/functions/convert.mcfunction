scoreboard players reset $unix epoch.date_time
data modify storage epoch:datetime splitunix.0 set from storage suso.str:io out.time[0]
data modify storage epoch:datetime splitunix.1 set from storage suso.str:io out.time[1]
data modify storage epoch:datetime splitunix.2 set from storage suso.str:io out.time[2]
data modify storage epoch:datetime splitunix.3 set from storage suso.str:io out.time[3]
data modify storage epoch:datetime splitunix.4 set from storage suso.str:io out.time[4]
data modify storage epoch:datetime splitunix.5 set from storage suso.str:io out.time[5]
data modify storage epoch:datetime splitunix.6 set from storage suso.str:io out.time[6]
data modify storage epoch:datetime splitunix.7 set from storage suso.str:io out.time[7]
data modify storage epoch:datetime splitunix.8 set from storage suso.str:io out.time[8]
data modify storage epoch:datetime splitunix.9 set from storage suso.str:io out.time[9]
function epoch:converters/0
scoreboard players operation #temp epoch.date_time *= 1000000000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/1
scoreboard players operation #temp epoch.date_time *= 100000000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/2
scoreboard players operation #temp epoch.date_time *= 10000000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/3
scoreboard players operation #temp epoch.date_time *= 1000000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/4
scoreboard players operation #temp epoch.date_time *= 100000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/5
scoreboard players operation #temp epoch.date_time *= 10000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/6
scoreboard players operation #temp epoch.date_time *= 1000 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/7
scoreboard players operation #temp epoch.date_time *= 100 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/8
scoreboard players operation #temp epoch.date_time *= 10 sandstone_const
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time
function epoch:converters/9
scoreboard players operation $unix epoch.date_time += #temp epoch.date_time