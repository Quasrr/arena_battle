// import des models
import { User } from "./User.js";
import { Battle } from "./Battle.js";
import { sequelize } from "./Sequelize.js";


// User <--> Battle (Many-to-Many)
User.belongsToMany(Battle, {
    as: "battles",
    through: "battle_participant",
    foreignKey: "user_id"
});

Battle.belongsToMany(User, {
    as: "users",
    through: "battle_participant",
    foreignKey: "battle_id"
});

export { User, Battle, sequelize };