import React from 'react';
import SolutionModeCard from './SolutionModeCard';

interface SolutionModesPanelProps {
  label: string;
  solution: any;
  total: number;
}

const SolutionModes: React.FC<{ panels: SolutionModesPanelProps[] }> = ({ panels }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {panels.map(panel => (
          <SolutionModeCard
            key={panel.label}
            label={panel.label}
            solution={panel.solution}
            total={panel.total}
          />
        ))}
      </div>
    </div>
  );
};

export default SolutionModes;