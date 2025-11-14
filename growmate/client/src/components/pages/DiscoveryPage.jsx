import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/AuthContext.jsx';
// Hier würden wir den ActivityService importieren, den wir als Nächstes erstellen

// Mock-Daten für das erste Design (wird durch API/Fallback ersetzt)
const mockActivities = [
  { id: 1, title: "Visiting MezaPark", date: "10th", month: "october", category: "nature", location: "berlin", imageUrl: "https://placehold.co/400x600/1e293b/FFF?text=MezaPark" },
  { id: 2, title: "Going to the Beach", date: "18th", month: "october", category: "nature", location: "duesseldorf", imageUrl: "https://placehold.co/400x600/94a3b8/FFF?text=Beach+Trip" },
  { id: 3, title: "Museum Visit", date: "23rd", month: "october", category: "culture", location: "hamburg", imageUrl: "https://placehold.co/400x600/334155/FFF?text=Museum+Visit" },
  { id: 4, title: "Ski Trip to Austria", date: "28th", month: "october", category: "sport", location: "munich", imageUrl: "https://placehold.co/400x600/475569/FFF?text=Ski+Trip" },
  { id: 5, title: "Going on a Walk", date: "2nd", month: "november", category: "nature", location: "bremen", imageUrl: "https://placehold.co/400x600/64748b/FFF?text=Walk" },
  { id: 6, title: "Hiking the Alps", date: "11th", month: "november", category: "nature", location: "hannover", imageUrl: "https://placehold.co/400x600/0f172a/FFF?text=Hiking" },
  // Weitere Aktivitäten, um das Gitter zu füllen
  { id: 7, title: "Apres Ski", date: "17th", month: "november", category: "sport", location: "berlin", imageUrl: "https://placehold.co/400x600/525252/FFF?text=Apres+Ski" },
  { id: 8, title: "City Trip to Berlin", date: "24th", month: "november", category: "travel", location: "duesseldorf", imageUrl: "https://placehold.co/400x600/9ca3af/FFF?text=City+Trip" },
];

// Einzelne Aktivitätskarte
const ActivityCard = ({ activity }) => {
    return (
        <div 
            className="group relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            // Hier wird das Bild als Hintergrund gesetzt
            style={{ 
                backgroundImage: `url(${activity.imageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                fontFamily: 'serif' 
            }}
        >
            {/* Overlay für den Textkontrast. 
                Das ursprüngliche weiße Overlay, das die Karte weiß gemacht hat, wurde durch ein dunkles ersetzt.
            */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition duration-300"></div>

            {/* Datum / Monat - Textfarbe auf Weiß geändert und Datum größer gemacht */}
            <div className="absolute top-4 right-4 text-center text-white p-2">
                {/* Entferne 'th', um nur die Zahl groß anzuzeigen, wie im Figma-Design */}
                <div className="text-4xl font-extrabold font-serif leading-none">{activity.date.replace('th', '')}</div>
                <div className="text-xs font-light tracking-widest uppercase">{activity.month}</div>
            </div>

            {/* Titel und Kategorie am unteren Rand - Textfarbe auf Weiß geändert */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-xs font-medium uppercase tracking-widest opacity-80">{activity.category}</div>
                <div className="text-xl font-semibold leading-tight mt-1">{activity.title}</div>
            </div>
        </div>
    );
};


// Hauptkomponente: DiscoveryPage
export default function DiscoveryPage() {
    const [activities, setActivities] = useState(mockActivities);
    const [filters, setFilters] = useState({
        location: '',
        date: '',
        time: '',
        category: '',
        status: '',
    });
    const [hoveredFilter, setHoveredFilter] = useState(null);
    const [closeTimeout, setCloseTimeout] = useState(null);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
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
    const filteredActivities = activities.filter(activity => {
        // Hier würden wir die Filterlogik implementieren, sobald wir den ActivityService haben
        return true; 
    });


    // Dies ist das Layout gemäß dem Figma-Design     
    const filterOptions = [
        { name: 'location', label: 'location', type: 'text', options: ['berlin', 'düsseldorf', 'hannover', 'bremen', 'hamburg', 'munich'] },
        { name: 'date', label: 'date', type: 'text', options: ['today', 'tomorrow', 'this week', 'next week', 'this month', 'next month'] },
        { name: 'time', label: 'time', type: 'text', options: ['morning', 'afternoon', 'evening', 'night', 'all day'] },
        { name: 'category', label: 'category', type: 'text', options: ['culture', 'nature', 'sport', 'social', 'travel', 'food'] },
        { name: 'status', label: 'status', type: 'text', options: ['open', 'full', 'imminent'] },
    ];
    
    return (
        // Hier wurde 'bg-white' und 'text-black' hinzugefügt, um den weißen Hintergrund zu setzen.
        <div className="pt-12 pb-16 min-h-screen bg-white text-black px-4 sm:px-8 lg:px-16">
            {/* Filterzeile */}
            <div className="flex justify-center space-x-8 mb-20 text-gray-800 border-b border-gray-300 pb-2">
                {filterOptions.map(filter => (
                    <div 
                        key={filter.name} 
                        className="relative group"
                        onMouseEnter={() => handleMouseEnter(filter.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button 
                            className="text-lg font-light uppercase tracking-wider hover:text-cyan-800 transition duration-150"
                        >
                            {filter.label} 
                        </button>
                        
                        {/* Simuliertes Dropdown (Wird später durch echte Select-Felder ersetzt) */}
                        {hoveredFilter === filter.name && filter.options && (
                             <div 
                                className="absolute left-0 mt-1 pt-1 p-2 bg-white border border-gray-200 shadow-xl rounded-lg z-20"
                                onMouseEnter={() => handleMouseEnter(filter.name)}
                                onMouseLeave={handleMouseLeave}
                             >
                                {filter.options.map(option => (
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
                {filteredActivities.map(activity => (
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