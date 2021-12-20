-- CreateEnum
CREATE TYPE "vote_tag" AS ENUM ('Upvote', 'Downvote');

-- CreateEnum
CREATE TYPE "beer_style" AS ENUM ('LAGER', 'PALE_ALE', 'IPA', 'DOUBLE_IPA', 'TRIPLE_IPA', 'AMBER_ALE', 'STOUT');

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
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
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "breweries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ibu" INTEGER NOT NULL,
    "abv" DECIMAL(65,30) NOT NULL,
    "brewery_id" INTEGER NOT NULL,

    CONSTRAINT "beers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beer_tags" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag" "vote_tag" NOT NULL,
    "beer_id" INTEGER NOT NULL,

    CONSTRAINT "beer_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brewery_tags" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag" "vote_tag" NOT NULL,
    "beer_id" INTEGER NOT NULL,

    CONSTRAINT "brewery_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breweries_address_id_key" ON "breweries"("address_id");

-- AddForeignKey
ALTER TABLE "breweries" ADD CONSTRAINT "breweries_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beers" ADD CONSTRAINT "beers_brewery_id_fkey" FOREIGN KEY ("brewery_id") REFERENCES "breweries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beer_tags" ADD CONSTRAINT "beer_tags_beer_id_fkey" FOREIGN KEY ("beer_id") REFERENCES "beers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brewery_tags" ADD CONSTRAINT "brewery_tags_beer_id_fkey" FOREIGN KEY ("beer_id") REFERENCES "breweries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
