import { FormikProvider, useFormik } from 'formik';
import { Grid } from '@mui/system';
import { FormNamespaceProvider } from '@/shared/contexts/FormContext';
import FormikStepper from './FormikStepper';
import FormikFormCrud from './FormikFormCRUD';
import FormikDebug from './FormikDebug';

const FormikForm = ({ initialValues, validationSchema, onSubmit, namespace, debug, children }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <FormikProvider value={formik}>
            <FormNamespaceProvider namespace={namespace}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} size={12}>
                        {debug && <FormikDebug />}
                        {children}
                    </Grid>
                </form>
            </FormNamespaceProvider>
        </FormikProvider>
    );
};

FormikForm.Crud = FormikFormCrud;
FormikForm.Stepper = FormikStepper;

export default FormikForm;
