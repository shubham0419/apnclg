'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, TrendingUp, Target } from 'lucide-react';
import { useSelector } from 'react-redux';
import { topicsAPI } from '@/sevices/topics.service';
import { authAPI } from '@/sevices/auth.service';
import NavbarWrapper from '@/component/NavbarWrapper';

interface ProgressCardProps {
  level: string;
  color: string;
  icon: React.ElementType;
  percentage: number;
  completed: number;
  total: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  level,
  color,
  icon: Icon,
  percentage,
  completed,
  total,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 capitalize">{level}</h3>
          <p className="text-sm text-gray-500">Difficulty Level</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
        <div className="text-sm text-gray-500">
          {completed}/{total}
        </div>
      </div>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>

    <div className="mt-3 text-sm text-gray-600">
      {completed} out of {total} topics completed
    </div>
  </div>
);

export default function ProgressPage() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const res = await topicsAPI.getUserProgress();
        setProgress(res.progress);
        setError('');
      } catch (err: any) {
        setError('Failed to load progress. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  const getLevelConfig = (level: string) => {
    const configs: { [key: string]: any } = {
      easy: {
        color: 'bg-green-500',
        icon: Target,
        label: 'Easy',
      },
      medium: {
        color: 'bg-yellow-500',
        icon: TrendingUp,
        label: 'Medium',
      },
      hard: {
        color: 'bg-red-500',
        icon: Award,
        label: 'Hard',
      },
    };
    return configs[level];
  };

  if (loading || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
        <NavbarWrapper heading="Progress">
          <div className='flex justify-center items-center h-[90vh]'>
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <div className="text-xl text-gray-600">Loading your progress...</div>
            </div>
          </div>
        </NavbarWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavbarWrapper heading="Progress">


        <div className="max-w-7xl mx-auto px-8 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Overall Progress Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Overall Progress</h2>
                <p className="text-gray-600 mt-1">Your complete learning statistics</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {progress.percentages.overall}%
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {progress.totalCompleted} of {progress.totalSubTopics} completed
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${progress.percentages.overall}%` }}
              >
                {progress.percentages.overall > 10 && (
                  <span className="text-white text-sm font-semibold">
                    {progress.percentages.overall}%
                  </span>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-3xl font-bold text-green-700">
                  {progress.counts.easy.completed}
                </div>
                <div className="text-sm text-green-600 mt-1">Easy Completed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <div className="text-3xl font-bold text-yellow-700">
                  {progress.counts.medium.completed}
                </div>
                <div className="text-sm text-yellow-600 mt-1">Medium Completed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <div className="text-3xl font-bold text-red-700">
                  {progress.counts.hard.completed}
                </div>
                <div className="text-sm text-red-600 mt-1">Hard Completed</div>
              </div>
            </div>
          </div>

          {/* Individual Level Progress */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress by Difficulty</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['easy', 'medium', 'hard'].map((level) => {
              const config = getLevelConfig(level);
              return (
                <ProgressCard
                  key={level}
                  level={config.label}
                  color={config.color}
                  icon={config.icon}
                  percentage={progress.percentages[level]}
                  completed={progress.counts[level].completed}
                  total={progress.counts[level].total}
                />
              );
            })}
          </div>

          {/* Motivational Section */}
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Keep Going! 🚀</h3>
                <p className="text-purple-100">
                  {progress.totalCompleted < progress.totalSubTopics / 2
                    ? "You're making great progress! Keep learning every day."
                    : progress.totalCompleted < progress.totalSubTopics
                      ? "You're more than halfway there! Don't stop now!"
                      : "Congratulations! You've completed all topics! 🎉"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">
                  {Math.round((progress.totalCompleted / progress.totalSubTopics) * 100)}%
                </div>
                <div className="text-purple-100 text-sm">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </NavbarWrapper>
    </div>
  );
}