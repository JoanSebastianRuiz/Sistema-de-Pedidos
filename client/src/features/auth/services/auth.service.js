import { api } from '@/lib/axios/client';

export const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);

    return data;
};

export const logout = async () => {
    await api.delete('/auth/logout');
};

export const authMe = async () => {
    const { data } = await api.get('/auth/me');

    return data;
};

export const register = async ({name,email, password}) => {
    const { data } = await api.post('/users', {name, email, password});

    return data;
};
