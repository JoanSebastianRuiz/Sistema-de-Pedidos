import { forwardRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LinkWithSearch = forwardRef(({ to, ...props }, ref) => {
    const { search } = useLocation();

    return (
        <NavLink
            ref={ref}
            to={
                typeof to === 'string'
                    ? { pathname: to, search }
                    : { ...to, search: to.search ?? search }
            }
            {...props}
        />
    );
});

export default LinkWithSearch;
