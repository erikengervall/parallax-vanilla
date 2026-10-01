import { destroy, init, refresh } from './parallax'

export { destroy, init, refresh }
export { defaultSettings } from './constants'
export type { MediaType, Settings, UserSettings } from './types'

const pv = { init, refresh, destroy }
export default pv
