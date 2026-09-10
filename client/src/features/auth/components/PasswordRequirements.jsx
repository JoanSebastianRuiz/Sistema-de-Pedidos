import { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import useLang from '@/hooks/i18n/useLang';

const PasswordRequirements = ({ passwordKey = 'password' } = {}) => {
    const { t } = useLang();
    const { values } = useFormikContext();

    const password = values[passwordKey] || '';

    const validations = [
        {
            label: 'passwordRequirements.minLength',
            valid: password.length >= 8,
        },
        {
            label: 'passwordRequirements.mustContainLowercase',
            valid: /[a-z]/.test(password),
        },
        {
            label: 'passwordRequirements.mustContainUppercase',
            valid: /[A-Z]/.test(password),
        },
        {
            label: 'passwordRequirements.mustContainNumber',
            valid: /\d/.test(password),
        },
        {
            label: 'passwordRequirements.mustContainSpecialCharacter',
            valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        },
    ];

    const score = validations.filter((v) => v.valid).length;

    const strength = useMemo(() => {
        if (!password) {
            return {
                label: 'passwordStrength.withoutPassword',
                color: 'inherit',
                value: 0,
            };
        }

        if (score <= 2) {
            return {
                label: 'passwordStrength.weak',
                color: 'error.main',
                value: 25,
            };
        }

        if (score === 3) {
            return {
                label: 'passwordStrength.medium',
                color: 'warning.main',
                value: 50,
            };
        }

        if (score === 4) {
            return {
                label: 'passwordStrength.strong',
                color: 'info.main',
                value: 75,
            };
        }

        return {
            label: 'passwordStrength.veryStrong',
            color: 'success.main',
            value: 100,
        };
    }, [password, score]);

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                maxWidth: 400,
                borderRadius: 1,
                width: '100%',
                mb: 2,
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                    >
                        <Typography variant="subtitle2" fontWeight="bold">
                            {t('passwordStrength.label')}
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                                color: strength.color,
                            }}
                        >
                            {t(strength.label)}
                        </Typography>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={strength.value}
                        color={
                            score <= 2
                                ? 'error'
                                : score === 3
                                  ? 'warning'
                                  : score === 4
                                    ? 'info'
                                    : 'success'
                        }
                        sx={{
                            height: 8,
                            borderRadius: 1,
                        }}
                    />
                </Box>

                <Stack spacing={1}>
                    {validations.map((item) => (
                        <Stack key={item.label} direction="row" spacing={1} alignItems="center">
                            {item.valid ? (
                                <CheckCircleOutline color="success" fontSize="small" />
                            ) : (
                                <RadioButtonUnchecked color="disabled" fontSize="small" />
                            )}

                            <Typography
                                variant="body2"
                                color={item.valid ? 'success' : 'textSecondary'}
                            >
                                {t(item.label)}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default PasswordRequirements;
