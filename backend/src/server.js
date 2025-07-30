import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";


dotenv.config();    



const app = express()



const PORT = process.env.PORT || 3000

app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));


app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

// middleware




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});








// npm install -g npm@11.5.1          --> New version of npm install