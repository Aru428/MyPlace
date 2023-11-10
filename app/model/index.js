// commet랑 조인
// db.Gallery.hasMany(db.Comment, {
//     foreignKey:"g_id",
// })

// db.Comment.belongTo(db.Gallery, {
//     onDelete: "cascade",
//     foreignKey: "g_id",
// })-----------------------

// heart랑 조인
// db.Gallery.hasMany(db.Heart, {
//     foreignKey: "g_id",
// })
// db.Heart.belongTo(db.Gallery,  {
//         foreignKey: "g_id",
// })
// db.User.hasMany(db.Heart, {
//     foreignKey: "u_id",
// })
// db.Heart.belongTo(db.User, {
//     foreignKey: "u_id",
// })
