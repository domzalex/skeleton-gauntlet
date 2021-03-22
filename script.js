var mainTitleScreen = document.getElementById("titleScreen")
var gameScreen = document.getElementById("mainScreen")

var char = {
  level: 1,
  health: 10,
  attack: 3,
  exp: 0,
  expNextLvl: 5
};
var enemy = {
  health: 10,
  attack: 2,
  expGiven: 5,
  goldGiven: 20
};
var boss = {
  health: 100,
  attack: 7,
  expGiven: 50,
  goldGiven: 50
}

var probability = function(n) {
     return !!n && Math.random() <= n;
};


enemyHealth = enemy.health;
bossHealth = boss.health;
charHlth = char.health;
battleWon = 0;
bossBattleWon = 0;
potionAmount = 1;
hiPotionAmount = 0;
gold = 20;
isBoss = 0;

bossOne = 0;
bossTwo = 0;
bossThree = 0;


function gameStart() {
  mainTitleScreen.style.display = "none";
  gameScreen.style.display = "none";
  document.getElementById("gameWonScreen").style.display = "none";
  document.getElementById("bossScreen").style.display = "none";
  document.getElementById("advScreen").style.display = "block";
  document.getElementById("battleOverlay").style.display = "none";
  document.getElementById("shopScreen").style.display = "none";
  document.getElementById("lvlStat").innerHTML = "L V L : " + char.level;
  document.getElementById("healthStat").innerHTML = "H P : " + charHlth;
  document.getElementById("expStat").innerHTML = "E X P : " + char.exp;
  document.getElementById("nextLvlStat").innerHTML = "N E X T  L V L : " + char.expNextLvl;
  document.getElementById("moneyStat").innerHTML = "G O L D : " + gold;
  document.getElementById("battleWonLoss").style.display = "none";
  enemyHealth = enemy.health;
  isBoss = 0;
  bossOne = 0;
  bossTwo = 0;
  bossThree = 0;
  bossBattleWon = 0;
  battleWon = 0;
}
function overlayStart() {
  document.getElementById("battleOverlay").style.display = "block";
  document.getElementById("battleOverlay").src = "img/battleStartOverlay.gif" + "?a" + Math.random();
  document.getElementById("advScreen").style.display = "none";
  gameScreen.style.display = "block";
  document.getElementById("charHP").style.display = "none";
  document.getElementById("enemyHP").src = "img/hpBar100.jpg";
  document.getElementById("enemyHP").style.display = "none";
  document.getElementById("enemyOne").style.display = "none";
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("battleDialog").style.display = "none";
  document.getElementById("itemsButton").style.display = "none";
  document.getElementById("bossScreen").style.display = "none";
  if (isBoss == 1) {
    window.setTimeout(function() {
      bossBattle(); }, 2000);
  } else {
    window.setTimeout(function() {
      battleStart(); }, 2000);
  }

}
function battleStart() {
  enemyHealth = enemy.health;
  charHlth = charHlth;
  document.getElementById("battleOverlay").style.display = "none";
  document.getElementById("battleDialog").style.color = "red";
  document.getElementById("battleDialog").style.display = "block";
  document.getElementById("battleDialog").innerHTML = "A skeleton knight approaches."
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("attackButton").style.display = "block";
  document.getElementById("itemsButton").style.display = "block";
  document.getElementById("enemyOne").style.display = "block";
  document.getElementById("enemyOne").src = "img/enemy1.gif";
  document.getElementById("character").src = "img/char.gif";
  hpCheck();
  enemyHpCheck();
  document.getElementById("charHP").style.display = "block";
  document.getElementById("enemyHP").style.display = "block";
}

function showItems() {
  if (document.getElementById("battleItems").style.display == "block") {
    hideItems();
  } else if (document.getElementById("attackButton").style.display == "none") {
    hideItems();
  } else {
    document.getElementById("battleItems").style.display = "block";
    if (potionAmount == 0) {
      document.getElementById("potion").style.display = "none";
      document.getElementById("potionAmt").style.display = "none";
    } else if (potionAmount > 0) {
      document.getElementById("potion").style.display = "inline";
      document.getElementById("potionAmt").innerHTML = "x" + potionAmount;
    }
    if (hiPotionAmount == 0) {
      document.getElementById("hiPotion").style.display = "none";
      document.getElementById("hiPotionAmt").style.display = "none";
    } else if (hiPotionAmount > 0) {
      document.getElementById("hiPotion").style.display = "inline";
      document.getElementById("hiPotionAmt").innerHTML = "x" + hiPotionAmount;
    }
  }
}
function hideItems() {
  document.getElementById("battleItems").style.display = "none";

}
function usePotion() {
  if (charHlth < char.health) {
    if (charHlth < (char.health - 25)) {
      document.getElementById("battleDialog").innerHTML = "You have restored 25 points of health.";
    } else if (charHlth > (char.health - 25)) {
      document.getElementById("battleDialog").innerHTML = "You have restored " + (25 - (charHlth - char.health + 25)) + " points of health.";
    } else {
      //do nothing
    }
    charHlth = charHlth + 25;
    potionAmount --;
    itemCheck();
    hpCheck();
    charHealthCheck();
    hideItems();
    document.getElementById("attackButton").style.display = "none";
    document.getElementById("nextButton").style.display = "block";
  } else if (charHlth = char.health) {
    document.getElementById("battleDialog").innerHTML = "You cannot use that right now.";
  }
}
function useHiPotion() {
  if (charHlth < char.health) {
    if (charHlth < (char.health - 250)) {
      document.getElementById("battleDialog").innerHTML = "You have restored 250 points of health.";
    } else if (charHlth > (char.health - 250)) {
      document.getElementById("battleDialog").innerHTML = "You have restored " + (250 - (charHlth - char.health + 250)) + " points of health.";
    } else {
      //do nothing
    }
    charHlth = charHlth + 250;
    hiPotionAmount --;
    itemCheck();
    hpCheck();
    charHealthCheck();
    hideItems();
    document.getElementById("attackButton").style.display = "none";
    document.getElementById("nextButton").style.display = "block";
  } else if (charHlth = char.health) {
    document.getElementById("battleDialog").innerHTML = "You cannot use that right now.";
  }
}

function itemCheck() {
  if (potionAmount == 0) {
    document.getElementById("potion").style.display = "none";
    document.getElementById("potionAmt").style.display = "none";
  } else if (potionAmount > 0) {
    document.getElementById("potion").style.display = "inline";
    document.getElementById("potionAmt").innerHTML = "x" + potionAmount;
  }
  if (hiPotionAmount == 0) {
    document.getElementById("hiPotion").style.display = "none";
    document.getElementById("hiPotionAmt").style.display = "none";
  } else if (hiPotionAmount > 0) {
    document.getElementById("hiPotion").style.display = "inline";
    document.getElementById("hiPotionAmt").innerHTML = "x" + hiPotionAmount;
  }
}
function enemyHpCheck() {
  if (isBoss == 1) {
    if (bossHealth <= 0) {
      document.getElementById("enemyHP").src = "img/hpBar0.jpg";
      bossBattleWon = 1;
      bossBattleWin();
    }
    else if (bossHealth <= (boss.health * 0.1)) {
      document.getElementById("enemyHP").src = "img/hpBar10.jpg";
    }
    else if (bossHealth <= (boss.health * 0.2)) {
      document.getElementById("enemyHP").src = "img/hpBar20.jpg";
    }
    else if (bossHealth <= (boss.health * 0.3)) {
      document.getElementById("enemyHP").src = "img/hpBar30.jpg";
    }
    else if (bossHealth <= (boss.health * 0.4)) {
      document.getElementById("enemyHP").src = "img/hpBar40.jpg";
    }
    else if (bossHealth <= (boss.health * 0.5)) {
      document.getElementById("enemyHP").src = "img/hpBar50.jpg";
    }
    else if (bossHealth <= (boss.health * 0.6)) {
      document.getElementById("enemyHP").src = "img/hpBar60.jpg";
    }
    else if (bossHealth <= (boss.health * 0.7)) {
      document.getElementById("enemyHP").src = "img/hpBar70.jpg";
    }
    else if (bossHealth <= (boss.health * 0.9)) {
      document.getElementById("enemyHP").src = "img/hpBar80.jpg";
    }
    else if (bossHealth <= (boss.health * 1)) {
      document.getElementById("enemyHP").src = "img/hpBar90.jpg";
    }
    else if (bossHealth >= boss.health) {
      document.getElementById("enemyHP").src = "img/hpBar100.jpg";
    } else {}
  }
  else if (isBoss == 0) {
    if (enemyHealth <= 0) {
      document.getElementById("enemyHP").src = "img/hpBar0.jpg";
      battleWin();
    }
    else if (enemyHealth <= (enemy.health * 0.1)) {
      document.getElementById("enemyHP").src = "img/hpBar10.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.2)) {
      document.getElementById("enemyHP").src = "img/hpBar20.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.3)) {
      document.getElementById("enemyHP").src = "img/hpBar30.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.4)) {
      document.getElementById("enemyHP").src = "img/hpBar40.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.5)) {
      document.getElementById("enemyHP").src = "img/hpBar50.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.6)) {
      document.getElementById("enemyHP").src = "img/hpBar60.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.7)) {
      document.getElementById("enemyHP").src = "img/hpBar70.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.9)) {
      document.getElementById("enemyHP").src = "img/hpBar80.jpg";
    }
    else if (enemyHealth <= (enemy.health * 0.9)) {
      document.getElementById("enemyHP").src = "img/hpBar90.jpg";
    }
    else if (enemyHealth >= enemy.health) {
      document.getElementById("enemyHP").src = "img/hpBar100.jpg";
    }
  }
}
function hpCheck() {
  if (charHlth <= 0) {
    document.getElementById("charHP").src = "img/hpBar0.jpg";
    document.getElementById("battleWonLoss").style.display = "block";
    document.getElementById("character").src = "img/charDeath.gif";
  }
  else if (charHlth <= (char.health * 0.1)) {
    document.getElementById("charHP").src = "img/hpBar10.jpg";
  }
  else if (charHlth <= (char.health * 0.2)) {
    document.getElementById("charHP").src = "img/hpBar20.jpg";
  }
  else if (charHlth <= (char.health * 0.3)) {
    document.getElementById("charHP").src = "img/hpBar30.jpg";
  }
  else if (charHlth <= (char.health * 0.4)) {
    document.getElementById("charHP").src = "img/hpBar40.jpg";
  }
  else if (charHlth <= (char.health * 0.5)) {
    document.getElementById("charHP").src = "img/hpBar50.jpg";
  }
  else if (charHlth <= (char.health * 0.6)) {
    document.getElementById("charHP").src = "img/hpBar60.jpg";
  }
  else if (charHlth <= (char.health * 0.7)) {
    document.getElementById("charHP").src = "img/hpBar70.jpg";
  }
  else if (charHlth <= (char.health * 0.9)) {
    document.getElementById("charHP").src = "img/hpBar80.jpg";
  }
  else if (charHlth > (char.health * 0.9) && charHlth < (char.health * 1)) {
    document.getElementById("charHP").src = "img/hpBar90.jpg";
  }
  else if (charHlth >= char.health) {
    document.getElementById("charHP").src = "img/hpBar100.jpg";
  }
}
function charHealthCheck() {
  if (charHlth > char.health) {
    charHlth = char.health;
  }
}
function attack() {
  document.getElementById("battleItems").style.display = "none";
  if (probability(0.05)) {
    document.getElementById("battleDialog").innerHTML = "Your attack missed.";
    document.getElementById("attackButton").style.display = "none";
    document.getElementById("nextButton").style.display = "block";
  } else {
    if (isBoss == 1) {
      document.getElementById("eDamage").src = "img/damage1.gif" + "?a" + Math.random(); // Kwynn
      bossHealth = bossHealth - char.attack;
      document.getElementById("battleDialog").innerHTML = "You attack the enemy and do " + char.attack + " points of damage.";
      document.getElementById("attackButton").style.display = "none";
      document.getElementById("nextButton").style.display = "block";
      enemyHpCheck();
    } else {
      document.getElementById("eDamage").src = "img/damage1.gif" + "?a" + Math.random(); // Kwynn
      if (probability(0.2)) {
        enemyHealth = enemyHealth - Math.round(char.attack * 1.5);
        document.getElementById("battleDialog").innerHTML = "Critical hit! You attack the enemy and do " + Math.round(char.attack * 1.5) + " points of damage.";
        document.getElementById("attackButton").style.display = "none";
        document.getElementById("nextButton").style.display = "block";
        enemyHpCheck();
      } else {
        enemyHealth = enemyHealth - char.attack;
        document.getElementById("battleDialog").innerHTML = "You attack the enemy and do " + char.attack + " points of damage.";
        document.getElementById("attackButton").style.display = "none";
        document.getElementById("nextButton").style.display = "block";
        enemyHpCheck();
      }
    }
  }
}
function nextButtonClick() {
  if (enemyHealth > 0) {
    eAttack();
  } else {
    // do nothing
  }
}
function battleWonLossButton() {
  if (battleWon == 1) {
    gameStart();
    document.getElementById("enemyHP").src = "img/hpBar100.jpg";
  } else if (charHlth <= 0) {
    charHlth = char.health;
    document.getElementById("character").src = "img/char.gif";
    gameStart();
  } else if (bossThree == 1) {
    gameScreen.style.display = "none";
    document.getElementById("gameWonDialog").innerHTML = "Congratulations. You have beaten the game. The enemies will continue to scale with your level. Thanks for playing this silly skeleton game."
    document.getElementById("gameWonScreen").style.display = "block";
  } else if (bossBattleWon == 1) {
    gameStart();
    document.getElementById("enemyHP").src = "img/hpBar100.jpg";
  }
}

function eAttack() {
  if (probability(0.1)) {
    document.getElementById("battleDialog").innerHTML = "The enemy's attack missed.";
    document.getElementById("attackButton").style.display = "block";
    document.getElementById("nextButton").style.display = "none";
  }

  else {
    document.getElementById("battleItems").style.display = "none";
    if (isBoss == 1) {
      charHlth = charHlth - boss.attack;
      if (charHlth <= 0) {
        document.getElementById("charDamage").src = "img/damage.gif" + "?a" + Math.random(); // Kwynn
        document.getElementById("battleDialog").innerHTML = "You have died. You lose " + Math.round(gold / 2) + " gold.";
        gold = Math.round(gold / 2);
        hpCheck();
        document.getElementById("attackButton").style.display = "none";
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("itemsButton").style.display = "none";
        document.getElementById("battleWonLoss").style.display = "block";
      } else {
        document.getElementById("charDamage").src = "img/damage.gif" + "?a" + Math.random(); // Kwynn
        document.getElementById("battleDialog").innerHTML = "The enemy attacks you and does " + boss.attack + " points of damage."
        hpCheck();
        document.getElementById("attackButton").style.display = "block";
        document.getElementById("nextButton").style.display = "none";
      }
  } else if (isBoss == 0) {
    charHlth = charHlth - enemy.attack;
    if (charHlth <= 0) {
      document.getElementById("charDamage").src = "img/damage.gif" + "?a" + Math.random(); // Kwynn
      document.getElementById("battleDialog").innerHTML = "You have died. You lose " + Math.round(gold / 2) + " gold.";
      gold = Math.round(gold / 2);
      hpCheck();
      document.getElementById("attackButton").style.display = "none";
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("itemsButton").style.display = "none";
      document.getElementById("battleWonLoss").style.display = "block";
    } else {
      document.getElementById("charDamage").src = "img/damage.gif" + "?a" + Math.random(); // Kwynn
      document.getElementById("battleDialog").innerHTML = "The enemy attacks you and does " + enemy.attack + " points of damage."
      hpCheck();
      document.getElementById("attackButton").style.display = "block";
      document.getElementById("nextButton").style.display = "none";
    }
  } else {
    //do nothing
  }
  }
}
function battleWin() {
  battleWon = 1;
  document.getElementById("battleWonLoss").style.display = "block";
  gold = gold + enemy.goldGiven;
  char.exp = char.exp + enemy.expGiven;
  document.getElementById("battleItems").style.display = "none";
  document.getElementById("attackButton").style.display = "none";
  document.getElementById("itemsButton").style.display = "none";
  document.getElementById("enemyOne").src = "img/enemyDeath.gif";
  document.getElementById("battleDialog").style.color = "SkyBlue";
  document.getElementById("nextButton").style.display = "none";
  if (char.exp >= char.expNextLvl) {
    document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the enemy. You have gained " + enemy.expGiven + " experience points and have gained a new level. You also got " + enemy.goldGiven + " gold pieces and now have a total of " + gold + " gold.";
    superLevelCheck();
    } else {
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the enemy. You have gained " + enemy.expGiven + " experience points. You also got " + enemy.goldGiven + " gold pieces and now have a total of " + gold + " gold.";
    }
}

function lvlCheck() {
  if (char.exp >= char.expNextLvl) {
    lvlUp();
  }
  else {
    // Do nothing
  }
}
function superLevelCheck() {
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
  lvlCheck();
}
function lvlUp() {
  char.level = char.level + 1;
  char.health = Math.round(char.health * 1.5);
  char.attack = Math.round(char.attack * 1.3);
  char.expNextLvl = Math.round(char.expNextLvl * 1.8);
  charHlth = char.health;
  enemy.health = Math.round(char.health * 0.75);
  enemy.attack = Math.round(char.attack * .75);
  enemy.expGiven = Math.round(enemy.expGiven * 1.5);
  enemy.goldGiven = Math.round(enemy.goldGiven * 1.3);
}

function shopStart() {
  document.getElementById("advScreen").style.display = "none";
  document.getElementById("shopScreen").style.display = "block";
  document.getElementById("shopGold").innerHTML = gold + " Gold"
}
function buyPotion() {
  if (gold >= 20) {
    document.getElementById("shopDialog").style.display = "none";
    document.getElementById("itemAdd").src = "img/addOneItem.gif" + "?a" + Math.random();
    potionAmount ++;
    gold = gold - 20;
    document.getElementById("shopGold").innerHTML = gold + " Gold";
  } else if (gold < 20) {
    document.getElementById("shopDialog").style.display = "block";
    document.getElementById("shopDialog").innerHTML = "You cannot afford that."
  }
}
function buyHiPotion() {
  if (gold >= 200) {
    document.getElementById("shopDialog").style.display = "none";
    document.getElementById("itemAdd").src = "img/addOneItem.gif" + "?a" + Math.random();
    hiPotionAmount ++;
    gold = gold - 200;
    document.getElementById("shopGold").innerHTML = gold + " Gold";
  } else if (gold < 200) {
    document.getElementById("shopDialog").style.display = "block";
    document.getElementById("shopDialog").innerHTML = "You cannot afford that."
  }
}

function bossBattleScreen() {
  document.getElementById("advScreen").style.display = "none";
  document.getElementById("bossScreen").style.display = "block";
}
function bossBattleCheck() {
  isBoss = 1;
  if (bossOne == 1) {
    boss.health = 100;
    boss.attack = 7;
    boss.expGiven = 50;
    boss.goldGiven = 50;
  }

  if (bossTwo == 1) {
    boss.health = 400;
    boss.attack = 40;
    boss.expGiven = 500;
    boss.goldGiven = 500;
  }

  if (bossThree == 1) {
    boss.health = 1000;
    boss.attack = 90;
    boss.expGiven = 1000;
    boss.goldGiven = 1000;
  }
  overlayStart();
}
function bossBattle() {
  bossHealth = boss.health;
  charHlth = char.health;
  document.getElementById("battleOverlay").style.display = "none";
  document.getElementById("battleDialog").style.color = "red";
  document.getElementById("battleDialog").style.display = "block";
  if (bossOne == 1) {
    document.getElementById("battleDialog").innerHTML = "You challenge the Skeleton Commander.";
    document.getElementById("enemyOne").src = "img/boss1.gif";
  } else if (bossTwo == 1) {
    document.getElementById("battleDialog").innerHTML = "You challenge the Skeleton Demon.";
    document.getElementById("enemyOne").src = "img/boss2.gif";
  } else if (bossThree == 1) {
    document.getElementById("battleDialog").innerHTML = "You challenge the God of Skeletons.";
    document.getElementById("enemyOne").src = "img/boss3.gif";
  } else {}
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("attackButton").style.display = "block";
  document.getElementById("itemsButton").style.display = "block";
  document.getElementById("enemyOne").style.display = "block";
  document.getElementById("character").src = "img/char.gif";
  document.getElementById("enemyHP").style.display = "block";
  document.getElementById("charHP").style.display = "block";
  hpCheck();
  document.getElementById("enemyHP").src = "img/hpBar100.jpg";
}
function bossBattleWin() {
  document.getElementById("battleWonLoss").style.display = "block";
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("itemsButton").style.display = "none";
  if (bossOne == 1) {
    char.exp = char.exp + boss.expGiven;
    gold = gold + boss.goldGiven;
    document.getElementById("enemyOne").src = "img/boss1Death.gif";
    if(char.exp >= char.expNextLvl) {
      superLevelCheck();
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton Commander. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold. You have gained a new level.";
    } else {
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton Commander. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold.";
    }
    document.getElementById("bossChallengeOne").style.display = "none";
    bossOne = 0;
  } else if (bossTwo == 1) {
    char.exp = char.exp + boss.expGiven;
    gold = gold + boss.goldGiven;
    document.getElementById("enemyOne").src = "img/boss2Death.gif";
    if(char.exp >= char.expNextLvl) {
      superLevelCheck();
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton Demon. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold. You have gained a new level.";
    } else {
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton Demon. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold.";
    }
    document.getElementById("bossChallengeTwo").style.display = "none";
    bossTwo = 0;
  } else if (bossThree == 1) {
    char.exp = char.exp + boss.expGiven;
    gold = gold + boss.goldGiven;
    document.getElementById("enemyOne").src = "img/boss3Death.gif";
    if(char.exp >= char.expNextLvl) {
      superLevelCheck();
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton God. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold.";
    } else {
      document.getElementById("battleDialog").innerHTML = "Congratulations. You have defeated the Skeleton God. You are awarded " + boss.expGiven + " EXP and " + boss.goldGiven + " gold.";
    }
    document.getElementById("bossChallengeThree").style.display = "none";
    document.getElementById("bossButton").style.display = "none";
  }
  else {}
}
