import { useParams } from "react-router-dom";
import ActivityDateCard from "../widgets/ActivityDateCard.jsx"; 

// Mock-Daten für die Detailansicht
const mockActivity = { 
  id: 2, 
  date: "18", 
  month: "october", 
  title: "GOING TO THE BEACH", 
  category: "WALKING", 
  description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.", 
  time: "16pm", 
  address: "Nesaules iela 9, Ziemeļu rajons, Rīga, LV-1005", 
  capacity: 4,
  status: "full",
  difficulty: "low",
  createdAt: "2.10.2025",
  initialisedBy: "amber",
  imageUrl: "/images/beach.jpg" 
};


export default function ActivityDetailPage() {
  const { id } = useParams(); 
  const activity = mockActivity; // Nutzung der Mock-Daten für das Layout
  
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
            <p><span className="font-semibold w-24 inline-block">capacity</span>: {activity.capacity} people</p>
            <p><span className="font-semibold w-24 inline-block">status</span>: {activity.status}</p>
            <p><span className="font-semibold w-24 inline-block">difficulty</span>: {activity.difficulty}</p>
            <p><span className="font-semibold w-24 inline-block">created at</span>: {activity.createdAt}</p>
            <p><span className="font-semibold w-24 inline-block">initialised by</span>: {activity.initialisedBy}</p>
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
              className={`px-6 py-2 rounded font-semibold transition ${saveColor}`}
            >
              Save activity
            </button>
            <button
              className={`px-6 py-2 rounded font-semibold text-white transition ${primaryColor}`}
            >
              Join activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}