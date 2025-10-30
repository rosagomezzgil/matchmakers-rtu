import App from './App.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-serif">GrowMate</h1>

      <p className="text-gray-400 mt-2 font-sans">
        Tailwind is working 🎨
      </p>

      <button className="mt-6 px-6 py-3 bg-white text-black rounded-2xl shadow hover:bg-neutral-200 transition">
        Log in
      </button>
    </div>
  );
}