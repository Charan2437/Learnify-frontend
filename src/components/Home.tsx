import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Calendar, Clock } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Transform Your Learning Journey with</span>
          <span className="block text-indigo-600">AI-Powered Course Planning</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Learnify helps you create personalized learning paths tailored to your goals, schedule, and preferred learning style.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <button
              onClick={() => navigate('/plan-course')}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Start Planning
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          How Learnify Works
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-indigo-100 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Choose Your Course</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Select the subject or skills you want to master
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-indigo-100 rounded-full p-3">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Set Your Schedule</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Define your start date and learning duration
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-indigo-100 rounded-full p-3">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Learning Style</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Choose your preferred way of learning
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-indigo-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">Get Your Plan</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Receive an AI-generated learning schedule
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 bg-indigo-50 rounded-2xl px-6 py-16 sm:px-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Create your personalized learning plan today and take the first step towards mastering new skills.
          </p>
          <button
            onClick={() => navigate('/plan-course')}
            className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Your First Course Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;