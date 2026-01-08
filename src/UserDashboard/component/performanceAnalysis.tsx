
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from "recharts";
import useInnerWidth from "../../funcs/useInnerWidth";

// const matchRatingsData = [
//   { match: "Match 1", rating: 7.5 },
//   { match: "Match 2", rating: 8.0 },
//   { match: "Match 3", rating: 6.8 },
//   { match: "Match 4", rating: 7.9 },
//   { match: "Match 5", rating: 8.2 },
// ];

// const coachFeedbackData = [
//   { aspect: "Defense", score: 80 },
//   { aspect: "Attack", score: 90 },
//   { aspect: "Passing", score: 75 },
//   { aspect: "Positioning", score: 85 },
// ];

// const fitnessTrackingData = [
//   { day: "Mon", stamina: 60, speed: 70 },
//   { day: "Tue", stamina: 65, speed: 72 },
//   { day: "Wed", stamina: 68, speed: 74 },
//   { day: "Thu", stamina: 70, speed: 76 },
//   { day: "Fri", stamina: 75, speed: 78 },
// ];

// const improvementSuggestions = [
//   { name: "Shooting", value: 25 },
//   { name: "Dribbling", value: 20 },
//   { name: "Defending", value: 30 },
//   { name: "Fitness", value: 25 },
// ];


const generateRandomNumber = (min: number, max: number) => 
  Math.round(Math.random() * (max - min) + min);

// Generate random match ratings
const matchRatingsData = Array.from({ length: 5 }, (_, i) => ({
  match: `Match ${i + 1}`,
  rating: generateRandomNumber(60, 90) / 10, // Ratings from 6.0 - 9.0
}));

// Generate random coach feedback scores
const coachFeedbackData = ["Defense", "Attack", "Passing", "Positioning"].map((aspect) => ({
  aspect,
  score: generateRandomNumber(60, 100), // Scores from 60 - 100
}));

// Generate random fitness tracking data
const fitnessTrackingData = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => ({
  day,
  stamina: generateRandomNumber(50, 90), // Stamina from 50 - 90
  speed: generateRandomNumber(60, 100), // Speed from 60 - 100
}));

// Generate random improvement suggestions
const improvementSuggestions = ["Shooting", "Dribbling", "Defending", "Fitness"].map((name) => ({
  name,
  value: generateRandomNumber(10, 40), // Values between 10 - 40
}));

// console.log({ matchRatingsData, coachFeedbackData, fitnessTrackingData, improvementSuggestions });

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PerformanceAnalysis: React.FC = () => {
    const width=useInnerWidth()
  return (
    <div className={`d-flex justify-content-around`} style={{gap:10,flexFlow:"row wrap"}}>
     
      {/* Match Ratings - Line Chart */}
      <div>
      <b style={{fontWeight:"bold",textAlign:"center"}}>Match Ratings</b>
      <ResponsiveContainer width={width <500 ? width-(width/4):(width/2)-(width/6) } height={width < 500 ? width-(width/4): 300}>
        <LineChart data={matchRatingsData}>
          <XAxis dataKey="match" />
          <YAxis domain={[6, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
</div>
      {/* Coach Feedback - Bar Chart */}
      <div>
      <b style={{fontWeight:"bold"}}>Coach Feedback</b>
      <ResponsiveContainer width={width <500 ? width-(width/4):(width/2)-(width/6) } height={width < 500 ? width-(width/4): 300}>
        <BarChart data={coachFeedbackData}>
          <XAxis dataKey="aspect" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
</div>
      {/* Fitness Tracking - Area Chart */}
      <div>
      <b style={{fontWeight:"bold"}}>Fitness Tracking</b>
      <ResponsiveContainer width={width <500 ? width-(width/4):(width/2)-(width/6) }  height={width < 500 ? width-(width/4): 300}>
        <AreaChart data={fitnessTrackingData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="stamina" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="speed" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
</div>
      {/* Improvement Suggestions - Pie Chart */}
      <div>
      <b style={{fontWeight:"bold"}}>Improvement Suggestions</b>
      <ResponsiveContainer width={width <500 ? width-(width/4):(width/2)-(width/6) }  height={width < 500 ? width-(width/4): 300}>
        <PieChart>
          <Pie data={improvementSuggestions} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {improvementSuggestions.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
