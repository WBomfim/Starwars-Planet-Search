import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function HeaderFilter() {
  const { filterByName, setFilterByName } = useContext(StarContext);

  const handleChangeName = ({ target }) => {
    setFilterByName({ [target.name]: target.value });
  };

  return (
    <header className="header-filter">
      <h1>Trybe - Star Wars</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          name="name"
          value={ filterByName.name }
          onChange={ handleChangeName }
          data-testid="name-filter"
        />
      </div>
      <div className="header-filter-content">
        <button
          type="button"
        >
          Filtrar
        </button>
      </div>
    </header>
  );
}

export default HeaderFilter;
