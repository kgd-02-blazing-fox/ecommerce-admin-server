const { Product } = require("../../models/index")

async function clearProductsDatabase() {
  if (process.env.NODE_ENV === "test") {
    await Product.destroy({ truncate: true })
  }
}

module.exports = {
  clearProductsDatabase
}