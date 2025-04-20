require("dotenv").config();
const express = require("express");

const {authForTeachers, authForStudents} = require("./middleware/auth");
const users = require("./controllers/users");
const quiz = require("./controllers/quiz");
const announcements = require("./controllers/announcements");

const app = express();
app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
    try {
        return res.status(200).json({
            message: "All good!"
        });
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({
            message: "An unknown error occured."
        });
    }
});

app.post("/login", users.login);

app.get("/validate-token", users.validateToken);

// apis for teachers
app.get("/get-teacher-subjects", authForTeachers, quiz.getSubjectsOfATeacher);

app.get("/get-quizzes-teacher", authForTeachers, quiz.getQuizzes);

app.post("/create-new-quiz", authForTeachers, quiz.createQuiz);

app.post("/update-quiz", authForTeachers, quiz.updateQuiz);

app.get("/get-all-quiz-attempts", authForTeachers, quiz.getAllAttemptsForQuiz);

app.get("/get-quiz-attempt-details-to-evaluate", authForTeachers, quiz.getQuizAttemptDetails);

app.post("/update-quiz-marks", authForTeachers, quiz.updateQuizMarks);

app.get("/get-announcements", authForTeachers, announcements.getAnnouncements);

app.post("/create-announcement", authForTeachers, announcements.createAnnouncement);

// apis for students
app.get("/get-student-subjects", authForStudents, quiz.getSubjectsOfAStudent);

app.get("/get-quizzes-student", authForStudents, quiz.getQuizzes);

app.post("/submit-quiz", authForStudents, quiz.submitQuiz);

app.get("/get-student-quiz-attempts", authForStudents, quiz.getStudentAttemptsForQuiz);

app.get("/get-quiz-attempt-details", authForStudents, quiz.getQuizAttemptDetails);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server started successfully at port:", port);
})