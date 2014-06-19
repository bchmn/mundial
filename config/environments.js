module.exports = {
    development: {
        app: {
            port: 5555,
            db: 'mongodb://localhost:27017/mundial'
        }
    },
    staging: {},
    production: {
        app: {
            port: process.env.PORT,
            db: process.env.MONGODB_URI
        }
    }
};
