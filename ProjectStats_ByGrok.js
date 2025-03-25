// Name: Project Stats
// ID: projectStats
// Description: Tracks active code blocks, sent messages, and received messages in the project
// By: Grok (based on user request)
// Version: 1.0.6

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Project Stats must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  // Переменные для хранения статистики
  let activeBlocks = 0;
  let sentMessages = 0;
  let receivedMessages = 0;

  // Слушатели событий
  const originalStep = runtime._step;
  runtime._step = function (...args) {
    try {
      // Подсчет активных блоков
      activeBlocks = 0;
      runtime.threads.forEach(thread => {
        if (thread.status === 0) activeBlocks++;
      });
    } catch (e) {
      console.error("Project Stats: Error in step function:", e);
    }
    
    return originalStep.apply(this, args);
  };

  // Перехват отправки и приёма сообщений
  const originalBroadcast = runtime.startHats;
  runtime.startHats = function (...args) {
    try {
      if (args[0] === 'event_whenbroadcastreceived') {
        sentMessages++; // Увеличиваем счётчик отправленных сообщений
        // Вызываем оригинальную функцию и получаем массив запущенных потоков
        const threads = originalBroadcast.apply(this, args);
        if (Array.isArray(threads)) {
          receivedMessages += threads.length; // Добавляем количество принятых сообщений
        }
      }
    } catch (e) {
      console.error("Project Stats: Error in broadcast handler:", e);
    }
    return originalBroadcast.apply(this, args);
  };

  class ProjectStats {
    getInfo() {
      return {
        id: "projectStats",
        name: "Project Stats",
        color1: "#4a90e2",
        color2: "#357abd",
        color3: "#2c6399",
        blocks: [
          {
            opcode: "getActiveBlocks",
            blockType: Scratch.BlockType.REPORTER,
            text: "active code blocks",
            disableMonitor: false
          },
          {
            opcode: "getSentMessages",
            blockType: Scratch.BlockType.REPORTER,
            text: "total messages sent",
            disableMonitor: false
          },
          {
            opcode: "getReceivedMessages",
            blockType: Scratch.BlockType.REPORTER,
            text: "total messages received",
            disableMonitor: false
          },
          {
            opcode: "resetMessageCounters",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset message counters"
          }
        ]
      };
    }

    // Функции блоков
    getActiveBlocks() {
      return activeBlocks;
    }

    getSentMessages() {
      return sentMessages;
    }

    getReceivedMessages() {
      return receivedMessages;
    }

    resetMessageCounters() {
      sentMessages = 0;
      receivedMessages = 0;
    }
  }

  Scratch.extensions.register(new ProjectStats());
})(Scratch);