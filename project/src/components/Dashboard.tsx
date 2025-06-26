import React from 'react';
import PipelineStatus from './PipelineStatus';
import SystemMetrics from './SystemMetrics';
import DeploymentHistory from './DeploymentHistory';
import QuickActions from './QuickActions';
import LiveLogs from './LiveLogs';

const Dashboard: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <PipelineStatus />
          <DeploymentHistory />
          <LiveLogs />
        </div>
        
        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <QuickActions />
          <SystemMetrics />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;