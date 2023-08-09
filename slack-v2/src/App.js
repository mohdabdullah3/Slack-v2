import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
