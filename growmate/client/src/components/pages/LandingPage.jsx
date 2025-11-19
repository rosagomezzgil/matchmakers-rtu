import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";


// to use tailwind css type that line in the terminal at the project root:
// npm install -D tailwindcss postcss autoprefixer 

export default function LandingPage() {
  return (
    // Main hero section with full-screen background image
    <section
      className="fixed inset-0 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${hero})`,     // load hero image from assets
        backgroundSize: "cover",             // make image cover the screen
        backgroundPosition: "center",         // center image
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        zIndex: 0,
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content stays on top of the background */}
      <div className="relative z-10 text-center flex flex-col items-center h-full">
        
        {/* title and tagline on top of hero */}
        <div className="pt-80">
          <h1 className="text-5xl font-bold mb-8">Welcome to GrowMate</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-16">
            Find activities, meet new people and grow together.
          </p>
        </div>

        {/* login + register buttons at the mid bottom center */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-auto pb-80">
          <Link
            to="/signin"
            className="flex-1 min-w-[180px] text-center px-8 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="flex-1 min-w-[180px] text-center px-8 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}