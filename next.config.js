const nextBuildId = require("next-build-id")
module.exports = {
    generateBuildId: async () => nextBuildId({ dir: __dirname }),
}
