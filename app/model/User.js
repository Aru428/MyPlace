function User(Sequelize, DataTypes){
    return Sequelize.define(
        "User",
        {
            // u_id, email, password, name
            u_id: {
                type: DataTypes.STRING(8),
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            }, 
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            tableName: "User",
            freezeTableName: true,
            timestamps: false,
        }
    );
}

module.exports = User;