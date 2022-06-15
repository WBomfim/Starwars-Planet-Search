import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import getPlanets from '../services/fetchPlanetsAPI';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const FILTER_COLUMN_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
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

  const filterByValuesInputs = () => {
    const filterPlanets = filteredPlanets.filter((planet) => {
      const column = planet[filterByNumericValues[0].column];
      const { comparison } = filterByNumericValues[0];
      const { value } = filterByNumericValues[0];
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

    filterByValuesInputs,
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
