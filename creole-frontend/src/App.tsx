import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./Pages/Main"
import Bulk from "./Pages/Bulk"
import Generate from "./Pages/Generate"
import NavBar from "@/components/NavBar"


function App() {



    return (
        <div className="w-full">
            <NavBar></NavBar>
            <Router>
                <Routes>
                    <Route index element={<Main />}></Route>
                    <Route path="/translate" element={<Main />}></Route>
                    <Route path="/bulk" element={<Bulk></Bulk>}></Route>
                    <Route path="/generate" element={<Generate></Generate>}></Route>
                </Routes>
            </Router>

        </div>


    )
}

export default App
