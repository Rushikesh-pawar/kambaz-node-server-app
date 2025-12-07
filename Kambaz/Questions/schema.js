import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        quizId: { type: String, required: true },
        title: { type: String, required: true },
        type: { type: String, default: "mcq" },
        description: { type: String },
        points: { type: Number, default: 1 },
        group: { type: String, default: "Ungrouped" },
        
        answer: [String],
        options: [String],
        blanks: [
            {
                answers: [String]
            }
        ],
        answers: [
            {
                text: String,
                isCorrect: Boolean
            }
        ]
    },
    { collection: "questions" }
);

export default questionsSchema;