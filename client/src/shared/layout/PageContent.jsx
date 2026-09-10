import { Grid } from '@mui/system';

const renderNode = (item) => {
    const { id, component: Component, size = { xs: 12 }, children, ...rest } = item;

    return (
        <Grid key={id} size={size} {...rest}>
            {Component && <Component />}

            {children?.length > 0 && children.map(renderNode)}
        </Grid>
    );
};

const PageContent = ({ components = [], spacing = 6 }) => (
    <Grid container spacing={spacing}>
        {components.map(renderNode)}
    </Grid>
);

export default PageContent;
