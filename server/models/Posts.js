
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      UserId: {
        type: DataTypes.INTEGER,
        references: {
            model:"Users",
            key: 'id'
        },
        allowNull: false,
    }
    });
  
    Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
        onDelete: "cascade",
      });
  
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
      models.Posts.belongsTo(models.Users, {
        foreignKey: 'UserId',
        as: 'User',
    })
    };
    return Posts;
  };