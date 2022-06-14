import React from 'react';

function HeaderFilter() {
  return (
    <header className="header-filter">
      <h1>Trybe - Star Wars</h1>
      <div className="search">
        <input type="text" placeholder="Search" />
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
