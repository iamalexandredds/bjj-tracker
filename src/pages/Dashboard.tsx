import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/layout/AppSidebar";
import Dashboard from "./pages/Dashboard"; // Proviamo a caricare solo questa

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<div className="p-8 text-white">Pagina non trovata</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
