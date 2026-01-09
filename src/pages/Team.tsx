import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Player {
  id: number;
  number?: number;
  name: string;
  position: string;
  nationality: string;
  birthDate: string;
  height?: string;
  weight?: string;
  image?: string;
}

const goalkeepers: Player[] = [
  { id: 1, number: 32, name: "Abderrahmane Sarr", position: "Goalkeeper", nationality: "Mauritania", birthDate: "April 1, 2005" },
  { id: 2, number: 27, name: "Ole Kristian Lauvli", position: "Goalkeeper", nationality: "Norway", birthDate: "May 13, 1994", height: "193cm" },
  { id: 3, number: 1, name: "Jakob Let Haugaard", position: "Goalkeeper", nationality: "Denmark", birthDate: "May 1, 1992", height: "199cm", weight: "87kg" },
];

const defenders: Player[] = [
  { id: 4, number: 3, name: "Mathias Tønnessen", position: "Defender", nationality: "Norway", birthDate: "November 22, 2003", height: "190cm" },
  { id: 5, number: 23, name: "Jens Husebø", position: "Defender", nationality: "Norway", birthDate: "March 7, 1999", height: "188cm" },
  { id: 6, number: 29, name: "Alexander Warneryd", position: "Defender", nationality: "Sweden", birthDate: "August 21, 2005", height: "174cm" },
  { id: 7, number: 25, name: "Abubacarr Sedi Kinteh", position: "Defender", nationality: "Gambia", birthDate: "November 30, 2006" },
  { id: 8, number: 2, name: "Leo Cornic", position: "Defender", nationality: "Norway", birthDate: "January 2, 2001", height: "178cm" },
  { id: 9, number: 21, name: "Tobias Guddal", position: "Defender", nationality: "Norway", birthDate: "July 25, 2002", height: "201cm" },
  { id: 10, number: 4, name: "Vetle Skjærvik", position: "Defender", nationality: "Norway", birthDate: "September 15, 2000" },
  { id: 11, number: 30, name: "Isak Vådebu", position: "Defender", nationality: "Norway", birthDate: "August 10, 2003" },
];

const midfielders: Player[] = [
  { id: 12, name: "Heine Åsen Larsen", position: "Midfielder", nationality: "Norway", birthDate: "July 9, 2002" },
  { id: 13, number: 15, name: "Jesper Grundt", position: "Midfielder", nationality: "Norway", birthDate: "October 20, 2002", height: "178cm" },
  { id: 14, number: 10, name: "Troy Nyhammer", position: "Midfielder", nationality: "Norway", birthDate: "August 19, 2006", height: "182cm" },
  { id: 15, number: 19, name: "Aleksander Lilletun Elvebu", position: "Midfielder", nationality: "Norway", birthDate: "March 22, 2009" },
  { id: 16, number: 37, name: "Sander Innvær", position: "Midfielder", nationality: "Norway", birthDate: "October 11, 2004" },
  { id: 17, number: 35, name: "Johan Solstad-Nøis", position: "Midfielder", nationality: "Norway", birthDate: "January 30, 2008" },
  { id: 18, number: 34, name: "Mads Mikkelsen", position: "Midfielder", nationality: "Norway", birthDate: "August 28, 2008" },
  { id: 19, number: 14, name: "Sigurd Prestmo", position: "Midfielder", nationality: "Norway", birthDate: "October 6, 2006" },
  { id: 20, number: 20, name: "David Edvardsson", position: "Midfielder", nationality: "Sweden", birthDate: "March 5, 2002", height: "174cm" },
  { id: 21, number: 6, name: "Jens Hjertø-Dahl", position: "Midfielder", nationality: "Norway", birthDate: "October 31, 2005" },
  { id: 22, number: 11, name: "Ruben Yttergård Jenssen", position: "Midfielder", nationality: "Norway", birthDate: "May 4, 1988", height: "173cm" },
  { id: 23, number: 8, name: "Kent-Are Antonsen", position: "Midfielder", nationality: "Norway", birthDate: "February 12, 1995", height: "172cm" },
];

const forwards: Player[] = [
  { id: 24, name: "Sean Nilsen-Modebe", position: "Forward", nationality: "Norway", birthDate: "July 21, 2007" },
  { id: 25, number: 7, name: "Lars Olden Larsen", position: "Forward", nationality: "Norway", birthDate: "September 17, 1998", height: "175cm" },
  { id: 26, number: 18, name: "Daniel Braut", position: "Forward", nationality: "Norway", birthDate: "May 1, 2005", height: "190cm" },
  { id: 27, number: 9, name: "Ieltsin Camões", position: "Forward", nationality: "Cape Verde", birthDate: "February 15, 1997", height: "185cm" },
];

const PlayerCard = ({ player }: { player: Player }) => (
  <Link
    to="#"
    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
  >
    <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl font-heading font-bold text-muted-foreground">
            {player.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      {player.number && (
        <div className="absolute top-4 left-4 text-5xl font-heading font-bold text-primary/30">
          {player.number}
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
        {player.name}
      </h3>
      <p className="text-sm text-muted-foreground">{player.position}</p>
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nationality</span>
          <span className="font-medium">{player.nationality}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Born</span>
          <span className="font-medium">{player.birthDate}</span>
        </div>
        {player.height && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height</span>
            <span className="font-medium">{player.height}</span>
          </div>
        )}
        {player.weight && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight</span>
            <span className="font-medium">{player.weight}</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="https://www.til.no/lag/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">Team</h1>
        </div>
      </div>

      {/* Team Content */}
      <div className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Goalkeepers */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
              Goalkeepers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {goalkeepers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>

          {/* Defenders */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
              Defenders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {defenders.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>

          {/* Midfielders */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
              Midfielders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {midfielders.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>

          {/* Forwards */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 pb-2 border-b-4 border-primary inline-block">
              Forwards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {forwards.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
