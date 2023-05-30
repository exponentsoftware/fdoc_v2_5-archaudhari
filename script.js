// const fetch = require('node-fetch');

const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches';
const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets';
const PAYLOADS_API_URL = 'https://api.spacexdata.com/v4/payloads';

// Function to fetch data from the API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to count the number of successful and unsuccessful launches
async function countLaunches() {
  const launches = await fetchData(LAUNCHES_API_URL);
  let successfulCount = 0;
  let unsuccessfulCount = 0;

  launches.forEach((launch) => {
    if (launch.success) {
      successfulCount++;
    } else {
      unsuccessfulCount++;
    }
  });

  console.log('Successful launches:', successfulCount);
  console.log('Unsuccessful launches:', unsuccessfulCount);
}

// Function to find the 5 most common rocket IDs and their respective counts
async function findCommonRockets() {
  const launches = await fetchData(LAUNCHES_API_URL);
  const rockets = await fetchData(ROCKETS_API_URL);

  const rocketCounts = {};

  launches.forEach((launch) => {
    const rocketId = launch.rocket;
    if (rocketCounts.hasOwnProperty(rocketId)) {
      rocketCounts[rocketId]++;
    } else {
      rocketCounts[rocketId] = 1;
    }
  });

  const sortedRocketCounts = Object.entries(rocketCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const result = sortedRocketCounts.map(([rocketId, launches]) => {
    const rocket = rockets.find((r) => r.id === rocketId);
    return {
      rocket: rocketId,
      name: rocket.name,
      launches: launches,
    };
  });

  console.log(result);
}

// Function to find the number of launches per year and total payloads sent per year
async function countLaunchesAndPayloadsPerYear() {
  const launches = await fetchData(LAUNCHES_API_URL);

  const yearData = {};

  launches.forEach((launch) => {
    const year = new Date(launch.date_utc).getFullYear().toString();
    if (yearData.hasOwnProperty(year)) {
      yearData[year].launches++;
      yearData[year].payloads += launch.payloads.length;
    } else {
      yearData[year] = {
        year: year,
        launches: 1,
        payloads: launch.payloads.length,
      };
    }
  });

  const result = Object.values(yearData);
  console.log(result);
}

// Function to calculate the total mass of payloads sent to space for each rocket
async function calculateTotalPayloadMass() {
  const launches = await fetchData(LAUNCHES_API_URL);
  const payloads = await fetchData(PAYLOADS_API_URL);
  const rockets = await fetchData(ROCKETS_API_URL);

  const rocketPayloadMass = {};

  launches.forEach((launch) => {
    const rocketId = launch.rocket;
    const rocket = rockets.find((r) => r.id === rocketId);
    const launchPayloads = launch.payloads;

    let totalMass = 0;
    launchPayloads.forEach((payloadId) => {
      const payload = payloads.find((p) => p.id === payloadId);
      totalMass += payload.mass_kg;
    });

    if (rocketPayloadMass.hasOwnProperty(rocketId)) {
      rocketPayloadMass[rocketId].totalMass += totalMass;
    } else {
      rocketPayloadMass[rocketId] = {
        rocket: rocketId,
        name: rocket.name,
        totalMass: totalMass,
      };
    }
  });

  const result = Object.values(rocketPayloadMass);
  console.log(result);
}

// Call the functions to perform the operations
countLaunches();
findCommonRockets();
countLaunchesAndPayloadsPerYear();
calculateTotalPayloadMass();
