const getLink = require('./invaders.js');

test("Correctly animate the game", () => {
  getLink.animate();
  expect(getLink.ctx.fillStyle).toBe("#000000");
})