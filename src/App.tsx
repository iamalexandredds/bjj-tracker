import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/layout/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Techniques from "./pages/Techniques";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/techniques" element={<Techniques />} />
            <Route path="*" element={<div className="p-8">Pagina in costruzione...</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
