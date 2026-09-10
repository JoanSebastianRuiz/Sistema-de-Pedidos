import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const defaultParse = (value, definition) => {
    if (value === null) {
        return definition.defaultValue ?? null;
    }

    if (definition.parse) {
        return definition.parse(value);
    }

    switch (definition.type) {
        case 'number':
            return Number(value);

        case 'boolean':
            return value === 'true';

        default:
            return value;
    }
};

const defaultFormat = (value, definition) => {
    if (definition.format) {
        return definition.format(value);
    }

    return String(value);
};

const parseFilters = (searchParams, definitions) => {
    return definitions.reduce((acc, definition) => {
        const { name, multiple } = definition;

        if (multiple) {
            const values = searchParams.getAll(name);

            acc[name] =
                values.length > 0
                    ? values.map((value) => defaultParse(value, definition))
                    : (definition.defaultValue ?? []);

            return acc;
        }

        acc[name] = defaultParse(searchParams.get(name), definition);

        return acc;
    }, {});
};

const buildQueryFilters = (filters) =>
    Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => {
            if (value === null || value === undefined || value === '') {
                return false;
            }

            if (Array.isArray(value)) {
                return value.length > 0;
            }

            return true;
        })
    );

export const useFilters = (definitions = []) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => parseFilters(searchParams, definitions),
        [searchParams, definitions]
    );

    const setFilter = useCallback(
        (name, value) => {
            const definition = definitions.find((d) => d.name === name);

            const params = new URLSearchParams(searchParams);

            params.delete(name);

            if (
                value === null ||
                value === undefined ||
                value === '' ||
                (Array.isArray(value) && value.length === 0)
            ) {
                setSearchParams(params);

                return;
            }

            if (Array.isArray(value)) {
                value.forEach((item) => params.append(name, defaultFormat(item, definition)));
            } else {
                params.set(name, defaultFormat(value, definition));
            }

            setSearchParams(params);
        },
        [definitions, searchParams, setSearchParams]
    );

    const removeFilter = useCallback(
        (name) => {
            const params = new URLSearchParams(searchParams);

            params.delete(name);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const resetFilters = useCallback(() => {
        setSearchParams({});
    }, [setSearchParams]);

    const queryFilters = useMemo(() => buildQueryFilters(filters), [filters]);

    const hasFilters = Object.keys(queryFilters).length > 0;

    return {
        filterDefinitions: definitions,

        filters,
        queryFilters,

        hasFilters,

        setFilter,
        removeFilter,
        resetFilters,
    };
};
