import { Model, DataTypes } from "sequelize";
import { sequelize } from "./Sequelize.ts";

export class Battle extends Model {};

Battle.init({
    battleId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    turn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "battle"
});