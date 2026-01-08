import { useEffect, useState } from "react";
import "./matchResult.css";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { docQr } from "../../../Logics/docQr";
import { MatchItem } from "../../../Dashboard/component/CreateMatchs";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";

const MatchSchedule: React.FC<{ list?: "prev" | "next" }> = ({ list='next' }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<MatchItem[]>([]);

  const fetchResults = async () => {
    console.log("fetching again...")
    setLoading(true);
    try {
      const matchData = await docQr("Matches", {});
      const orderedMatches = [...matchData].sort(
        (a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
      )
      setMatches(list==="next" ? orderedMatches.reverse():orderedMatches);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log({list});
    fetchResults();
  }, [list]);

  // Filter based on prev or next
  const now = new Date();
  const filtered = matches.filter(m => {
    const matchDate = new Date(m.matchDate);
    return list === "prev" ? matchDate < now : matchDate > now;
  });

  // Group matches by month-year
  const grouped: Record<string, MatchItem[]> = {};
  filtered.forEach((m) => {
    const date = new Date(m.matchDate);
    const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  return (
    <div style={{ width: "100%" }}>
      {matches.length===0 && "No "+list+" match yet"}
      {Object.entries(grouped).map(([monthYear, monthMatches]) => (
        <div key={monthYear} className="match-group">
          <h4 style={{fontSize:16,fontWeight:"600"}} className="month-header">{monthYear.toUpperCase()}</h4>
          <MDBTable bordered responsive>
            <MDBTableHead>
              <tr>
                <th>Date</th>
                <th>Clubs</th>
                <th>Venue</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td><Skeleton width={60} /></td>
                      <td><Skeleton width={120} /></td>
                      <td><Skeleton width={80} /></td>
                    </tr>
                  ))
                : monthMatches.map((match, i) => {
                    const dayName = moment(match.matchDate).format('dddd');
                    return (
                      <tr key={i}>
                        <td>
                          <div style={{ fontWeight: 'bold' }}>{match.day}</div>
                          <div style={{ textTransform: 'uppercase', fontSize: '12px' }}>
                            {dayName}
                          </div>
                          <div style={{ marginTop: '5px', fontSize: '12px' }}>
                            {match.time}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <img
                              src={match.homeLogo as string}
                              alt={match.homeTeam}
                              style={{ width: 30, height: 30, objectFit: 'contain' }}
                            />
                            <span>-</span>
                            <img
                              src={match.awayLogo as string}
                              alt={match.awayTeam}
                              style={{ width: 30, height: 30, objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ marginTop: 4, fontSize: '12px' }}>
                            <strong>{match.homeTeam}</strong> vs <strong>{match.awayTeam}</strong>
                          </div>
                        </td>
                        <td style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          {match.venue}
                        </td>
                      </tr>
                    );
                  })}
            </MDBTableBody>
          </MDBTable>
        </div>
      ))}
    </div>
  );
};

export default MatchSchedule;
