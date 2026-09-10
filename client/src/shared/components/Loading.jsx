import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/system';

const Loading = () => {
    return (
        <Grid
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: '100%',
            }}
        >
            <CircularProgress />
        </Grid>
    );
};

export default Loading;
