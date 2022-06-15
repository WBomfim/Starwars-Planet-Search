import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function HeaderFilter() {
  const {
    filterByName,
    setFilterByName,
    filterByColumn,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(StarContext);

  const handleChangeSearch = ({ target }) => {
    setFilterByName({ [target.name]: target.value });
  };

  const handleChangeFilter = ({ target }) => {
    setFilterByNumericValues([{
      ...filterByNumericValues[0],
      [target.name]: target.value,
    }]);
  };

  return (
    <header className="header-filter">
      <h1>Trybe - Star Wars</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Nome do planeta"
          name="name"
          value={ filterByName.name }
          onChange={ handleChangeSearch }
          data-testid="name-filter"
        />
      </div>
      <div className="header-filter-content">
        <label htmlFor="column">
          Coluna:
          <select
            id="column"
            name="column"
            value={ filterByNumericValues.column }
            onChange={ handleChangeFilter }
            data-testid="column-filter"
          >
            {filterByColumn.map(
              (column) => (<option key={ column } value={ column }>{column}</option>),
            )}
          </select>
        </label>

        <label htmlFor="comparison">
          Coluna:
          <select
            id="comparison"
            name="comparison"
            value={ filterByNumericValues.comparison }
            onChange={ handleChangeFilter }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="valor"
          name="value"
          value={ filterByNumericValues.value }
          onChange={ handleChangeFilter }
          data-testid="name-filter"
        />

        <button
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </div>
    </header>
  );
}

export default HeaderFilter;
