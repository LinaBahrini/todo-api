const db = require('../models');
const Todo = db.todo;
const TodoItem = db.todoItem;
const User = db.user;

exports.list = (req, res) => {
  return User
    .findAll({
      
      include: [{
        model: Todo,
        as: 'todos',
        include: [{
            model: TodoItem,
            as: 'todoItems',
        }]
      }],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Todo, as: 'todos' }, 'createdAt', 'ASC'],
      ],
    })
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(400).send(error));
};
exports.destroy = (req, res) => {
  return User
    .findByPk(req.params?.userId ||req.userId)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send({message: 'user deleted',}))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

exports.retrieve = (req, res) => {
  return User
    .findByPk(req.params?.userId ||req.userId, {
      include: [{
        model: Todo,
        as: 'todos',
        include: [{
            model: TodoItem,
            as: 'todoItems',
        }]
      }],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Todo, as: 'todos' }, 'createdAt', 'ASC'],
      ],
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return res.status(200).send(todo);
    })
    .catch((error) => res.status(400).send(error));
};