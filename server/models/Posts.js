
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
        //references: {
           // model:"Users",
            //key: 'id'
        allowNull: false,
        },
        //allowNull: 
        /*
      userEmail: {
        type: DataTypes.STRING,  
        allowNull: false

      },
      */
      

    })
  
    
  /*
    Posts.associate = (models) => {
      
      Posts.hasMany(models.Comments , {
        onDelete: "cascade",
      });
  
      
      Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    //}
  
      
      
      models.Posts.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      
    }
    
    */

    
    Posts.associate = (models) => {
      Posts.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",
        onDelete: "CASCADE", // Si on supprime un user, on supprime ses posts
      });
      
      Posts.hasMany(models.Likes,
        { foreignKey: "postsLId",
          as: "Likes",
         onDelete: "cascade" });
      
      //Posts.hasMany(models.Likes, { foreignKey: "usersLId", as: "userlike"})
      Posts.hasMany(models.Comments, 
        { foreignKey: "postsId", 
        as: "comments",
        onDelete: "cascade" });
      //Posts.hasMany(models.Comments, { foreignKey: "postsId", as: "userComment"})
     
      
    //}
/*
    Posts.hasMany(models.Likes, {
      foreignKey: 'postsLId',
      as: 'postlike',
     
    });
    
    Posts.hasMany(models.likes, {
      foreignKey: 'usersLId',
      as: 'userlike',
      
    });
  }
*/

    }

    return Posts;
  };