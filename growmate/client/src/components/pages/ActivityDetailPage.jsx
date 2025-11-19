import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityDateCard from "../widgets/ActivityDateCard.jsx";
import { useSavedActivities } from "../../contexts/SavedActivitiesContext.jsx";
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

const formatDateText = (isoDate) => {
  if (!isoDate) return { date: "", month: "" };
  const d = new Date(isoDate);
  const day = d.getUTCDate();
  const month = d.toLocaleString("en-US", { month: "long" }).toLowerCase();

  const suffix = (() => {
    if (day >= 11 && day <= 13) return "th";
    const lastDigit = day % 10;
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  })();

  return { date: `${day}${suffix}`, month };
};

export default function ActivityDetailPage() {
  const { id } = useParams();
  const {
    saveActivity,
    isActivitySaved,
    removeActivity,
    joinActivity,
    leaveActivity,
    isActivityJoined,
  } = useSavedActivities();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/activity/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("Activity not found");
        }
        const data = await res.json();
        const { date, month } = formatDateText(data.date_time);
        setActivity({
          id: data._id,
          title: data.title,
          category: data.category,
          description:
            data.description ||
            "No description has been provided for this activity yet.",
          date,
          month,
          time: data.date_time
            ? new Date(data.date_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          address: data.location,
          capacity: data.capacity ?? 0,
          status: data.status ?? "open",
          difficulty: data.difficulty ?? "easy",
          initialisedBy: data.organizer_id ? "community host" : "growmate",
          imageUrl:
            (data.imageKey && activityImages[data.imageKey]) || galleryImg,
          imageKey: data.imageKey ?? null,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setActivity(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDetail();

    return () => controller.abort();
  }, [id]);

  const saved = isActivitySaved(id);
  const joined = isActivityJoined(id);

  const handleSave = () => {
    if (!activity) return;
    if (saved) {
      removeActivity(id);
    } else {
      saveActivity({
        id: activity.id,
        title: activity.title,
        category: activity.category,
        date: activity.date,
        month: activity.month,
        imageKey: activity.imageKey,
        imageUrl: activity.imageUrl,
      });
    }
  };

  const handleJoin = () => {
    if (!activity) return;
    if (activity.status === "full" && !joined) {
      alert("This activity is already full!");
      return;
    }

    if (joined) {
      leaveActivity(id);
    } else {
      joinActivity({
        id: activity.id,
        title: activity.title,
        category: activity.category,
        date: activity.date,
        month: activity.month,
        imageKey: activity.imageKey,
        imageUrl: activity.imageUrl,
      });
      alert(`You joined "${activity.title}"!`);
    }
  };

  const primaryColor = "bg-gray-700 hover:bg-gray-800";
  const saveColor = "bg-yellow-400 hover:bg-yellow-500 text-gray-800";

  if (loading) {
    return (
      <div className="py-8 text-gray-800">
        <p>Loading activity...</p>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="py-8 text-gray-800">
        <p>{error || "Activity not found"}</p>
      </div>
    );
  }

  return (
    <div className="py-8 text-gray-800">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3 space-y-6">
          <ActivityDateCard activity={activity} />

          <div className="text-sm space-y-1">
            <p className="flex justify-between">
              <span className="font-semibold">capacity</span>
              <span>{activity.capacity} people</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">status</span>
              <span>{activity.status}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">difficulty</span>
              <span>{activity.difficulty}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">initialised by</span>
              <span>{activity.initialisedBy}</span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase">{activity.title}</h2>
            <p className="text-sm uppercase text-gray-500">
              {activity.category}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-300 text-base">
              {activity.description}
            </div>
          </div>

          <div className="space-y-4 mb-10 text-sm">
            <div className="flex">
              <span className="font-semibold w-20">time</span>
              <span>{activity.time || "TBD"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-20">address</span>
              <span>{activity.address}</span>
            </div>
          </div>

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
            >
              {joined
                ? "Leave activity"
                : activity.status === "full"
                ? "Activity Full"
                : "Join activity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}