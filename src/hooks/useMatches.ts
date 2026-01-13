import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { MatchItem } from "../Dashboard/component/CreateMatchs";

const useMatches = () => {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Matches"), (snapshot) => {
      const matchList: MatchItem[] = snapshot.docs
        .map((doc) => ({
          ...(doc.data() as MatchItem),
          docId: doc.id,
        }))
        .filter((match) => {
          // Only show upcoming matches (matchDate >= today)
          const matchDate = new Date(match.matchDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return matchDate >= today;
        })
        .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()); // Sort ascending (closest first)
      
      setMatches(matchList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching matches:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { matches, loading };
};

export default useMatches;
