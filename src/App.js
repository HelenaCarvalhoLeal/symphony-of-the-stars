import React from 'react';
import ImageUploader from './components/ImageUploader';
import ImageList from './components/Imagens';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './components/ImageList.css'
import './App.css';
import Start from './components/Start';
import Intro from './components/Intro';
import Mid1 from './components/Mid1';
import Mid2 from './components/Mid2';
import Mid3 from './components/Mid3';

function App() {
    return ( 
       <Router>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/mid1" element={<Mid1 />} />
                <Route path="/mid2" element={<Mid2 />} />
                <Route path="/mid3" element={<Mid3 />} />
            </Routes>
       </Router>
    );
}

/** 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<ImageUploader />} />
                <Route path="/api" element={<ImageList />} />
            </Routes>
        </Router>
    );
}
*/
export default App;
