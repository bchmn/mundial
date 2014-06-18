module.exports = {
    development: {
        app: {
            port: 3000
        }
    },
    staging: {},
    production: {
        app: {
            port: process.env.PORT
        }
    }
};
