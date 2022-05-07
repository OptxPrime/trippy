import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register} from "./pages/register/register";
import {RegisterAgency} from "./pages/register/agency";
import {RegisterTraveler} from "./pages/register/traveler";
import {Login} from "./pages/login/login";
import {LoginAgency} from "./pages/login/agency";
import {LoginTraveler} from "./pages/login/traveler";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />

            <Route path="register" element={<Register />}/>
            <Route path="register/agency" element={<RegisterAgency />}/>
            <Route path="register/traveler" element={<RegisterTraveler />}/>

            <Route path="login" element={<Login />}/>
            <Route path="login/agency" element={<LoginAgency />}/>
            <Route path="login/traveler" element={<LoginTraveler />}/>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
