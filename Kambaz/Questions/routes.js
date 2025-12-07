import * as dao from "./dao.js";
import * as quizDao from "../Quizzes/dao.js";

function QuestionRoutes(app) {
    // Helper function to check if quiz is published
    const isQuizPublished = (quiz) => {
        return quiz.published === true || quiz.published === "true";
    };

    // Create question for a quiz
    app.post("/api/quizzes/:qid/questions", async (req, res) => {
        const question = await dao.createQuestion(req.params.qid, req.body);
        res.json(question);
    });

    // Get all questions for a quiz
    app.get("/api/quizzes/:qid/questions", async (req, res) => {
        const quizId = req.params.qid;
        const currentUser = req.session["currentUser"];

        // First check if quiz exists and is published (for students)
        const quiz = await quizDao.findQuizById(quizId);
        if (!quiz) {
            res.status(404).send("Quiz not found");
            return;
        }

        // If student and quiz not published, deny access
        if (currentUser && currentUser.role === "STUDENT" && !isQuizPublished(quiz)) {
            res.status(403).send("Quiz is locked");
            return;
        }

        const questions = await dao.findQuestionsByQuizId(quizId);
        res.json(questions);
    });

    // Get single question
    app.get("/api/questions/:qid", async (req, res) => {
        const question = await dao.findQuestionById(req.params.qid);
        if (!question) {
            res.status(404).send("Question not found");
            return;
        }

        // Check if the quiz is published for students
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser.role === "STUDENT") {
            const quiz = await quizDao.findQuizById(question.quiz);
            if (quiz && !isQuizPublished(quiz)) {
                res.status(403).send("Quiz is locked");
                return;
            }
        }

        res.json(question);
    });

    // Update question
    app.put("/api/questions/:qid", async (req, res) => {
        const updated = await dao.updateQuestion(req.params.qid, req.body);
        res.json(updated);
    });

    // Delete question
    app.delete("/api/questions/:qid", async (req, res) => {
        const status = await dao.deleteQuestion(req.params.qid);
        res.json(status);
    });
}

export default QuestionRoutes;
