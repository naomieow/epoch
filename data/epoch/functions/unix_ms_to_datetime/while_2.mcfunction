tellraw @a "loop 2"
function epoch:get_month_from_index
execute if score #daysInMonth epoch.date_time <= #dty epoch.date_time run function epoch:unix_ms_to_datetime/while_2/if
scoreboard players add #index epoch.date_time 1
execute if score #index epoch.date_time matches ..11 run function epoch:unix_ms_to_datetime/while_2