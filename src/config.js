import path from 'node:path'

// 船端应用地址
export const shipAppEntryPath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, '/index/index.html')
// 船端智慧监控系统地址
export const shipMonitorAppEntryPath = path.join(__dirname, '../renderer', MAIN_WINDOW_VITE_NAME, '/monitor/index.html')

// 船端应用开发地址
export const shipAppDevPath = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/index/#/`

export const preloadPath = path.join(__dirname, './preload.js')

export const iconPath = path.join(__dirname, '../images/icon.ico')