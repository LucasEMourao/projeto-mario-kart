const player1 = {
  name: "Mario",
  speed: 4,
  maneuverability: 3,
  power: 3,
  points: 0,
};

const player2 = {
  name: "Luigi",
  speed: 3,
  maneuverability: 4,
  power: 4,
  points: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "STRAIGHT";
      break;
    case random < 0.66:
      result = "TURN";
      break;
    default:
      result = "DUEL";
  }
  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolled a ${block} block and got ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round ${round}`);

    // sortear o bloco
    let block = await getRandomBlock();
    console.log(`Block rolled: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "STRAIGHT") {
      totalTestSkill1 = character1.speed + diceResult1;
      totalTestSkill2 = character2.speed + diceResult2;

      await logRollResult(
        character1.name,
        "speed",
        diceResult1,
        character1.speed
      );
      await logRollResult(
        character2.name,
        "speed",
        diceResult2,
        character2.speed
      );
    }
    if (block === "TURN") {
      totalTestSkill1 = character1.maneuverability + diceResult1;
      totalTestSkill2 = character2.maneuverability + diceResult2;

      await logRollResult(
        character1.name,
        "maneuverability",
        diceResult1,
        character1.maneuverability
      );
      await logRollResult(
        character2.name,
        "maneuverability",
        diceResult2,
        character2.maneuverability
      );
    }
    if (block === "DUEL") {
      let powerResult1 = character1.power + diceResult1;
      let powerResult2 = character2.power + diceResult2;

      console.log(
        `${character1.name} challenged ${character2.name} to a clash! 🥊`
      );
      await logRollResult(
        character1.name,
        "power",
        diceResult1,
        character1.power
      );
      await logRollResult(
        character2.name,
        "power",
        diceResult2,
        character2.power
      );

      if (powerResult1 > powerResult2 && character2.points > 0) {
        console.log(
          `${character1.name} won the clash and ${character2.name} lost a point!`
        );
        character2.points--;
      }

      if (powerResult2 > powerResult1 && character1.points > 0) {
        console.log(
          `${character2.name} won the clash and ${character1.name} lost a point!`
        );
        character1.points--;
      }
      console.log(
        powerResult2 === powerResult1
          ? `${character1.name} and ${character2.name} tied! No points were lost.`
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.name} scored a point!`);
      character1.points++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.name} scored a point!`);
      character2.points++;
    }

    console.log("--------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log(`🏁 Final Results 🏁`);
  console.log(`${character1.name}: ${character1.points} point(s)`);
  console.log(`${character2.name}: ${character2.points} point(s)`);

  if (character1.points > character2.points)
    console.log(`\n${character1.name} takes the victory! 🏆`);
  else if (character2.points > character1.points)
    console.log(`${character2.name} takes the victory! 🏆`);
  else console.log(`The race ended in a tie! 🤝`);
}

(async function main() {
  console.log(
    `🏁🚨 Race between ${player1.name} and ${player2.name} is starting... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
  console.log("🏁🚨 Race finished! 🏁🚨");
})();
