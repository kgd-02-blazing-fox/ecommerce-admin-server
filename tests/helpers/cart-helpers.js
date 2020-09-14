const { Chart } = require("../../models/index")

async function clearChartsDatabase() {
  if (process.env.NODE_ENV === "test") {
    await Chart.destroy({ truncate: true })
  }
}

module.exports = {
  clearChartsDatabase
}