import { Button } from 'antd';
import './Message.css';

function ActionButtonsMessage({ text, buttons }) {
  return (
    <div className="message-action-buttons">
      {text && <div className="message-text">{text}</div>}
      {buttons && buttons.length > 0 && (
        <div className="action-buttons-list">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              type={btn.type || 'default'}
              icon={btn.icon}
              onClick={btn.onClick}
              className="action-button"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionButtonsMessage;
