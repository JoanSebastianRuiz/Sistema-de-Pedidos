import { api } from '@/lib/axios/client';

export const createUpdateStatusService =
    (path) =>
    async ({ id, ...payload }) => {
        const { data } = await api.patch(`${path}/${id}/status`, payload);
        return data;
    };
