import './App.css'
import AddShelf from './AddShelf.tsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import CompartmentList from "./CompartmentList.tsx";
import AddItem from "./AddItem.tsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/addShelf'} element={<AddShelf/>}/>
                    <Route path={"/id/:compartmentId/:compartmentName/:shelfName/:shelfLocation"} element={<CompartmentList/>}/>
                    <Route path={"/addItem/:compartmentId/:compartmentName/:shelfName/:shelfLocation"} element={<AddItem/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
