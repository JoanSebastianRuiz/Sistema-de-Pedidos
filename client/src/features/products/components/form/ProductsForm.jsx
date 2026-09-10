import FormikField from '@/shared/components/form/FormikField';
import FormikForm from '@/shared/components/form/FormikForm';

const ProductsForm = (props) => {
    return (
        <FormikForm.Crud {...props}>
            <FormikField name="name" />

            <FormikField.Number name="price" numericProps={{ prefix: '$' }} />

            <FormikField name="description" rows={3} />
        </FormikForm.Crud>
    );
};

export default ProductsForm;
