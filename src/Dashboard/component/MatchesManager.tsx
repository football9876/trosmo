import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { MatchItem } from "./CreateMatchPage";
import { docQr } from "../../Logics/docQr";
import { updateData } from "../../Logics/updateData";
import { deleteData } from "../../Logics/deleteData";
import "./MatchManager.css";
import LastMatchForm from "./LastMatchForm";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCurrentPage, setEditingMatch } from "../../store/Slice";
import { Plus, Pencil, Trash2, Calendar, MapPin, Clock } from "lucide-react";

const MatchesManager = () => {
  const dispatch = useDispatch();
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [lastMatch, setLastMatch] = useState<MatchItem | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showEditLastMatchModal, setShowEditLastMatchModal] = useState<boolean>(false);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const matchesData = await docQr("Matches");
      const lastMatchData = await docQr("LastMatch");
      setLastMatch(lastMatchData[0]);

      const orderedMatches = [...matchesData].sort((a, b) => {
        const dateA = new Date(a.matchDate).getTime();
        const dateB = new Date(b.matchDate).getTime();
        return dateB - dateA;
      });

      setMatches(orderedMatches);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLastMatch = async (newData: MatchItem) => {
    try {
      if (lastMatch?.docId) {
        await updateData("LastMatch", lastMatch?.docId || "", { ...newData });
        setLastMatch({ ...newData });
      } else {
        const id = await AddData(collection(db, "LastMatch"), { ...newData });
        if (typeof id === "string") setLastMatch({ ...newData, docId: id as string });
      }
      toast.success("Last match updated successfully");
      setShowEditLastMatchModal(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (match: MatchItem) => {
    if (!confirm("Are you sure you want to delete this match?")) return;
    
    let toastId;
    try {
      toastId = toast.loading("Deleting match...");
      await deleteData("Matches", match.docId || "");
      fetchResults();
      toast.success("Deleted successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      if (toastId) toast.dismiss(toastId);
    }
  };

  const handleEdit = (match: MatchItem) => {
    dispatch(setEditingMatch(match));
    dispatch(setCurrentPage("/CreateMatch"));
  };

  const handleCreateNew = () => {
    dispatch(setEditingMatch(null));
    dispatch(setCurrentPage("/CreateMatch"));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Matches</h2>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create New Match
        </button>
      </div>

      {loading && <p className="text-muted-foreground">Loading content...</p>}

      {/* Last Match Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Last Match Result</h3>
        <div className="bg-card rounded-lg p-6 max-w-md shadow-sm border">
          {lastMatch ? (
            <div>
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="text-center">
                  <img
                    src={lastMatch?.homeLogo as string}
                    alt="Home"
                    className="w-12 h-12 rounded object-contain mx-auto mb-1"
                  />
                  <span className="text-sm font-medium">{lastMatch?.homeTeam}</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold">
                    {lastMatch?.homeScore} - {lastMatch?.awayScore}
                  </span>
                </div>
                <div className="text-center">
                  <img
                    src={lastMatch?.awayLogo as string}
                    alt="Away"
                    className="w-12 h-12 rounded object-contain mx-auto mb-1"
                  />
                  <span className="text-sm font-medium">{lastMatch?.awayTeam}</span>
                </div>
              </div>
              <button
                onClick={() => setShowEditLastMatchModal(true)}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit Last Match
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowEditLastMatchModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Last Match
            </button>
          )}
        </div>
      </div>

      {/* Matches Grid */}
      <h3 className="text-lg font-semibold mb-4">Upcoming Matches</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match.docId}
            className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              {/* Teams */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={match?.homeLogo as string}
                    alt={match.homeTeam}
                    className="w-10 h-10 rounded object-contain"
                  />
                  <span className="font-semibold">{match.homeTeam}</span>
                </div>
                <span className="text-muted-foreground font-medium">VS</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{match.awayTeam}</span>
                  <img
                    src={match?.awayLogo as string}
                    alt={match.awayTeam}
                    className="w-10 h-10 rounded object-contain"
                  />
                </div>
              </div>

              {/* Match Details */}
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{moment(match.matchDate).format("MMMM Do, YYYY")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(match)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(match)}
                  className="flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-3 py-2 rounded hover:bg-destructive/90 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No matches found. Create your first match!</p>
        </div>
      )}

      {/* Last Match Modal */}
      <MDBModal open={showEditLastMatchModal} onClose={() => setShowEditLastMatchModal(false)} tabIndex={-1}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Last Match Details</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEditLastMatchModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <LastMatchForm onSave={handleSaveLastMatch} editData={lastMatch} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setShowEditLastMatchModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default MatchesManager;
