import "dotenv/config";
import session from "express-session";
import express from "express";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
                if (!origin || origin.startsWith("http://localhost") || origin.startsWith("http://127.") || origin.startsWith("http://172.") || origin.startsWith("http://192.168.") || origin.endsWith(".vercel.app")) {
                return callback(null, true);
            }
            if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
    })
);

app.use(express.json());

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
};


app.use(session(sessionOptions));

Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentRoutes(app, db);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});