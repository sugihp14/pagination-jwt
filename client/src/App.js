
import {BrowserRouter,Route,Routes,Switch} from 'react-router-dom'

import UserList from './components/UserList.js'
import Login from './components/Login.js'
import Register from './components/Register.js';
import NotFound from './components/Not_Found.js';
import Navbar from './components/Navbar.js'
import './components/tabel.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/"  element={<UserList/>}/>
        <Route exact path="/Register" element={<Register/>}/>
        
        <Route  exact path="*"element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
