import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'epoch',
  description: [ 'A ', { text: 'Sandstone', color: 'gold' }, ' data pack.' ],
  formatVersion: 7,
  namespace: 'epoch',
  packUid: 'a3ecArg8',
  saveOptions: { path: './.sandstone/output/datapack' },
  onConflict: {
    default: 'warn',
  },
} as SandstoneConfig
