module.exports = {
  name: 'hello',
  description: 'Hello command.',
  execute(message, args) {
    message.reply('Hello, how are you?');
  },
};
