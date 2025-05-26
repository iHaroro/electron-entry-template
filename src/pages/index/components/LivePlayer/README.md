```属性(Property)```

`
video-url 视频流地址, String default ''

video-title 视频右上角显示的标题, String default ''

poster 视频封面图片, String default ''

autoplay 自动播放, Boolean default true

controls 显示播放器控制栏, Boolean default true

loop 是否循环播放, Boolean default false

live 是否直播, 标识要不要显示进度条, Boolean default false

alt 视频流地址没有指定情况下, 视频所在区域显示的文字, 相当于 html img 标签的 alt 属性, String default '无信号'

muted 是否静音, Boolean default true

aspect 视频显示区域的宽高比, fullscreen 即是全屏展示, String default '16:9'

fluent 流畅模式, Boolean default true

stretch 是否拉伸, Boolean default false

timeout m3u8 加载超时(秒), Number default 20

show-custom-button 是否在工具栏显示自定义按钮(极速/流畅, 拉伸/标准), Boolean default true

hide-big-play-button 是否隐藏起播状态下的大播放按钮, Boolean default false

hide-snapshot-button 是否隐藏 快照 按钮, Boolean default false

hide-fullscreen-button 是否隐藏 全屏 按钮, Boolean default false

hide-fluent-button 是否隐藏 极速/流畅 按钮, Boolean default false

hide-stretch-button 是否隐藏 拉伸/标准 按钮, Boolean default false

resolution HLS点播流播放时使用：需已有对应清晰度的HLS流，供选择的清晰度配置, 如 "yh,fhd,hd,sd" (说明：yh:原始分辨率，fhd:超清，hd:高清，sd:标清,不配置则不启用,需要提供多清晰度源，比如原画源是test.m3u8, 则hd源即为test_hd.m3u8), String default ''

resolutiondefault HLS点播流播放时使用：默认播放的清晰度, String default 'hd'

playback-rates HLS点播流播放时使用：倍速列表, Array default [0.5, 1, 2, 3]

playback-rate HLS点播流播放时使用：默认倍速, Number default 1

hasaudio HTTP-FLV播放时使用: 是否有音频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断

hasvideo HTTP-FLV播放时使用: 是否有视频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断

custom-buttonsv2.5.1 自定义工具栏按钮, 配置模板(按钮名称[:class名称]), 多个用英文逗号分隔, 示例：custom-buttons="对讲,配置:vjs-icon-cog", String default ''

autofocusv2.5.2 是否自动获取焦点, Boolean default false

dblclick-fullscreenv2.5.3 是否双击全屏, Boolean default true

languagev2.6.2 语言(zh-CN/en), String 默认不配置自动判断

water-markv2.7.12 水印文字, String default ''

digital-zoomv2.7.29 电子放大, Boolean default false


```方法(Method)```

play 播放

pause 暂停

paused 获取暂停状态

getCurrentTime 获取当前播放时间进度, 同步返回播放时间进度数据

setCurrentTimev2.2.5 设置当前播放时间进度, 即 seek

snap 外部 API 方式获取快照, 快照获取成功后, 触发 snapOutside Event

getMuted 获取静音状态

setMuted 设置静音状态

isFullscreenv1.7.6 获取全屏状态

requestFullscreenv1.7.6 触发全屏, 需要放置到交互事件回调中调用

exitFullscreenv2.1.9 退出全屏, 需要放置到交互事件回调中调用

toggleFullscreenv2.1.9 触发全屏, 需要放置到交互事件回调中调用, 如果已处在全屏状态, 则退出全屏

getVolumev1.7.7 获取音量

setVolumev1.7.7 设置音量, 0~1

getDurationv2.7.10 获取点播时长（秒）

```事件(Event)```

message m3u8 加载失败时触发通知消息, 参数: { type: '', message: ''}

error 播放器出错回调, 参数: Error Object

ended 播放结束, 参数: 无

timeupdate 进度更新, 参数: 当前时间进度

pause 暂停, 参数: 当前时间进度

play 播放, 参数: 当前时间进度

fullscreen 全屏状态改变, 参数：true/false

snapOutside 外部快照回调, 参数: 快照 Base64 数据

snapInside 内部快照回调, 由控制栏快照按钮触发, 参数: 快照 Base64 数据

customButtonsv2.5.1 自定义按钮点击回调, 参数：名称

canplayv2.7.32 可播放, 参数：时长（秒）

volumechangev2.7.32 音量改变回调, 参数：音量（0~1），静音状态