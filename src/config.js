import path from 'node:path'

export const shipAppEntryPath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, 'index.html')

export const shipAppDevPath = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}`

export const preloadPath = path.join(__dirname, './preload.js')

export const iconPath = path.join(__dirname, '../images/icon.ico')