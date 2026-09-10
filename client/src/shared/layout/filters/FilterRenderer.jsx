import AutocompleteFilter from './AutocompleteFilter';
import TextFilter from './TextFilter';

const renderers = {
    text: TextFilter,
    autocomplete: AutocompleteFilter,
};

const FilterRenderer = ({ definition, value, setFilter }) => {
    const Component = renderers[definition.type];

    if (!Component) return null;

    return <Component definition={definition} value={value} setFilter={setFilter} />;
};

export default FilterRenderer;
