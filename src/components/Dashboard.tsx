import { useState, useEffect } from "react";
import { useStats } from "hooks/useStats";

const Dashboard = () => {

  const { stats } = useStats();

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Number of Creations</th>
          </tr>
        </thead>
        <tbody>
          <pre>
            {JSON.stringify(stats, null, 2)}
          </pre>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
