const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalFollow } = goals;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'GORILLA-Chill.aternos.me',
    port: 48236,
    username: 'BotCrack123',
    version: false
  });

  bot.loadPlugin(pathfinder);

  bot.on('spawn', () => {
    console.log('✅ Bot đã vào server!');

    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);

    // Tìm người chơi gần nhất
    const players = Object.values(bot.players).filter(p => p.entity);
    if (players.length > 0) {
      const nearest = players[0];
      console.log(`➡️ Đang đi theo: ${nearest.username}`);
      const goal = new GoalFollow(nearest.entity, 1); // Cách 1 block
      bot.pathfinder.setGoal(goal, true);
    } else {
      console.log("❗ Không tìm thấy người chơi để đi theo.");
    }

    // Anti-AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('death', () => {
    console.log('💀 Bot đã chết! Đang chờ respawn...');
  });

  bot.on('end', () => {
    console.log('⚠️ Bot bị kick hoặc mất kết nối. Đang reconnect sau 5 giây...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Lỗi bot:', err);
  });
}

createBot();