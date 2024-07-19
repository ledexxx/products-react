import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShowClient from './components/ShowClient';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowClient />} />
      {/* Otras rutas aquí */}
    </Routes>
  );
}

export default App;