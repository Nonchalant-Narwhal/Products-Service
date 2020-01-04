const parseData = require('./parseData');
let stop = false;
console.log(
  parseData('photos', data => {
    if (stop) {
      return;
    } else {
      console.log(data);
      if (data[0]) {
        console.log(data);
        stop = true;
      }
    }
  })
);
