import OrderDetailsForm from './OrderDetailsForm';
import FormikForm from '@/shared/components/form/FormikForm';

const OrdersForm = (props) => {
    return (
        <FormikForm.Crud {...props}>
            <OrderDetailsForm />
        </FormikForm.Crud>
    );
};

export default OrdersForm;
