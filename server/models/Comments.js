
  module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model:"Users",
                key: 'id'
            },
            allowNull: false,
        },
        PostId: {
            type: DataTypes.INTEGER,
            references: {
              model:"Posts",
              key: "id",
            },
            allowNull: false,
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });

    Comments.associate = (models) => {
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
        //we want to connect foreignKey and reference table with alias (as)
        models.Comments.belongsTo(models.Users, {
            foreignKey: 'UserId',
            as: 'User',
        })
        models.Comments.belongsTo(models.Posts, {
            foreignKey: 'PostId',
            ad: 'Post'
        })
    };
  
    return Comments;
  };
