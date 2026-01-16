import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface Match {
  id: number;
  matchNumber: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  isHome: boolean;
  hasTickets: boolean;
  month: string;
}

const matches: Match[] = [
  // March 2026
  { id: 1, matchNumber: "#4", homeTeam: "KFUM", awayTeam: "Tromsø", date: "07.03.2026", time: "14:00", venue: "KFUM-Arena", competition: "NM Men", isHome: false, hasTickets: false, month: "March 2026" },
  { id: 2, matchNumber: "#1", homeTeam: "Tromsø", awayTeam: "Fredrikstad", date: "15.03.2026", time: "19:15", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "March 2026" },
  { id: 3, matchNumber: "#2", homeTeam: "Brann", awayTeam: "Tromsø", date: "22.03.2026", time: "17:00", venue: "Brann Stadion", competition: "Eliteserien", isHome: false, hasTickets: false, month: "March 2026" },
  // April 2026
  { id: 4, matchNumber: "#3", homeTeam: "Tromsø", awayTeam: "Rosenborg", date: "06.04.2026", time: "19:15", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "April 2026" },
  { id: 5, matchNumber: "#4", homeTeam: "Tromsø", awayTeam: "Kristiansund", date: "11.04.2026", time: "16:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "April 2026" },
  { id: 6, matchNumber: "#15", homeTeam: "Tromsø", awayTeam: "Lillestrøm", date: "15.04.2026", time: "19:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "April 2026" },
  { id: 7, matchNumber: "#5", homeTeam: "Sarpsborg 08", awayTeam: "Tromsø", date: "19.04.2026", time: "17:00", venue: "Sarpsborg Stadion", competition: "Eliteserien", isHome: false, hasTickets: false, month: "April 2026" },
  { id: 8, matchNumber: "#6", homeTeam: "Tromsø", awayTeam: "Sandefjord", date: "26.04.2026", time: "17:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "April 2026" },
  { id: 9, matchNumber: "#17", homeTeam: "Tromsø", awayTeam: "Brann", date: "29.04.2026", time: "19:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "April 2026" },
  // May 2026
  { id: 10, matchNumber: "#7", homeTeam: "Start", awayTeam: "Tromsø", date: "03.05.2026", time: "17:00", venue: "Kristiansand Arena", competition: "Eliteserien", isHome: false, hasTickets: false, month: "May 2026" },
  { id: 11, matchNumber: "#8", homeTeam: "Tromsø", awayTeam: "Molde", date: "10.05.2026", time: "17:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "May 2026" },
  { id: 12, matchNumber: "#9", homeTeam: "Bodø/Glimt", awayTeam: "Tromsø", date: "16.05.2026", time: "18:00", venue: "Aspmyra Stadion", competition: "Eliteserien", isHome: false, hasTickets: false, month: "May 2026" },
  { id: 13, matchNumber: "#10", homeTeam: "Tromsø", awayTeam: "Aalesund", date: "25.05.2026", time: "17:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "May 2026" },
  { id: 14, matchNumber: "#11", homeTeam: "KFUM", awayTeam: "Tromsø", date: "29.05.2026", time: "19:00", venue: "KFUM-Arena", competition: "Eliteserien", isHome: false, hasTickets: false, month: "May 2026" },
  // July 2026
  { id: 15, matchNumber: "#12", homeTeam: "Viking", awayTeam: "Tromsø", date: "05.07.2026", time: "17:00", venue: "Lyse Arena", competition: "Eliteserien", isHome: false, hasTickets: false, month: "July 2026" },
  { id: 16, matchNumber: "#13", homeTeam: "Tromsø", awayTeam: "Vålerenga", date: "12.07.2026", time: "17:00", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, hasTickets: true, month: "July 2026" },
  { id: 17, matchNumber: "#14", homeTeam: "HamKam", awayTeam: "Tromsø", date: "18.07.2026", time: "16:00", venue: "Briskeby", competition: "Eliteserien", isHome: false, hasTickets: false, month: "July 2026" },
];

const teamTabs = [
  { id: "men", label: "Men's First Team", active: true },
  { id: "women", label: "Women's First Team", active: false },
  { id: "senior-c", label: "Tromsø Men Senior C", active: false },
  { id: "academy", label: "Academy", active: false },
  { id: "youth", label: "Youth Department", active: false },
  { id: "street", label: "Street Team", active: false },
];

const Schedule = () => {
  // Group matches by month
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.month]) {
      acc[match.month] = [];
    }
    acc[match.month].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="/hero2.jpeg"
          alt="Schedule"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">Schedule</h1>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {teamTabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-heading font-bold text-sm whitespace-nowrap rounded transition-colors ${
                  tab.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-primary/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Match */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full flex items-center justify-center shadow-lg mb-2">
                  <span className="text-2xl md:text-3xl font-heading font-bold">KFUM</span>
                </div>
                <span className="text-sm font-medium">KFUM</span>
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-muted-foreground">-</div>
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mb-2">
                  <span className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">TIL</span>
                </div>
                <span className="text-sm font-medium">Tromsø</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl md:text-2xl font-heading font-bold">KFUM - TROMSØ</h3>
              <p className="text-muted-foreground mt-2">
                <span className="font-medium">07.03.2026</span> • <span>14:00</span> • <span>#4</span> • <span>KFUM-Arena</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Subscribe */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
              <Calendar className="w-5 h-5" />
              <span>Subscribe to schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Match List */}
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {Object.entries(groupedMatches).map(([month, monthMatches]) => (
            <div key={month} className="mb-8">
              <h3 className="bg-foreground text-background px-4 py-3 font-heading font-bold text-lg uppercase">
                {month}
              </h3>
              <div className="divide-y divide-border">
                {monthMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 px-4 hover:bg-muted/50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground font-mono">{match.matchNumber}</span>
                      <div>
                        <p className="font-heading font-bold">
                          <span className={match.isHome ? "text-primary" : ""}>{match.homeTeam}</span>
                          <span className="text-muted-foreground mx-2">-</span>
                          <span className={!match.isHome ? "text-primary" : ""}>{match.awayTeam}</span>
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{match.date}</span>
                          <span className="font-medium text-foreground">{match.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{match.venue}</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {match.competition}
                      </span>
                      {match.hasTickets && (
                        <Link
                          to="/tickets"
                          className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded font-medium text-sm hover:bg-primary/90 transition-colors"
                        >
                          <Ticket className="w-4 h-4" />
                          Tickets
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground mt-8">
            * League matches marked with this symbol are not scheduled. Match time and date may therefore be changed when the TV match schedule comes out. As soon as there is a channel icon next to the match, it is scheduled.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Schedule;
