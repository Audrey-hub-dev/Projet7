module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
        PostId: {
            type: DataTypes.INTEGER,

            references: {
              model:"Posts",
              key: "id",
            
            },
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

    Likes.associate = (models) => {
        // we want to connect tables Users and Posts (many to many)
        //going through table Likes (first two tables)
        //relationship between 'Users' and 'Posts' created through
        //an associative table
        models.Users.belongsToMany(models.Posts, {
            through: models.Likes,
            foreignKey: 'UserId',
            otherKey: 'PostId'
        })
        models.Posts.belongsToMany(models.Users, {
            through: models.Likes,
            foreignKey: 'PostId',
            otherKey: 'UserId'
        })
        //we want to connect foreignKey and reference table with alias (as)
        models.Likes.belongsTo(models.Users, {
            foreignKey: 'UserId',
            as: 'User',
        })
        models.Likes.belongsTo(models.Posts, {
            foreignKey: 'PostId',
            ad: 'Post'
        })

    }
  
    return Likes;
  };
 
