import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/layout/AppSidebar";

function Dashboard() {
  return <div className="p-8 text-white"><h1>Dashboard BJJ</h1><p>Benvenuto sul tappeto.</p></div>;
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Aggiungi qui le altre rotte quando i componenti sono pronti */}
            <Route path="*" element={<div className="p-8">Pagina in costruzione...</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
