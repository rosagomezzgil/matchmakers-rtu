export default function ActivityDateCard({ activity }) {
  const { date, month, title, imageUrl } = activity;
  const displayDate = date ? date.toString() : "--";

  return (
    <div className="block relative overflow-hidden rounded-xl shadow-lg aspect-[3/4]">
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
          <p className="text-5xl font-extrabold leading-none">{displayDate}</p>
          <p className="text-base font-semibold tracking-widest uppercase">{month}</p>
        </div>
        <div className="text-left">
          <p className="text-lg font-bold uppercase leading-snug">{title}</p>
        </div>
      </div>
    </div>
  );
}