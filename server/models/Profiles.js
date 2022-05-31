
  module.exports = (sequelize, DataTypes) => {
    const Profiles = sequelize.define("Profiles", {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
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
    Profiles.associate = (models) => {
        models.Profiles.belongsTo(models.Users, {
          foreignKey: 'UserId',
          as: 'User',
      })
    };
   
    return Profiles;
};
