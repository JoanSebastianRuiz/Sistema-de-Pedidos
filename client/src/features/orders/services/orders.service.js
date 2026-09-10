import { createCrudService } from '@/shared/utils/createCrudService';

const base = createCrudService('/orders');

export const orderService = {
    ...base,
};
