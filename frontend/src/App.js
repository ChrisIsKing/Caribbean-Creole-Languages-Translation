import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from "./Pages/List";
import Translate from "./Pages/Translate";
import Entry from './Pages/Entry';
import NavBar from './Components/NavBar';

function App() {
    return (
        <div className="App">
          
          <Router>
          <NavBar />
            <Routes>
              <Route index element={<Translate />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="/list" element={<List />} />
              <Route path="/entry/:id" element={<Entry />} />
            </Routes>
          </Router>
        </div>
    );
}

export default App;
