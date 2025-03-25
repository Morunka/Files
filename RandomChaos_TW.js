class RandomChaos {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'randomchaos',
      name: 'Рандомный Хаос',
      color1: '#9900FF', // Яркий фиолетовый
      color2: '#7700CC',
      color3: '#550099',
      description: 'Добавь хаоса и случайности в свой проект!',
      blocks: [
        {
          opcode: 'randomTeleport',
          blockType: Scratch.BlockType.COMMAND,
          text: 'случайно телепортироваться на [DISTANCE] единиц',
          arguments: {
            DISTANCE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
          }
        },
        {
          opcode: 'randomResize',
          blockType: Scratch.BlockType.COMMAND,
          text: 'изменить размер на случайное значение от [MIN] до [MAX]',
          arguments: {
            MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 150 }
          }
        },
        {
          opcode: 'createExplosion',
          blockType: Scratch.BlockType.COMMAND,
          text: 'создать взрыв с силой [POWER]',
          arguments: {
            POWER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
          }
        },
        {
          opcode: 'sayRandomWord',
          blockType: Scratch.BlockType.COMMAND,
          text: 'сказать случайное слово из списка [LIST]',
          arguments: {
            LIST: { type: Scratch.ArgumentType.STRING, defaultValue: 'привет, хаос, взрыв, ура' }
          }
        },
        {
          opcode: 'swapWithRandomSprite',
          blockType: Scratch.BlockType.COMMAND,
          text: 'поменяться местами с другим случайным спрайтом',
          arguments: {}
        },
        {
          opcode: 'randomColorFilter',
          blockType: Scratch.BlockType.COMMAND,
          text: 'случайный цветной фильтр',
          arguments: {}
        }
      ]
    };
  }

  // Случайно телепортироваться
  randomTeleport({ DISTANCE }, util) {
    const distance = Scratch.Cast.toNumber(DISTANCE);
    const angle = Math.random() * 360; // Случайный угол
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance;
    const sprite = util.target;
    sprite.setXY(sprite.x + dx, sprite.y + dy);
  }

  // Изменить размер на случайное значение
  randomResize({ MIN, MAX }, util) {
    const min = Scratch.Cast.toNumber(MIN);
    const max = Scratch.Cast.toNumber(MAX);
    const size = min + Math.random() * (max - min);
    util.target.setSize(size);
  }

  // Создать взрыв
  createExplosion({ POWER }, util) {
    const power = Scratch.Cast.toNumber(POWER);
    if (!util.stackFrame.explosionStep) {
      util.stackFrame.explosionStep = 0;
      util.stackFrame.originalX = util.target.x;
      util.stackFrame.originalY = util.target.y;
      util.stackFrame.originalSize = util.target.size;
    }
    const step = util.stackFrame.explosionStep;
    if (step < power * 2) {
      const offset = (Math.random() - 0.5) * power * 10;
      util.target.setXY(
        util.stackFrame.originalX + offset,
        util.stackFrame.originalY + offset
      );
      util.target.setSize(util.stackFrame.originalSize + (Math.random() * power * 5));
      util.stackFrame.explosionStep++;
      util.yield();
    } else {
      util.target.setXY(util.stackFrame.originalX, util.stackFrame.originalY);
      util.target.setSize(util.stackFrame.originalSize);
      delete util.stackFrame.explosionStep;
      delete util.stackFrame.originalX;
      delete util.stackFrame.originalY;
      delete util.stackFrame.originalSize;
    }
  }

  // Сказать случайное слово
  sayRandomWord({ LIST }, util) {
    const words = Scratch.Cast.toString(LIST).split(',').map(word => word.trim());
    const randomWord = words[Math.floor(Math.random() * words.length)];
    util.target.say(randomWord);
  }

  // Поменяться местами с другим спрайтом
  swapWithRandomSprite({}, util) {
    const currentSprite = util.target;
    const allSprites = this.runtime.targets.filter(t => t.isSprite && t !== currentSprite);
    if (allSprites.length > 0) {
      const randomSprite = allSprites[Math.floor(Math.random() * allSprites.length)];
      const tempX = currentSprite.x;
      const tempY = currentSprite.y;
      currentSprite.setXY(randomSprite.x, randomSprite.y);
      randomSprite.setXY(tempX, tempY);
    }
  }

  // Случайный цветной фильтр
  randomColorFilter({}, util) {
    const effects = [
      { effect: 'color', value: Math.random() * 200 },
      { effect: 'brightness', value: (Math.random() - 0.5) * 100 },
      { effect: 'ghost', value: Math.random() * 100 },
      { effect: 'invert', value: Math.random() < 0.5 ? 100 : 0 }
    ];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    util.target.setEffect(randomEffect.effect, randomEffect.value);
  }
}

Scratch.extensions.register(new RandomChaos());