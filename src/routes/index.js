const {
  UserController,
} = require('../controllers');

const verifyToken = require('../auth/verifyToken');
const userController = new UserController();

module.exports = (app) => {
  // app.post('/register', userController.register);
  // app.post('/login', userController.login);

  // app.get('/users', verifyToken,
  //   userController.getAll.bind(userController));

  app.get('/users',
    userController.getAll.bind(userController));

  app.get('/users/:id',
    userController.get.bind(userController));

  app.delete('/users/:id',
    userController.remove.bind(userController));

  app.patch('/users/:id',
    userController.update.bind(userController));

  app.use((req, res) => {
    res
      .status(404)
      .send('Sorry can\'t find that!');
  });

  app.get('*', (req, res) => res
    .status(200)
    .send({
      message: 'Welcome to the beginning of nothingness.',
    }));
};
