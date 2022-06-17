import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function ShowFilters() {
  const {
    filterByNumericValues,
    removeFilter,
    removeAllFilters,
  } = useContext(StarContext);

  return (
    <section>
      <div>
        <h2>Filtros:</h2>
      </div>
      <div>
        <ul>
          {filterByNumericValues.map(({ column, comparison, value }, index) => (
            index === filterByNumericValues.length - 1 ? null : (
              <li
                key={ index }
                data-testid="filter"
              >
                <span>{`${column} ${comparison} ${value}`}</span>
                <button
                  type="button"
                  id={ column }
                  onClick={ (event) => removeFilter(event) }
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
