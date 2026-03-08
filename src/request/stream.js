/**
 * 流式返回封装
 */

/**
 * 流式请求 - 支持 SSE (Server-Sent Events)
 * @param {string} url - 请求地址
 * @param {object} options - 请求配置
 * @param {function} onChunk - 每当收到数据块时的回调
 * @param {function} onComplete - 完成时的回调
 * @param {function} onError - 错误时的回调
 * @returns {AbortController} - 可用于取消请求
 */
export function streamRequest(url, options = {}, { onChunk, onComplete, onError } = {}) {
  const controller = new AbortController();
  const baseUrl = url.startsWith('http') ? url : '/api' + url;

  fetch(baseUrl, {
    ...options,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // 处理剩余缓冲数据
            if (buffer) {
              const lines = buffer.split('\n');
              for (const line of lines) {
                if (line.startsWith('data:')) {
                  const data = line.slice(5).trim();
                  if (data && data !== '[DONE]') {
                    try {
                      const parsed = JSON.parse(data);
                      onChunk?.(parsed);
                    } catch {
                      // 如果不是 JSON，直接当作文本
                      onChunk?.({ content: data });
                    }
                  }
                }
              }
            }
            onComplete?.();
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          // 按行分割处理
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保留最后一行（可能是不完整的）

          for (const line of lines) {
            if (line.startsWith('data:')) {
              const data = line.slice(5).trim();
              if (data && data !== '[DONE]') {
                try {
                  const parsed = JSON.parse(data);
                  onChunk?.(parsed);
                } catch {
                  // 如果不是 JSON，直接当作文本
                  onChunk?.({ content: data });
                }
              }
            }
          }
        }
      } catch (error) {
        onError?.(error);
      }
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        // 请求被取消
        console.log('Request aborted');
      } else {
        onError?.(error);
      }
    });

  return controller;
}

/**
 * 模拟流式返回（用于开发/测试）
 * @param {string} text - 要流式返回的文本
 * @param {number} delay - 每个字符的延迟（毫秒）
 * @param {function} onChunk - 每当收到数据块时的回调
 * @param {function} onComplete - 完成时的回调
 * @returns {function} - 可用于取消的函数
 */
export function mockStream(text, delay = 50, { onChunk, onComplete } = {}) {
  let index = 0;
  let cancelled = false;

  const run = () => {
    if (cancelled || index >= text.length) {
      onComplete?.();
      return;
    }

    // 每次发送 1-3 个字符，模拟真实流式效果
    const chunkSize = Math.min(Math.floor(Math.random() * 3) + 1, text.length - index);
    const chunk = text.slice(index, index + chunkSize);

    onChunk?.({ content: chunk, done: false });

    index += chunkSize;

    setTimeout(run, delay);
  };

  run();

  return () => {
    cancelled = true;
  };
}

export default {
  streamRequest,
  mockStream,
};
