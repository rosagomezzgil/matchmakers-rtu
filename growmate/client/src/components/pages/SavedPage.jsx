import { useState } from "react";
import { ActivityCard } from "../widgets/ActivityCard.jsx"; 
import { useSavedActivities } from "../../contexts/SavedActivitiesContext.jsx";

export default function SavedPage() {
  const { savedActivities, clearAllActivities } = useSavedActivities();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtere Aktivitäten basierend auf ausgewählter Kategorie
  const filteredActivities = savedActivities.filter((activity) => {
    if (selectedCategory === "all") {
      return true;
    }
    return activity.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all saved activities?")) {
      clearAllActivities();
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Saved Activities</h1>
      
      {/* Die Saved Page hat einen "Clear All" Button und eine Kategorie-Filterung (z.B. Culture, Nature, Sport).
      */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-300 pb-4">
        
        {/* Kategorien-Filter */}
        <div className="flex gap-4 text-sm sm:text-base">
          <button 
            onClick={() => handleCategoryClick("all")}
            className={`pb-1 ${selectedCategory === "all" ? "font-semibold text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-800"}`}
          >
            All
          </button>
          <button 
            onClick={() => handleCategoryClick("culture")}
            className={`pb-1 ${selectedCategory === "culture" ? "font-semibold text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-800"}`}
          >
            Culture
          </button>
          <button 
            onClick={() => handleCategoryClick("nature")}
            className={`pb-1 ${selectedCategory === "nature" ? "font-semibold text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-800"}`}
          >
            Nature
          </button>
          <button 
            onClick={() => handleCategoryClick("sport")}
            className={`pb-1 ${selectedCategory === "sport" ? "font-semibold text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-800"}`}
          >
            Sport
          </button>
        </div>

        {/* Clear All Button */}
        <button 
          onClick={handleClearAll}
          className="text-sm font-semibold text-red-600 hover:text-red-700 uppercase"
          disabled={savedActivities.length === 0}
        >
          Clear All
        </button>
      </div>


      {/* Aktivitäts-Galerie */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>No saved activities yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
      
    </div>
  );
}