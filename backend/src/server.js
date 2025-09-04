import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";


dotenv.config();    



const app = express()

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Define allowed origins for CORS
const allowedOrigins = [
    "http://localhost:5173", // For local frontend development
    process.env.FRONTEND_URL // For deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // If you're sending cookies or authorization headers
}));

app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}
// middleware 




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});








// npm install -g npm@11.5.1          --> New version of npm install