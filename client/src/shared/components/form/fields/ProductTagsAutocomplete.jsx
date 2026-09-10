import { Chip, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

import { useProductTagsQuery } from '@/features/productTags/hooks/useProductTagsQuery';
import useLang from '@/hooks/i18n/useLang';
import FormikAutocomplete from '@/shared/components/form/FormikAutocomplete';

const ProductTagsAutocomplete = ({ containerSize, disabled } = {}) => {
    const { t } = useLang('productTags');
    const { data } = useProductTagsQuery();

    const options = data?.map((tag) => ({
        ...tag,
        name: t(`tag.${tag.name}`),
        type: t(`type.${tag.type}`),
    }));

    return (
        <FormikAutocomplete.Multiple
            name="productTags"
            options={options}
            groupBy={(option) => option.type}
            containerSize={containerSize}
            disabled={disabled}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => (
                <li {...props}>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ width: '100%', py: 0.25 }}
                    >
                        <Icon
                            icon={option.icon}
                            width={20}
                            style={{ color: option.color, flexShrink: 0 }}
                        />

                        <Typography variant="body2">{option.name}</Typography>
                    </Stack>
                </li>
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        key={option.id}
                        size="small"
                        label={option.name}
                        icon={
                            <Icon icon={option.icon} width={16} style={{ color: option.color }} />
                        }
                        sx={{
                            borderColor: option.color,
                            backgroundColor: `${option.color}15`,
                            color: option.color,
                            '& .MuiChip-icon': {
                                color: option.color,
                            },
                        }}
                        variant="outlined"
                    />
                ))
            }
        />
    );
};

export default ProductTagsAutocomplete;
