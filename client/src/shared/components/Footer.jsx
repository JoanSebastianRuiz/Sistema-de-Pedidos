import useLang from '@/hooks/i18n/useLang';
import { useTheme } from '@emotion/react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { FOOTER_HEIGHT, SIDEBAR_WIDTH } from '../utils/constants';

const Footer = () => {
    const { t } = useLang();
    const theme = useTheme();
    const text = `© ${new Date().getFullYear()} ${import.meta.env.VITE_PROJECT_NAME}. ${t('rightsReserved')}`;
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: theme.palette.primary.main,
                py: 2,
                px: 3,
                ml: { xs: 0, lg: `${SIDEBAR_WIDTH}px` },
                height: FOOTER_HEIGHT,
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
