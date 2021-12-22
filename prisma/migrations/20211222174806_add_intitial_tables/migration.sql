-- CreateEnum
CREATE TYPE "vote_tag" AS ENUM ('UPVOTE', 'DOWNVOTE', 'COMMENT', 'CREATE', 'UPDATE', 'REMOVE');

-- CreateEnum
CREATE TYPE "beer_style" AS ENUM ('LAGER', 'PALE_ALE', 'IPA', 'DOUBLE_IPA', 'TRIPLE_IPA', 'AMBER_ALE', 'STOUT');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('DRINKING_BUDDY', 'BARTENDER', 'BREWMASTER');

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "street_address" TEXT NOT NULL,
    "street_address_extended" TEXT,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "zip_code" VARCHAR(5) NOT NULL,
    "zip_code_extension" VARCHAR(5),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "breweries" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "breweries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ibu" INTEGER NOT NULL,
    "abv" DECIMAL(65,30) NOT NULL,
    "brewery_id" TEXT NOT NULL,
    "style" "beer_style" NOT NULL,

    CONSTRAINT "beers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(32) NOT NULL,
    "username" VARCHAR NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "role" "user_role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beer_comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" VARCHAR(512) NOT NULL,
    "beerId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "beer_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brewery_comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" VARCHAR(512) NOT NULL,
    "breweryId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "brewery_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beer_tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag" "vote_tag" NOT NULL,
    "beer_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "beer_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brewery_tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag" "vote_tag" NOT NULL,
    "beer_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "brewery_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breweries_address_id_key" ON "breweries"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "breweries" ADD CONSTRAINT "breweries_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beers" ADD CONSTRAINT "beers_brewery_id_fkey" FOREIGN KEY ("brewery_id") REFERENCES "breweries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beer_comments" ADD CONSTRAINT "beer_comments_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "beers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beer_comments" ADD CONSTRAINT "beer_comments_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewery_comments" ADD CONSTRAINT "brewery_comments_breweryId_fkey" FOREIGN KEY ("breweryId") REFERENCES "breweries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewery_comments" ADD CONSTRAINT "brewery_comments_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beer_tags" ADD CONSTRAINT "beer_tags_beer_id_fkey" FOREIGN KEY ("beer_id") REFERENCES "beers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beer_tags" ADD CONSTRAINT "beer_tags_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewery_tags" ADD CONSTRAINT "brewery_tags_beer_id_fkey" FOREIGN KEY ("beer_id") REFERENCES "breweries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewery_tags" ADD CONSTRAINT "brewery_tags_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
