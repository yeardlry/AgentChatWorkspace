// 聊天消息数据
export const messages = [
  // 1. 纯文字
  {
    id: 1,
    role: 'user',
    content: '你好，请帮我介绍一下你自己',
  },
  {
    id: 2,
    role: 'ai',
    type: 'text',
    content: '你好！我是 AI 助手，很高兴为你服务。我可以帮助你完成各种任务，比如回答问题、提供建议、生成内容等。有什么我可以帮你的吗？',
  },

  // 2. 纯文字 + 按钮
  {
    id: 3,
    role: 'user',
    content: '你可以做什么？',
  },
  {
    id: 4,
    role: 'ai',
    type: 'actionButtons',
    content: null,
    text: '我可以帮你完成以下任务：',
    buttons: [
      { label: '回答问题', onClick: () => console.log('回答问题') },
      { label: '写作辅助', onClick: () => console.log('写作辅助') },
      { label: '代码帮助', onClick: () => console.log('代码帮助') },
      { label: '翻译', onClick: () => console.log('翻译') },
    ],
  },

  // 3. 文字 + 图片
  {
    id: 5,
    role: 'user',
    content: '给我看看一些图片',
  },
  {
    id: 6,
    role: 'ai',
    type: 'textImage',
    text: '这是一个示例图片：',
    images: [
      { url: '/sample.jpg', alt: '示例图片1' },
    ],
  },

  // 4. 文字 + 网站列表
  {
    id: 7,
    role: 'user',
    content: '推荐一些 AI 相关的网站',
  },
  {
    id: 8,
    role: 'ai',
    type: 'webLinks',
    text: '以下是一些优秀的 AI 学习网站：',
    links: [
      {
        url: 'https://openai.com',
        title: 'OpenAI',
        description: 'AI 研究和部署公司',
        favicon: 'https://openai.com/favicon.ico',
      },
      {
        url: 'https://www.anthropic.com',
        title: 'Anthropic',
        description: '专注于 AI 安全的公司',
        favicon: 'https://www.anthropic.com/favicon.ico',
      },
    ],
  },

  // 5. 文字 + 统计
  {
    id: 9,
    role: 'user',
    content: '显示一些统计数据',
  },
  {
    id: 10,
    role: 'ai',
    type: 'statistic',
    text: '以下是本月的数据统计：',
    statistics: [
      {
        title: '总用户数',
        value: 12345,
        prefix: '',
        trend: 12.5,
        trendIcon: 'ArrowUpOutlined',
        span: 12,
      },
      {
        title: '总收入',
        value: 98765,
        prefix: '¥',
        trend: 8.2,
        trendIcon: 'ArrowUpOutlined',
        span: 12,
      },
      {
        title: '活跃度',
        value: 85.6,
        suffix: '%',
        trend: -2.3,
        trendIcon: 'ArrowDownOutlined',
        span: 12,
      },
    ],
  },

  // 6. 文字 + 表格
  {
    id: 11,
    role: 'user',
    content: '给我看看用户列表',
  },
  {
    id: 12,
    role: 'ai',
    type: 'table',
    text: '以下是用户数据：',
    columns: [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '邮箱', dataIndex: 'email', key: 'email' },
      { title: '角色', dataIndex: 'role', key: 'role' },
      { title: '状态', dataIndex: 'status', key: 'status' },
    ],
    dataSource: [
      { key: '1', name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
      { key: '2', name: '李四', email: 'lisi@example.com', role: '用户', status: '活跃' },
      { key: '3', name: '王五', email: 'wangwu@example.com', role: '用户', status: '离线' },
    ],
  },

  // 7. 文字 + 时间线
  {
    id: 13,
    role: 'user',
    content: '项目进度如何？',
  },
  {
    id: 14,
    role: 'ai',
    type: 'timeline',
    text: '项目进度如下：',
    items: [
      {
        title: '需求分析完成',
        description: '已完成所有需求文档',
        time: '2024-01-15',
        color: 'green',
        icon: 'CheckCircleOutlined',
      },
      {
        title: 'UI 设计完成',
        description: '所有页面设计稿已完成',
        time: '2024-01-20',
        color: 'green',
        icon: 'CheckCircleOutlined',
      },
      {
        title: '开发进行中',
        description: '前端开发进度 60%',
        time: '2024-01-25',
        color: 'blue',
        icon: 'ClockCircleOutlined',
      },
      {
        title: '测试待开始',
        description: '等待开发完成后进行',
        time: '预计 2024-02-01',
        color: 'gray',
      },
    ],
  },

  // 8. 组合消息示例
  {
    id: 15,
    role: 'user',
    content: '给我一个综合报告',
  },
  {
    id: 16,
    role: 'ai',
    type: 'composite',
    content: null,
    blocks: [
      {
        type: 'text',
        props: {
          content: '以下是综合报告：',
        },
      },
      {
        type: 'statistic',
        props: {
          text: '核心指标：',
          statistics: [
            { title: '访问量', value: 50000, trend: 15, span: 12 },
            { title: '转化率', value: 3.5, suffix: '%', trend: -5, span: 12 },
          ],
        },
      },
      {
        type: 'timeline',
        props: {
          text: '近期动态：',
          items: [
            { title: '新增功能上线', time: '昨天', color: 'green' },
            { title: '用户量突破 10万', time: '3天前', color: 'green' },
          ],
        },
      },
    ],
  },

  // 9. 绑定邮箱示例
  {
    id: 17,
    role: 'user',
    content: '如何绑定邮箱？',
  },
  {
    id: 18,
    role: 'ai',
    type: 'actionButtons',
    text: '请选择你要绑定的邮箱服务：',
    buttons: [
      { label: 'Connect Gmail', onClick: () => console.log('绑定 Gmail') },
      { label: 'Connect QQmail', onClick: () => console.log('绑定 QQmail') },
      { label: 'Connect Outlook', onClick: () => console.log('绑定 Outlook') },
    ],
  },
];
