/**
 * 此文件将由 vite 自动加载并在 “renderer” 上下文中运行。
 * 要了解有关 “main” 和 “renderer” 上下文之间差异的更多信息，请参阅
 * Electron，请访问：
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * 默认情况下，此文件中的Node.js集成处于禁用状态。启用 Node.js 集成时
 * 在 Renderer 进程中，请注意潜在的安全隐患。您可以阅读
 * 有关安全风险的更多信息，请点击此处：
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * 要在此文件中启用 Node.js 集成，请打开“main.js”并启用“nodeIntegration”
 *
 *
 * ```
 *  // 创建浏览器窗口。
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via Vite');
