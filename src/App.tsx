
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import PremiumSubcategoryPage from "./pages/PremiumSubcategoryPage";
import VideoPage from "./pages/VideoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DmcaPage from "./pages/DmcaPage";
import SearchPage from "./pages/SearchPage";
import TagPage from "./pages/TagPage";
import NotFound from "./pages/NotFound";
import StatementPage from "./pages/StatementPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/premium/:subcategoryId" element={<PremiumSubcategoryPage />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tag/:tagId" element={<TagPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/dmca" element={<DmcaPage />} />
            <Route path="/2257" element={<StatementPage />} />
            <Route path="/faq" element={<StatementPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
