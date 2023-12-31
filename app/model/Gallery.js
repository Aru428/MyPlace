function Gallery(Sequelize, DataTypes) {
  return Sequelize.define(
    "gallery",
    {
      g_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      g_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      imgurl: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      deadline: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      detailaddr: {
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "gallery",
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Gallery;
