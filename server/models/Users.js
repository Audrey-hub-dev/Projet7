

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
        //default: false,
      },
      
      
    });
  
    
    Users.associate = (models) => {
     
       // Users.hasMany(models.Likes, {
            //onDelete: "cascade",
        //});
        //users has many posts
        Users.hasMany(models.Posts, {
          foreignKey: "userId",
          as: "posts",
          onDelete: "cascade",
        });
        //Users has many comments
        //Users.hasMany(models.Comments);
    };
    

    return Users;
  };

  /*
exports.findByPk = (id) => {
  return Users.findByPk(id)
  .then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result
  })
}
*/