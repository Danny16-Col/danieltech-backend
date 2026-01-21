import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import routes from './routes/products.js'

const server = express();
const PORT = process.env.PORT || 3000;

// middleware
server.use(cors({
  origin: '*'
}));
server.use(bodyParser.json());

//conexion a mongo
connectDB();

//Rutes
server.use('/api/product',routes)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
