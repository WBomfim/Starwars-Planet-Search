import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [star, setStar] = useState(0);

  return (
    <StarContext.Provider value={ { star, setStar } }>
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
