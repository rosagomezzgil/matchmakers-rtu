import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../src/contexts/AuthContext.jsx";

import beachImg from "../../assets/beach.png";
import berlinImg from "../../assets/berlin.png";
import galleryImg from "../../assets/gallery.png";
import skiImg from "../../assets/ski.png";
import mountainImg from "../../assets/mountain.png";
import greenImg from "../../assets/green.png";
import waterImg from "../../assets/water.png";
import coffeeImg from "../../assets/coffee.png";
import bottomImg from "../../assets/bottom.png";
import cliffImg from "../../assets/cliff.png";
import swellImg from "../../assets/swell.png";
import seaImg from "../../assets/sea.png";

export const mockActivities = [
  {
    id: 1,
    title: "Visiting MezaPark",
    date: "10th",
    month: "october",
    category: "nature",
    location: "berlin",
    imageUrl: greenImg,
  },
  {
    id: 2,
    title: "Going to the Beach",
    date: "18th",
    month: "october",
    category: "nature",
    location: "riga",
    imageUrl: beachImg,
  },
  {
    id: 3,
    title: "Museum Visit",
    date: "23rd",
    month: "october",
    category: "culture",
    location: "berlin",
    imageUrl: galleryImg,
  },
  {
    id: 4,
    title: "Ski Trip to Austria",
    date: "28th",
    month: "october",
    category: "sport",
    location: "vienna",
    imageUrl: skiImg,
  },
  {
    id: 10,
    title: "Sunset at Bottom Bay",
    date: "14th",
    month: "november",
    category: "travel",
    location: "barbados",
    imageUrl: bottomImg,
  },
  {
    id: 9,
    title: "Hike Adventure",
    date: "6th",
    month: "november",
    category: "nature",
    location: "lisbon",
    imageUrl: cliffImg,
  },
  {
    id: 11,
    title: "Surf Session",
    date: "19th",
    month: "november",
    category: "sport",
    location: "porto",
    imageUrl: swellImg,
  },
  {
    id: 12,
    title: "Coffee Date",
    date: "30th",
    month: "december",
    category: "social",
    location: "zurich",
    imageUrl: coffeeImg,
  },
  {
    id: 5,
    title: "Going on a Walk",
    date: "2nd",
    month: "november",
    category: "nature",
    location: "riga",
    imageUrl: waterImg,
  },
  {
    id: 6,
    title: "Hiking the Alps",
    date: "11th",
    month: "november",
    category: "nature",
    location: "vienna",
    imageUrl: mountainImg,
  },
  {
    id: 7,
    title: "Mountainbiking",
    date: "16th",
    month: "december",
    category: "sport",
    location: "austria",
    imageUrl: seaImg,
  },
  {
    id: 8,
    title: "Berlin Trip",
    date: "16th",
    month: "december",
    category: "travel",
    location: "berlin",
    imageUrl: berlinImg,
  },
];

const ActivityCard = ({ activity }) => {
  return (
    <Link to={`/activity/${activity.id}`}>
      <div
        className="group relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer font-sans"
        // Hier wird das Bild als Hintergrund gesetzt
        style={{
          backgroundImage: `url(${activity.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className="text-8xl font-bold leading-none">
          {activity.date.replace(/(th|st|nd|rd)$/i, "")}
        </div>
        <div className="text-lg font-semibold uppercase mt-1">
          {activity.month}
        </div>
      </div>

      {/* Titel und Kategorie am unteren Rand - Textfarbe auf Weiß geändert */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
        <div className="text-xs font-semibold uppercase tracking-widest drop-shadow-[0_3px_8px_rgba(0,0,0,1)]">
          {activity.category}
        </div>
        <div className="text-lg font-bold uppercase leading-tight mt-1 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
          {activity.title}
        </div>
      </div>
    </div>
    </Link>
  );
};

// Hauptkomponente: DiscoveryPage
export default function DiscoveryPage() {
  const [activities, setActivities] = useState(mockActivities);
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    time: "",
    category: "",
    status: "",
  });
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    // TODO: Später die API-Abfrage hier auslösen
  };

  const handleMouseEnter = (filterName) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setHoveredFilter(filterName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredFilter(null);
    }, 200); // 200ms delay before closing
    setCloseTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  // Einfache client-seitige Filterung (wird später auf Backend-Abfrage umgestellt)
  const filteredActivities = activities.filter((activity) => {
    // Filter nach Kategorie
    if (filters.category && activity.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    // Filter nach Location
    if (filters.location && activity.location.toLowerCase() !== filters.location.toLowerCase()) {
      return false;
    }
    // Filter nach Status (falls vorhanden)
    if (filters.status && activity.status && activity.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    return true;
  });

  // Dies ist das Layout gemäß dem Figma-Design
  const filterOptions = [
    {
      name: "location",
      label: "location",
      type: "text",
      options: [
        "riga",
        "berlin",
        "vienna",
        "paris",
        "amsterdam",
        "stockholm",
        "copenhagen",
        "tallinn",
        "vilnius",
        "warsaw",
        "prague",
        "budapest",
      ],
    },
    {
      name: "date",
      label: "date",
      type: "text",
      options: [
        "today",
        "tomorrow",
        "this week",
        "next week",
        "this month",
        "next month",
      ],
    },
    {
      name: "time",
      label: "time",
      type: "text",
      options: ["morning", "afternoon", "evening", "night", "all day"],
    },
    {
      name: "category",
      label: "category",
      type: "text",
      options: ["culture", "nature", "sport", "social", "travel", "food"],
    },
    {
      name: "status",
      label: "status",
      type: "text",
      options: ["open", "full"],
    },
  ];

  return (
    // Hier wurde 'bg-white' und 'text-black' hinzugefügt, um den weißen Hintergrund zu setzen.
    <div className="pt-12 pb-16 min-h-screen bg-white text-black px-4 sm:px-8 lg:px-16">
      {/* Filterzeile */}
      <div className="flex justify-center space-x-8 mb-20 text-gray-800 border-b border-gray-300 pb-2">
        {filterOptions.map((filter) => (
          <div
            key={filter.name}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(filter.name)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-lg font-light uppercase tracking-wider hover:text-cyan-800 transition duration-150">
              {filter.label}
            </button>

            {/* Simuliertes Dropdown (Wird später durch echte Select-Felder ersetzt) */}
            {hoveredFilter === filter.name && filter.options && (
              <div
                className="absolute left-0 mt-1 pt-1 p-2 bg-white border border-gray-200 shadow-xl rounded-lg z-20"
                onMouseEnter={() => handleMouseEnter(filter.name)}
                onMouseLeave={handleMouseLeave}
              >
                {filter.options.map((option) => (
                  <div
                    key={option}
                    className="py-1 px-3 text-gray-700 hover:bg-gray-100 cursor-pointer capitalize"
                    onClick={() => {
                      // Hier würden Sie den tatsächlichen Wert setzen
                      console.log(`Filter ${filter.name} set to: ${option}`);
                      handleFilterChange(filter.name, option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Aktivitäts-Gitter */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-xl">
          No activities found matching your criteria.
        </div>
      )}
    </div>
  );
}
