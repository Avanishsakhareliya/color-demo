import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Color from './color';
import Notify from "./Notify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Color />} />
      </Routes>
      <Notify />
    </BrowserRouter>
  );
}

export default App;
