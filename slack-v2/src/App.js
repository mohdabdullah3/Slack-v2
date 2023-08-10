import './App.css';
import { useAuthContext } from './customHooks/useAuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {

  const { user, authIsReady } = useAuthContext();

  return (
    <>
      {
        authIsReady && (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        )}
    </>
  );
}

export default App;
