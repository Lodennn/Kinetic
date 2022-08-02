import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Layouts/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import ProgramDaysPage from "./pages/ProgramDaysPage/ProgramDaysPage";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program/:programId" element={<ProgramDaysPage />} />
          <Route path="/day/:programId/:dayId" element={<WorkoutsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
