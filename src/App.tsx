import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import Techniques from "./pages/Techniques";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/techniques" element={<Techniques />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </QueryClientProvider>
);

export default App;
