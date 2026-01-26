// import des models
import { User } from "./User.ts";
import { Battle } from "./Battle.ts";
import { sequelize } from "./Sequelize.ts";


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