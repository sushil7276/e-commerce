const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongodb connected : ${data.connection.host}`)
        })
        .catch((error) => console.log(error.message))
    // mongoose.set('useFindAndModify', false)
}

module.exports = connectDatabase;
