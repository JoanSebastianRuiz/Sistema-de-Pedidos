const components = {
    MuiCssBaseline: {
        styleOverrides: `
            html {
                scrollbar-width: thin;
                scrollbar-color: #475569 #0f172a;
            }

            *::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            *::-webkit-scrollbar-track {
                background: #0f172a;
            }

            *::-webkit-scrollbar-thumb {
                background-color: #475569;
                border-radius: 999px;
                border: 2px solid #0f172a;
            }

            *::-webkit-scrollbar-thumb:hover {
                background-color: #64748b;
            }
        `,
    },
};

export default components;
