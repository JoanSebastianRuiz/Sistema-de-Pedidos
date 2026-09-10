import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import theme from './theme/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query/queryClient';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    const content = useRoutes(routes);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {content}
                </ThemeProvider>
            </QueryClientProvider>
        </LocalizationProvider>
    );
}

export default App;
