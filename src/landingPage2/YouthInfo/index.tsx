
import Header from '../header'
import NestedMenu from '../../landingpage/componets/Nav/pcNavigation'
import Responsive from '../../landingpage/componets/Blogs/responsive'
import Footer from '../Footer'

const YouthInfoIndex = () => {
  return (
    <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />
        <Responsive
          left={
            <div className="about-nfb-wrapper">
              {/* Kontingent Section */}
                <section className="youth-section">
      <h2>General Info on the Youth Department</h2>

      <p>
        The youth department of Nørresundby United Football Clubs comprises teams
        from U13 boys & girls up to U19 boys & U18 girls.
      </p>
      <p>
        U13 & U14 teams train at Lerumbakken, while U15, U16 & U17 train at Voerbjergvej.
      </p>

      <h3>NFB’s Vision for Youth Football</h3>
      <p>
        Tromso IL develops a healthy child‑and‑parent culture within the
        framework and values set by the club. We focus on supporting different
        needs—both sporting and social—for both girls and boys. Football should
        be fun, and it’s a learning phase for everyone, with training tailored
        to each player’s current level. We also recognize that youth football
        serves as schooling for senior football.
      </p>

      <p>
        At our existing facilities on Lerumbakken and Voerbjergvej, we will
        create the framework and foundation for a meeting place for the town’s
        children, youth, and family life. There will be a variety of activities
        so that the town’s children and youths can thrive. We will continuously
        maintain dialogue and contact with local schools, after‑school programs,
        kindergartens, and institutions. This collaboration will form the basis
        for recruiting youth players to the club.
      </p>
    </section>
            </div>
          }
        />
        <Footer />
      </div>
    </div>
  )
}

export default YouthInfoIndex
