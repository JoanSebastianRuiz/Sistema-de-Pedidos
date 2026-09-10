import { useMemo } from 'react';
import { useCountriesQuery } from '@/features/countries/hooks/useCountriesQuery';
import FormikAutocomplete from '@/shared/components/form/FormikAutocomplete';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import flags from 'country-flag-icons/react/3x2';
import FormikField from '../FormikField';

const PhoneCodeContent = ({ option }) => {
    const Flag = flags[option.iso2];

    return (
        <>
            {Flag && <Flag style={{ width: 20, height: 15, minWidth: 20 }} />}
            <Typography variant="body2">+{option.phoneCode}</Typography>
        </>
    );
};

const PhoneCodeOption = ({ option, ...props }) => (
    <Box
        component="li"
        {...props}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}
    >
        <PhoneCodeContent option={option} />
    </Box>
);

const PhoneCodeValue = ({ option }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneCodeContent option={option} />
        </Box>
    );
};

const PhoneField = ({ containerSize = 12, phoneCodeContainerSize = 5, phoneContainerSize = 7 }) => {
    const { data: countriesData = [] } = useCountriesQuery();

    const sortedCountries = useMemo(
        () => [...countriesData].sort((a, b) => a.phoneCode - b.phoneCode),
        [countriesData]
    );

    return (
        <Grid size={containerSize} container spacing={2}>
            <FormikAutocomplete
                name="phoneCode"
                changeKey="phoneCode"
                containerSize={phoneCodeContainerSize}
                options={sortedCountries}
                getOptionLabel={(opt) => `+${opt.phoneCode}`}
                getOptionKey={(opt) => opt.id}
                renderOption={(props, option) => <PhoneCodeOption {...props} option={option} />}
                renderValue={(opt) => <PhoneCodeValue option={opt} />}
                disableClearable
            />

            <FormikField.Pattern
                name="phone"
                containerSize={phoneContainerSize}
                format="### ### ####"
            />
        </Grid>
    );
};

export default PhoneField;
