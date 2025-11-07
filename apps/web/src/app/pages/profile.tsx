import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  User,
  Wallet,
  Shield,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState(false);

  //todo: remove mock functionality - replace with real user data
  const mockUser = {
    phone: "+234 812 345 6789",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    initials: "AO",
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(mockUser.walletAddress);
    setCopiedAddress(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const menuItems = [
    {
      icon: Shield,
      label: "Security",
      description: "Password, PIN, biometrics",
      onClick: () => console.log("Security clicked"), //todo: implement security settings
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage your alerts",
      onClick: () => console.log("Notifications clicked"), //todo: implement notification settings
    },
    {
      icon: Globe,
      label: "Language",
      description: "English",
      onClick: () => console.log("Language clicked"), //todo: implement language settings
    },
    {
      icon: HelpCircle,
      label: "Support",
      description: "Get help, contact us",
      onClick: () => console.log("Support clicked"), //todo: implement support
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto">
        <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-h1">Profile</h1>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-h1">
                  {mockUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-h2" data-testid="text-phone">
                  {mockUser.phone}
                </p>
                <p className="text-caption text-muted-foreground">
                  NaijaSend Member
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-caption text-muted-foreground mb-2">
                  Wallet Address
                </p>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Wallet className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <p
                    className="text-body font-mono flex-1 truncate"
                    data-testid="text-wallet-address"
                  >
                    {mockUser.walletAddress}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCopyAddress}
                    data-testid="button-copy-address"
                    className="flex-shrink-0"
                  >
                    {copiedAddress ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-body font-semibold text-muted-foreground mb-3 px-2">
              Settings
            </h2>
            <Card className="divide-y divide-border">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    data-testid={`button-${item.label.toLowerCase()}`}
                    className="w-full flex items-center gap-4 p-4 hover-elevate active-elevate-2 text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-body-lg font-medium">{item.label}</p>
                      <p className="text-caption text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </Card>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 text-destructive border-destructive/20 hover:bg-destructive/10"
            data-testid="button-logout"
            onClick={() => console.log("Logout clicked")} //todo: implement logout functionality
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>

          <p className="text-caption text-center text-muted-foreground">
            Version 1.0.0 • Made with ❤️ for Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}
