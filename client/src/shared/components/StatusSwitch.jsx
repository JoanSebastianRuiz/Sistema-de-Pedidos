import { styled, Switch } from '@mui/material';

const StatusSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    transform: 'scale(0.9)',
    transformOrigin: 'center',

    width: 42,
    height: 26,
    padding: 0,

    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',

        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',

            '& .MuiSwitch-thumb::before': {
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='white' d='M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'/></svg>")`,
            },

            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.success.main,
                opacity: 1,
                border: 0,
            },

            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },

        '&.Mui-focusVisible .MuiSwitch-thumb': {
            border: '4px solid #fff',
        },

        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },

        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
    },

    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        position: 'relative',

        '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '12px',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='white' d='M18.3 5.71 12 12.01 5.7 5.71 4.29 7.12l6.3 6.29-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z'/></svg>")`,
        },
    },

    '& .MuiSwitch-track': {
        borderRadius: 13,
        backgroundColor: theme.palette.grey[400],
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default StatusSwitch;
