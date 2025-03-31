
export const storeToken = (token: string): void => {
  // 使用 localStorage 存储
  localStorage.setItem('apiToken', token);
  
  // 或者使用 cookie 存储（需要安装 js-cookie）
  // import Cookies from 'js-cookie';
  // Cookies.set('apiToken', token, { expires: 7 }); // 7天过期
};

export const getToken = (): string | null => {
  // 从 localStorage 获取
  return localStorage.getItem('apiToken');
  
  // 从 cookie 获取
  // return Cookies.get('apiToken') || null;
};

export const clearToken = (): void => {
  localStorage.removeItem('apiToken');
  // Cookies.remove('apiToken');
};