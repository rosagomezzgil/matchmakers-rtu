import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

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

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const activityImages = {
  beach: beachImg,
  berlin: berlinImg,
  gallery: galleryImg,
  ski: skiImg,
  mountain: mountainImg,
  green: greenImg,
  water: waterImg,
  coffee: coffeeImg,
  bottom: bottomImg,
  cliff: cliffImg,
  swell: swellImg,
  sea: seaImg,
};

const formatDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return `${day}th`;
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

const transformActivity = (raw) => {
  if (!raw) return null;
  const date = raw.date ? parseInt(raw.date, 10) : null;
  const month = raw.month || null;
  const parsedDate = raw.date_time ? new Date(raw.date_time) : null;

  const derivedDay = parsedDate ? parsedDate.getUTCDate() : date;
  const derivedMonth = parsedDate
    ? parsedDate.toLocaleString("en-US", { month: "long" }).toLowerCase()
    : month;

  return {
    id: raw._id || raw.id,
    title: raw.title,
    category: raw.category,
    location: raw.location,
    status: raw.status ?? "open",
    month: derivedMonth ?? "",
    date: derivedDay ? formatDaySuffix(derivedDay) : "",
    imageUrl:
      raw.imageUrl ||
      (raw.imageKey ? activityImages[raw.imageKey] : galleryImg),
    description: raw.description ?? "",
  };
};

const ActivityCard = ({ activity }) => {
  return (
    <Link to={`/activity/${activity.id}`}>
      <div
        className="group relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer font-sans"
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
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  // Fetch activities from API
  useEffect(() => {
    const controller = new AbortController();

    const loadActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/activity`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("Failed to load activities");
        }
        const data = await res.json();
        const mapped = data
          .map((item) => transformActivity(item))
          .filter(Boolean);
        setActivities(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Activity fetch error:", err);
          setError(err.message);
          setActivities([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadActivities();

    return () => {
      controller.abort();
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  // Einfache client-seitige Filterung (wird später auf Backend-Abfrage umgestellt)
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (
        filters.category &&
        activity.category.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.location &&
        activity.location.toLowerCase() !== filters.location.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.status &&
        activity.status &&
        activity.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [activities, filters]);

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

      {loading && (
        <div className="text-center py-16 text-gray-500 text-xl">
          Loading activities...
        </div>
      )}

      {error && (
        <div className="text-center py-16 text-red-500 text-xl">
          {error} — add the seed data from `data/mock-activities.json` to your
          database or try again later.
        </div>
      )}

      {!loading && !error && (
        <>
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
        </>
      )}
    </div>
  );
}
