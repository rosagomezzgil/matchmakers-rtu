import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";

export default function LandingPage() {
  return (
    <section
      className="fixed inset-0 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        zIndex: 0,
      }}
    >
      {/* Overlay, damit Text sichtbar bleibt */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Inhalt */}
      <div className="relative z-10 text-center" style={{ zIndex: 10 }}>
        <h1 className="text-5xl font-bold mb-4">Welcome to GrowMate</h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-16">
          Find activities, meet new people and grow together.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signin"
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}