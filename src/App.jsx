import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import './css/App.css'
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Library from "./pages/Library.jsx";
import Detail from "./pages/Detail.jsx";
import Logout from "./pages/Logout.jsx";
import Quiz from "./pages/Quiz.jsx";


function App() {

     return (
        <>
            <NavBar/>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/library" element={<Library/>}/>
                    <Route path="/library/details" element={<Detail/>}/>
                    <Route path="/quiz" element={<Quiz/>}/>
                </Routes>


            </main>

        </>
     )
}

export default App
