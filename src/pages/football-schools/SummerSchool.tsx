import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SummerSchool = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tils-sommerfotballskole/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Summer Football School"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">
            TIL's Summer Football School
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-xl text-muted-foreground mb-8">
            Tromsø Idrettslag invites children aged 5-12 to fun-filled football days at the club's facilities in South Tromsøya the last week of June.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-heading font-bold text-lg mb-2">Location</h3>
              <p>Bjerkakerbanen and Lerøyhallen</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-heading font-bold text-lg mb-2">Time</h3>
              <p>June 23-26, 2025 - 11:30 AM - 3:00 PM each day</p>
            </div>
          </div>

          <Button size="lg" className="mb-8" onClick={() => window.open('#', '_blank')}>
            Click Here to Register!
          </Button>

          <p className="mb-6">
            There will be activities adapted to the age groups and we will use both football pitches, cage ball hall and gym for activities.
          </p>

          <p className="mb-6">
            There will be many touches on the ball, play and fun for children all week. Throughout the week there will be focus on various themes such as community, respect and team spirit, as well as a special fair-play competition.
          </p>

          <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Age Groups</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>5-6 years</li>
            <li>7-8 years</li>
            <li>9-10 years</li>
            <li>11-12 years</li>
          </ul>
          <p className="text-muted-foreground mb-6">With possibility for separate girls' groups.</p>

          <p className="mb-6">
            Start Monday June 23rd with registration from 11:00 AM and activity start from 11:30 AM.
          </p>

          <p className="mb-6">
            All participants must bring their own packed lunch and drink. Fruit will be served every day.
          </p>

          <div className="bg-muted p-6 rounded-lg my-8">
            <h3 className="font-heading font-bold text-lg mb-4">Price</h3>
            <p className="text-2xl font-bold text-primary mb-2">1,900 NOK per week</p>
            <p>Sibling discount: 500 NOK per sibling</p>
            <p className="mt-4">
              This includes equipment from Select for all participants. There will also be planned visits from TIL's A-team players.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border my-8">
            <h3 className="font-heading font-bold text-lg mb-2">Questions?</h3>
            <p>Contact administrative manager: Kathrine Fuhr Larsen at <a href="#" className="text-primary">kathrine.larsen@til.no</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SummerSchool;
