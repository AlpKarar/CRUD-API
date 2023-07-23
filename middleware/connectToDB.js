const mongoose = require('mongoose');

await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => {
    console.log('Connected to DB successfully...');
});


export default db;