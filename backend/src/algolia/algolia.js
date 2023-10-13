const Algolia = require("algoliasearch")

const ALGOLIA_APP_ID = 'PZG4Z8HDRA' || process.env.ALGOLIA_APP_ID
const ALGOLIA_ADMIN_KEY = 'f4018b1d9b79e8cedc28fae6fb2bb44a' || process.env.ALGOLIA_ADMIN_KEY

const algoliaClient = new Algolia(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const users = algoliaClient.initIndex("users")

module.exports  = {
     AlgoliaUsers: users, 
     algoliaClient
}