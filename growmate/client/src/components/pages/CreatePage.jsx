import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    time: '',
    address: '',
    capacity: 2,
    difficulty: 'easy',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description,
        date_time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        location: formData.address,
        capacity: Number(formData.capacity),
        difficulty: formData.difficulty,
      };

      const res = await fetch(`${API_BASE_URL}/api/activity/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create activity");
      }

      // Clear form and go back to discovery
      setFormData({
        title: '',
        category: '',
        description: '',
        date: '',
        time: '',
        address: '',
        capacity: 2,
        difficulty: 'easy',
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['culture', 'nature', 'sport', 'social', 'travel', 'food'];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Create New Activity</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
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

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors disabled:bg-gray-500"
          >
            {submitting ? "Creating..." : "Create Activity"}
          </button>
        </div>
      </form>
    </div>
  );
}