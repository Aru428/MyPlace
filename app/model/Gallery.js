function Gallery(Sequelize, DataTypes) {
    return Sequelize.define(
        "Gallery",
        {
            // g_id, g_name, address,deadline, website, category
            g_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            g_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            website: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            tableName: "Gallery",

        }
    );
}

module.exports = Gallery;