
  module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", { 
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          
        usersId: {
            type: DataTypes.INTEGER,
            
            references: {
                model:"Users",
                key: 'id'
            },
            
            allowNull: false,
        },
        
        postsId: {
            type: DataTypes.INTEGER,
            
            references: {
              model:"Posts",
              key: "id",
            },
            
            allowNull: false,
        },
         
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });

    
    Comments.associate = (models) => {
        /*
        models.Users.belongsToMany(models.Posts, {
            through: models.Comments,
            foreignKey: 'UserId',
            otherKey: 'PostId'
        })
        models.Posts.belongsToMany(models.Users, {
            through: models.Comments,
            foreignKey: 'PostId',
            otherKey: 'UserId'
        })
        */
       
        //we want to connect foreignKey and reference table with alias (as)
        Comments.belongsTo(models.Users, {
            foreignKey: 'usersId',
        })
        
        Comments.belongsTo(models.Posts, {
            foreignKey: 'postsId',
            onDelete: "CASCADE",
        })
    
    };
    
  
    return Comments;
  };
