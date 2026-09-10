import FormikAutocomplete from '@/shared/components/form/FormikAutocomplete';

const RestaurantAutocomplete = ({ containerSize, disabled } = {}) => {
    /* const { data: restaurantsData = [] } = useRestaurantsQuery();
    const options = restaurantsData.filter((restaurant) => restaurant.isActive); */

    return (
        <FormikAutocomplete
            name="restaurantId"
            label="restaurant"
            /* options={options} */
            containerSize={containerSize}
            disabled={disabled}
        />
    );
};

export default RestaurantAutocomplete;
