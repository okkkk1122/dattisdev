import apiClient from './client';

export const contentApi = {
  getAll: () => apiClient.get('/content'),
  getPosts: () => apiClient.get('/content/posts'),
  setPosts: (posts: unknown[]) => apiClient.put('/content/posts', posts),
  getPortfolio: () => apiClient.get('/content/portfolio'),
  setPortfolio: (items: unknown[]) => apiClient.put('/content/portfolio', items),
  getTestimonials: () => apiClient.get('/content/testimonials'),
  setTestimonials: (items: unknown[]) => apiClient.put('/content/testimonials', items),
  getPricing: () => apiClient.get('/content/pricing'),
  setPricing: (items: unknown[]) => apiClient.put('/content/pricing', items),
  getFaq: () => apiClient.get('/content/faq'),
  setFaq: (items: unknown[]) => apiClient.put('/content/faq', items),
  getSettings: () => apiClient.get('/content/settings'),
  updateSettings: (settings: Record<string, unknown>) =>
    apiClient.put('/content/settings', settings),
  syncAll: (data: Record<string, unknown[]>) => apiClient.post('/content/sync', data),
};

export const emailApi = {
  sendContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    locale?: string;
  }) => apiClient.post('/email/contact', data),
  testConnection: () => apiClient.post('/email/test'),
  getStatus: () => apiClient.get('/email/status'),
  getInbox: () => apiClient.get('/email/inbox'),
  markRead: (id: string, read: boolean) =>
    apiClient.patch(`/email/inbox/${id}/read`, { read }),
  deleteInboxItem: (id: string) => apiClient.delete(`/email/inbox/${id}`),
  send: (data: {
    to: string;
    cc?: string;
    subject: string;
    body: string;
    replyTo?: string;
    inReplyTo?: string;
  }) => apiClient.post('/email/send', data),
  sendTest: (to?: string) => apiClient.post('/email/test-send', to ? { to } : {}),
};
