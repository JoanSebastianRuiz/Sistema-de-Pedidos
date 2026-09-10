import { createContext, useContext } from 'react';

const FormContext = createContext(null);

export const useForm = () => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error('useForm must be used within a FormNamespaceProvider.');
    }

    return context;
};

export const FormNamespaceProvider = ({ namespace, children }) => {
    return <FormContext.Provider value={{ namespace }}>{children}</FormContext.Provider>;
};
