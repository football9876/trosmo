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
import News from "./pages/News";
import Videos from "./pages/Videos";
import Team from "./pages/Team";
import Schedule from "./pages/Schedule";
import Results from "./pages/Results";
import Stadium from "./pages/Stadium";
import About from "./pages/About";
import Payment from "./pages/Payment";

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
            
            {/* Main Navigation Pages */}
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/team" element={<Team />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/results" element={<Results />} />
            <Route path="/stadium" element={<Stadium />} />
            <Route path="/about" element={<About />} />
            
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
            
            {/* Payment */}
            <Route path="/payment" element={<Payment />} />
            
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
