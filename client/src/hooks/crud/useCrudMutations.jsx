import { queryKeys } from '@/lib/react-query/queryKeys';
import { useCrudMutation } from './useCrudMutation';

export const useCrudMutations = (service, moduleName) => {
    const commonConfig = {
        queryKey: queryKeys[moduleName],
        namespace: moduleName,
    };
    return {
        create: useCrudMutation({
            mutationFn: service.create,
            action: 'create',
            ...commonConfig,
        }),
        update: useCrudMutation({
            mutationFn: service.update,
            action: 'update',
            ...commonConfig,
        }),
        delete: useCrudMutation({
            mutationFn: service.remove,
            action: 'delete',
            ...commonConfig,
        }),
    };
};
