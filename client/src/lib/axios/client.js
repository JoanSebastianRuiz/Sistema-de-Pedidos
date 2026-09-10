import i18n from '@/i18n';
import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = i18n.language;

    return config;
});
