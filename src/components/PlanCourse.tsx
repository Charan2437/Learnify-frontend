import React, { useState } from 'react';
import { Calendar, Book, Clock, Brain } from 'lucide-react';
import { toast } from 'react-hot-toast';

const learningStyles = [
  { id: 'visual', name: 'Visual', description: 'Learn through images, diagrams, and videos' },
  { id: 'auditory', name: 'Auditory', description: 'Learn through listening and discussion' },
  { id: 'reading', name: 'Reading/Writing', description: 'Learn through reading and note-taking' },
  { id: 'kinesthetic', name: 'Kinesthetic', description: 'Learn through hands-on practice' }
];

function PlanCourse() {
  const [formData, setFormData] = useState({
    courseName: '',
    startDate: '',
    duration: '',
    learningStyle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    toast.success('Course plan created! Check your dashboard for the AI-generated schedule.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create Your Learning Plan
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Name */}
          <div className="space-y-2">
            <label className="flex items-center text-lg font-medium text-gray-700">
              <Book className="w-5 h-5 mr-2 text-indigo-600" />
              What do you want to learn?
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="e.g., Web Development, Machine Learning, Digital Marketing"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="flex items-center text-lg font-medium text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              When do you want to start?
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="flex items-center text-lg font-medium text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              How many days can you commit?
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              max="365"
              placeholder="Enter number of days"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Learning Style */}
          <div className="space-y-4">
            <label className="flex items-center text-lg font-medium text-gray-700">
              <Brain className="w-5 h-5 mr-2 text-indigo-600" />
              What's your preferred learning style?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningStyles.map(style => (
                <div
                  key={style.id}
                  className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                    formData.learningStyle === style.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, learningStyle: style.id }))}
                >
                  <input
                    type="radio"
                    name="learningStyle"
                    value={style.id}
                    checked={formData.learningStyle === style.id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{style.name}</h3>
                    <p className="text-sm text-gray-500">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            Generate My Learning Plan
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlanCourse;