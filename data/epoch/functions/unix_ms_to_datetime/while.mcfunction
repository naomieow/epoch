tellraw @a "loop 1"
scoreboard players operation anon_a3ecArg8_2 sandstone = #index epoch.date_time
scoreboard players operation anon_a3ecArg8_2 sandstone %= 400 sandstone_const
scoreboard players operation anon_a3ecArg8_3 sandstone = #index epoch.date_time
scoreboard players operation anon_a3ecArg8_3 sandstone %= 4 sandstone_const
scoreboard players operation anon_a3ecArg8_4 sandstone = #index epoch.date_time
scoreboard players operation anon_a3ecArg8_4 sandstone %= 100 sandstone_const
scoreboard players set cond_3 sandstone 0
execute if score anon_a3ecArg8_3 sandstone matches 0 unless score anon_a3ecArg8_4 sandstone matches 0 run scoreboard players set cond_3 sandstone 1
scoreboard players set cond_4 sandstone 0
execute unless score cond_3 sandstone matches 1 unless score anon_a3ecArg8_2 sandstone matches 0 run scoreboard players set cond_4 sandstone 1
execute unless score cond_4 sandstone matches 1 run function epoch:unix_ms_to_datetime/while/if
scoreboard players add #index epoch.date_time 1
execute if score #index epoch.date_time <= $year epoch.date_time run function epoch:unix_ms_to_datetime/while