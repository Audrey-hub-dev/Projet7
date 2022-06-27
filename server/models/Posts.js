
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },
      
      userId: {
        type: DataTypes.INTEGER,  
        allowNull: false,
        },
    })

    Posts.associate = (models) => {
      Posts.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",
        onDelete: "CASCADE",
      });
      
      Posts.hasMany(models.Likes,
        { foreignKey: "postsLId",
          as: "Likes",
         onDelete: "cascade" });
      Posts.hasMany(models.Comments, 
        { foreignKey: "postsId", 
        as: "comments",
        onDelete: "cascade" });

    }

    return Posts;
  };