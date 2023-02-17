import * as dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './src/router/router.js';
import errorMiddleware from './src/middlewares/error-middleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000 ;
const DB_URL = process.env.URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => console.log(`server has been started on PORT = ${PORT}`));

    } catch (e) {
        console.log(e);
    }
}

start();