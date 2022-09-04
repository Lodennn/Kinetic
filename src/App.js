import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Layouts/Navigation/Navigation";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import HomePage from "./pages/HomePage/HomePage";
import ProgramDaysPage from "./pages/ProgramDaysPage/ProgramDaysPage";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/program/:programId" element={<ProgramDaysPage />} />
            <Route path="/day/:programId/:dayId" element={<WorkoutsPage />} />
          </Route>
          <Route
            path="/auth"
            element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
