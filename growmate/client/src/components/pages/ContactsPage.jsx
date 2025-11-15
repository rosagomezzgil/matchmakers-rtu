export default function ContactsPage() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="max-w-2xl text-gray-300 mb-8">
        Have questions, feedback, or business inquiries?  
        We're happy to hear from you. Reach out using one of the options below.
      </p>

      <div className="space-y-4 text-lg">
        <p>
          📧 <span className="text-green-400">support@growmate.io</span>
        </p>
        <p>📍 Riga, Latvia</p>
        <p>☎️ +371 421 44278</p>
      </div>

      <p className="mt-12 text-gray-400 text-sm max-w-xl">
        We usually reply within 24 hours.
      </p>
    </section>
  );
}
