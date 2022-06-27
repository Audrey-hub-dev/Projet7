
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
