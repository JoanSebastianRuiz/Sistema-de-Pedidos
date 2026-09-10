const modules = import.meta.glob('./registry/**/*.js', {
    eager: true,
});

const crudRegistry = Object.entries(modules).reduce((acc, [path, module]) => {
    const moduleConfig = module.default;
    if (!moduleConfig) {
        return acc;
    }

    const match = path.match(/\/([^/.]+)\./);
    const moduleName = match ? match[1] : null;
    if (!moduleName) {
        return acc;
    }

    acc[moduleName] = moduleConfig;
    return acc;
}, {});

export default crudRegistry;
