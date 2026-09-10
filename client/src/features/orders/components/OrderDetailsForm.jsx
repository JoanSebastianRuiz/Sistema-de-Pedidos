import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FieldArray, useFormikContext } from 'formik';
import { useProductsQuery } from '@/features/products/hooks/useProductsQuery';
import FormikField from '@/shared/components/form/FormikField';
import FormikAutocomplete from '@/shared/components/form/FormikAutocomplete';
import { Grid } from '@mui/system';
import useLang from '@/hooks/i18n/useLang';

const Item = ({ index, remove }) => {
    const { values, setFieldValue } = useFormikContext();
    const { data: productsData = [] } = useProductsQuery();

    const item = values.orderDetails[index];

    const getOptionDisabled = (option) => {
        return values.orderDetails.some(
            (detail, i) =>
                (i !== index && detail.productId === option.id) || option.isActive === false
        );
    };

    const onProductChange = (e, value) => {
        setFieldValue(`orderDetails.${index}.productId`, value ? value.id : '');
        if (value?.id && values.orderDetails[index].quantity) {
            const subtotal = value.price * values.orderDetails[index].quantity;
            setFieldValue(`orderDetails.${index}.subtotal`, subtotal);
        } else {
            setFieldValue(`orderDetails.${index}.subtotal`, 0);
        }
    };

    const onQuantityChange = (values) => {
        const value =
            values.value === '' ? '' : Number(values.value) > 0 ? Number(values.value) : 1;
        setFieldValue(`orderDetails.${index}.quantity`, value);
        if (item.productId) {
            const product = productsData.find((p) => p.id === item.productId);
            if (product) {
                const subtotal = product.price * value;
                setFieldValue(`orderDetails.${index}.subtotal`, subtotal);
            }
        }
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                pt: 2,
                px: 2,
                width: '100%',
            }}
        >
            <Grid
                container
                spacing={1}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
            >
                <FormikAutocomplete
                    name={`orderDetails.${index}.productId`}
                    label="product"
                    size="small"
                    options={productsData}
                    containerSize={{ xs: 12 }}
                    getOptionDisabled={getOptionDisabled}
                    onChange={onProductChange}
                />

                <FormikField.Number
                    name={`orderDetails.${index}.quantity`}
                    label="quantity"
                    size="small"
                    containerSize={{ xs: 12, sm: 4 }}
                    numericProps={{
                        onValueChange: onQuantityChange,
                    }}
                />

                <FormikField.Number
                    name={`orderDetails.${index}.subtotal`}
                    label="subtotal"
                    size="small"
                    containerSize={{ xs: 12, sm: 6 }}
                    disabled
                />

                <Grid
                    size={{ xs: 12, sm: 2 }}
                    sx={{ pb: { xs: 0, sm: 3 }, display: 'flex', justifyContent: 'center' }}
                >
                    <IconButton color="error" onClick={() => remove(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

const OrderDetailsForm = () => {
    const { t } = useLang('orders');
    const { values } = useFormikContext();

    const total = values.orderDetails.reduce((acc, item) => acc + (item.subtotal || 0), 0);

    return (
        <FieldArray name="orderDetails">
            {({ push, remove }) => (
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">{`${t('products')} ($${total.toLocaleString()})`}</Typography>

                        <IconButton
                            color="primary"
                            onClick={() => push({ productId: '', quantity: 1 })}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>

                    {values.orderDetails?.map((_, index) => (
                        <Item key={index} index={index} remove={remove} />
                    ))}
                </Stack>
            )}
        </FieldArray>
    );
};

export default OrderDetailsForm;
