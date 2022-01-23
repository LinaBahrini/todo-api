module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('Todo', {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    
    return Todo;
  };
  