export default function FAQPage() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What is GrowMate?</h2>
          <p className="text-gray-300">
            GrowMate is a community platform where users can create activities
            or join existing ones — from sports and learning to creative projects
            and social events.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Is GrowMate free?</h2>
          <p className="text-gray-300">
            Yes, GrowMate is free to use. Optional premium features may be
            introduced in the future for advanced group management and analytics.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How do I create an activity?</h2>
          <p className="text-gray-300">
            Simply sign in, click <span className="text-green-400">“Create Activity”</span>,
            and add details such as location, date, description, and participant limit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How is my privacy protected?</h2>
          <p className="text-gray-300">
            You control what information you want to share. GrowMate only displays
            your first name and an optional profile picture. Private data is never
            made public.
          </p>
        </div>
      </div>
    </section>
  );
}
