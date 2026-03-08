import { Avatar, Image } from 'antd';
import './Message.css';
import TextImageMessage from './TextImageMessage';
import WebLinksMessage from './WebLinksMessage';
import ActionButtonsMessage from './ActionButtonsMessage';
import StatisticMessage from './StatisticMessage';
import TableMessage from './TableMessage';
import TimelineMessage from './TimelineMessage';
import CompositeMessage from './CompositeMessage';

// 组件映射
const componentMap = {
  text: ({ content }) => <div className="message-text">{content}</div>,
  image: ({ content }) => (
    <Image src={content.url} alt="AI图片" className="message-image" preview />
  ),
  buttons: ({ content }) => (
    <div className="message-buttons">
      {content.map((btn, index) => (
        <button key={index} className="message-button" onClick={btn.onClick}>
          {btn.label}
        </button>
      ))}
    </div>
  ),
  card: ({ content }) => <div className="message-card">{content}</div>,
  textImage: TextImageMessage,
  webLinks: WebLinksMessage,
  actionButtons: ActionButtonsMessage,
  statistic: StatisticMessage,
  table: TableMessage,
  timeline: TimelineMessage,
  composite: CompositeMessage,
};

// 输入动画组件
const TypingIndicator = () => (
  <div className="typing-indicator-inline">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

function AIMessage({ content, type = 'text', text, images, buttons, links, statistics, columns, dataSource, items, blocks, isTyping }) {
  // 处理 props 传递的数据
  const propsData = {
    content,
    text,
    images,
    buttons,
    links,
    statistics,
    columns,
    dataSource,
    items,
    blocks,
  };

  // 使用 componentMap 中的组件渲染
  if (componentMap[type]) {
    const Component = componentMap[type];
    return (
      <div className="message-item ai-message">
        <Avatar size={32} className="ai-avatar">
          <span className="ai-avatar-text">AI</span>
        </Avatar>
        <div className="message-content">
          <Component {...propsData} />
          {isTyping && <TypingIndicator />}
        </div>
      </div>
    );
  }

  // 默认文本渲染
  return (
    <div className="message-item ai-message">
      <Avatar size={32} className="ai-avatar">
        <span className="ai-avatar-text">AI</span>
      </Avatar>
      <div className="message-content">
        <div className="message-text">{String(content)}</div>
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
}

export default AIMessage;
