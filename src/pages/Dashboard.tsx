import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-display font-bold gradient-text mb-6">
        BJJ DASHBOARD
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-glow">
          <h3 className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Sessioni Totali</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Ore sul Tappeto</h3>
          <p className="text-3xl font-bold mt-2">36h</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Grado Attuale</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">Cintura Blu</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
