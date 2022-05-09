const getLink = require('./ttt.js');

test("Correctly determine a tie", () => {
    getLink.announce('TIE');
    expect(getLink.announcer.innerText).toBe("Tie");
  })

test("Correctly show that player X has won", () => {
    getLink.announce('PLAYERX_WON');
    expect(getLink.announcer.innerText).toBe("Player X Won");
  })

test("Correctly show that player O has won", () => {
    getLink.announce('PLAYERO_WON');
    expect(getLink.announcer.innerText).toBe("Player O Won");
  })