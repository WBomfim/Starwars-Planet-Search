import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function HeaderFilter() {
  const {
    filterByName,
    setFilterByName,
    filterByColumn,
    filterByNumericValues,
    setFilterByNumericValues,
    changeFilter,
  } = useContext(StarContext);

  const handleChangeSearch = ({ target }) => {
    setFilterByName({ [target.name]: target.value });
  };

  const handleChangeFilter = ({ target }) => {
    const filterValues = {
      ...filterByNumericValues[filterByNumericValues.length - 1],
      [target.name]: target.value,
    };
    filterByNumericValues.splice(filterByNumericValues.length - 1, 1, filterValues);
    setFilterByNumericValues([...filterByNumericValues]);
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
            value={ filterByNumericValues[filterByNumericValues.length - 1].column }
            onChange={ handleChangeFilter }
            data-testid="column-filter"
          >
            {filterByColumn.map(
              ({ filter }) => (<option key={ filter } value={ filter }>{filter}</option>),
            )}
          </select>
        </label>

        <label htmlFor="comparison">
          Coluna:
          <select
            id="comparison"
            name="comparison"
            value={ filterByNumericValues[filterByNumericValues.length - 1].comparison }
            onChange={ handleChangeFilter }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          type="number"
          placeholder="valor"
          name="value"
          value={ filterByNumericValues[filterByNumericValues.length - 1].value }
          onChange={ handleChangeFilter }
          data-testid="value-filter"
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ changeFilter }
        >
          Filtrar
        </button>
      </div>
    </header>
  );
}

export default HeaderFilter;
