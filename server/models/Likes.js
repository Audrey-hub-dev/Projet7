
module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        
        postsLId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         
        },
        usersLId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });


    Likes.associate = (models) => {
        Likes.belongsTo(models.Posts, {
            foreignKey: 'postsLId',
            onDelete: "CASCADE",
        })


    }
    

  
    return Likes;
  };
 
