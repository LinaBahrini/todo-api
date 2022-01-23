const db = require('../models');
const Todo = db.todo;
const TodoItem = db.todoItem;


exports.create = (req, res)=> {
    return Todo
      .create({
        title: req.body.title,
        userId: req.userId
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  };
exports.list = (req, res) => {
    return Todo
      .findAll({
        where: {
          userId: req.userId,
        },
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
  };

exports.retrieve = (req, res) => {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
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

exports.update = (req, res) => {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  };

exports.destroy = (req, res) => {
    return Todo
      .findByPk(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send('Todo deleted'))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  };

