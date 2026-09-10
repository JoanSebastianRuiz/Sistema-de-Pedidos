import { parsePhoneNumberFromString } from 'libphonenumber-js';
import flags from 'country-flag-icons/react/3x2';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

const usePhoneColumn = () => {
    const renderCell = ({ row }) => {
        const formattedPhone = parsePhoneNumberFromString(row.phone || '');

        const phoneCode = formattedPhone?.countryCallingCode;
        const phone = formattedPhone?.formatNational();
        const Flag = flags[formattedPhone?.country || ''];

        if (!phoneCode || !phone) return row.phone || '';

        return (
            <Stack
                direction="row"
                spacing={1}
                sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}
            >
                {Flag && (
                    <Flag
                        style={{
                            width: 20,
                            height: 15,
                            minWidth: 20,
                        }}
                    />
                )}

                <Typography variant="body2" color="text.secondary" fontWeight="bold">
                    +{phoneCode}
                </Typography>

                <Typography variant="body2">{phone}</Typography>
            </Stack>
        );
    };

    return {
        field: 'phone',
        renderCell,
        minWidth: 180,
    };
};

export default usePhoneColumn;
