const http = require("http");
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model')

PORT = process.env.PORT || 4000;

MONGO_URL = "mongodb+srv://brian:HwJGZEo0lOAJuzkl@briton-cluster.umqdz.mongodb.net/nasaDB?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true
  });
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
