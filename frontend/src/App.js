import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from "./Pages/List";
import Translate from "./Pages/Translate";

function App() {
    return (
        <div className="App">
          <Router>
            <Routes>
              <Route index element={<Translate />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </Router>
        </div>
    );
}

export default App;
