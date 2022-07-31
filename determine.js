const words = require("./words.json");

const array = [
    { text: 'R', state: 'present' },
    { text: 'O', state: 'absent' },
    { text: 'A', state: 'correct' },
    { text: 'T', state: 'absent' },
    { text: 'E', state: 'absent' },
    { text: 'C', state: 'correct' },
    { text: 'L', state: 'absent' },
    { text: 'O', state: 'absent' },
    { text: 'W', state: 'absent' },
    { text: 'N', state: 'absent' },
    { text: 'D', state: 'absent' },
    { text: 'R', state: 'correct' },
    { text: 'E', state: 'absent' },
    { text: 'A', state: 'present' },
    { text: 'M', state: 'present' },
  ]

  let j = 0;
  for (let i = 0; i < array.length; i++) {
    if (j == 5) {
        j = 0;
    } 
    array[i].position = j; 
    j++;
  }

array.forEach((letter) => {
    if (letter.state === 'absent') {
        words.words.forEach((word) => {
            if (word.includes(letter.text.toLowerCase())) {
                words.words = words.words.filter(item => item !== word)
            }
        }
        )
    }
})

array.forEach((letter) => {
    if (letter.state === 'present') {
        words.words.forEach((word) => {
            if (!word.includes(letter.text.toLowerCase())) {
                words.words = words.words.filter(item => item !== word)
            }
        }
        )
    }
})

array.forEach((letter) => {
    if (letter.state === 'correct') {
        words.words.forEach((word) => {
            for (let i = 0; i < word.split("").length; i++) {
                if (word.split("")[i] !== letter.text.toLowerCase()) {
                    if (i === letter.position) {
                        words.words = words.words.filter(item => item !== word)
                    }
                }
            }
        }
        )
    }
})


console.log(words.words)
// const rand = Math.floor(Math.random() * words.words.length);
// console.log(words.words[rand])

