import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithSearch = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    return (to, options = {}) => {
        navigate(
            typeof to === 'string' ? `${to}${search}` : { ...to, search: to.search ?? search },
            options
        );
    };
};

export default useNavigateWithSearch;
