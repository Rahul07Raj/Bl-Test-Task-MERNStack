import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Group from "./pages/Group";
import AllGroups from "./pages/AllGroups";

function App() {
   
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  element={<Navbar />}>
            <Route path="/" element={<Home />} />
          <Route path='/create-group' element={<Group />}/>
          <Route path='/allGroups' element={<AllGroups/>}/>
          </Route>
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
