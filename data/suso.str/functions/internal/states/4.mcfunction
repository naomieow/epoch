#tellraw @a "STATE 4"

data modify entity 00000000-0000-0226-0000-000000000000 CustomName set from block ~1 ~ ~ LastOutput
data modify block ~1 ~ ~ Command set value "enchant 00000000-0000-0226-0000-000000000000 minecraft:aqua_affinity"

scoreboard players set $state suso.str 5