import './App.css';
import Navbar from './components/Navbar';
import OnlineUsers from './components/OnlineUsers';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './customHooks/useAuthContext';
import Projects from "./pages/projects/Projects"
import NewProject from "./pages/newProject/NewProject"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Project from './pages/Project/Project'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <>
      {
        authIsReady && (
          <BrowserRouter>
            <div className={user ? "main" : ""}>
              { user && <Sidebar /> }
              <div className={user ? "main_body" : ""}>
                { user && <Navbar /> }
                <Routes>
                  <Route path='/' element={user ? <Projects /> : <Navigate to="/login" />} />
                  <Route path='/projects/:id' element={user ? <Project /> : <Navigate to="/login" />} />
                  <Route path='/new-project' element={user ? <NewProject /> : <Navigate to="/login" />} />
                  <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                  <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
                </Routes>
              </div>
              { user && <OnlineUsers /> }
            </div>
          </BrowserRouter>
        )}
    </>
  );
}

export default App;
