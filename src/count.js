function countLaunches(launches) {
  let successfulCount = 0;
  let unsuccessfulCount = 0;

  launches.forEach((launch) => {
    if (launch.success) {
      successfulCount++;
    } else {
      unsuccessfulCount++;
    }
  });

  return {
    successfulCount,
    unsuccessfulCount
  };
}

const { successfulCount, unsuccessfulCount } = countLaunches(launches);
console.log('Successful launches:', successfulCount);
console.log('Unsuccessful launches:', unsuccessfulCount);


// import { fetchLaunches, fetchRockets, fetchPayloads } from './api/spacex';
// import { countLaunches } from './utils/launches';
// import { countRocketIDs, fetchRocketNames } from './utils/rockets';

// // Fetch launches data
// fetchLaunches()
//   .then(launches => {
//     // Store launches data in an array
//     const launchesData = launches;

//     // Count successful and unsuccessful launches
//     const successfulLaunches = countLaunches(launchesData, true);
//     const unsuccessfulLaunches = countLaunches(launchesData, false);

//     console.log('Successful Launches:', successfulLaunches);
//     console.log('Unsuccessful Launches:', unsuccessfulLaunches);
//   });

// // Fetch rockets data
// fetchRockets()
//   .then(rockets => {
//     // Store rockets data in an array
//     const rocketsData = rockets;

//     // Fetch launches data
//     fetchLaunches()
//       .then(launches => {
//         // Store launches data in an array
//         const launchesData = launches;

//         // Count rocket IDs in launches data
//         const rocketCounts = countRocketIDs(launchesData, rocketsData);

//         // Get the 5 most common rocket IDs and their counts
//         const mostCommonRockets = Object.entries(rocketCounts)
//           .sort((a, b) => b[1] - a[1])
//           .slice(0, 5);

//         // Fetch full rocket names
//         fetchRocketNames(mostCommonRockets.map(rocket => rocket[0]))
//           .then(rocketNames => {
//             // Display the 5 most common rocket IDs and their counts with full rocket names
//             const result = mostCommonRockets.map((rocket, index) => ({
//               rocketID: rocket[0],
//               count: rocket[1],
//               name: rocketNames[index]
//             }));

//             console.log('Most Common Rockets:');
//             console.log(result);
//           });
//       });
//   });

// // Fetch payloads data
// fetchPayloads()
//   .then(payloads => {
//     // Store payloads data in an array
//     const payloadsData = payloads;

//     // Use the payloads data as needed
//     console.log('Payloads:', payloadsData);
//   });
