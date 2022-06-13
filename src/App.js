import React from 'react';
import HomeSearch from './pages/HomeSearch';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <StarProvider>
      <HomeSearch />
    </StarProvider>
  );
}

export default App;
