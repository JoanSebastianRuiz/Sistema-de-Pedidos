import { useFormikContext } from 'formik';
import { PatternFormat } from 'react-number-format';
import { getIn } from 'formik';

import FormikField from './FormikField';

const FormikPattern = ({ name, numericProps = {}, ...props }) => {
    const formik = useFormikContext();

    return (
        <PatternFormat
            customInput={FormikField}
            name={name}
            value={getIn(formik.values, name) ?? ''}
            onValueChange={(values) => {
                formik.setFieldValue(name, values.value);
            }}
            onBlur={() => formik.setFieldTouched(name, true)}
            {...numericProps}
            {...props}
        />
    );
};

export default FormikPattern;
