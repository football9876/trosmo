import './MeetingRoomsPage.css'; // Add styling as needed
import Footer from '../footer';
import TopNavigation from '../Nav/topNavigation';
import useInnerWidth from '../../../funcs/useInnerWidth';

const MeetingRoomsPage = () => {
            const width=useInnerWidth()
    
  return (<>
  <TopNavigation />
       <br /><br /><br />
 {width  <700 && <><br/><br/><br/><br/></>}
    <div className="meeting-rooms-page">
      <header className="meeting-rooms-header">
        <h3>Book Meeting Rooms</h3>
        <p>FLØY offers facilities for club activities and meeting rooms in the office wing.</p>
      </header>

      <section className="meeting-rooms-section">
        <h5>Facilities</h5>
        <ul>
          <li>
            <strong>Club Room:</strong> Accommodates up to 30-40 people. Equipped with a video projector, VGA, and HDMI connections.
          </li>
          <li>
            <strong>Boardroom:</strong> Space for up to 8 people. Features a 65" TV with an HDMI cable for displaying PC content on a large screen.
          </li>
        </ul>
        <p>You can book meeting rooms online yourself using <a href="#https://www.teamup.com" target="_blank" rel="noopener noreferrer">this link</a>.</p>
      </section>

      <section className="meeting-rooms-section">
        <h5>How to Book Meeting Rooms on Teamup</h5>
        <p>You can check <a href="#https://www.teamup.com/help/getting-started/" target="_blank" rel="noopener noreferrer">this guide</a> to set up Teamup to suit your needs.</p>
        <ol>
          <li>Click on the link above to access FLØY's meeting room calendar.</li>
          <li>Choose the time interval you want to display (from one day to one year).</li>
          <li>Select the date by clicking on the calendar. Uncheck "all day" if it appears.</li>
          <li>Enter the time range you wish to book.</li>
          <li>Click in the blank box below the calendar to see the two meeting rooms. The Club Room is orange, and the Boardroom is blue. Click on the room you want.</li>
          <li>Enter which department, team, or board you are booking for.</li>
          <li>Skip "where" (most people know the location). Add a description of the meeting type under "description" (e.g., board meeting, parent meeting).</li>
          <li>Click the green save button at the top right.</li>
          <li>The room is now booked.</li>
        </ol>
      </section>


    </div>
    <br/>
    <Footer/>
    <br/><br/>
    </>
  );
};

export default MeetingRoomsPage;