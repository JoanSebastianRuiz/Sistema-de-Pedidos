import { useFormikContext, getIn } from 'formik';
import { NumericFormat } from 'react-number-format';

import FormikField from './FormikField';

const FormikNumber = ({ name, numericProps = {}, ...props }) => {
    const formik = useFormikContext();

    return (
        <NumericFormat
            customInput={FormikField}
            name={name}
            value={getIn(formik.values, name) ?? ''}
            onValueChange={(values) => {
                formik.setFieldValue(name, values.value === '' ? '' : Number(values.value));
            }}
            onBlur={() => formik.setFieldTouched(name, true)}
            decimalScale={0}
            fixedDecimalScale
            allowNegative={false}
            thousandSeparator
            {...numericProps}
            {...props}
        />
    );
};

export default FormikNumber;
