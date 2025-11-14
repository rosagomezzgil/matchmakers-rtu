import { ActivityCard } from "../widgets/ActivityCard.jsx"; 

// Mock-Daten für die gespeicherten Aktivitäten (eine Untermenge der Discovery-Daten)
const mockSavedActivities = [
  { id: 1, date: "10", month: "october", title: "VISITING MEZAPARK", category: "culture", imageUrl: "/images/mezapark.jpg" }, 
  { id: 3, date: "23", month: "october", title: "MUSEUM VISIT", category: "culture", imageUrl: "/images/museum.jpg" },
  { id: 6, date: "11", month: "november", title: "HIKING THE ALPS", category: "sport", imageUrl: "/images/hiking.jpg" },
  { id: 8, date: "24", month: "november", title: "CITY TRIP TO BERLIN", category: "travel", imageUrl: "/images/berlin.jpg" },
];

export default function SavedPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Saved Activities</h1>
      
      {/* Die Saved Page hat einen "Clear All" Button und eine Kategorie-Filterung (z.B. Culture, Nature, Sport).
      */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-300 pb-4">
        
        {/* Kategorien-Filter (Nur einfache Buttons simuliert) */}
        <div className="flex gap-4 text-sm sm:text-base">
          <button className="font-semibold text-gray-800 border-b-2 border-gray-800 pb-1">All</button>
          <button className="text-gray-500 hover:text-gray-800">Culture</button>
          <button className="text-gray-500 hover:text-gray-800">Nature</button>
          <button className="text-gray-500 hover:text-gray-800">Sport</button>
        </div>

        {/* Clear All Button */}
        <button className="text-sm font-semibold text-red-600 hover:text-red-700 uppercase">
          Clear All
        </button>
      </div>


      {/* Aktivitäts-Galerie */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockSavedActivities.map(activity => (
          // Nutzung von ActivityCard (stellen Sie sicher, dass der Import-Typ passt)
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      
    </div>
  );
}