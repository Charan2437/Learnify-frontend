import React, { useState, useEffect } from 'react';
import { Book, Calendar, Brain, CheckCircle, Circle, ExternalLink, Edit2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Task {
  title: string;
  description: string;
  resourceUrls: string[];
  status: 'pending' | 'completed';
}

interface DayPlan {
  day: string;
  tasks: Task[];
}

interface CoursePlan {
  id: string;
  userId: string;
  name: string;
  numberOfDays: number;
  startDate: string;
  preferredLearningStyle: string[];
  studyPlan: DayPlan[];
}

function ViewCourse() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coursePlan, setCoursePlan] = useState<CoursePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8081/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCoursePlan(response.data);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || error.message;
        setError(typeof message === 'string' ? message : 'Failed to fetch course');
        toast.error(typeof message === 'string' ? message : 'Failed to fetch course');
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskStatusToggle = async (dayIndex: number, taskIndex: number) => {
    if (!coursePlan) return;

    // Check if previous days' tasks are completed
    for (let i = 0; i < dayIndex; i++) {
      const previousDayTasks = coursePlan.studyPlan[i].tasks;
      if (previousDayTasks.some(task => task.status === 'pending')) {
        toast.error('Please complete previous days\'s tasks first');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const newCoursePlan = { ...coursePlan };
      const task = newCoursePlan.studyPlan[dayIndex].tasks[taskIndex];
      task.status = task.status === 'pending' ? 'completed' : 'pending';

      await axios.put(
        `http://localhost:8081/api/courses/${id}`,
        newCoursePlan,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCoursePlan(newCoursePlan);
      toast.success(`Task marked as ${task.status}`);
    } catch (error) {
      toast.error('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  };

  const handleSave = async () => {
    if (!coursePlan) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/courses/${id}`,
        coursePlan,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsEditing(false);
      toast.success('Course plan updated successfully!');
    } catch (error) {
      toast.error('Failed to update course plan');
      console.error('Error updating course plan:', error);
    }
  };

  const handleTaskEdit = (dayIndex: number, taskIndex: number, field: keyof Task, value: string) => {
    if (!coursePlan) return;

    const newCoursePlan = { ...coursePlan };
    const task = newCoursePlan.studyPlan[dayIndex].tasks[taskIndex];
    if (field === 'resourceUrls') {
      task[field] = value.split('\n').filter(url => url.trim() !== '');
    } else {
      task[field] = value as any;
    }
    setCoursePlan(newCoursePlan);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !coursePlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error || 'Course not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Course Header */}
        <div className="bg-indigo-600 px-6 py-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{coursePlan.name}</h1>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Start Date: {new Date(coursePlan.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  <span>{coursePlan.numberOfDays} Days Course</span>
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  <span>Learning Style: {coursePlan.preferredLearningStyle.join(', ')}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5 mr-2" />
                  Edit Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Study Plan */}
        <div className="p-6">
          {coursePlan.studyPlan.map((day, dayIndex) => (
            <div key={day.day} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{day.day}</h2>
              <div className="space-y-6">
                {day.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className={`bg-gray-50 rounded-lg p-6 ${
                      task.status === 'completed' ? 'border-l-4 border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={task.title}
                            onChange={(e) => handleTaskEdit(dayIndex, taskIndex, 'title', e.target.value)}
                            className="w-full text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-2 mb-2"
                          />
                        ) : (
                          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        )}
                        {isEditing ? (
                          <textarea
                            value={task.description}
                            onChange={(e) => handleTaskEdit(dayIndex, taskIndex, 'description', e.target.value)}
                            className="w-full text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2 mt-2"
                            rows={3}
                          />
                        ) : (
                          <p className="text-gray-600 mt-1">{task.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleTaskStatusToggle(dayIndex, taskIndex)}
                        className={`ml-4 ${task.status === 'completed' ? 'text-green-500' : 'text-gray-400 hover:text-green-500'} transition-colors`}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                    </div>

                    {/* Resources */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
                      {isEditing ? (
                        <textarea
                          value={task.resourceUrls.join('\n')}
                          onChange={(e) => handleTaskEdit(dayIndex, taskIndex, 'resourceUrls', e.target.value)}
                          className="w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2"
                          rows={task.resourceUrls.length + 1}
                          placeholder="Enter URLs (one per line)"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {task.resourceUrls.map((url, urlIndex) => (
                            <li key={urlIndex}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                {url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;