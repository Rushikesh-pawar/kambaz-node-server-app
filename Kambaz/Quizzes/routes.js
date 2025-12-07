import * as dao from "./dao.js";

function QuizRoutes(app) {
    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const newQuiz = await dao.createQuiz(req.params.cid, req.body);
        res.json(newQuiz);
    });

    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        let quizzes = await dao.findQuizzesByCourse(req.params.cid);

        // Filter out unpublished quizzes for students
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser.role === "STUDENT") {
            quizzes = quizzes.filter(q => q.published === true || q.published === "true");
        }

        res.json(quizzes);
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        if (!quiz) {
            res.status(404).send("Quiz not found");
            return;
        }

        // Check if user is a student and quiz is not published
        const currentUser = req.session["currentUser"];
        console.log("=== QUIZ ACCESS CHECK ===");
        console.log("Quiz ID:", req.params.qid);
        console.log("User:", currentUser);
        console.log("Role:", currentUser ? currentUser.role : "No User");
        console.log("Quiz Published:", quiz.published, "Type:", typeof quiz.published);

        const isPublished = quiz.published === true || quiz.published === "true";
        console.log("Is Published (Calculated):", isPublished);

        if (currentUser && currentUser.role === "STUDENT" && !isPublished) {
            console.log("ACCESS DENIED: Locked");
            res.status(403).send("Quiz is locked");
            return;
        }
        console.log("ACCESS GRANTED");

        res.json(quiz);
    });

    app.get("/api/quizzes", async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const updated = await dao.updateQuiz(req.params.qid, req.body);
        res.json(updated);
    });

    app.put("/api/quizzes/:qid/:published", async (req, res) => {
        const updated = await dao.updatePublished(req.params.qid, req.params.published);
        res.json(updated);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    });
}

export default QuizRoutes;
