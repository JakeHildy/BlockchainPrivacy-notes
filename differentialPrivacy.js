// This experiment aim to measure the percentage of users on the internet, who are actually dogs.
// Real dogs would like to remain anonymous. After all, on the internet nobody knows you're a dog.

// Real Data (secret) populations
let numPeople = 90;
let numDogs = 10;

// TIP! try making the populations larger. What happens to the accuracy of the
// differentially-private estimate when we do?
// As we increase the size of the data set, the accuracy increases....randomness decreases
const bigPopulation = true;
if (bigPopulation) {
  numPeople *= 1000000;
  numDogs *= 1000000;
}

// We will survey all the dogs in this function
// Answer returns a differentially-private answer to the question "Are you a dog?". So, 'realDog'
// is the input, can be true or false, depending on whether the user answering the question is truly a dog.
const answer = (realDog) => {
  if (Math.random() < 0.5) {
    // Answer truthfully
    return realDog;
  }
  // Answer randomly
  return Math.random() < 0.5;
};

// Total counts the number of responses to the question "Are you a dog?". Some respondents are
// telling the truth, others are not
let total = 0;

// ask all the dogs
for (let i = 0; i < numDogs; i++) {
  if (answer(true)) {
    total++;
  }
}

// For all the poeple that answer, false, increase the total
for (let i = 0; i < numPeople; i++) {
  if (answer(false)) {
    total++;
  }
}

// 50% of the answers are true. The other 50% have a 50% probability of being true,
// and a 50% probability of being false
const estimate = 2 * (total / (numPeople + numDogs) - 0.25);

const percentage = (x) => {
  return (100 * x).toFixed(2) + "%";
};

console.log(
  `The actual percentage of dogs on the internet: ${percentage(
    numDogs / (numPeople + numDogs)
  )}`
);
console.log(
  `Differentially-private estimate of dogs on the internet: ${percentage(
    estimate
  )}`
);
