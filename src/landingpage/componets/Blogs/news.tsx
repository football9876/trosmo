import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./news.css";
import MatchCardBG from "./MatchCardBG";
import { MatchItem } from "../../../Dashboard/component/CreateMatchs";
import { docQr } from "../../../Logics/docQr";

const News: React.FC = () => {
  const [latestMatch, setLatestMatch] = useState<MatchItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLatestMatch = async () => {
    setLoading(true);
    try {
      const matches: MatchItem[] = await docQr("LastMatch", {
   
      })
      if (matches.length) {
        // Sort by createdAt descending
        const sorted = matches.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestMatch(sorted[0]);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestMatch();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!latestMatch) return <div style={{ padding: 20 }}>No matches found.</div>;

  return (
    <MatchCardBG
      homeLogo={latestMatch.homeLogo as string}
      awayLogo={latestMatch.awayLogo as string}
      homeScore={latestMatch.homeScore||0}
      awayScore={latestMatch.awayScore||0}
      backgroundImage={latestMatch.backgroundImage as string}
      playerImage="/assets/player-running.png" // You can adjust this if needed
    />
  );
};

export default News;
