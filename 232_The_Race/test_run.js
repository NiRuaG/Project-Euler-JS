const cache = new Map([
    [  11,  2 /   3],
    [  10,  1 /   3],
    [ 121,  8 /   9],
    [ 120,  7 /   9],
    [1021,  2 /   5],
    [1020,  1 /   5],
    [  21, 88 / 135],
    [  20, 71 / 135],
    [2031,  2 /   9],
    [2030,  1 /   9],

    [1031,  4 /   9],
    [1030,  1 /   3],
]);

console.log(cache);


const cacheKey = (p1points, p2points, pointsToWin, playersTurn) => (
      p1points    * 1000
    + p2points    *  100
    + pointsToWin *   10
    + playersTurn
);

function simulGame(p2pick, [p1points, p2points, pointsToWin], playersTurn) {

    const percent = 1 / Math.pow(2, p2pick);
    const p2ptAdd = Math.pow(2, p2pick - 1);

    while (true) {

        const reduceGameByPts = Math.min(p1points, p2points);

        [p1points, p2points, pointsToWin] = [p1points, p2points, pointsToWin].map(p => p - reduceGameByPts);

        const key = cacheKey(p1points, p2points, pointsToWin, playersTurn);

        if (cache.has(key)) {
            return (
                Number(Math.random() < cache.get(key))
            );
        }


        // Player 1's turn
        if (playersTurn === 0) {
            if (Math.random() < 0.5) {
                if (++p1points === pointsToWin) {
                    // return playersTurn;
                    return 0;
                }
            }
        }

        // Player 2's turn
        else {
            if (Math.random() < percent) {
                p2points += p2ptAdd;
                if (p2points >= pointsToWin) {
                    return 1;
                }
            }
        }

        // make next player's turn
        playersTurn = (playersTurn + 1) % 2;
    }

}



const NUM_TRIALS = 1000;

// simulGame(1);
// simulGame(2);

for (let p2pick = 1; p2pick < 5; ++p2pick) {

    let sumWon = [0, 0];
    for (let trial = 0; trial < 1000; ++trial) {

        let whoWon = [0, 0];
        for (let i = 0; i < 9000; ++i) {
            ++whoWon[simulGame(p2pick, [1, 0, 3], 0)];
        }

        sumWon[0] += whoWon[0];
        sumWon[1] += whoWon[1];
    }

    console.log(p2pick)
    console.log(sumWon[0] / NUM_TRIALS, sumWon[1] / NUM_TRIALS);
}
