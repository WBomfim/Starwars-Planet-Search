import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import getPlanets from '../services/fetchPlanetsAPI';

function StarProvider({ children }) {
  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    const fetchStar = async () => {
      const data = await getPlanets();
      setState({
        ...state,
        data,
      });
    };

    fetchStar();
  }, []);

  const context = {
    ...state,
    setState,
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
