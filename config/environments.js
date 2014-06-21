module.exports = {
    development: {
        app: {
            port: 5555,
            storage_dir: __dirname + '/../public/slides/',
            db: 'mongodb://localhost:27017/mundial'
        }
    },
    staging: {},
    production: {
        app: {
            port: process.env.PORT,
            storage_dir: process.env.STORAGE_DIR,
            db: process.env.MONGODB_URI
        }
    }
};
