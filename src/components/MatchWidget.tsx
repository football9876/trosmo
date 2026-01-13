import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import useMatches from "@/hooks/useMatches";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const MatchWidget = () => {
  const { matches, loading } = useMatches();

  // Take first 3 upcoming matches
  const upcomingMatches = matches.slice(0, 3);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-8 text-center">
            Upcoming Matches
          </h2>
          <div className="flex justify-center">
            <ClipLoader size={30} color="white" />
          </div>
        </div>
      </section>
    );
  }

  if (upcomingMatches.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-8 text-center">
            Upcoming Matches
          </h2>
          <p className="text-center text-primary-foreground/80">
            No upcoming matches scheduled
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-8 text-center">
          Upcoming Matches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => {
            const isHome = match.homeTeam.toLowerCase().includes("tromsø") || 
                          match.homeTeam.toLowerCase().includes("til");
            
            return (
              <div
                key={match.docId}
                className="bg-primary-foreground p-6 transition-transform hover:scale-[1.02]"
              >
                <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wide text-primary mb-3 bg-primary/10 px-2 py-1">
                  Eliteserien
                </span>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {match.homeLogo ? (
                        <img 
                          src={match.homeLogo as string} 
                          alt={match.homeTeam}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                      )}
                    </div>
                    <span className={`block font-heading font-bold text-sm ${isHome ? 'text-primary' : 'text-foreground'}`}>
                      {match.homeTeam}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-heading text-xl px-4">vs</span>
                  <div className="text-center flex-1">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {match.awayLogo ? (
                        <img 
                          src={match.awayLogo as string} 
                          alt={match.awayTeam}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
                      )}
                    </div>
                    <span className={`block font-heading font-bold text-sm ${!isHome ? 'text-primary' : 'text-foreground'}`}>
                      {match.awayTeam}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{moment(match.matchDate).format("MMM D, YYYY")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{match.time || "TBD"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{match.venue}</span>
                  </div>
                </div>

                {isHome && (
                  <Link
                    to="/tickets"
                    className="btn-primary w-full mt-4 text-sm text-center block"
                  >
                    Buy Tickets
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            to="/schedule"
            className="inline-block px-6 py-2 border-2 border-primary-foreground text-primary-foreground font-heading font-bold hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MatchWidget;
