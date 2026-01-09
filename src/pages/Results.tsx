import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Result {
  id: number;
  matchNumber: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  venue: string;
  competition: string;
  isHome: boolean;
  month: string;
}

const results: Result[] = [
  // December 2025
  { id: 1, matchNumber: "#30", homeTeam: "Tromsø", awayTeam: "Kristiansund", homeScore: 3, awayScore: 1, date: "01.12.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "December 2025" },
  { id: 2, matchNumber: "#29", homeTeam: "Viking", awayTeam: "Tromsø", homeScore: 1, awayScore: 2, date: "24.11.2025", venue: "Lyse Arena", competition: "Eliteserien", isHome: false, month: "November 2025" },
  { id: 3, matchNumber: "#28", homeTeam: "Tromsø", awayTeam: "Bodø/Glimt", homeScore: 1, awayScore: 1, date: "17.11.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "November 2025" },
  { id: 4, matchNumber: "#27", homeTeam: "Rosenborg", awayTeam: "Tromsø", homeScore: 2, awayScore: 2, date: "10.11.2025", venue: "Lerkendal Stadion", competition: "Eliteserien", isHome: false, month: "November 2025" },
  { id: 5, matchNumber: "#26", homeTeam: "Tromsø", awayTeam: "Molde", homeScore: 1, awayScore: 0, date: "03.11.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "November 2025" },
  { id: 6, matchNumber: "#25", homeTeam: "HamKam", awayTeam: "Tromsø", homeScore: 0, awayScore: 2, date: "27.10.2025", venue: "Briskeby", competition: "Eliteserien", isHome: false, month: "October 2025" },
  { id: 7, matchNumber: "#24", homeTeam: "Tromsø", awayTeam: "Vålerenga", homeScore: 2, awayScore: 1, date: "20.10.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "October 2025" },
  { id: 8, matchNumber: "#23", homeTeam: "Lillestrøm", awayTeam: "Tromsø", homeScore: 1, awayScore: 3, date: "13.10.2025", venue: "Åråsen Stadion", competition: "Eliteserien", isHome: false, month: "October 2025" },
  { id: 9, matchNumber: "#22", homeTeam: "Tromsø", awayTeam: "Brann", homeScore: 3, awayScore: 0, date: "06.10.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "October 2025" },
  { id: 10, matchNumber: "#21", homeTeam: "Sandefjord", awayTeam: "Tromsø", homeScore: 0, awayScore: 1, date: "29.09.2025", venue: "Jotun Arena", competition: "Eliteserien", isHome: false, month: "September 2025" },
  { id: 11, matchNumber: "#20", homeTeam: "Tromsø", awayTeam: "Sarpsborg 08", homeScore: 2, awayScore: 0, date: "22.09.2025", venue: "Romssa Arena", competition: "Eliteserien", isHome: true, month: "September 2025" },
  { id: 12, matchNumber: "#19", homeTeam: "KFUM", awayTeam: "Tromsø", homeScore: 1, awayScore: 2, date: "15.09.2025", venue: "KFUM-Arena", competition: "Eliteserien", isHome: false, month: "September 2025" },
];

const teamTabs = [
  { id: "men", label: "Men's First Team", active: true },
  { id: "women", label: "Women's First Team", active: false },
  { id: "senior-c", label: "Tromsø Men Senior C", active: false },
  { id: "academy", label: "Academy", active: false },
  { id: "youth", label: "Youth Department", active: false },
  { id: "street", label: "Street Team", active: false },
];

const Results = () => {
  // Group results by month
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.month]) {
      acc[result.month] = [];
    }
    acc[result.month].push(result);
    return acc;
  }, {} as Record<string, Result[]>);

  const getResultClass = (result: Result) => {
    const tilScore = result.isHome ? result.homeScore : result.awayScore;
    const oppScore = result.isHome ? result.awayScore : result.homeScore;
    
    if (tilScore > oppScore) return "bg-green-500";
    if (tilScore < oppScore) return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="https://www.til.no/terminliste/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Results"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">Results</h1>
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

      {/* Season Stats */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">30</p>
              <p className="text-sm text-muted-foreground">Matches</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-green-600">22</p>
              <p className="text-sm text-muted-foreground">Wins</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-yellow-600">4</p>
              <p className="text-sm text-muted-foreground">Draws</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-red-600">4</p>
              <p className="text-sm text-muted-foreground">Losses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {Object.entries(groupedResults).map(([month, monthResults]) => (
            <div key={month} className="mb-8">
              <h3 className="bg-foreground text-background px-4 py-3 font-heading font-bold text-lg uppercase">
                {month}
              </h3>
              <div className="divide-y divide-border">
                {monthResults.map((result) => (
                  <Link
                    key={result.id}
                    to="#"
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 px-4 hover:bg-muted/50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground font-mono">{result.matchNumber}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-heading font-bold ${result.isHome ? "text-primary" : ""}`}>
                            {result.homeTeam}
                          </span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded text-white font-heading font-bold ${getResultClass(result)}`}>
                          <span>{result.homeScore}</span>
                          <span>-</span>
                          <span>{result.awayScore}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-heading font-bold ${!result.isHome ? "text-primary" : ""}`}>
                            {result.awayTeam}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{result.date}</span>
                      <span>{result.venue}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {result.competition}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-heading font-bold rounded hover:bg-primary/90 transition-colors">
              Show More Results
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Results;
