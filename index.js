require("dotenv").config();
const express = require("express");

const {authForTeachers, authForStudents} = require("./middleware/auth");
const users = require("./controllers/users");
const portal = require("./controllers/portal");

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
app.get("/get-teacher-subjects", authForTeachers, portal.getSubjectsOfATeacher);

app.get("/get-quizzes-teacher", authForTeachers, portal.getQuizzes);

app.post("/create-new-quiz", authForTeachers, portal.createQuiz);

app.post("/update-quiz", authForTeachers, portal.updateQuiz);

// apis for students
app.get("/get-student-subjects", authForStudents, portal.getSubjectsOfAStudent);

app.get("/get-quizzes-student", authForStudents, portal.getQuizzes);

app.post("/submit-quiz", authForStudents, portal.submitQuiz);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server started successfully at port:", port);
})