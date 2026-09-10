import useLang from '@/hooks/i18n/useLang';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

const ConfirmDialog = ({
    open,
    translationKeys = {},
    namespace,
    confirmColor,
    onCancel,
    onConfirm,
    disabledCancel,
    loadingConfirm,
}) => {
    const { t } = useLang(namespace);
    const { title, content, cancel = 'cancel', confirm = 'confirm' } = translationKeys;

    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs">
            <DialogTitle>{t(title)}</DialogTitle>

            <DialogContent>
                <Typography>{t(content)}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel} color="inherit" disabled={disabledCancel}>
                    {t(cancel)}
                </Button>

                <Button onClick={onConfirm} color={confirmColor} loading={loadingConfirm}>
                    {t(confirm)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
