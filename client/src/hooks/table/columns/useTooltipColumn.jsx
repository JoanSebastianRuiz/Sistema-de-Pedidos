import { Tooltip, Typography } from '@mui/material';
import { Grid } from '@mui/system';

const useTooltipColumn = ({ field }) => {
    const renderCell = ({ value }) => (
        <Tooltip title={value || ''} arrow>
            <Grid container alignItems="center" sx={{ width: '100%', height: '100%' }}>
                <Typography
                    variant="body2"
                    noWrap
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                    }}
                >
                    {value}
                </Typography>
            </Grid>
        </Tooltip>
    );

    return {
        field,
        renderCell,
    };
};

export default useTooltipColumn;
