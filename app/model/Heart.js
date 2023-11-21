function Heart(Sequelize, DataTypes) {
  return Sequelize.define(
    "heart",
    {
      // h_id, u_id, g_id
      h_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      u_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // index.js 에서 조인설정해놈
      },
      g_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "heart",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
module.exports = Heart;
