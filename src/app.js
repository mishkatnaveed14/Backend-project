import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin:process.env.ORIGINURL,
    credentials:true
}));
app.use(cookieParser());

app.use(express.json(limit='50mb'));
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
app.use(express.static('public'));


// routes
import userRouter from "./routes/user.routes.js"



// routes decalaration
app.use("/api/v1/users",userRouter )

export default app;