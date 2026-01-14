import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const TineSchool = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tine-fotballskole-2025/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="TINE Football School"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">
            TINE Football School 2025
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-xl text-muted-foreground mb-8">
            You can now register for TINE Football School which takes place August 11-15, 2025. (NB! The football school is fully booked and unfortunately it is no longer possible to register)
          </p>

          <Button size="lg" className="mb-8" onClick={() => window.open('#', '_blank')}>
            Register Here
          </Button>

          <p className="mb-6">
            TINE Football School is arranged the last week before schools start in autumn, and we hope many will participate. The football school is located at Bjerkakerbanen and Lerøyhallen.
          </p>

          <p className="mb-6">
            There will be instructors from TIL and NTG. In addition, we will have visits from A-team players from TIL men and women on one of the days. The goal of TINE Football School is to create an arena for football joy and development.
          </p>

          <div className="bg-muted p-6 rounded-lg my-8">
            <h3 className="font-heading font-bold text-lg mb-4">Details</h3>
            <p className="mb-4">
              TINE Football School is open for boys and girls from 6 to 12 years (2019 – 2013) and is held from 10:00 AM – 12:30 PM all days. Separate girls' groups will be arranged if numbers permit.
            </p>
            <p>
              Each day the first hour will be skills development, games and competitions adapted to age. Then there is a lunch break before the last hour is used for small-sided games. Students must bring their own lunch. TINE provides drinks for lunch. In addition, everyone who participates gets a Select ball and TINE merchandise.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Price</h2>
          <div className="bg-card p-6 rounded-lg border my-4">
            <p className="text-2xl font-bold text-primary mb-2">1,500 NOK</p>
            <p>Sibling discount: 750 NOK for child #2, #3, etc.</p>
          </div>

          <div className="bg-card p-6 rounded-lg border my-8">
            <h3 className="font-heading font-bold text-lg mb-2">Questions?</h3>
            <p>Contact Jonas Johansen (<a href="mailto: support@tromsoil.com" className="text-primary"> support@tromsoil.com</a>)</p>
          </div>

          <p className="text-lg font-semibold text-center">
            We look forward to TINE Football School, welcome!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TineSchool;
