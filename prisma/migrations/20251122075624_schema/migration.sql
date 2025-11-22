-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "eventPda" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "collectionMint" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "startTimestamp" BIGINT NOT NULL,
    "endTimestamp" BIGINT NOT NULL,
    "maxClaims" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "bump" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimRecord" (
    "id" TEXT NOT NULL,
    "claimPda" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "eventPda" TEXT NOT NULL,
    "mint" TEXT NOT NULL,
    "collectionMint" TEXT NOT NULL,
    "claimedAt" BIGINT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventUri" TEXT NOT NULL,

    CONSTRAINT "ClaimRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizerProfile" (
    "id" TEXT NOT NULL,
    "profilePda" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "eventCount" BIGINT NOT NULL,

    CONSTRAINT "OrganizerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionAuthority" (
    "id" TEXT NOT NULL,
    "authorityPda" TEXT NOT NULL,
    "bump" INTEGER NOT NULL,
    "creator" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "nftName" TEXT NOT NULL,
    "nftUri" TEXT NOT NULL,

    CONSTRAINT "CollectionAuthority_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventPda_key" ON "Event"("eventPda");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimRecord_claimPda_key" ON "ClaimRecord"("claimPda");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerProfile_profilePda_key" ON "OrganizerProfile"("profilePda");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionAuthority_authorityPda_key" ON "CollectionAuthority"("authorityPda");

-- AddForeignKey
ALTER TABLE "ClaimRecord" ADD CONSTRAINT "ClaimRecord_eventPda_fkey" FOREIGN KEY ("eventPda") REFERENCES "Event"("eventPda") ON DELETE RESTRICT ON UPDATE CASCADE;
