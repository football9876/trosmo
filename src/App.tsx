import Toaster from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";
import LoginMain from "./Login/main";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FootballSchools from "./pages/FootballSchools";
import CoachDevelopment from "./pages/football-schools/CoachDevelopment";
import TilSchool from "./pages/football-schools/TilSchool";
import SummerSchool from "./pages/football-schools/SummerSchool";
import TineSchool from "./pages/football-schools/TineSchool";
import Partners from "./pages/Partners";
import Shop from "./pages/Shop";
import Sustainability from "./pages/Sustainability";
import YouthDepartment from "./pages/YouthDepartment";
import UserDashboardMain from "./UserDashboard/main";
import DashboardMain from "./Dashboard/main";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/Login" element={<LoginMain />} />
            
            {/* Football Schools */}
            <Route path="/football-schools" element={<FootballSchools />} />
            <Route path="/football-schools/coach-development" element={<CoachDevelopment />} />
            <Route path="/football-schools/til-school" element={<TilSchool />} />
            <Route path="/football-schools/summer-school" element={<SummerSchool />} />
            <Route path="/football-schools/tine-school" element={<TineSchool />} />
            
            {/* Partners */}
            <Route path="/partners" element={<Partners />} />
            
            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            
            {/* Sustainability */}
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/sustainability/:slug" element={<Sustainability />} />
            
            {/* Youth Department */}
            <Route path="/youth-department" element={<YouthDepartment />} />
            <Route path="/youth-department/:slug" element={<YouthDepartment />} />
            
            <Route path="*" element={<NotFound />} />
            <Route path="/UserDashboard" element={<UserDashboardMain/>}/>
            <Route path="/AdminDashboard" element={<DashboardMain/>}/>

            
            {/* <Route path="/AdminDashboard" element={<Admin/>}/> */}



          </Routes>
        </BrowserRouter>
      </Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
