
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
        // we want to connect tables Users and Posts (many to many)
        //going through table Likes (first two tables)
        //relationship between 'Users' and 'Posts' created through
        //an associative table
        /*
        models.Users.belongsToMany(models.Posts,
             {
            through: models.Likes,
            foreignKey: 'postsLId',
            otherKey: 'usersLId'
        })
        models.Posts.belongsToMany(models.Users, {
            through: models.Likes,
            foreignKey: 'postsLId',
            otherKey: 'usersLId'
        })
        */
       /*
        //we want to connect foreignKey and reference table with alias (as)
        models.Likes.belongsTo(models.Users, {
            foreignKey: 'usersLId',
            as: 'beau',
        })
        */
        
        Likes.belongsTo(models.Posts, {
            foreignKey: 'postsLId',
            onDelete: "CASCADE",
        })


    }
    

  
    return Likes;
  };
 
