import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";
import Educator from "./Pages/Educator";
import Student from "./Pages/Student";
import HR from "./Pages/HR";
import Home from "./Pages/HomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function Layout() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home/>} />
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <Student/>
          </ProtectedRoute>
        } />
        <Route path="/educator" element={
          <ProtectedRoute requiredRole="educator">
            <Educator />
          </ProtectedRoute>
          } />
          <Route  path="/hr" element={
            <ProtectedRoute requiredRole="hr">
              <HR />
          </ProtectedRoute>
          }/>

      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
