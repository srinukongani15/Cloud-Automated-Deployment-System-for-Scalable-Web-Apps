import React from 'react';
import { Play, Square, RotateCcw, Download, Settings, Github, Slack } from 'lucide-react';
import { useDeployment } from '../context/DeploymentContext';

const QuickActions: React.FC = () => {
  const { isRunning, startPipeline, stopPipeline } = useDeployment();

  const actions = [
    {
      name: 'GitHub',
      icon: Github,
      status: 'connected',
      color: 'green'
    },
    {
      name: 'Docker',
      icon: Settings,
      status: 'running',
      color: 'blue'
    },
    {
      name: 'AWS EC2',
      icon: Settings,
      status: 'healthy',
      color: 'green'
    },
    {
      name: 'Slack',
      icon: Slack,
      status: 'connected',
      color: 'green'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'running':
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Controls</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startPipeline}
            disabled={isRunning}
            className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Play className="w-4 h-4 mr-2" />
            Deploy
          </button>
          
          <button
            onClick={stopPipeline}
            disabled={!isRunning}
            className="flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
            <RotateCcw className="w-4 h-4 mr-2" />
            Rollback
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Logs
          </button>
        </div>
      </div>

      {/* Service Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Status</h3>
        
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">{action.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                  {action.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;