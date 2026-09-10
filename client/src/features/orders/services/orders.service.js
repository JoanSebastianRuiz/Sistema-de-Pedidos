import { api } from '@/lib/axios/client';
import { createCrudService } from '@/shared/utils/createCrudService';

const base = createCrudService('/orders');

export const orderService = {
    ...base,
    updateStatus: async ({ id, ...payload }) => {
        const { data } = await api.patch(`orders/${id}/status`, payload);
        return data;
    },
};
