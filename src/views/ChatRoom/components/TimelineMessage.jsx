import { Timeline } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './Message.css';

function TimelineMessage({ text, items }) {
  // 获取图标组件
  const getIcon = (iconName) => {
    const iconMap = {
      CheckCircleOutlined,
      ClockCircleOutlined,
      ExclamationCircleOutlined
    };
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  // 构建 Timeline items
  const timelineItems = items.map((item) => {
    const timelineItem = {
      color: item.color || 'blue',
      content: (
        <div className="timeline-item-content">
          <div className="timeline-title">{item.title}</div>
          {item.description && (
            <div className="timeline-desc">{item.description}</div>
          )}
          {item.time && <div className="timeline-time">{item.time}</div>}
        </div>
      ),
    };

    if (item.icon) {
      timelineItem.icon = getIcon(item.icon);
    }

    return timelineItem;
  });

  return (
    <div className="message-timeline">
      {text && <div className="message-text">{text}</div>}
      {items && items.length > 0 && (
        <Timeline className="message-timeline-list" items={timelineItems} />
      )}
    </div>
  );
}

export default TimelineMessage;
