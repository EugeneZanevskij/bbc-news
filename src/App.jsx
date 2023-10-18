import { useState } from 'react';
import Signin from './pages/Signin';
import {Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import NewsDetail from './pages/NewsDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/news' element={<NewsDetail />} />
      </Routes>
    </>
  )
}

export default App
