import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Main from "./views/Main";
import PirateAddEdit from "./views/PirateAddEdit";
import PirateView from "./views/PirateView";

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/pirates"} element={<Main />} />
            <Route path={"/pirates/new"} element={<PirateAddEdit />} />
            <Route path={"/pirates/:id/edit"} element={<PirateAddEdit />} />
            <Route path={"/pirates/:id"} element={<PirateView />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
