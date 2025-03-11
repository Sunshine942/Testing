const fs = require('fs');

fs.readFile('log.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }

  const lines = data.split('\n');
  const logCounts = {
    INFO: 0,
    WARNING: 0,
    ERROR: 0,
  };
  const errorLogs = [];

  const logRegex = /\[(.*?)\]\s\[(.*?)\]\s(.*?)/;

  for (const line of lines) {
    if (line.trim() === '') continue; // Пропускаем пустые строки

    const match = line.match(logRegex);

    if (match) {
      const [, timestamp, type, message] = match;

      if (logCounts[type] !== undefined) {
        logCounts[type]++;
      }

      if (type === 'ERROR') {
        errorLogs.push(`[${timestamp}] ${message}`);
      }
    }
  }

  console.log('Статистика по логам:');
  for (const type in logCounts) {
    console.log(`${type}: ${logCounts[type]}`);
  }

  console.log('\nСписок ошибок:');
  for (const errorLog of errorLogs) {
    console.log(errorLog);
  }
});

