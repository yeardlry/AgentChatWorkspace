/**
 * 封装 fetch 请求库
 */

const BASE_URL = '/api';

/**
 * 发起请求
 * @param {string} url - 请求地址
 * @param {object} options - 请求配置
 * @returns {Promise} - 返回 Promise
 */
export async function request(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : BASE_URL + url;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(fullUrl, config);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 返回 JSON
    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

/**
 * GET 请求
 */
export function get(url, options = {}) {
  return request(url, { ...options, method: 'GET' });
}

/**
 * POST 请求
 */
export function post(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export function put(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export function del(url, options = {}) {
  return request(url, { ...options, method: 'DELETE' });
}

export default {
  request,
  get,
  post,
  put,
  del,
};
