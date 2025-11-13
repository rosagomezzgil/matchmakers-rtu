import { Link } from "react-router-dom";

export function ActivityCard({ activity }) {
  const { id, date, month, title, category, imageUrl } = activity;

  return (
    <Link 
      to={`/activity/${id}`} // Beispielpfad zur Detailseite
      className="block relative overflow-hidden rounded-xl shadow-lg aspect-[3/4] hover:shadow-xl transition-shadow duration-300"
    >
      {/* Hintergrundbild */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dunkle Overlay für besseren Textkontrast */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Inhalt: Datum und Titel */}
      <div className="relative p-4 flex flex-col justify-end h-full text-white">
        <div className="text-right mb-1">
          <p className="text-5xl font-extrabold leading-none">{date}th</p> {/* th hinzugefügt, wie im Bild */}
          <p className="text-base font-semibold tracking-widest uppercase">{month}</p>
        </div>
        <div className="text-left">
          <p className="text-xs font-light uppercase opacity-80">{category}</p>
          <p className="text-lg font-bold uppercase leading-snug">{title}</p>
        </div>
      </div>
    </Link>
  );
}