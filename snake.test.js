const getLink = require('./snake.js');

test("Snake moving until end of map", () => {
  getLink.gameloop();
  expect(getLink.has_game_ended()).toBe(true);
})