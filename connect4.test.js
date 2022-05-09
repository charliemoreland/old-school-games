const getLink = require('./connect4.js');

test("Testing Winner", () => {
  for (i = 0; i < tableData.length; i ++){
    tableData[i] = (e) =>{
      console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    }
  }

  changeColor(tableData[0]);
  changeColor(tableData[1]);
  changeColor(tableData[2]);
  expect(changeColor(tableData[3])).toBe(true);
})