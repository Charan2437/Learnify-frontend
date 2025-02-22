import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, Brain, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Course {
  id: string;
  name: string;
  startDate: string;
  numberOfDays: number;
  preferredLearningStyle: string[];
  progress: number;
}

function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/courses/mycourses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to fetch courses'
          : 'Failed to fetch courses';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <button
          onClick={() => navigate('/plan-course')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">You haven't created any courses yet.</h2>
          <button
            onClick={() => navigate('/plan-course')}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{course.name}</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>Starts {new Date(course.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Book className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{course.numberOfDays} Days Course</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{course.preferredLearningStyle.join(', ')}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <ArrowRight className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;