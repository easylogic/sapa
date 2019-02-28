export * from './Dom'
export * from './Event'
export * from './Module'
export * from './Store'
export * from './func'
export * from './UIElement'
export * from './App'

export const start = (opt) => {
    return new App(opt);
}