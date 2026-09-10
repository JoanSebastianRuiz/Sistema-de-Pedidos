import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useLang from '@/hooks/i18n/useLang';

const FormDrawer = ({
    state,
    namespace,
    titles,
    form: Form,
    initialValues,
    validationSchema,
    mutations,
    actions,
    transformers,
}) => {
    const { t } = useLang(namespace);
    const { onClose } = actions;
    const { open, selected: selectedElement } = state;
    const isUpdate = Boolean(selectedElement);

    const titleKey = isUpdate ? titles.update : titles.create;
    const title = t(titleKey);

    return (
        <Drawer anchor="right" open={open} onClose={onClose} keepMounted={false}>
            <Box
                sx={{
                    width: { xs: '100vw', sm: 420 },
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">{title}</Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Form
                    state={state}
                    namespace={namespace}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    mutations={mutations}
                    transformers={transformers}
                    actions={actions}
                />
            </Box>
        </Drawer>
    );
};

export default FormDrawer;
