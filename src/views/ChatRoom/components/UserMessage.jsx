import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import "./Message.css";

function UserMessage({ content }) {
  const contentRef = useRef(null);
  const [isSingleLine, setIsSingleLine] = useState(true);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight, 10);
      // 如果高度小于等于行高的1.5倍，认为是单行
      setIsSingleLine(height <= lineHeight * 1.5);
    }
  }, [content]);

  return (
    <div className="message-item user-message">
      <Avatar
        size={32}
        icon={<UserOutlined />}
        className={`message-avatar ${isSingleLine ? "center" : "top"}`}
      />
      <div className={`message-content ${isSingleLine ? "center" : "top"}`}>
        <div className="message-bubble" ref={contentRef}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
