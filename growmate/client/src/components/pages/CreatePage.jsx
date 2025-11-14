import React, { useState } from 'react';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    time: '',
    address: '',
    capacity: 2,
    difficulty: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In einer echten App würde hier ein API-Call zum Backend gesendet werden:
    // fetch('/api/activity/create', { method: 'POST', body: JSON.stringify(formData) })
    console.log('Activity submitted:', formData);

    // TODO: Navigation zurück zur DiscoveryPage nach Erstellung
  };

  const categories = ['culture', 'nature', 'sport', 'social', 'travel', 'food'];
  const difficulties = ['low', 'medium', 'high'];

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Create New Activity</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Erste Zeile: Titel und Kategorie */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Hiking the Alps"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500 transition"
            >
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className='capitalize'>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Beschreibung */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the activity, what to bring, and expectations."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        {/* Dritte Zeile: Datum, Zeit, Kapazität, Schwierigkeit */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Datum */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Zeit */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Kapazität */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="2"
              required
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          
          {/* Schwierigkeit */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              required
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500 transition"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff} className='capitalize'>{diff}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Adresse */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address / Location
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Exact meeting spot or general location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors"
          >
            Create Activity
          </button>
        </div>
      </form>
    </div>
  );
}