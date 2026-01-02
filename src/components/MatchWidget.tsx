import { Calendar, Clock, MapPin } from "lucide-react";

interface Match {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    competition: "Eliteserien",
    homeTeam: "Tromsø IL",
    awayTeam: "Rosenborg",
    date: "15. mars 2026",
    time: "18:00",
    venue: "Romssa Arena",
    isHome: true,
  },
  {
    id: 2,
    competition: "Eliteserien",
    homeTeam: "Bodø/Glimt",
    awayTeam: "Tromsø IL",
    date: "22. mars 2026",
    time: "17:00",
    venue: "Aspmyra Stadion",
    isHome: false,
  },
  {
    id: 3,
    competition: "NM",
    homeTeam: "Tromsø IL",
    awayTeam: "Molde",
    date: "29. mars 2026",
    time: "15:00",
    venue: "Romssa Arena",
    isHome: true,
  },
];

const MatchWidget = () => {
  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-8 text-center">
          Kommende kamper
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="bg-primary-foreground p-6 transition-transform hover:scale-[1.02]"
            >
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wide text-primary mb-3 bg-primary/10 px-2 py-1">
                {match.competition}
              </span>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <span className={`block font-heading font-bold text-lg ${match.isHome ? 'text-primary' : 'text-foreground'}`}>
                    {match.homeTeam}
                  </span>
                </div>
                <span className="text-muted-foreground font-heading text-xl px-4">vs</span>
                <div className="text-center flex-1">
                  <span className={`block font-heading font-bold text-lg ${!match.isHome ? 'text-primary' : 'text-foreground'}`}>
                    {match.awayTeam}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
              </div>

              {match.isHome && (
                <a
                  href="#"
                  className="btn-primary w-full mt-4 text-sm"
                >
                  Kjøp billett
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchWidget;
