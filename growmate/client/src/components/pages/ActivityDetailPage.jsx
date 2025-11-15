import { useParams } from "react-router-dom";
import ActivityDateCard from "../widgets/ActivityDateCard.jsx"; 
import { mockActivities } from "./DiscoveryPage.jsx";
import { useSavedActivities } from "../../contexts/SavedActivitiesContext.jsx";

export default function ActivityDetailPage() {
  const { saveActivity, isActivitySaved, removeActivity } = useSavedActivities();
  const { id } = useParams(); 
  
  // Finde die Activity basierend auf der ID
  const foundActivity = mockActivities.find(activity => activity.id === parseInt(id));
  
  // Falls keine Activity gefunden wurde, zeige eine Fehlermeldung
  if (!foundActivity) {
    return (
      <div className="py-8 text-gray-800">
        <p>Activity not found</p>
      </div>
    );
  }
  
  // Erweitere die Activity mit zusätzlichen Feldern für die Detailseite
  // Bereinige das Datum (entferne th, st, nd, rd)
  const cleanDate = foundActivity.date ? foundActivity.date.replace(/(th|st|nd|rd)$/i, "") : "";
  
  const activity = {
    ...foundActivity,
    date: cleanDate, // Bereinigtes Datum ohne Suffix
    description: foundActivity.description || "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    time: foundActivity.time || "16:00",
    address: foundActivity.address || `${foundActivity.location}, Europe`,
    capacity: foundActivity.capacity || 4,
    status: foundActivity.status || "open",
    difficulty: foundActivity.difficulty || "low",
    createdAt: foundActivity.createdAt || "2.10.2025",
    initialisedBy: foundActivity.initialisedBy || "user",
  };
  
  // Prüfe, ob die Activity bereits gespeichert ist
  const saved = isActivitySaved(parseInt(id));
  
  // Handler für Save/Unsave
  const handleSave = () => {
    if (saved) {
      removeActivity(parseInt(id));
    } else {
      // Bereite die Activity für das Speichern vor (nur notwendige Felder)
      const activityToSave = {
        id: foundActivity.id,
        date: cleanDate,
        month: foundActivity.month,
        title: foundActivity.title.toUpperCase(),
        category: foundActivity.category,
        imageUrl: foundActivity.imageUrl,
      };
      saveActivity(activityToSave);
    }
  };

  // Handler für Join
  const handleJoin = () => {
    if (activity.status === "full") {
      alert("This activity is already full!");
    } else {
      alert(`You joined "${activity.title}"!`);
      // Hier könnte später die API-Aufruf erfolgen
    }
  };

  // Farben (aus dem Screenshot: Dunkles Blau/Navy für Join, Gelb für Save)
  const primaryColor = "bg-gray-700 hover:bg-gray-800";
  const saveColor = "bg-yellow-400 hover:bg-yellow-500 text-gray-800";


  return (
    <div className="py-8 text-gray-800">
      
      {/* Hauptinhalts-Grid */}
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Linke Seite: Details und Karte (ca. 30% Breite) */}
        <div className="w-full md:w-1/3 space-y-6">
          
          {/* Karte mit Datum und Bild */}
          <ActivityDateCard activity={activity} />
          
          {/* Zusätzliche Aktivitätsinfos (links unten) */}
          <div className="text-sm space-y-1">
            <p className="flex justify-between"><span className="font-semibold">capacity</span><span>{activity.capacity} people</span></p>
            <p className="flex justify-between"><span className="font-semibold">status</span><span>{activity.status}</span></p>
            <p className="flex justify-between"><span className="font-semibold">difficulty</span><span>{activity.difficulty}</span></p>
            <p className="flex justify-between"><span className="font-semibold">created at</span><span>{activity.createdAt}</span></p>
            <p className="flex justify-between"><span className="font-semibold">initialised by</span><span>{activity.initialisedBy}</span></p>
          </div>
        </div>

        {/* Rechte Seite: Beschreibung und Aktionen (ca. 70% Breite) */}
        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase">{activity.title}</h2>
            <p className="text-sm uppercase text-gray-500">{activity.category}</p>
            <div className="mt-4 pt-4 border-t border-gray-300 text-base">
              {activity.description}
            </div>
          </div>
          
          {/* Zeit und Adresse */}
          <div className="space-y-4 mb-10 text-sm">
            <div className="flex">
              <span className="font-semibold w-20">time</span>
              <span>{activity.time}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-20">address</span>
              <span>{activity.address}</span>
            </div>
          </div>

          {/* Aktions-Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className={`px-6 py-2 rounded font-semibold transition ${saveColor}`}
            >
              {saved ? "Unsave activity" : "Save activity"}
            </button>
            <button
              onClick={handleJoin}
              className={`px-6 py-2 rounded font-semibold text-white transition ${primaryColor}`}
              disabled={activity.status === "full"}
            >
              {activity.status === "full" ? "Activity Full" : "Join activity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}