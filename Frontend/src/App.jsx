import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from './components/Update';
function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update/>}></Route>
      </Routes>
    </div>
  );
}

export default App;