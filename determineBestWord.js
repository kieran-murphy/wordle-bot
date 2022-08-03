const words = require("./words.json");

const determineBestWord = (letters) => {
  if (letters.length > 0) {
    let lastFive = letters.slice(-5);
    complete = true;
    lastFive.forEach((letter) => {
      if (letter.state !== "correct") {
        complete = false;
      }
    });
    if (complete) {
      return "done!";
    } else {
      let j = 0;
      for (let i = 0; i < letters.length; i++) {
        if (j == 5) {
          j = 0;
        }
        letters[i].position = j;
        j++;
      }

      letters.forEach((letter) => {
        if (letter.state === "absent") {
          words.words.forEach((word) => {
            for (let i = 0; i < word.split("").length; i++) {
              if (word.split("")[i] === letter.text.toLowerCase()) {
                if (i === letter.position) {
                  words.words = words.words.filter((item) => item !== word);
                }
              }
            }
          });
        }
      });

      letters.forEach((letter) => {
        if (letter.state === "present") {
          words.words.forEach((word) => {
            if (!word.includes(letter.text.toLowerCase())) {
              words.words = words.words.filter((item) => item !== word);
            }
          });
        }
      });

      letters.forEach((letter) => {
        if (letter.state === "present") {
          words.words.forEach((word) => {
            for (let i = 0; i < word.split("").length; i++) {
              if (word.split("")[i] === letter.text.toLowerCase()) {
                if (i === letter.position) {
                  words.words = words.words.filter((item) => item !== word);
                }
              }
            }
          });
        }
      });

      letters.forEach((letter) => {
        if (letter.state === "correct") {
          words.words.forEach((word) => {
            for (let i = 0; i < word.split("").length; i++) {
              if (word.split("")[i] !== letter.text.toLowerCase()) {
                if (i === letter.position) {
                  words.words = words.words.filter((item) => item !== word);
                }
              }
            }
          });
        }
      });

      return words.words[Math.floor(Math.random() * words.words.length)];
    }
  }
};

module.exports = { determineBestWord };
