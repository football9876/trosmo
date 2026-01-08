import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const TilSchool = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tilskolen/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="TIL School"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">
            TIL School 2026 – Football After-School Program
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-xl text-muted-foreground mb-8">
            TIL School is back with football training for children and young people throughout the autumn. Registration is open and here you'll find the registration link and everything you need to know.
          </p>

          <p className="mb-6">
            We hope football-interested girls and boys born 2019 - 2013, regardless of club affiliation, will sign up!
          </p>

          <Button size="lg" className="mb-8" onClick={() => window.open('#', '_blank')}>
            Register Here
          </Button>

          <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Period</h2>
          <p className="font-semibold text-lg mb-4">Monday 05.01.2026 - Thursday 18.06.2026</p>

          <p className="mb-6">
            We offer sessions for girls and boys from 2:00 PM – 4:00 PM, 3 days a week, <strong>Monday, Tuesday and Thursday</strong>. Everyone can choose 1-3 sessions per week. You must register for the entire period, 18 weeks. Sessions will be at Lerøyhallen.
          </p>

          <div className="bg-muted p-6 rounded-lg my-8">
            <h3 className="font-heading font-bold text-lg mb-4">Daily Schedule</h3>
            <ul className="space-y-3">
              <li><strong>2:00 PM – 2:30 PM:</strong> Meal time for students at Lerøyhallen. Instructors and Lerøyhallen staff will ensure students can have a meal with dry food and fruit. All students bring a water bottle that can be filled at Lerøyhallen!</li>
              <li><strong>2:30 PM – 3:45 PM:</strong> Sessions with basic technique related to themes followed by play. Themes are "Master of the Ball", 1 A and 1 F.</li>
              <li><strong>3:45 PM – 4:00 PM:</strong> Everyone participates in reflecting on the training and tidying up equipment.</li>
            </ul>
          </div>

          <p className="mb-6">
            The goal of the sessions at TIL School is for students to be active and become the best they can based on their individual prerequisites. This means grouping by age and level. In addition to the physical aspect, students will be challenged on cooperation, concentration and responsibility so that everyone thrives!
          </p>

          <div className="bg-card p-6 rounded-lg border my-8">
            <h3 className="font-heading font-bold text-lg mb-2">Limited Places</h3>
            <p>Register early to secure your spot!</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TilSchool;
