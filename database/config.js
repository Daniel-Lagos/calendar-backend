const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        console.log('DB Online');

    } catch (e) {
        console.log(e);
        throw new Error('Error a la hora de iniciar BD');
    }
}

module.exports = {
    dbConnection
}