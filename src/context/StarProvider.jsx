import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import getPlanets from '../services/fetchPlanetsAPI';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const FILTER_COLUMN_OPTIONS = [
    { filter: 'population', id: 1 },
    { filter: 'orbital_period', id: 2 },
    { filter: 'diameter', id: 3 },
    { filter: 'rotation_period', id: 4 },
    { filter: 'surface_water', id: 5 },
  ];
  const [filterByColumn, setFilterByColumn] = useState(FILTER_COLUMN_OPTIONS);

  const INITIAL_FILTER_VALUES = [
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  ];
  const [
    filterByNumericValues,
    setFilterByNumericValues,
  ] = useState(INITIAL_FILTER_VALUES);

  useEffect(() => {
    const fetchPlanets = async () => {
      const dataPlanets = await getPlanets();
      setData([...dataPlanets]);
      setFilteredPlanets([...dataPlanets]);
    };

    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const filterByValuesInputs = (index) => {
    const filterPlanets = filteredPlanets.filter((planet) => {
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

    setFilteredPlanets([...filterPlanets]);
  };

  const addFilterByValuesInputs = () => {
    filterByNumericValues.splice(
      filterByNumericValues.length - 1,
      0,
      filterByNumericValues[filterByNumericValues.length - 1],
    );
    setFilterByNumericValues([...filterByNumericValues]);
  };

  const removeFilterColumnOptions = () => {
    const filterColumnOptions = filterByColumn.filter((filter) => (
      filter.filter !== filterByNumericValues[filterByNumericValues.length - 1].column))
      .sort((a, b) => a.id - b.id);
    setFilterByColumn([...filterColumnOptions]);

    const filterValue = filterColumnOptions.length === 0 ? ''
      : filterColumnOptions[0].filter;
    const filterValues = {
      ...filterByNumericValues[filterByNumericValues.length - 1],
      column: filterValue,
    };
    filterByNumericValues.splice(filterByNumericValues.length - 1, 1, filterValues);
    setFilterByNumericValues([...filterByNumericValues]);
  };

  const changeFilter = () => {
    if (filterByColumn.length > 0) {
      if (filterByNumericValues.length > 1) {
        setFilteredPlanets([...data]);
        filterByNumericValues.forEach((_filter, index) => {
          filterByValuesInputs(index);
        });
      } else {
        filterByValuesInputs(0);
      }
      addFilterByValuesInputs();
      removeFilterColumnOptions();
    }
  };

  const context = {
    data,
    setData,

    filteredPlanets,
    setFilteredPlanets,

    filterByName,
    setFilterByName,

    filterByColumn,
    setFilterByColumn,

    filterByNumericValues,
    setFilterByNumericValues,

    changeFilter,
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
