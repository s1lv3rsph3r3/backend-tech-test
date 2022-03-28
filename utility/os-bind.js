const bindToPort = (httpServer) => {
  // Let the server listen on a particular port
  httpServer.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: 3000`);
  });
};

module.exports = {
  bindToPort,
};
