import { createCrudService } from '@/shared/utils/createCrudService';
import { createUpdateStatusService } from '@/shared/utils/createUpdateStatusService';

const route = '/products';
const base = createCrudService(route);
const updateStatus = createUpdateStatusService(route);

export const productService = {
    ...base,
    updateStatus,
};
