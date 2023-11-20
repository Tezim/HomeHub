import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import "./Global.css";
import DevicesPage from "./pages/DevicesPage";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App(props) {
  return (
    <div style={{ fontFamily: "Orbitron, sans-serif", color: "white" }}>
      <Router>
        <Layout {...props}>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/devices" element={<DevicesPage />} />
            <Route exact path="/statistics" element={<StatisticsPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
