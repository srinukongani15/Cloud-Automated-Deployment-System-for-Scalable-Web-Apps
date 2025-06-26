import React from 'react';
import { CheckCircle, XCircle, Clock, GitCommit, Calendar } from 'lucide-react';

const DeploymentHistory: React.FC = () => {
  const deployments = [
    {
      id: 1,
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      message: 'Add new dashboard features',
      timestamp: '2 minutes ago',
      duration: '2m 34s',
      author: 'John Doe'
    },
    {
      id: 2,
      status: 'success',
      branch: 'feature/auth',
      commit: 'e4f5g6h',
      message: 'Implement user authentication',
      timestamp: '1 hour ago',
      duration: '3m 12s',
      author: 'Jane Smith'
    },
    {
      id: 3,
      status: 'failed',
      branch: 'hotfix/bug-123',
      commit: 'i7j8k9l',
      message: 'Fix critical security issue',
      timestamp: '3 hours ago',
      duration: '1m 45s',
      author: 'Mike Johnson'
    },
    {
      id: 4,
      status: 'success',
      branch: 'main',
      commit: 'm0n1o2p',
      message: 'Update dependencies',
      timestamp: '6 hours ago',
      duration: '4m 22s',
      author: 'Sarah Williams'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Deployment History</h3>
      
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(deployment.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(deployment.status)}`}>
                      {deployment.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{deployment.duration}</span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {deployment.message}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <GitCommit className="w-3 h-3" />
                      <span className="font-mono">{deployment.commit}</span>
                    </div>
                    <span>•</span>
                    <span>{deployment.branch}</span>
                    <span>•</span>
                    <span>{deployment.author}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                {deployment.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
        View all deployments
      </button>
    </div>
  );
};

export default DeploymentHistory;