/**
 * Mock 响应数据
 */

export const mockResponses = {
  default: '你好！我是 AI 助手，很高兴为你服务。我可以帮助你完成各种任务，比如回答问题，提供建议、生成内容等。有什么我可以帮你的吗？',
  hello: '你好！有什么我可以帮助你的吗？',
  help: '我可以帮你完成以下任务：回答问题、写作辅助、代码帮助、翻译等。请告诉我你需要什么帮助！',
  weather: '抱歉，我无法获取实时的天气信息。不过你可以告诉我你所在的城市，我可以帮你查询天气预报网站。',
};

// 网站链接数据（国内网站）
export const mockWebLinks = [
  {
    url: 'https://www.kimi.moonshot.cn',
    title: 'Kimi',
    description: '月之暗面 AI 助手',
    favicon: 'https://www.kimi.moonshot.cn/favicon.ico',
  },
  {
    url: 'https://www.midu.com',
    title: '秘塔科技',
    description: 'AI 搜索产品',
    favicon: 'https://www.midu.com/favicon.ico',
  },
  {
    url: 'https://www.tongyi.aliyun.com',
    title: '通义千问',
    description: '阿里云 AI 助手',
    favicon: 'https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico',
  },
  {
    url: 'https://yiyan.baidu.com',
    title: '文心一言',
    description: '百度 AI 助手',
    favicon: 'https://www.baidu.com/favicon.ico',
  },
];

// Timeline 数据
export const mockTimeline = [
  {
    title: '需求分析',
    description: '完成项目需求调研和分析',
    timestamp: '2024-01-15',
    icon: 'FileTextOutlined',
  },
  {
    title: 'UI/UX 设计',
    description: '完成界面设计和交互原型',
    timestamp: '2024-02-01',
    icon: 'BgColorsOutlined',
  },
  {
    title: '前端开发',
    description: '完成主要功能模块开发',
    timestamp: '2024-03-15',
    icon: 'CodeOutlined',
  },
  {
    title: '测试验收',
    description: '完成系统测试和bug修复',
    timestamp: '2024-04-01',
    icon: 'CheckCircleOutlined',
  },
  {
    title: '上线部署',
    description: '项目正式上线并交付使用',
    timestamp: '2024-04-15',
    icon: 'RocketOutlined',
  },
];

// 表格数据
export const mockTable = {
  text: '以下是用户数据：',
  columns: [
    { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
    { title: '电话', dataIndex: 'phone', key: 'phone', width: 130 },
    { title: '城市', dataIndex: 'city', key: 'city', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80 },
  ],
  dataSource: [
    { key: '1', name: '张三', email: 'zhangsan@example.com', phone: '138-0011-3800', city: '北京', status: '活跃' },
    { key: '2', name: '李四', email: 'lisi@example.com', phone: '139-0011-3900', city: '上海', status: '活跃' },
    { key: '3', name: '王五', email: 'wangwu@example.com', phone: '137-0011-3700', city: '广州', status: '待处理' },
    { key: '4', name: '赵六', email: 'zhaoliu@example.com', phone: '136-0011-3600', city: '深圳', status: '活跃' },
    { key: '5', name: '钱七', email: 'qianqi@example.com', phone: '135-0011-3500', city: '杭州', status: '待处理' },
    { key: '6', name: '孙八', email: 'sunba@example.com', phone: '134-0011-3400', city: '成都', status: '活跃' },
    { key: '7', name: '周九', email: 'zhoujiu@example.com', phone: '133-0011-3300', city: '武汉', status: '待处理' },
    { key: '8', name: '吴十', email: 'wushi@example.com', phone: '132-0011-3200', city: '南京', status: '活跃' },
  ],
};

// 邮箱服务按钮数据
export const mockButtons = [
  { label: 'Gmail', icon: 'MailOutlined', type: 'default' },
  { label: 'Outlook', icon: 'MailOutlined', type: 'default' },
  { label: 'QQ邮箱', icon: 'MailOutlined', type: 'default' },
  { label: '163邮箱', icon: 'MailOutlined', type: 'default' },
  { label: '企业邮箱', icon: 'MailOutlined', type: 'primary' },
];

// 统计数据
export const mockStatistics = {
  text: '以下是本月的数据统计：',
  statistics: [
    { title: '总用户数', value: 12580, prefix: '', trend: 12.5, trendIcon: 'ArrowUpOutlined', span: 12 },
    { title: '总收入', value: 256800, prefix: '¥', trend: 8.2, trendIcon: 'ArrowUpOutlined', span: 12 },
    { title: '活跃用户', value: 8650, prefix: '', trend: -2.3, trendIcon: 'ArrowDownOutlined', span: 12 },
    { title: '转化率', value: 3.68, suffix: '%', trend: 5.1, trendIcon: 'ArrowUpOutlined', span: 12 },
  ],
};

/**
 * 根据用户输入获取对应的回复
 * @param {string} input - 用户输入
 * @returns {object} - { type: 'text' | 'image', content: string, images?: array }
 */
export function getMockResponse(input) {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('你好') || lowerInput.includes('hello')) {
    return {
      type: 'text',
      content: mockResponses.hello,
    };
  }

  if (lowerInput.includes('帮助') || lowerInput.includes('help')) {
    return {
      type: 'text',
      content: mockResponses.help,
    };
  }

  if (lowerInput.includes('天气')) {
    return {
      type: 'text',
      content: mockResponses.weather,
    };
  }

  if (lowerInput.includes('图片') || lowerInput.includes('image')) {
    return {
      type: 'image',
      loadingText: '正在显示图片...',
      finalText: '这是一张示例图片：',
      images: [
        { url: '/sample.jpg', alt: '示例图片' }
      ],
    };
  }

  if (lowerInput.includes('网站')) {
    return {
      type: 'webLinks',
      text: '以下是一些优秀的 AI 学习网站：',
      links: mockWebLinks,
    };
  }

  if (lowerInput.includes('进度')) {
    return {
      type: 'timeline',
      text: '项目进度如下：',
      items: mockTimeline,
    };
  }

  if (lowerInput.includes('数据')) {
    return {
      type: 'table',
      text: '以下是用户数据：',
      columns: mockTable.columns,
      dataSource: mockTable.dataSource,
    };
  }

  if (lowerInput.includes('服务')) {
    return {
      type: 'service',
      text: '请选择你要绑定的邮箱服务：',
      buttons: mockButtons,
    };
  }

  if (lowerInput.includes('统计')) {
    return {
      type: 'statistic',
      text: mockStatistics.text,
      statistics: mockStatistics.statistics,
    };
  }

  // 默认回复
  return {
    type: 'text',
    content: mockResponses.default,
  };
}
