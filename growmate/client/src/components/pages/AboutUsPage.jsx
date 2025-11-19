// using tailwind css for styling
// rest remains simple
export default function AboutUsPage() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About GrowMate</h1>

      <p className="text-gray-300 mb-6">
        GrowMate was created to bring people together through shared passions.
        We believe that real growth happens when individuals connect, collaborate,
        and learn from each other.
      </p>

      <p className="text-gray-300 mb-6">
        Our platform allows users to create their own activities or join existing
        ones. Whether you're into hiking, cooking, coding, fitness, or simply meeting
        new people — GrowMate helps you find the right community.
      </p>

      <p className="text-gray-400 italic">
        "Connecting people through shared passions — that’s what growth means to us."
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-300">
          We aim to make building real-world communities simple, meaningful,
          and accessible. GrowMate is a safe and inclusive space where everyone
          is welcome — regardless of background, skill level, or interest.
        </p>
      </div>
    </section>
  );
}
