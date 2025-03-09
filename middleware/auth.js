var {verifyToken} = require("../services/cryption");

var authForStudents = (req, res, next) => {
    const token = req.headers.token;
    try {
        let obj = verifyToken(token);
        if(!obj.student_id) {
            return res.status(400).json({
                message: "This token doesn't belong to a student."
            });
        }
        req.options = {...obj};
        next();
    }
    catch (e) {
        res.status(400).json({
            message: "Invalid token. Kindly login again."
        });
    }
}

var authForTeachers = (req, res, next) => {
    const token = req.headers.token;
    try {
        let obj = verifyToken(token);
        if(!obj.teacher_id) {
            return res.status(400).json({
                message: "This token doesn't belong to a teacher."
            });
        }
        req.options = {...obj};
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Invalid token. Kindly login again."
        });
    }
}

module.exports = {authForStudents, authForTeachers};