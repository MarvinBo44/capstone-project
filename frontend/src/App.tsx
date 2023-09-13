import './App.css'
import AddShelfModular from './addShelfModular.tsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";

function App() {

    return (
        <>
            <Router>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/addShelf'} element={<AddShelfModular/>}/>
            </Routes>
            </Router>
        </>
    )
}

export default App
