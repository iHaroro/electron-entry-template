export class Polling {
  constructor(callback, interval = 3000, options = {}) {
    this.callback = callback
    this.interval = interval
    this.timer = null
    this.isPolling = false
    this.retryCount = 0

    // 配置项
    this.options = {
      immediate: false, // 是否立即执行
      maxRetries: 3, // 最大重试次数
      retryDelay: 5000, // 重试间隔
      backoffFactor: 1.5, // 重试间隔增长因子
      autoStart: true, // 是否自动启动
      ...options,
    }

    // 自动启动
    if (this.options.autoStart) {
      this.start()
    }
  }

  async execute() {
    try {
      await this.callback()
      this.retryCount = 0
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    if (this.retryCount < this.options.maxRetries) {
      this.retryCount++
      const delay =
        this.options.retryDelay * Math.pow(this.options.backoffFactor, this.retryCount - 1)
      setTimeout(() => this.start(), delay)
      this.options.onRetry?.(this.retryCount, delay)
    } else {
      this.stop()
      this.options.onMaxRetry?.(error)
    }
    this.options.onError?.(error)
  }

  start() {
    if (this.isPolling) return
    this.isPolling = true

    if (this.options.immediate) {
      this.execute()
    }

    const poll = async () => {
      this.timer = setTimeout(async () => {
        await this.execute()
        if (this.isPolling) poll()
      }, this.interval)
    }

    poll()
  }

  stop() {
    this.isPolling = false
    clearTimeout(this.timer)
    this.options.onStop?.()
  }

  updateInterval(newInterval) {
    this.interval = newInterval
    if (this.isPolling) {
      this.stop()
      this.start()
    }
  }
}

// 使用示例
// const pollInstance = new Polling(
//   async () => {
//     console.log('执行轮询任务...')
//   },
//   5000,
//   {
//     immediate: true,
//     maxRetries: 5,
//     onError: (err) => console.error('轮询错误:', err),
//     onRetry: (count, delay) => console.log(`第 ${count} 次重试，${delay}ms 后重试`),
//     onMaxRetry: (err) => console.error('达到最大重试次数:', err),
//     onStop: () => console.log('轮询已停止')
//   }
// )

// 手动停止
// pollInstance.stop()

// 更新间隔
// pollInstance.updateInterval(10000)
