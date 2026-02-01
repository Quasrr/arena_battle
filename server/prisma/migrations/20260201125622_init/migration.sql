-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "currentBattle" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle" (
    "battleId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "turn" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "battle_pkey" PRIMARY KEY ("battleId")
);

-- CreateTable
CREATE TABLE "battle_participant" (
    "userId" INTEGER NOT NULL,
    "battleId" TEXT NOT NULL,

    CONSTRAINT "battle_participant_pkey" PRIMARY KEY ("userId","battleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "battle_participant" ADD CONSTRAINT "battle_participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_participant" ADD CONSTRAINT "battle_participant_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "battle"("battleId") ON DELETE RESTRICT ON UPDATE CASCADE;
