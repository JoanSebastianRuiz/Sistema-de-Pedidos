import { useSnackbarStore } from '@/store/snackbar.store';
import { Alert, Snackbar } from '@mui/material';

const GlobalSnackbar = () => {
    const { open, message, severity, closeSnackbar } = useSnackbarStore();

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={closeSnackbar}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Alert
                severity={severity}
                variant="filled"
                onClose={closeSnackbar}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
