import './styles.css'
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home";
import Tours from './routes/Tours';
import DestinationDetails from './routes/DestinationDetails';
import Login from './routes/Login';
import AdminPanel from './routes/AdminPanel';
import { RequireAuth } from 'react-auth-kit';
import DestinationEdit from './routes/DestinationEdit';

function App() {

  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tours" element={
            <Tours/>}/>
          <Route path="destinations/:id" element={<DestinationDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin_panel" element={<RequireAuth loginPath='/login'>
          <AdminPanel/>
          </RequireAuth>
          }/>
          <Route path="/destinations_edit/:id" element={<RequireAuth loginPath='/login'>
          <DestinationEdit/>
          </RequireAuth>
          }/>
        </Routes>
        
    </div>
  );
}

export default App;
