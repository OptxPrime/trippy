import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Register} from "./pages/register/register";
import {RegisterAgency} from "./pages/register/agency";
import {RegisterTraveler} from "./pages/register/traveler";
import {Login} from "./pages/login/login";
import {LoginAgency} from "./pages/login/agency";
import {LoginTraveler} from "./pages/login/traveler";
import DarkMode from "./components/DarkMode/DarkMode";

function App() {
  return (
    <div className="App bg-gray-200 text-black dark:text-white dark:bg-slate-800">
      <header className="App-header">
        <DarkMode/>
        <BrowserRouter>
            <Routes>
                <Route path="register" element={<Register />}/>
                <Route path="register/agency" element={<RegisterAgency />}/>
                <Route path="register/traveler" element={<RegisterTraveler />}/>

                <Route path="login" element={<Login />}/>
                <Route path="login/agency" element={<LoginAgency />}/>
                <Route path="login/traveler" element={<LoginTraveler />}/>

                <Route path="*" element={<Navigate to="/register" replace={true} />}/>
            </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
