import React, { useContext } from 'react';
import StarContext from '../context/StarContext';
import '../styles/ShowFilters.css';

function ShowFilters() {
  const {
    filterByNumericValues,
    removeFilter,
    removeAllFilters,
  } = useContext(StarContext);

  return (
    filterByNumericValues.length > 1 && (
      <section className="filters-container">
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
                  <div>
                    <span>{`${column} ${comparison} ${value}`}</span>
                  </div>
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
            className="remove-all-filters"
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remover Filtros
          </button>
        </div>
      </section>
    )
  );
}

export default ShowFilters;
