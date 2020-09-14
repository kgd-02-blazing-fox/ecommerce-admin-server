const { User } = require("../../models/index")

async function clearUsersDatabase() {
  if (process.env.NODE_ENV === "test") {
    await User.destroy({
      where: {
        role: 'user'
      }
    })
  }
}

module.exports = {
  clearUsersDatabase
}