import React from 'react';
import HeaderFilter from '../component/HeaderFilter';
import ShowFilters from '../component/ShowFilters';
import Table from '../component/Table';

function HomeSearch() {
  return (
    <>
      <HeaderFilter />
      <main>
        <ShowFilters />
        <Table />
      </main>
    </>
  );
}

export default HomeSearch;
