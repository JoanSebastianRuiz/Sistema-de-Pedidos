import useLang from '@/hooks/i18n/useLang';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import LinkWithSearch from '../components/navigate/LinkWithSearch';

const BreadcrumbItem = ({ label, path }) => {
    return path ? (
        <Link
            component={LinkWithSearch}
            to={path}
            sx={{
                textDecoration: 'none',
                border: 'none',
                '&:hover': {
                    textDecoration: 'none',
                },
                '&.active': {
                    textDecoration: 'none',
                },
            }}
        >
            {label}
        </Link>
    ) : (
        <Typography color="textSecondary">{label}</Typography>
    );
};

const CustomBreadcrumbs = ({ maxItems = 3, breadcrumbs = [], namespace }) => {
    const { t, i18n } = useLang(namespace);
    return (
        <Breadcrumbs maxItems={maxItems} separator={<NavigateNext fontSize="small" />}>
            {breadcrumbs?.filter(Boolean).map(({ id, label, path }) => {
                const formattedLabel = i18n.exists(label, { ns: namespace }) ? t(label) : label;
                return <BreadcrumbItem key={id} id={id} label={formattedLabel} path={path} />;
            })}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
