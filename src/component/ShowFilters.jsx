import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function ShowFilters() {
  const {
    filterByNumericValues,
    removeFilterByValuesInputs,
    removeAllFilters,
  } = useContext(StarContext);

  return (
    <section>
      <div>
        <h2>Filtros:</h2>
      </div>
      <div>
        <ul>
          {filterByNumericValues.map((filter, index) => (
            index === filterByNumericValues.length - 1 ? null : (
              <li
                key={ index }
                id={ filter.column }
                data-testid="filter"
              >
                <span>{`${filter.column} ${filter.comparison} ${filter.value}`}</span>
                <button
                  type="button"
                  onClick={ (event) => removeFilterByValuesInputs(event) }
                >
                  X
                </button>
              </li>
            )))}
        </ul>
      </div>
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filtros
        </button>
      </div>
    </section>
  );
}

export default ShowFilters;
