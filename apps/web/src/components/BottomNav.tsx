import { Home, Send, Clock, User } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Send, label: "Send", path: "/send" },
  { icon: Clock, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-mobile mx-auto flex justify-around items-center h-18 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 hover-elevate active-elevate-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-caption font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
