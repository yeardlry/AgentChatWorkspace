import './Message.css';
import TextImageMessage from './TextImageMessage';
import WebLinksMessage from './WebLinksMessage';
import ActionButtonsMessage from './ActionButtonsMessage';
import StatisticMessage from './StatisticMessage';
import TableMessage from './TableMessage';
import TimelineMessage from './TimelineMessage';

// 组件映射
const componentMap = {
  textImage: TextImageMessage,
  webLinks: WebLinksMessage,
  actionButtons: ActionButtonsMessage,
  statistic: StatisticMessage,
  table: TableMessage,
  timeline: TimelineMessage,
};

function CompositeMessage({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="message-composite">
      {blocks.map((block, index) => {
        const Component = componentMap[block.type];
        if (!Component) {
          console.warn(`Unknown message type: ${block.type}`);
          return null;
        }
        return <Component key={index} {...block.props} />;
      })}
    </div>
  );
}

export default CompositeMessage;
