import path from 'node:path'

// index应用地址
export const shipAppEntryPath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, '/index.html')
// demo应用地址
export const demoAppEntryPath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, '/demo.html')

// index应用开发地址
export const shipAppDevPath = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/index.html`
// demo应用开发地址
export const demoAppDevPath = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/demo.html`

export const preloadPath = path.join(__dirname, './preload.js')

export const iconPath = path.join(__dirname, '../images/icon.ico')