const mongoose = require('mongoose');

MONGO_URL = "mongodb+srv://brian:HwJGZEo0lOAJuzkl@briton-cluster.umqdz.mongodb.net/nasaDB?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}