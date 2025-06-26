import React from 'react';
import { Play, CheckCircle, XCircle, Clock, GitBranch, Pocket as Docker, Cloud, MessageSquare } from 'lucide-react';
import { useDeployment } from '../context/DeploymentContext';

const PipelineStatus: React.FC = () => {
  const { currentPipeline, isRunning } = useDeployment();
  
  const stages = [
    { name: 'Source', icon: GitBranch, status: currentPipeline.source },
    { name: 'Build', icon: Docker, status: currentPipeline.build },
    { name: 'Deploy', icon: Cloud, status: currentPipeline.deploy },
    { name: 'Notify', icon: MessageSquare, status: currentPipeline.notify },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'running':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pipeline Status</h2>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isRunning ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                     : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {isRunning ? 'Running' : 'Idle'}
          </span>
          <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200">
            <Play className="w-4 h-4 mr-1.5" />
            Deploy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.name}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${getStatusColor(stage.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                {getStatusIcon(stage.status)}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">{stage.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{stage.status}</p>
              
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last deployment:</span>
          <span className="font-medium text-gray-900 dark:text-white">2 minutes ago</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-600 dark:text-gray-400">Branch:</span>
          <span className="font-mono text-blue-600 dark:text-blue-400">main</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-600 dark:text-gray-400">Commit:</span>
          <span className="font-mono text-gray-900 dark:text-white">a1b2c3d</span>
        </div>
      </div>
    </div>
  );
};

export default PipelineStatus;