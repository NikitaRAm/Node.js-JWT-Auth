import * as dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './src/router/router.js';

dotenv.config();

const PORT = process.env.PORT || 5000 ;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.URL);

        app.listen(PORT, () => console.log(`server has been started on PORT = ${PORT}`));

    } catch (e) {
        console.log(e);
    }
}

start();