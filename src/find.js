function findMostCommonRockets(launches, rockets) {
    const rocketCounts = {};
  
    launches.forEach((launch) => {
      const rocketId = launch.rocket;
      rocketCounts[rocketId] = rocketCounts[rocketId] ? rocketCounts[rocketId] + 1 : 1;
    });
  
    const sortedRocketCounts = Object.entries(rocketCounts).sort(
      (a, b) => b[1] - a[1]
    );
  
    const mostCommonRockets = sortedRocketCounts.slice(0, 5).map(([rocketId, count]) => {
      const rocket = rockets.find((rocket) => rocket.id === rocketId);
      return {
        rocketId,
        count,
        rocketName: rocket?.name || 'Unknown Rocket'
      };
    });
  
    return mostCommonRockets;
  }
  
  const mostCommonRockets = findMostCommonRockets(launches, rockets);
  console.log('Most common rockets used in launches:');
  mostCommonRockets.forEach(({ rocketId, count, rocketName }) => {
    console.log(`Rocket ID: ${rocketId}, Rocket Name: ${rocketName}, Count: ${count}`);
  });
  