import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'epoch',
  description: ['Library that takes unix time in and returns realtime'],
  formatVersion: 12,
  namespace: 'epoch',
  packUid: 'a3ecArg8',
  saveOptions: { path: './.sandstone/output/datapack' },
  onConflict: {
    default: 'warn',
  },
} as SandstoneConfig
