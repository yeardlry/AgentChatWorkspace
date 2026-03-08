/**
 * Mock Chat API
 * 模拟 AI 对话接口
 */

import { getMockResponse } from './responses';
import { mockStream } from '../request';

/**
 * 发送消息并获取流式响应
 * @param {string} message - 用户消息
 * @param {object} callbacks - 回调函数
 * @returns {function} - 取消函数
 */
export function sendMessage(message, { onChunk, onComplete, onImageReady }) {
  const response = getMockResponse(message);

  if (response.type === 'image') {
    // 图片类型回复
    onChunk?.({
      type: 'textImage',
      text: response.loadingText,
      images: [{ url: '', alt: '加载中', loading: true }]
    });

    // 模拟图片加载延迟
    setTimeout(() => {
      onImageReady?.({
        type: 'textImage',
        text: response.finalText,
        images: response.images
      });
      onComplete?.();
    }, 1500);

    return () => {}; // 图片类型无法取消
  }

  if (response.type === 'webLinks') {
    // 网站链接类型 - 先流式返回文字
    let content = response.text || '';
    let linkIndex = 0;

    // 流式返回文字
    const cancelText = mockStream(
      content,
      30,
      {
        onChunk: (data) => {
          onChunk?.({ type: 'text', content: data.content });
        },
        onComplete: () => {
          // 文字结束后，逐个显示卡片
          if (response.links && response.links.length > 0) {
            const showNextLink = () => {
              if (linkIndex < response.links.length) {
                onChunk?.({
                  type: 'webLinks',
                  links: response.links.slice(0, linkIndex + 1),
                  currentIndex: linkIndex,
                });
                linkIndex++;
                setTimeout(showNextLink, 300); // 每个卡片间隔 300ms
              } else {
                onComplete?.();
              }
            };
            setTimeout(showNextLink, 200);
          } else {
            onComplete?.();
          }
        },
      }
    );

    return cancelText;
  }

  if (response.type === 'timeline') {
    // 时间线类型 - 先流式返回文字
    let content = response.text || '';
    let itemIndex = 0;

    // 流式返回文字
    const cancelText = mockStream(
      content,
      30,
      {
        onChunk: (data) => {
          onChunk?.({ type: 'text', content: data.content });
        },
        onComplete: () => {
          // 文字结束后，逐个显示时间线项
          if (response.items && response.items.length > 0) {
            const showNextItem = () => {
              if (itemIndex < response.items.length) {
                onChunk?.({
                  type: 'timeline',
                  items: response.items.slice(0, itemIndex + 1),
                  currentIndex: itemIndex,
                });
                itemIndex++;
                setTimeout(showNextItem, 400); // 每个时间线项间隔 400ms
              } else {
                onComplete?.();
              }
            };
            setTimeout(showNextItem, 200);
          } else {
            onComplete?.();
          }
        },
      }
    );

    return cancelText;
  }

  if (response.type === 'table') {
    // 表格类型 - 先流式返回文字
    let content = response.text || '';
    let rowIndex = 0;

    // 流式返回文字
    const cancelText = mockStream(
      content,
      30,
      {
        onChunk: (data) => {
          onChunk?.({ type: 'text', content: data.content });
        },
        onComplete: () => {
          // 文字结束后，逐行显示表格数据
          if (response.dataSource && response.dataSource.length > 0) {
            const showNextRow = () => {
              if (rowIndex < response.dataSource.length) {
                onChunk?.({
                  type: 'table',
                  text: response.text,
                  columns: response.columns,
                  dataSource: response.dataSource.slice(0, rowIndex + 1),
                  currentIndex: rowIndex,
                });
                rowIndex++;
                setTimeout(showNextRow, 200); // 每行间隔 200ms
              } else {
                onComplete?.();
              }
            };
            setTimeout(showNextRow, 200);
          } else {
            onComplete?.();
          }
        },
      }
    );

    return cancelText;
  }

  if (response.type === 'service') {
    // 按钮类型 - 先流式返回文字
    let content = response.text || '';
    let buttonIndex = 0;

    // 流式返回文字
    const cancelText = mockStream(
      content,
      30,
      {
        onChunk: (data) => {
          onChunk?.({ type: 'text', content: data.content });
        },
        onComplete: () => {
          // 文字结束后，逐个显示按钮
          if (response.buttons && response.buttons.length > 0) {
            const showNextButton = () => {
              if (buttonIndex < response.buttons.length) {
                onChunk?.({
                  type: 'service',
                  text: response.text,
                  buttons: response.buttons.slice(0, buttonIndex + 1),
                  currentIndex: buttonIndex,
                });
                buttonIndex++;
                setTimeout(showNextButton, 250); // 每个按钮间隔 250ms
              } else {
                onComplete?.();
              }
            };
            setTimeout(showNextButton, 200);
          } else {
            onComplete?.();
          }
        },
      }
    );

    return cancelText;
  }

  if (response.type === 'statistic') {
    // 统计类型 - 先流式返回文字
    let content = response.text || '';
    let statIndex = 0;

    // 流式返回文字
    const cancelText = mockStream(
      content,
      30,
      {
        onChunk: (data) => {
          onChunk?.({ type: 'text', content: data.content });
        },
        onComplete: () => {
          // 文字结束后，逐个显示统计卡片
          if (response.statistics && response.statistics.length > 0) {
            const showNextStat = () => {
              if (statIndex < response.statistics.length) {
                onChunk?.({
                  type: 'statistic',
                  text: response.text,
                  statistics: response.statistics.slice(0, statIndex + 1),
                  currentIndex: statIndex,
                });
                statIndex++;
                setTimeout(showNextStat, 300); // 每个统计卡片间隔 300ms
              } else {
                onComplete?.();
              }
            };
            setTimeout(showNextStat, 200);
          } else {
            onComplete?.();
          }
        },
      }
    );

    return cancelText;
  }

  // 文本类型 - 流式返回
  const cancel = mockStream(
    response.content,
    30,
    {
      onChunk: (data) => {
        onChunk?.({ type: 'text', content: data.content });
      },
      onComplete: () => {
        onComplete?.();
      },
    }
  );

  return cancel;
}

export default {
  sendMessage,
};
