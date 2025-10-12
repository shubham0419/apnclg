"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle, ExternalLink, Clock } from 'lucide-react';
import { topicsAPI } from '@/sevices/topics.service';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicsSuccess, fetchTopicsStart, fetchTopicsFailure } from '@/lib/features/topicsSlice';
import NavbarWrapper from '@/component/NavbarWrapper';

// Define types if not globally available
type Subtopic = {
  _id: string;
  name: string;
  level: string;
  isCompleted: boolean;
  links?: {
    leetcodeLink?: string;
    youtubeLink?: string;
    articleLink?: string;
  };
};

type Topic = {
  _id: string;
  name: string;
  isCompleted: boolean;
  completedCount: number;
  totalCount: number;
  subTopics: Subtopic[];
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [expandedTopics, setExpandedTopics] = useState<{[key: string]: boolean}>({});
  
  const [topicLoading, setTopicLoading] = useState(true);
  
  const [error, setError] = useState('');

  const user = useSelector((state: any) => state.auth.user);
  const topics: Topic[] = useSelector((state: any) => state.topics.topics);

  useEffect(() => {
    fetchTopics();
    // eslint-disable-next-line
  }, []);

  const fetchTopics = async () => {
    try {
      setTopicLoading(true);
      dispatch(fetchTopicsStart());
      const data = await topicsAPI.getAllTopics();
      dispatch(fetchTopicsSuccess(data.topics));
      setError('');
    } catch (err: any) {
      setError('Failed to load topics. Please try again.');
      dispatch(fetchTopicsFailure('Failed to load topics.'));
      console.error('Error fetching topics:', err);
    }
    finally {
      setTopicLoading(false);
    }
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Optimistically update UI after marking subtopic complete/incomplete
  const handleCompleteSubTopic = async (subTopicId: string, topicId: string) => {
    setTopicLoading(true);
    try {
      await topicsAPI.toggleSubTopic(subTopicId);
      // Refetch topics to update UI
      await fetchTopics();
    } catch (err) {
      console.error('Error completing subtopic:', err);
      alert('Failed to mark subtopic as complete. Please try again.');
    } finally {
      setTopicLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'EASY':
        return 'bg-green-100 text-green-700';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700';
      case 'HARD':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {topicLoading && 
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <div className="text-xl text-gray-600">Updating your progress...</div>
            </div>
      </div>}
      <NavbarWrapper heading="Dashboard">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Topics</h2>
          <p className="text-gray-600">Explore these exciting topics!</p>
        </div>

        {topics.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">No topics available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Topic Header */}
                <div
                  className="bg-cyan-400 p-5 cursor-pointer hover:bg-cyan-500 transition flex items-center justify-between"
                  onClick={() => toggleTopic(topic._id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-800">
                      {topic.name}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      topic.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {topic.isCompleted ? 'Done' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 font-medium">
                      {topic.completedCount}/{topic.totalCount} completed
                    </span>
                    {expandedTopics[topic._id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-700" />
                    )}
                  </div>
                </div>

                {/* SubTopics Table */}
                {expandedTopics[topic._id] && (
                  <div className="bg-blue-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Sub Topics
                    </h3>
                    <div className="overflow-x-auto rounded-lg">
                      <table className="w-full bg-white">
                        <thead>
                          <tr className="border-b-2 border-gray-300 bg-gray-50">
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              Name
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              LeetCode
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              YouTube
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              Article
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              Level
                            </th>
                            <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.subTopics.map((subTopic: Subtopic) => (
                            <tr
                              key={subTopic._id}
                              className="border-b border-gray-200 hover:bg-blue-50 transition"
                            >
                              <td className="py-4 px-4">
                                <div onClick={() => handleCompleteSubTopic(subTopic._id, topic._id)} className="flex items-center gap-2">
                                  {subTopic.isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <span className="text-gray-800 font-medium">
                                    {subTopic.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                {subTopic.links?.leetcodeLink && (
                                  <a
                                    href={subTopic.links.leetcodeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                                  >
                                    Practice
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                {subTopic.links?.youtubeLink && (
                                  <a
                                    href={subTopic.links.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                                  >
                                    Watch
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                {subTopic.links?.articleLink && (
                                  <a
                                    href={subTopic.links.articleLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                                  >
                                    Read
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                                    subTopic.level
                                  )}`}
                                >
                                  {subTopic.level}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                {subTopic.isCompleted ? (
                                  <span className="text-green-600 font-semibold flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" />
                                    Done
                                  </span>
                                ) : (
                                  <span className="text-orange-600 font-semibold flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Pending
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      </NavbarWrapper>
    </div>
  );
};

export default Dashboard;