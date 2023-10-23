import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./Pages/Main"
import Bulk from "./Pages/Bulk"
import NavBar from "@/components/NavBar"
import EditPrompt from './Pages/EditPrompt';


function App() {
    return (
        <div className="w-full">
            <NavBar></NavBar>
            <Router>
                <Routes>
                    <Route index element={<Main />}></Route>
                    <Route path="/translate" element={<Main />}></Route>
                    <Route path="/bulk" element={<Bulk></Bulk>}></Route>
                    <Route path="/editprompt" element={<EditPrompt></EditPrompt>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
