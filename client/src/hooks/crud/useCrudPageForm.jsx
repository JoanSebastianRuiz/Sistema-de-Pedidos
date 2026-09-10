import crudRegistry from '@/crud/crudRegistry';
import { useCrudMutations } from './useCrudMutations';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const useCrudPageForm = ({ moduleName, selectedId }) => {
    const navigate = useNavigate();
    const config = crudRegistry[moduleName];
    const crudMutations = useCrudMutations(config.service, moduleName);

    const { useQuery, useSchema } = config;

    const validationSchema = useSchema();
    const queryResult = useQuery();
    const data = queryResult.data || [];

    const selected = useMemo(() => {
        if (selectedId) {
            return data.find((item) => item.id === selectedId);
        }
        return null;
    }, [data, selectedId]);

    const onAfterSubmit = () => {
        navigate(config.routes.list);
    };

    const permissions = {
        create: config.permissions?.CREATE.key,
        update: config.permissions?.UPDATE.key,
        delete: config.permissions?.DELETE.key,
    };

    return {
        data,
        validationSchema,
        namespace: moduleName,
        loading: queryResult.isLoading,
        initialValues: config.initialValues,
        mutations: crudMutations,
        transformers: config.transformers,
        permissions,

        state: {
            selected,
        },

        actions: {
            onAfterSubmit,
        },
    };
};

export default useCrudPageForm;
