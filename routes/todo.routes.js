const todosController = require('../controllers/todos');
const todoItemsController = require('../controllers/todoitems');
const { authJwt } = require("../middleware");

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.post('/api/todos',[authJwt.verifyToken], todosController.create);
  app.get('/api/todos',[authJwt.verifyToken], todosController.list);
  app.get('/api/todos/:todoId',[authJwt.verifyToken], todosController.retrieve);
  app.put('/api/todos/:todoId', [authJwt.verifyToken], todosController.update);
  app.delete('/api/todos/:todoId', [authJwt.verifyToken], todosController.destroy);

  app.post('/api/todos/:todoId/items', [authJwt.verifyToken], todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', [authJwt.verifyToken], todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', [authJwt.verifyToken], todoItemsController.destroy
  );
  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
