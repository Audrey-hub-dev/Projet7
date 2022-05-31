

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ProfileId: { 
          type: DataTypes.INTEGER,
            references: {
                model:"Profiles",
                key: 'id'
        },
        allowNull: true,

      }
    });
  
   
    Users.associate = (models) => {
        //users has many likes 
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });
        //users has many posts
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
        //Users has many comments
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        models.Users.belongsTo(models.Profiles, {
        foreignKey: 'ProfileId',
        as: 'Profile',
    })
    };


    return Users;
  };

