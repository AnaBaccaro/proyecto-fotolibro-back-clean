const { User } = require("../models");

module.exports = async () => {
  await User.bulkCreate(
    [
      {
        user: "admin",
        email: "admin@admin.com",
        password: "1234",
        role: "admin",
      },
    ],
    { individualHooks: true }
  );

  console.log("👤 Usuario admin creado");
};
