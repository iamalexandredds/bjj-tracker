import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  History, 
  Award, 
  BookOpen, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: PlusCircle, label: "Nuova Sessione", path: "/new-session" },
  { icon: History, label: "Cronologia", path: "/history" },
  { icon: BookOpen, label: "Tecniche", path: "/techniques" },
  { icon: Award, label: "Progresso", path: "/progress" },
  { icon: Settings, label: "Impostazioni", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar-background border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <span className="font-display font-bold text-xl gradient-text">BJJ TRACKER</span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-3 rounded-lg transition-all group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className={cn("shrink-0", collapsed ? "mx-auto" : "mr-3")} size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center w-full px-3 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors group">
          <LogOut className={cn("shrink-0", collapsed ? "mx-auto" : "mr-3")} size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
