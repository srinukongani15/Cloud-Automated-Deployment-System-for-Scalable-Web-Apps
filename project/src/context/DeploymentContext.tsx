import React, { createContext, useContext, useState, useEffect } from 'react';

interface PipelineStatus {
  source: string;
  build: string;
  deploy: string;
  notify: string;
}

interface DeploymentContextType {
  currentPipeline: PipelineStatus;
  isRunning: boolean;
  startPipeline: () => void;
  stopPipeline: () => void;
}

const DeploymentContext = createContext<DeploymentContextType | undefined>(undefined);

export const DeploymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPipeline, setCurrentPipeline] = useState<PipelineStatus>({
    source: 'success',
    build: 'success',
    deploy: 'success',
    notify: 'success'
  });
  const [isRunning, setIsRunning] = useState(false);

  const startPipeline = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentPipeline({
      source: 'running',
      build: 'pending',
      deploy: 'pending',
      notify: 'pending'
    });

    // Simulate pipeline stages
    setTimeout(() => {
      setCurrentPipeline(prev => ({ ...prev, source: 'success', build: 'running' }));
    }, 2000);

    setTimeout(() => {
      setCurrentPipeline(prev => ({ ...prev, build: 'success', deploy: 'running' }));
    }, 5000);

    setTimeout(() => {
      setCurrentPipeline(prev => ({ ...prev, deploy: 'success', notify: 'running' }));
    }, 8000);

    setTimeout(() => {
      setCurrentPipeline(prev => ({ ...prev, notify: 'success' }));
      setIsRunning(false);
    }, 10000);
  };

  const stopPipeline = () => {
    setIsRunning(false);
    setCurrentPipeline({
      source: 'success',
      build: 'success',
      deploy: 'success',
      notify: 'success'
    });
  };

  return (
    <DeploymentContext.Provider value={{
      currentPipeline,
      isRunning,
      startPipeline,
      stopPipeline
    }}>
      {children}
    </DeploymentContext.Provider>
  );
};

export const useDeployment = () => {
  const context = useContext(DeploymentContext);
  if (context === undefined) {
    throw new Error('useDeployment must be used within a DeploymentProvider');
  }
  return context;
};