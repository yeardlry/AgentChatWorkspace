import { useState, useEffect, useRef, useCallback } from "react";
import { Input, Button } from "antd";
import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import AIMessage from "./components/AIMessage";
import UserMessage from "./components/UserMessage";
import { messages as initialMessages } from "./data";
import { sendMessage } from "../../mock";
import "./ChatRoom.css";

function ChatRoom() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatMainRef = useRef(null);
  const streamCancelRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    if (chatMainRef.current) {
      chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
    }
  }, [messages]);

  // 清理流式请求
  useEffect(() => {
    return () => {
      if (streamCancelRef.current) {
        streamCancelRef.current();
      }
    };
  }, []);

  // 发送消息
  const handleSend = useCallback(
    () => {
      const userInput = String(inputValue || "");
      if (!userInput.trim() || isTyping) return;

      // 添加用户消息
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: userInput,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsTyping(true);

      // 创建空的 AI 消息
      const aiMsgId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          role: "ai",
          type: "text",
          content: "",
          isTyping: true,
        },
      ]);

      // 调用 mock API
      streamCancelRef.current = sendMessage(userInput, {
        onChunk: (data) => {
          if (data.type === "text") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                newMessages[idx] = {
                  ...newMessages[idx],
                  content: (newMessages[idx].content || "") + data.content,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "textImage") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                newMessages[idx] = {
                  ...newMessages[idx],
                  type: data.type,
                  text: data.text,
                  images: data.images,
                  isTyping: true,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "webLinks") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                const oldMsg = newMessages[idx];
                // 保留已有的 text（文字部分），只在第一次时设置
                const text = oldMsg.text || "以下是一些优秀的 AI 学习网站：";
                newMessages[idx] = {
                  ...oldMsg,
                  type: "webLinks",
                  text: text,
                  links: data.links,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "timeline") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                const oldMsg = newMessages[idx];
                // 保留已有的 text（文字部分），只在第一次时设置
                const text = oldMsg.text || "项目进度如下：";
                newMessages[idx] = {
                  ...oldMsg,
                  type: "timeline",
                  text: text,
                  items: data.items,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "table") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                const oldMsg = newMessages[idx];
                // 保留已有的 text（文字部分），只在第一次时设置
                const text = oldMsg.text || "以下是用户数据：";
                newMessages[idx] = {
                  ...oldMsg,
                  type: "table",
                  text: text,
                  columns: data.columns,
                  dataSource: data.dataSource,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "service") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                const oldMsg = newMessages[idx];
                // 保留已有的 text（文字部分），只在第一次时设置
                const text = oldMsg.text || "请选择你要绑定的邮箱服务：";
                newMessages[idx] = {
                  ...oldMsg,
                  type: "actionButtons",
                  text: text,
                  buttons: data.buttons,
                };
                return newMessages;
              }
              return prev;
            });
          } else if (data.type === "statistic") {
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === aiMsgId);
              if (idx !== -1) {
                const newMessages = [...prev];
                const oldMsg = newMessages[idx];
                // 保留已有的 text（文字部分），只在第一次时设置
                const text = oldMsg.text || "以下是本月的数据统计：";
                newMessages[idx] = {
                  ...oldMsg,
                  type: "statistic",
                  text: text,
                  statistics: data.statistics,
                };
                return newMessages;
              }
              return prev;
            });
          }
        },
        onImageReady: (data) => {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              newMessages[idx] = {
                ...newMessages[idx],
                type: data.type,
                text: data.text,
                images: data.images,
                isTyping: false,
              };
              return newMessages;
            }
            return prev;
          });
        },
        onComplete: () => {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              newMessages[idx] = {
                ...newMessages[idx],
                isTyping: false,
              };
              return newMessages;
            }
            return prev;
          });
          setIsTyping(false);
          streamCancelRef.current = null;
        },
      });
    },
    [inputValue, isTyping],
  );

  // 快速发送消息
  const handleQuickSend = (text) => {
    const userInput = text;
    // 添加用户消息
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 创建空的 AI 消息
    const aiMsgId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: aiMsgId,
        role: "ai",
        type: "text",
        content: "",
        isTyping: true,
      },
    ]);

    // 调用 mock API
    streamCancelRef.current = sendMessage(userInput, {
      onChunk: (data) => {
        if (data.type === "text") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              newMessages[idx] = {
                ...newMessages[idx],
                content: (newMessages[idx].content || "") + data.content,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "textImage") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              newMessages[idx] = {
                ...newMessages[idx],
                type: data.type,
                text: data.text,
                images: data.images,
                isTyping: true,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "webLinks") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              const oldMsg = newMessages[idx];
              // 保留已有的 text（文字部分），只在第一次时设置
              const text = oldMsg.text || "以下是一些优秀的 AI 学习网站：";
              newMessages[idx] = {
                ...oldMsg,
                type: "webLinks",
                text: text,
                links: data.links,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "timeline") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              const oldMsg = newMessages[idx];
              // 保留已有的 text（文字部分），只在第一次时设置
              const text = oldMsg.text || "项目进度如下：";
              newMessages[idx] = {
                ...oldMsg,
                type: "timeline",
                text: text,
                items: data.items,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "table") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              const oldMsg = newMessages[idx];
              // 保留已有的 text（文字部分），只在第一次时设置
              const text = oldMsg.text || "以下是用户数据：";
              newMessages[idx] = {
                ...oldMsg,
                type: "table",
                text: text,
                columns: data.columns,
                dataSource: data.dataSource,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "service") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              const oldMsg = newMessages[idx];
              // 保留已有的 text（文字部分），只在第一次时设置
              const text = oldMsg.text || "请选择你要绑定的邮箱服务：";
              newMessages[idx] = {
                ...oldMsg,
                type: "actionButtons",
                text: text,
                buttons: data.buttons,
              };
              return newMessages;
            }
            return prev;
          });
        } else if (data.type === "statistic") {
          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === aiMsgId);
            if (idx !== -1) {
              const newMessages = [...prev];
              const oldMsg = newMessages[idx];
              // 保留已有的 text（文字部分），只在第一次时设置
              const text = oldMsg.text || "以下是本月的数据统计：";
              newMessages[idx] = {
                ...oldMsg,
                type: "statistic",
                text: text,
                statistics: data.statistics,
              };
              return newMessages;
            }
            return prev;
          });
        }
      },
      onImageReady: (data) => {
        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === aiMsgId);
          if (idx !== -1) {
            const newMessages = [...prev];
            newMessages[idx] = {
              ...newMessages[idx],
              type: data.type,
              text: data.text,
              images: data.images,
              isTyping: false,
            };
            return newMessages;
          }
          return prev;
        });
      },
      onComplete: () => {
        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === aiMsgId);
          if (idx !== -1) {
            const newMessages = [...prev];
            newMessages[idx] = {
              ...newMessages[idx],
              isTyping: false,
            };
            return newMessages;
          }
          return prev;
        });
        setIsTyping(false);
        streamCancelRef.current = null;
      },
    });
  };

  // 按回车发送
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 快捷短语点击
  const quickPhrases = [
    { label: "你好", text: "你好" },
    { label: "图片", text: "图片" },
    { label: "网站", text: "网站" },
    { label: "进度", text: "进度" },
    { label: "数据", text: "数据" },
    { label: "服务", text: "服务" },
    { label: "统计", text: "统计" },
    { label: "帮助", text: "帮助" },
  ];

  const handleQuickPhrase = (text) => {
    if (isTyping) return;
    handleQuickSend(String(text));
  };

  return (
    <div className="chat-room">
      {/* 聊天内容区域 */}
      <div className="chat-main-wrap" ref={chatMainRef}>
        {messages.map((msg) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} content={msg.content} />
          ) : (
            <AIMessage
              key={msg.id}
              content={msg.content}
              type={msg.type}
              text={msg.text}
              images={msg.images}
              buttons={msg.buttons}
              links={msg.links}
              statistics={msg.statistics}
              columns={msg.columns}
              dataSource={msg.dataSource}
              items={msg.items}
              blocks={msg.blocks}
              isTyping={msg.isTyping}
            />
          ),
        )}
      </div>

      {/* 聊天输入框 */}
      <div className="chat-input-wrap">
        {/* 快捷短语按钮 */}
        <div className="quick-phrases">
          {quickPhrases.map((item) => (
            <Button
              key={item.label}
              size="small"
              onClick={() => handleQuickPhrase(item.text)}
              disabled={isTyping}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="input-container">
          <div className="plus-btn">
            <PlusOutlined />
          </div>
          <Input
            placeholder="Type your message..."
            className="message-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <div
            className={`send-btn ${isTyping ? "disabled" : ""}`}
            onClick={handleSend}
          >
            <SendOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
