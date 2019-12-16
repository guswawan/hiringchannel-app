module.exports = {
  getWelcome: (_, res) => {
    res.json ({
      msg: 'Hello Hiring Channel App',
    });
  },
};
