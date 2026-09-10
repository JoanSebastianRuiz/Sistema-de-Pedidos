import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

import useLang from '@/hooks/i18n/useLang';
import { Grid } from '@mui/system';
import { useFormikContext } from 'formik';
import FormikButton from './FormikButton';
import FormikForm from './FormikForm';
import { get } from 'lodash';

const FormikStepperContent = ({ selectedElement, steps }) => {
    const { t } = useLang();
    const { validateForm, setTouched } = useFormikContext();
    const isUpdate = Boolean(selectedElement);
    const submitLabel = isUpdate ? 'update' : 'create';

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        const errors = await validateForm();

        const fieldsToValidate = steps[activeStep].validations?.filter(Boolean) ?? [];

        const stepErrors = fieldsToValidate.filter((field) => get(errors, field));

        if (stepErrors.length > 0) {
            setTouched(
                fieldsToValidate.reduce(
                    (acc, field) => ({
                        ...acc,
                        [field]: true,
                    }),
                    {}
                )
            );

            return;
        }

        setActiveStep((prev) => prev + 1);
    };

    return (
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '100%' }}>
            {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>

                    <StepContent>
                        {activeStep === index && (
                            <Grid container spacing={2} size={12} sx={{ mt: 2 }}>
                                {step.content}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        disabled={index === 0}
                                        onClick={() => setActiveStep((prev) => prev - 1)}
                                    >
                                        {t('previous')}
                                    </Button>

                                    {index === steps.length - 1 ? (
                                        <FormikButton
                                            size={null}
                                            labelKey={submitLabel}
                                            sx={{ width: 'fit-content' }}
                                        />
                                    ) : (
                                        <Button variant="contained" onClick={handleNext}>
                                            {t('next')}
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        )}
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
};

const FormikStepper = ({ state, steps, ...props }) => {
    const { selected: selectedElement } = state || {};
    return (
        <FormikForm.Crud {...props} state={state} showSubmitButton={false}>
            <FormikStepperContent selectedElement={selectedElement} steps={steps} />
        </FormikForm.Crud>
    );
};

export default FormikStepper;
