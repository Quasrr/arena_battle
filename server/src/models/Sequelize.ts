import "dotenv/config";
import { Sequelize } from "sequelize";
import { requireEnv } from "../config/env.ts";

export const sequelize = new Sequelize(requireEnv("PG_URL"), {
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    logging: false
});

await sequelize.authenticate();