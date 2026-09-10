import i18n from '@/i18n';

import axios from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    timeout: 10000,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = i18n.language;

    return config;
});
