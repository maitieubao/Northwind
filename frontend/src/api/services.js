import api from './axios';

export const authorService = {
  getAll: async () => {
    const response = await api.get('/authors');
    return { data: response.data };
  },
  getById: async (id) => {
    const response = await api.get(`/authors/${id}`);
    return { data: response.data };
  },
  create: async (payload) => {
    const response = await api.post('/authors', payload);
    return { data: response.data };
  },
  update: async (id, payload) => {
    const response = await api.put(`/authors/${id}`, payload);
    return { data: response.data };
  },
  delete: async (id) => {
    await api.delete(`/authors/${id}`);
  },
};

export const bookService = {
  getAll: async () => {
    const response = await api.get('/books');
    return { data: response.data };
  },
  getById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return { data: response.data };
  },
  create: async (payload) => {
    // Backend expects BookDTO: { title, authorId }
    const response = await api.post('/books', payload);
    return { data: response.data };
  },
  update: async (id, payload) => {
    const response = await api.put(`/books/${id}`, payload);
    return { data: response.data };
  },
  delete: async (id) => {
    await api.delete(`/books/${id}`);
  },
};

export const reviewService = {
  getAll: async () => {
    const response = await api.get('/reviews');
    return { data: response.data };
  },
  getById: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return { data: response.data };
  },
  create: async (payload) => {
    // Backend expects ReviewDTO: { content, rating, bookId }
    const response = await api.post('/reviews', payload);
    return { data: response.data };
  },
  update: async (id, payload) => {
    const response = await api.put(`/reviews/${id}`, payload);
    return { data: response.data };
  },
  delete: async (id) => {
    await api.delete(`/reviews/${id}`);
  },
};
