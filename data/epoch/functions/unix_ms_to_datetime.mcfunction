data remove storage suso.str:io in
data modify storage suso.str:io in.name set value "world"
data modify storage suso.str:io in.get set value 2
function suso.str:call_head
function epoch:convert
scoreboard players operation anon_a3ecArg8_0 sandstone = $unix epoch.date_time
scoreboard players operation anon_a3ecArg8_0 sandstone /= 86400 sandstone_const
scoreboard players operation #days epoch.date_time = anon_a3ecArg8_0 sandstone
scoreboard players operation anon_a3ecArg8_1 sandstone = #days epoch.date_time
scoreboard players operation anon_a3ecArg8_1 sandstone /= 365 sandstone_const
scoreboard players add anon_a3ecArg8_1 sandstone 1970
scoreboard players operation $year epoch.date_time = anon_a3ecArg8_1 sandstone
scoreboard players set #leaps epoch.date_time 0
scoreboard players set #leapCY epoch.date_time 0
scoreboard players set #index epoch.date_time 1970
execute if score #index epoch.date_time <= $year epoch.date_time run function epoch:unix_ms_to_datetime/while
scoreboard players operation anon_a3ecArg8_5 sandstone = #days epoch.date_time
scoreboard players operation anon_a3ecArg8_5 sandstone %= 365 sandstone_const
scoreboard players operation #dty epoch.date_time = anon_a3ecArg8_5 sandstone
scoreboard players operation anon_a3ecArg8_6 sandstone = #leaps epoch.date_time
scoreboard players remove anon_a3ecArg8_6 sandstone 1
scoreboard players operation #dty epoch.date_time -= anon_a3ecArg8_6 sandstone
scoreboard players set $month epoch.date_time 0
scoreboard players set #index epoch.date_time 0
execute if score #index epoch.date_time matches ..11 run function epoch:unix_ms_to_datetime/while_2
scoreboard players reset cond_6 sandstone
execute if score #dty epoch.date_time matches 1.. run function epoch:unix_ms_to_datetime/if
execute unless score cond_6 sandstone matches 0.. run function epoch:unix_ms_to_datetime/else
execute if score $month epoch.date_time matches 2 if score #dty epoch.date_time matches 0 if score #leapCY epoch.date_time matches 1 run scoreboard players set $day epoch.date_time 29