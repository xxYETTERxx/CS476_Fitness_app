/*
    Test Description:
    Simple test where you test how long it takes for a function to run. will not function as is we need to add it to whatever we wish to measure

    
*/

const startTime = performance.now();

// function being time tested here

const endTime = performance.now();
const timeTaken = endTime - startTime;
// Replace "thing being measured here" with whatever function we are measuring
console.log('Time taken to "thing being measured here" : ${timeTaken} milliseconds');