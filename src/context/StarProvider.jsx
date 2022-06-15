import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import getPlanets from '../services/fetchPlanetsAPI';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

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

  const context = {
    data,
    setData,

    filteredPlanets,
    setFilteredPlanets,

    filterByName,
    setFilterByName,
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
