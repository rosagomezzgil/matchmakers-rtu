import {ActivityCard} from "../widgets/ActivityCard.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx"; 

// Mock-Daten für die Aktivitäten (Basierend auf Ihrem Screenshot)
// ACHTUNG: Die Bilder müssen in Ihrem /public-Ordner liegen, z.B. /public/images/beach.jpg
const mockActivities = [
  { id: 1, date: "10", month: "october", title: "VISITING MEZAPARK", category: "culture", imageUrl: "/images/mezapark.jpg" }, 
  { id: 2, date: "18", month: "october", title: "GOING TO THE BEACH", category: "nature", imageUrl: "/images/beach.jpg" },
  { id: 3, date: "23", month: "october", title: "MUSEUM VISIT", category: "culture", imageUrl: "/images/museum.jpg" },
  { id: 4, date: "28", month: "october", title: "SKI TRIP TO AUSTRIA", category: "sport", imageUrl: "/images/ski-trip.jpg" },
  { id: 5, date: "2", month: "november", title: "GOING ON A WALK", category: "nature", imageUrl: "/images/walk.jpg" },
  { id: 6, date: "11", month: "november", title: "HIKING THE ALPS", category: "sport", imageUrl: "/images/hiking.jpg" },
  { id: 7, date: "17", month: "november", title: "APRES SKI", category: "social", imageUrl: "/images/apres-ski.jpg" },
  { id: 8, date: "24", month: "november", title: "CITY TRIP TO BERLIN", category: "travel", imageUrl: "/images/berlin.jpg" },
];

const locations = ["berlin", "düsseldorf", "hannover", "bremen", "hamburg", "munich"];

export default function DiscoveryPage() {
  const { signIn } = useAuth(); // signIn nur für den Test

  return (
    <div className="py-8">
      {/* Filterleiste */}
      <div className="flex justify-start text-sm sm:text-base mb-12 border-b border-gray-300 pb-2">
        
        {/* Location Dropdown (komplexeres Layout wie im Screenshot) */}
        <div className="relative group mr-8">
          <button className="uppercase font-semibold text-gray-800 hover:text-black">location</button>
          
          {/* Dropdown-Menü (Positionierung und Stil wie im Screenshot) */}
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-10 hidden group-hover:block whitespace-nowrap min-w-[150px]">
            {locations.map(loc => (
              <p key={loc} className="text-gray-600 hover:text-black cursor-pointer py-1 text-sm capitalize">
                {loc}
              </p>
            ))}
          </div>
        </div>
        
        {/* Einfache Filter-Buttons */}
        <button className="uppercase font-semibold text-gray-800 hover:text-black mr-8">date</button>
        <button className="uppercase font-semibold text-gray-800 hover:text-black mr-8">time</button>
        <button className="uppercase font-semibold text-gray-800 hover:text-black mr-8">category</button>
        <button className="uppercase font-semibold text-gray-800 hover:text-black">status</button>
      </div>

      {/* Aktivitäts-Galerie */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockActivities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      
      {/* Temporärer Test-Button zum Wechsel zurück zur LandingPage */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-2">Um auszuloggen, klicken Sie oben auf "Account".</p>
        <button 
            onClick={signIn}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
            Manuell einloggen (falls ausgeloggt)
        </button>
      </div>
    </div>
  );
}