module.exports = (sequelize, Sequelize) => {
    const TodoItem = sequelize.define('TodoItem', {
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
    
    return TodoItem;
  };
  