import { Model, DataTypes } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "./Sequelize.ts";

type UserAttributes = {
    id: number;
    username: string;
    password: string;
    currentBattle: string | null;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> {
    username!: string;
    password!: string;
    currentBattle!: string | null;
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentBattle: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: "user"
});