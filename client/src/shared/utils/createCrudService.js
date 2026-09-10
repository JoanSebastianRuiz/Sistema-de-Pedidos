import { api } from '@/lib/axios/client';

const isFile = (value) => value instanceof File || value instanceof Blob;

const hasFile = (value) => {
    if (isFile(value)) return true;

    if (Array.isArray(value)) {
        return value.some(hasFile);
    }

    if (value && typeof value === 'object') {
        return Object.values(value).some(hasFile);
    }

    return false;
};

const toFormData = (data) => {
    const formData = new FormData();

    const append = (key, value) => {
        if (value === null || value === undefined) return;

        if (isFile(value)) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                append(`${key}[${index}]`, item);
            });
        } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
    };

    Object.entries(data).forEach(([key, value]) => append(key, value));

    return formData;
};

export const createCrudService = (basePath) => ({
    getAll: async () => {
        const { data } = await api.get(basePath);
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(`${basePath}/${id}`);
        return data;
    },

    create: async (payload) => {
        const body = hasFile(payload) ? toFormData(payload) : payload;

        const { data } = await api.post(basePath, body);

        return data;
    },

    update: async ({ id, ...payload }) => {
        const body = hasFile(payload) ? toFormData(payload) : payload;

        const { data } = await api.patch(`${basePath}/${id}`, body);

        return data;
    },

    remove: async (id) => {
        const { data } = await api.delete(`${basePath}/${id}`);

        return data;
    },
});
