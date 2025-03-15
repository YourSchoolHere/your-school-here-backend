const {supabase} = require("../services/db");

/**
 * Get details of all those courses that a student is currently studying
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
var getSubjectsOfAStudent = async(req, res) => {
    let { data, error } = await supabase
    .rpc('getcurrentcoursesforastudent', {
        studentid: req.options.student_id
    });
    if (error) {
        console.error(error)
    }
    else return res.status(200).json({
        courses: data
    });
}

/**
 * Get details of all those courses taught by a teacher
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
var getSubjectsOfATeacher = async(req, res) => {
    try {
        let { data, error } = await supabase
        .rpc('getcurrentcoursesforateacher', {
            teacherid: req.options.teacher_id
        })
        if (error) {
            throw error;
        }
        return res.status(200).json({
            courses: data
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

var getQuizzes = async(req, res) => {
    try {
        let resp;
        if(req.options.teacher_id)
            resp = await supabase.from("quizzes").select("*").eq("class_id", req.query.class_id);
        else
            resp = await supabase.from("quizzes").select("*").eq("class_id", req.query.class_id).not("startingAt", "is", null).lte("startingAt", Date.now());
        const {data, error} = resp;
        if(error) {
            throw error;
        }
        return res.status(200).json({
            quizzes: data
        });
    } catch (error) {
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

var createQuiz = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quizzes").insert([
            {...req.body, class_id: req.query.class_id}
        ]);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            message: "Quiz added successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var updateQuiz = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quizzes").update(
            {...req.body, class_id: req.query.class_id}
        ).eq("quiz_id", req.query.quiz_id);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            message: "Quiz updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var submitQuiz = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quiz-attempts").insert([
            {...req.body, quiz_id: req.query.quiz_id, student_id: req.options.student_id}
        ]);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            message: "Quiz submitted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

var getStudentAttemptsForQuiz = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quiz-attempts").select("*").eq("quiz_id", req.query.quiz_id).eq("student_id", req.options.student_id);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            attempts: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var getAllAttemptsForQuiz = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quiz-attempts").select("*").eq("quiz_id", req.query.quiz_id);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            attempts: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var getQuizAttemptDetails = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quiz-attempts").select("*").eq("atmpt_id", req.query.attempt_id);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            details: {...data[0]}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var updateQuizMarks = async(req, res) => {
    try {
        const {data, error} = await supabase.from("quiz-attempts").update(
            {...req.body}
        ).eq("atmpt_id", req.query.atmpt_id);
        if(error) {
            throw error;
        }
        return res.status(200).json({
            message: "Marks updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

module.exports = {
    getSubjectsOfAStudent
    , getSubjectsOfATeacher
    , getQuizzes
    , createQuiz
    , updateQuiz
    , submitQuiz
    , getStudentAttemptsForQuiz
    , getAllAttemptsForQuiz
    , getQuizAttemptDetails
    , updateQuizMarks
};