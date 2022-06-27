

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      
      
    });
  
    Users.associate = (models) => {
        //users has many posts
        Users.hasMany(models.Posts, {
          foreignKey: "userId",
          as: "posts",
          onDelete: "cascade",
        });
    };
    

    return Users;
  };

