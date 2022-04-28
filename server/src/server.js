const http = require("http");
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model')

PORT = process.env.PORT || 4000;

MONGO_URL = "mongodb+srv://brian:lUyOKiRd6iTz6ykq@briton-cluster.umqdz.mongodb.net/nasaDB?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.on('open', () => {
  console.log('MongoDB connection ready!');
})

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifieTopology: true
  });
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
