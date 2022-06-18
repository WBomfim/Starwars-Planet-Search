import React, { useContext } from 'react';
import StarContext from '../context/StarContext';
import '../styles/HeaderFilter.css';

function HeaderFilter() {
  const {
    filterByName,
    setFilterByName,
    filterByColumn,
    filterByNumericValues,
    setFilterByNumericValues,
    order,
    setOrder,
    addFilter,
    handleOrder,
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

  const handleChangeOrder = ({ target }) => {
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  return (
    <>
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
        <label className="label-select" htmlFor="column_filter">
          Coluna:
          <select
            id="column_filter"
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

        <label className="label-select" htmlFor="comparison">
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
          className="button-filter"
          type="button"
          data-testid="button-filter"
          onClick={ addFilter }
        >
          Filtrar
        </button>

        <label className="label-select" htmlFor="column_order">
          Ordenar:
          <select
            id="column_order"
            name="column"
            value={ order.column }
            onChange={ handleChangeOrder }
            data-testid="column-sort"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <div className="radios-select">
          <label className="lable-radio" htmlFor="order-ASC">
            <input
              className="radio-button"
              type="radio"
              id="order-ASC"
              name="order"
              value="ASC"
              checked={ order.order === 'ASC' }
              onChange={ handleChangeOrder }
              data-testid="column-sort-input-asc"
            />
            Ascendente
          </label>

          <label className="lable-radio" htmlFor="order-DESC">
            <input
              className="radio-button"
              type="radio"
              id="order-DESC"
              name="order"
              value="DESC"
              checked={ order.order === 'DESC' }
              onChange={ handleChangeOrder }
              data-testid="column-sort-input-desc"
            />
            Descendente
          </label>
        </div>

        <button
          type="button"
          onClick={ handleOrder }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </div>
    </>
  );
}

export default HeaderFilter;
