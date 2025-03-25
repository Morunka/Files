class CyclesPlus {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'cyclesplus',
      name: 'Циклы+',
      color1: '#00FF00', // Токсичный зелёный
      color2: '#00CC00',
      color3: '#009900',
      description: 'Ещё больше циклов для твоих проектов!',
      blocks: [
        // Повторять в течение времени
        {
          opcode: 'repeatForTimeForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять в течение [TIME] секунд всегда',
          arguments: {
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'repeatForTimeCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять в течение [TIME] секунд [COUNT] раз',
          arguments: {
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        // Повторять с задержкой
        {
          opcode: 'repeatWithDelayForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять через [DELAY] секунд всегда',
          arguments: {
            DELAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'repeatWithDelayCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять через [DELAY] секунд [COUNT] раз',
          arguments: {
            DELAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        // Периодически повторять
        {
          opcode: 'repeatPeriodicallyForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'периодически повторять каждые [PERIOD] секунд в течение [TIME] секунд всегда',
          arguments: {
            PERIOD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        {
          opcode: 'repeatPeriodicallyCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'периодически повторять каждые [PERIOD] секунд в течение [TIME] секунд [COUNT] раз',
          arguments: {
            PERIOD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
          }
        },
        // Турбоповторить
        {
          opcode: 'turboRepeatForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'турбоповторить всегда',
          arguments: {}
        },
        {
          opcode: 'turboRepeatCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'турбоповторить [COUNT] раз',
          arguments: {
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        // Повторять с ускорением
        {
          opcode: 'repeatWithAccelerationForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с ускорением каждые [TIME] секунд всегда',
          arguments: {
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'repeatWithAccelerationCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с ускорением каждые [TIME] секунд [COUNT] раз',
          arguments: {
            TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        // Повторять с шансом
        {
          opcode: 'repeatWithChanceForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с шансом [CHANCE]% всегда',
          arguments: {
            CHANCE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
          }
        },
        {
          opcode: 'repeatWithChanceCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с шансом [CHANCE]% [COUNT] раз',
          arguments: {
            CHANCE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        // Цикл до условия
        {
          opcode: 'repeatUntilCondition',
          blockType: Scratch.BlockType.LOOP,
          text: 'цикл до условия [CONDITION]',
          arguments: {
            CONDITION: { type: Scratch.ArgumentType.BOOLEAN }
          }
        },
        // Повторять с паузой и обратным отсчётом
        {
          opcode: 'repeatWithCountdownForever',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с паузой [PAUSE] секунд и обратным отсчётом всегда',
          arguments: {
            PAUSE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'repeatWithCountdownCount',
          blockType: Scratch.BlockType.LOOP,
          text: 'повторять с паузой [PAUSE] секунд и обратным отсчётом [COUNT] раз',
          arguments: {
            PAUSE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            COUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        }
      ]
    };
  }

  // Повторять в течение времени
  repeatForTimeForever({ TIME }, util) {
    const durationMs = Scratch.Cast.toNumber(TIME) * 1000;
    if (!util.stackFrame.startTime) {
      util.stackFrame.startTime = performance.now();
    }
    const elapsed = performance.now() - util.stackFrame.startTime;
    if (elapsed < durationMs) {
      util.startBranch(1, true);
    } else {
      util.stackFrame.startTime = performance.now(); // Сброс для бесконечного цикла
      util.startBranch(1, true);
    }
  }

  repeatForTimeCount({ TIME, COUNT }, util) {
    const durationMs = Scratch.Cast.toNumber(TIME) * 1000;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.state) {
      util.stackFrame.state = { startTime: performance.now(), counter: 0 };
    }
    const elapsed = performance.now() - util.stackFrame.state.startTime;
    if (util.stackFrame.state.counter < count && elapsed < durationMs) {
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
    } else if (elapsed >= durationMs) {
      delete util.stackFrame.state; // Очистка состояния
    }
  }

  // Повторять с задержкой
  repeatWithDelayForever({ DELAY }, util) {
    const delayMs = Scratch.Cast.toNumber(DELAY) * 1000;
    if (!util.stackFrame.timerStart) {
      util.stackFrame.timerStart = performance.now();
      util.startBranch(1, true);
    }
    const elapsed = performance.now() - util.stackFrame.timerStart;
    if (elapsed >= delayMs) {
      util.stackFrame.timerStart = performance.now();
      util.startBranch(1, true);
    } else {
      util.yield();
    }
  }

  repeatWithDelayCount({ DELAY, COUNT }, util) {
    const delayMs = Scratch.Cast.toNumber(DELAY) * 1000;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.state) {
      util.stackFrame.state = { counter: 0, timerStart: performance.now() };
    }
    const elapsed = performance.now() - util.stackFrame.state.timerStart;
    if (util.stackFrame.state.counter < count && elapsed >= delayMs) {
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
      util.stackFrame.state.timerStart = performance.now();
    } else if (util.stackFrame.state.counter < count) {
      util.yield();
    } else {
      delete util.stackFrame.state;
    }
  }

  // Периодически повторять
  repeatPeriodicallyForever({ PERIOD, TIME }, util) {
    const periodMs = Scratch.Cast.toNumber(PERIOD) * 1000;
    const durationMs = Scratch.Cast.toNumber(TIME) * 1000;
    if (!util.stackFrame.state) {
      util.stackFrame.state = { startTime: performance.now(), lastRun: performance.now() };
      util.startBranch(1, true);
    }
    const elapsedTotal = performance.now() - util.stackFrame.state.startTime;
    const elapsedSinceLast = performance.now() - util.stackFrame.state.lastRun;
    if (elapsedTotal < durationMs && elapsedSinceLast >= periodMs) {
      util.startBranch(1, true);
      util.stackFrame.state.lastRun = performance.now();
    } else if (elapsedTotal >= durationMs) {
      util.stackFrame.state.startTime = performance.now();
      util.stackFrame.state.lastRun = performance.now();
      util.startBranch(1, true);
    } else {
      util.yield();
    }
  }

  repeatPeriodicallyCount({ PERIOD, TIME, COUNT }, util) {
    const periodMs = Scratch.Cast.toNumber(PERIOD) * 1000;
    const durationMs = Scratch.Cast.toNumber(TIME) * 1000;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.state) {
      util.stackFrame.state = { counter: 0, startTime: performance.now(), lastRun: performance.now() };
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
    }
    const elapsedTotal = performance.now() - util.stackFrame.state.startTime;
    const elapsedSinceLast = performance.now() - util.stackFrame.state.lastRun;
    if (util.stackFrame.state.counter < count && elapsedTotal < durationMs && elapsedSinceLast >= periodMs) {
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
      util.stackFrame.state.lastRun = performance.now();
    } else if (elapsedTotal >= durationMs || util.stackFrame.state.counter >= count) {
      delete util.stackFrame.state;
    } else {
      util.yield();
    }
  }

  // Турбоповторить
  turboRepeatForever({}, util) {
    util.startBranch(1, true);
  }

  turboRepeatCount({ COUNT }, util) {
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.counter) {
      util.stackFrame.counter = 0;
    }
    if (util.stackFrame.counter < count) {
      util.startBranch(1, true);
      util.stackFrame.counter++;
    } else {
      delete util.stackFrame.counter;
    }
  }

  // Повторять с ускорением
  repeatWithAccelerationForever({ TIME }, util) {
    const initialDelayMs = Scratch.Cast.toNumber(TIME) * 1000;
    if (!util.stackFrame.state) {
      util.stackFrame.state = { currentDelay: initialDelayMs, lastRun: performance.now() };
      util.startBranch(1, true);
    }
    const elapsed = performance.now() - util.stackFrame.state.lastRun;
    if (elapsed >= util.stackFrame.state.currentDelay) {
      util.startBranch(1, true);
      util.stackFrame.state.lastRun = performance.now();
      util.stackFrame.state.currentDelay *= 0.9; // Ускорение
      if (util.stackFrame.state.currentDelay < 10) util.stackFrame.state.currentDelay = 10;
    } else {
      util.yield();
    }
  }

  repeatWithAccelerationCount({ TIME, COUNT }, util) {
    const initialDelayMs = Scratch.Cast.toNumber(TIME) * 1000;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.state) {
      util.stackFrame.state = { counter: 0, currentDelay: initialDelayMs, lastRun: performance.now() };
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
    }
    const elapsed = performance.now() - util.stackFrame.state.lastRun;
    if (util.stackFrame.state.counter < count && elapsed >= util.stackFrame.state.currentDelay) {
      util.startBranch(1, true);
      util.stackFrame.state.counter++;
      util.stackFrame.state.lastRun = performance.now();
      util.stackFrame.state.currentDelay *= 0.9;
      if (util.stackFrame.state.currentDelay < 10) util.stackFrame.state.currentDelay = 10;
    } else if (util.stackFrame.state.counter < count) {
      util.yield();
    } else {
      delete util.stackFrame.state;
    }
  }

  // Повторять с шансом
  repeatWithChanceForever({ CHANCE }, util) {
    const chance = Scratch.Cast.toNumber(CHANCE) / 100;
    if (Math.random() < chance) {
      util.startBranch(1, true);
    } else {
      util.startBranch(1, true); // Продолжаем цикл даже без выполнения
    }
  }

  repeatWithChanceCount({ CHANCE, COUNT }, util) {
    const chance = Scratch.Cast.toNumber(CHANCE) / 100;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.counter) {
      util.stackFrame.counter = 0;
    }
    if (util.stackFrame.counter < count) {
      if (Math.random() < chance) {
        util.startBranch(1, true);
      }
      util.stackFrame.counter++;
    } else {
      delete util.stackFrame.counter;
    }
  }

  // Цикл до условия
  repeatUntilCondition({ CONDITION }, util) {
    if (!Scratch.Cast.toBoolean(CONDITION)) {
      util.startBranch(1, true);
    }
  }

  // Повторять с паузой и обратным отсчётом
  repeatWithCountdownForever({ PAUSE }, util) {
    const pauseMs = Scratch.Cast.toNumber(PAUSE) * 1000;
    if (!util.stackFrame.state) {
      util.stackFrame.state = { lastRun: performance.now() };
      util.startBranch(1, true);
    }
    const elapsed = performance.now() - util.stackFrame.state.lastRun;
    if (elapsed >= pauseMs) {
      util.startBranch(1, true);
      util.stackFrame.state.lastRun = performance.now();
    } else {
      util.yield();
    }
  }

  repeatWithCountdownCount({ PAUSE, COUNT }, util) {
    const pauseMs = Scratch.Cast.toNumber(PAUSE) * 1000;
    const count = Scratch.Cast.toNumber(COUNT);
    if (!util.stackFrame.state) {
      util.stackFrame.state = { counter: count, lastRun: performance.now() };
      Scratch.vm.runtime.setVariableValue(util.target.id, 'Осталось повторений', count);
      util.startBranch(1, true);
      util.stackFrame.state.counter--;
      Scratch.vm.runtime.setVariableValue(util.target.id, 'Осталось повторений', util.stackFrame.state.counter);
    }
    const elapsed = performance.now() - util.stackFrame.state.lastRun;
    if (util.stackFrame.state.counter > 0 && elapsed >= pauseMs) {
      util.startBranch(1, true);
      util.stackFrame.state.counter--;
      util.stackFrame.state.lastRun = performance.now();
      Scratch.vm.runtime.setVariableValue(util.target.id, 'Осталось повторений', util.stackFrame.state.counter);
    } else if (util.stackFrame.state.counter > 0) {
      util.yield();
    } else {
      delete util.stackFrame.state;
    }
  }
}

Scratch.extensions.register(new CyclesPlus());