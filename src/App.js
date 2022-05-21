import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Register} from "./pages/register/register";
import {RegisterAgency} from "./pages/register/agency";
import {RegisterTraveler} from "./pages/register/traveler";
import {Login} from "./pages/login/login";
import {LoginAgency} from "./pages/login/agency";
import {LoginTraveler} from "./pages/login/traveler";
import DarkMode from "./components/DarkMode/DarkMode";
import {MyTrips} from "./pages/my-trips/my-trips";
import {Home} from "./pages/home/home";
import {AboutUs} from "./pages/about-us/about-us";
import {RequireAuth} from "./util/requireAuth";
import {ResetPassword} from "./pages/reset-password/reset-password";
import {Profile} from "./pages/profile/profile";
import {FutureTrips} from "./pages/future-trips/future-trips";

function App() {

    return (
        <div className="App bg-sky-100 text-black dark:text-white dark:bg-slate-800">
            <header className="App-header">
                <DarkMode/>
                <BrowserRouter>
                    <Routes>
                        <Route path="register" element={<Register/>}/>
                        <Route path="register/agency" element={<RegisterAgency/>}/>
                        <Route path="register/traveler" element={<RegisterTraveler/>}/>

                        <Route path="login" element={<Login/>}/>
                        <Route path="login/agency" element={<LoginAgency/>}/>
                        <Route path="login/traveler" element={<LoginTraveler/>}/>

                        <Route path="reset-password" element={<ResetPassword/>}/>

                        <Route
                            path="my-trips"
                            element={
                                <RequireAuth>
                                    <MyTrips/>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="future-trips"
                            element={
                                <RequireAuth>
                                    <FutureTrips/>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="home"
                            element={
                                <RequireAuth>
                                    <Home/>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="about-us"
                            element={
                                <RequireAuth>
                                    <AboutUs/>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="profile"
                            element={
                                <RequireAuth>
                                    <Profile/>
                                </RequireAuth>
                            }
                        />

                        <Route path="*" element={<Navigate to="/register" replace={true}/>}/>
                    </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
