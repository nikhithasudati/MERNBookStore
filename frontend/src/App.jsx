import React from 'react';
import {Routes,Route} from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path = '/' element= {<Home />} />
      <Route path = '/books/create' element= {<CreateBook/>} />
      <Route path = '/books/delete' element= {<DeleteBook />} />
      <Route path = '/books/edit' element= {<EditBook />} />
      <Route path = '/books/show' element= {<ShowBook />} />
    </Routes>
  )
}

export default App;