import React from 'react';
import { Cpu, HardDrive, Activity, Server } from 'lucide-react';

const SystemMetrics: React.FC = () => {
  const metrics = [
    { name: 'CPU Usage', value: 42, icon: Cpu, color: 'blue' },
    { name: 'Memory', value: 68, icon: Activity, color: 'green' },
    { name: 'Storage', value: 35, icon: HardDrive, color: 'purple' },
    { name: 'Network', value: 78, icon: Server, color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">System Metrics</h3>
      
      <div className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{metric.value}%</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(metric.color)} transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Active Containers:</span>
          <span className="font-semibold text-gray-900 dark:text-white">8</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
          <span className="font-semibold text-green-600 dark:text-green-400">99.9%</span>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;