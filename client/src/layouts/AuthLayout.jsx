import GlobalSnackbar from '@/shared/components/GlobalSnackbar';
import NavbarLanguage from '@/shared/components/navbar/NavbarLanguage';
import { Box, CardMedia, Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                }}
            >
                <NavbarLanguage />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        maxWidth: 420,
                        p: { xs: 3, sm: 5 },
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            src="/static/img/logo/logo.svg"
                            alt="Logo"
                            sx={{
                                height: 70,
                                width: 'auto',
                                ':hover': {
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={() => navigate('/')}
                        />
                    </Box>

                    <Outlet />
                </Paper>
            </Box>

            <GlobalSnackbar />
        </Box>
    );
};

export default AuthLayout;
