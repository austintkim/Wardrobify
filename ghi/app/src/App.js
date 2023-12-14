import {Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList'
import ShoesForm from './ShoesForm';

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/"
          element={<MainPage />}
          ></Route>
          <Route path="/shoes"
          element={<ShoesList />}
          ></Route>
          <Route path="/shoes/new"
          element={<ShoesForm />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
