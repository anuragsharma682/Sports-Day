let scores = {
  red: 0,
  blue: 0,
  green: 0,
  yellow: 0
};

function startEvent() {
  OpeningCeremony((score, next) => {
    next(score, (s, next2) => {
      next2(s, (s2, next3) => {
        next3(s2, AwardCeremony);
      });
    });
  });
}

function OpeningCeremony(callback) {
  let count = 0;
  const interval = setInterval(() => {
    console.log("🏁 Sports Day Event Started");
    count++;
    if (count === 3) {
      clearInterval(interval);
      console.log("Initial Scores:", scores);
      callback(scores, Race100M);
    }
  }, 1000);
}

function Race100M(score, callback) {
  setTimeout(() => {
    let times = {
      red: Math.random() * 5 + 10,
      blue: Math.random() * 5 + 10,
      green: Math.random() * 5 + 10,
      yellow: Math.random() * 5 + 10
    };

    console.log("🏃 100m Race Times:", times);

    let sorted = Object.entries(times).sort((a, b) => a[1] - b[1]);
    score[sorted[0][0]] += 50;
    score[sorted[1][0]] += 25;

    console.log("Scores after Race:", score);
    callback(score, LongJump);
  }, 3000);
}

function LongJump(score, callback) {
  setTimeout(() => {
    const colors = ["red", "blue", "green", "yellow"];
    const winner = colors[Math.floor(Math.random() * colors.length)];

    console.log("🤸 Long Jump Winner:", winner);
    score[winner] += 150;

    console.log("Scores after Long Jump:", score);
    callback(score, HighJump);
  }, 2000);
}

function HighJump(score, callback) {
  const userColor = prompt("🏆 Which color won High Jump? (red/blue/green/yellow)");

  if (score[userColor] !== undefined) {
    score[userColor] += 100;
    console.log(`${userColor} got 100 points in High Jump`);
  } else {
    console.log("❌ Invalid input. No points awarded.");
  }

  console.log("Scores after High Jump:", score);
  callback(score);
}

function AwardCeremony(score) {
  console.log("🎉 Award Ceremony");
  console.log("Final Scores:", score);

  let ranking = Object.entries(score).sort((a, b) => b[1] - a[1]);

  console.log("🥇 1st Place:", ranking[0]);
  console.log("🥈 2nd Place:", ranking[1]);
  console.log("🥉 3rd Place:", ranking[2]);
}
