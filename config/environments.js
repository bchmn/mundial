module.exports = {
    development: {
        app: {
            port: 5555
        }
    },
    staging: {},
    production: {
        app: {
            port: process.env.PORT
        }
    }
};
