import {Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats">
            <Route index element={<HatsList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
