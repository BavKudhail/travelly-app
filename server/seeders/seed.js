const db = require("../config/connection");
const { User, CountryBadge, Country } = require("../models");
const userSeeds = require("./userSeeds.json");
const countryBadgeSeeds = require("./countryBadgeSeeds.json");
const countrySeeds = require("./countrySeeds.json");

db.once("open", async () => {
  try {
    // Clearing existing seeds
    await User.deleteMany({});
    await Country.deleteMany({});
    await CountryBadge.deleteMany({});

    // Creating new seeds
    await User.create(userSeeds);

    await Country.create(countrySeeds);

    await CountryBadge.create(countryBadgeSeeds);

    // Creating relationships between seed data
    // ? Believe this should return an array of all the seeded countries - LW
    const countries = await Country.find();

    // ? Believe this should return array of all the existing country badges, which at this stage will not contain any countries - LW
    const countryBadges = await CountryBadge.find();

    // ? I believe this will add 5 random country _ids to each country badge - LW
    // ! Currently not working - don't think its awaiting here
    await countryBadges.forEach((badge) => {
      CountryBadge.findByIdAndUpdate(
        { _id: badge._id },
        {
          $addToSet: {
            // countries: [...countries][
            //   Math.floor(Math.random() * ([...countries].length - 1))
            // ]._id,
            // countries: [...countries][
            //   Math.floor(Math.random() * ([...countries].length - 1))
            // ]._id,
            // countries: [...countries][
            //   Math.floor(Math.random() * ([...countries].length - 1))
            // ]._id,
            // countries: [...countries][
            //   Math.floor(Math.random() * ([...countries].length - 1))
            // ]._id,
            // countries: [...countries][
            //   Math.floor(Math.random() * ([...countries].length - 1))
            // ]._id,
            countries: "6299ea491a439e62170d24c6",
          },
        },
        { new: true, runValidators: true }
      );
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
