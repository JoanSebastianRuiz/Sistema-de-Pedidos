import { useEffect, useMemo } from 'react';
import FormikButton from './FormikButton';
import FormikForm from './FormikForm';
import Loading from '../Loading';

const FormikFormCrud = ({
    mutations,
    validationSchema,
    initialValues: initialValuesProp,
    transformers,
    state,
    actions,
    showSubmitButton = true,
    loading,
    children,
    ...props
}) => {
    const { selected: selectedElement } = state || {};
    const isUpdate = Boolean(selectedElement);
    const label = isUpdate ? 'update' : 'create';
    const { create, update } = mutations;
    const { mutateAsync: mutateCreateAsync } = create;
    const { mutateAsync: mutateUpdateAsync } = update;
    const { updateValues, normalizeValues } = transformers || {};
    const { onAfterSubmit } = actions || {};

    const initialValues = useMemo(() => {
        if (isUpdate) {
            return updateValues ? updateValues(selectedElement) : selectedElement;
        } else {
            return initialValuesProp;
        }
    }, [isUpdate, selectedElement, initialValuesProp, updateValues]);

    const onSubmit = async (values) => {
        const normalizedValues = normalizeValues ? normalizeValues(values) : values;
        if (isUpdate) {
            await mutateUpdateAsync(normalizedValues);
        } else {
            await mutateCreateAsync(normalizedValues);
        }
        if (onAfterSubmit) {
            onAfterSubmit();
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <FormikForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            {...props}
        >
            {children}
            {showSubmitButton && <FormikButton labelKey={label} />}
        </FormikForm>
    );
};

export default FormikFormCrud;
