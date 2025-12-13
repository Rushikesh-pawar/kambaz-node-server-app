import "dotenv/config";
import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";
import QuestionRoutes from "./Kambaz/Questions/routes.js";

// Connect to MongoDB 
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

// CORS configuration - MUST come before session
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    credentials: true, // support cookies
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: Origin not allowed"));
    },
  })
);

// Handle preflight requests for all routes
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// Body parser - MUST come before session
app.use(express.json());

// Session configuration
const isProd = process.env.NODE_ENV === 'production';
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd, // true in production (HTTPS); false for local HTTP
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax', // 'none' required for cross-site cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

app.use(session(sessionOptions));

// Routes come AFTER session middleware is configured
Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
QuizRoutes(app);
QuestionRoutes(app);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});