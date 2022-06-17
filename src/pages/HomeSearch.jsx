import React from 'react';
import HeaderFilter from '../component/HeaderFilter';
import ShowFilters from '../component/ShowFilters';
import Table from '../component/Table';

function HomeSearch() {
  return (
    <>
      <header>
        <HeaderFilter />
      </header>
      <main>
        <ShowFilters />
        <Table />
      </main>
    </>
  );
}

export default HomeSearch;
