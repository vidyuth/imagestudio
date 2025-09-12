import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import EditScreen from "@/pages/EditScreen";
import NotFound from "@/pages/not-found";
import TestMobileEditScreen from "@/pages/TestMobileEditScreen";
import TestDesktopEditScreen from "@/pages/TestDesktopEditScreen";

function TestDesktopWrapper() {
  return <TestDesktopEditScreen />;
}

function TestEditWrapper() {
  return <EditScreen onBack={() => window.history.back()} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/edit" component={TestEditWrapper} />
      <Route path="/test-mobile" component={TestMobileEditScreen} />
      <Route path="/test-desktop" component={TestDesktopWrapper} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
