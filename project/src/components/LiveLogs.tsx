import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Download, X } from 'lucide-react';

const LiveLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const sampleLogs = [
    '[2024-01-15 10:30:15] Starting deployment pipeline...',
    '[2024-01-15 10:30:16] Cloning repository from GitHub...',
    '[2024-01-15 10:30:18] Repository cloned successfully',
    '[2024-01-15 10:30:19] Installing dependencies...',
    '[2024-01-15 10:30:25] Dependencies installed successfully',
    '[2024-01-15 10:30:26] Building Docker image...',
    '[2024-01-15 10:30:35] Docker image built: app:latest',
    '[2024-01-15 10:30:36] Pushing to container registry...',
    '[2024-01-15 10:30:42] Image pushed successfully',
    '[2024-01-15 10:30:43] Deploying to AWS EC2...',
    '[2024-01-15 10:30:48] Container started on port 80',
    '[2024-01-15 10:30:49] Health check passed',
    '[2024-01-15 10:30:50] Deployment completed successfully',
    '[2024-01-15 10:30:51] Sending Slack notification...',
    '[2024-01-15 10:30:52] Pipeline completed in 37 seconds'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleLogs.length) {
        setLogs(prev => [...prev, sampleLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Deployment Logs</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Live
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className={`bg-gray-900 text-green-400 font-mono text-sm transition-all duration-300 ${
        isExpanded ? 'h-96' : 'h-48'
      } overflow-y-auto`}>
        <div className="p-4 space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="opacity-90 hover:opacity-100 transition-opacity duration-200">
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
};

export default LiveLogs;