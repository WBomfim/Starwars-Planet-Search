import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import getPlanets from '../services/fetchPlanetsAPI';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const INITIAL_COLUMN_OPTIONS = [
    { filter: 'population', id: 1 },
    { filter: 'orbital_period', id: 2 },
    { filter: 'diameter', id: 3 },
    { filter: 'rotation_period', id: 4 },
    { filter: 'surface_water', id: 5 },
  ];
  const [filterByColumn, setFilterByColumn] = useState(INITIAL_COLUMN_OPTIONS);

  const INITIAL_FILTER = [
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  ];
  const [filterByNumericValues, setFilterByNumericValues] = useState(INITIAL_FILTER);

  const INITIAL_ORDER_OPTIONS = {
    column: 'population',
    order: 'ASC',
  };
  const [order, setOrder] = useState(INITIAL_ORDER_OPTIONS);

  useEffect(() => {
    const fetchPlanets = async () => {
      const dataPlanets = await getPlanets();
      const returnInSort = -1;
      const InitialOrder = dataPlanets
        .sort((a, b) => (a.name > b.name ? 1 : returnInSort));

      setData([...InitialOrder]);
      setFilteredPlanets([...InitialOrder]);
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const filterPlanetsName = () => {
      const filterPlanets = data
        .filter((planet) => planet.name.toLowerCase()
          .includes(filterByName.name.toLowerCase()));
      setFilteredPlanets([...filterPlanets]);
    };

    filterPlanetsName();
  }, [filterByName, data]);

  const filterBySelectValues = (index, array = filteredPlanets) => {
    const filterPlanets = array.filter((planet) => {
      const column = planet[filterByNumericValues[index].column];
      const { comparison } = filterByNumericValues[index];
      const { value } = filterByNumericValues[index];
      if (comparison === 'maior que') {
        return Number(column) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(column) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(column) === Number(value);
      }
      return column;
    });

    return filterPlanets;
  };

  const addFilterByValuesInputs = () => {
    filterByNumericValues.splice(
      filterByNumericValues.length - 1,
      0,
      filterByNumericValues[filterByNumericValues.length - 1],
    );

    setFilterByNumericValues([...filterByNumericValues]);
  };

  const removeOptionFilterByColumn = () => {
    const filterColumnOptions = filterByColumn.filter((filter) => (
      filter.filter !== filterByNumericValues[filterByNumericValues.length - 1].column));
    setFilterByColumn([...filterColumnOptions].sort((a, b) => a.id - b.id));

    const filterValue = filterColumnOptions.length === 0 ? ''
      : filterColumnOptions[0].filter;
    const filterValues = {
      column: filterValue,
      comparison: 'maior que',
      value: 0,
    };
    filterByNumericValues.splice(filterByNumericValues.length - 1, 1, filterValues);

    setFilterByNumericValues([...filterByNumericValues]);
  };

  const addFilter = () => {
    if (filterByColumn.length > 0) {
      const filter = filterBySelectValues(filterByNumericValues.length - 1);
      setFilteredPlanets([...filter]);
      addFilterByValuesInputs();
      removeOptionFilterByColumn();
    }
  };

  const removeFilter = ({ target: { id } }) => {
    let filterAcc = [...data];
    filterByNumericValues.forEach((filter, index) => {
      if (filter.column !== id && index < filterByNumericValues.length - 1) {
        const filtered = filterBySelectValues(index, filterAcc);
        filterAcc = [...filtered];
      }
    });
    setFilteredPlanets([...filterAcc]);

    const setFilterByColumnOptions = INITIAL_COLUMN_OPTIONS
      .find((filter) => (filter.filter === id));
    setFilterByColumn(
      [...filterByColumn, setFilterByColumnOptions].sort((a, b) => a.id - b.id),
    );

    const newFilterByNumericValues = filterByNumericValues
      .filter((filter) => (filter.column !== id && filter.column !== ''));

    if (filterByNumericValues.length === 6) {
      const filterValues = {
        column: id,
        comparison: 'maior que',
        value: 0,
      };
      newFilterByNumericValues.splice(filterByNumericValues.length, 1, filterValues);
    }

    setFilterByNumericValues([...newFilterByNumericValues]);
  };

  const removeAllFilters = () => {
    setFilteredPlanets([...data]);
    setFilterByNumericValues(INITIAL_FILTER);
    setFilterByColumn(INITIAL_COLUMN_OPTIONS);
  };

  const handleOrder = () => {
    const unknownElement = filteredPlanets
      .filter((planet) => planet[order.column] === 'unknown');
    const knownElement = filteredPlanets
      .filter((planet) => planet[order.column] !== 'unknown');
    const filterForSorted = [...knownElement, ...unknownElement];

    const planetsOrder = filterForSorted.sort((a, b) => {
      const columnA = a[order.column];
      const columnB = b[order.column];
      if (order.order === 'ASC') {
        return columnA - columnB;
      }
      return columnB - columnA;
    });
    setFilteredPlanets([...planetsOrder]);
  };

  const context = {
    filteredPlanets,

    filterByName,
    setFilterByName,

    filterByColumn,

    filterByNumericValues,
    setFilterByNumericValues,

    order,
    setOrder,

    addFilter,
    removeFilter,
    removeAllFilters,
    handleOrder,
  };

  return (
    <StarContext.Provider value={ context }>
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
