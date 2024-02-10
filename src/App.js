import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailSignup from "./pages/VerifyEmailSignup";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
function App() {
  return (
    <div className=" w-screen min-h-screen flex flex-col font-inter bg-richblack-900">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-reset-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmailSignup/>
            </OpenRoute>
          }
        />
         <Route 
             element={
               <PrivateRoute>
               <Dashboard />
               </PrivateRoute>
              }
         >
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/settings" element={<Settings />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
         </Route>

      </Routes>
  
    </div>
  );
}

export default App;
