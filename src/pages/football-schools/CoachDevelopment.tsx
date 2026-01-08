import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CoachDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/trenerutviklingsprogram2025/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Coach Development"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">
            Coach Development Program 2025
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-xl text-muted-foreground mb-8">
            Tromsø IL, Troms Football District and SpareBank 1 Nord-Norge invite motivated and eager-to-learn coaches to an exciting new coach development program for the sixth time.
          </p>

          <p className="mb-6">
            TIL Academy is a department with a large professional environment that works with player development. Now the Academy, together with Trenerløftet, invites coaches who want development, professional input and inspiration throughout 2025 to join the coach development program.
          </p>

          <p className="mb-6">
            This is an initiative where various professional topics and knowledge transfer will be worked on, and there will be opportunities to observe the Academy coaches on the field.
          </p>

          <blockquote className="bg-muted p-6 rounded-lg border-l-4 border-primary my-8">
            <p className="italic text-foreground">
              "Thank you for inviting grassroots coaches. Lots of professional content we can take back to our daily work. You create motivation and inspire us to continue our work!"
            </p>
            <footer className="text-sm text-muted-foreground mt-2">— Participant 2024</footer>
          </blockquote>

          <Button size="lg" className="mb-8" onClick={() => window.open('#', '_blank')}>
            Register Here
          </Button>

          <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Who can apply:</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>You are in progress with the Grassroots Coach (C-license) as a coach, possibly player experience as a senior player.</li>
            <li>You are interested and curious about developing your football competence.</li>
          </ul>

          <div className="bg-muted p-6 rounded-lg my-8">
            <p className="font-semibold mb-2">
              The coach development program also qualifies as part of continuing education to maintain the UEFA B-license (15 hours).
            </p>
            <p>TIL Academy also wants to give participants insight into player development in a top club.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-heading font-bold text-lg mb-2">Price</h3>
              <p className="text-2xl font-bold text-primary">1,800 NOK</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-heading font-bold text-lg mb-2">Max Participants</h3>
              <p className="text-2xl font-bold text-primary">30 persons</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoachDevelopment;
