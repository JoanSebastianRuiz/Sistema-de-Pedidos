import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryFilters = () => {
    const [searchParams] = useSearchParams();

    const filters = useMemo(() => {
        const result = {};

        for (const [key, value] of searchParams.entries()) {
            if (result[key] !== undefined) {
                result[key] = Array.isArray(result[key])
                    ? [...result[key], value]
                    : [result[key], value];
            } else {
                result[key] = value;
            }
        }

        return result;
    }, [searchParams]);

    return filters;
};

export default useQueryFilters;
