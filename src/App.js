import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import "./assets/css/style.css";
import {useSelector} from "react-redux";
import { selectUser } from './features/userSlice';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const user = useSelector(selectUser);

  
  return (
    <div>
      {/* <Router>
        <Route exact path="/" component={Login} />      
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={()=> "404 NOT FOUND"} />
      </Router> */}



      {
        user ? <Dashboard/> : <Login/>
      }
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />

    </div>
  );
}

export default App;
