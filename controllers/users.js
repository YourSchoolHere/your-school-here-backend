const {supabase} = require("../services/db");
const {signToken, verifyToken} = require("../services/cryption");

var login = async (req, res) => {
    try {
        const {username, password} = req.body;
        let data = await supabase.from("students").select("student_id, name").eq("student_id", username);
        if(data.error) {
            throw data.error;
        };
        if(data.data.length) {
            return res.status(200).json({
                ...data.data[0],
                token: signToken(data.data[0])
            });
        };
        data = await supabase.from("teachers").select("teacher_id", "name").eq("teacher_id", username);
        if(data.error) {
            throw data.error;
        };
        if(data.data.length) {
            return res.status(200).json({
                ...data.data[0],
                token: signToken(data.data[0])
            });
        };
        return res.status(400).json({
            message: "Invalid username or password"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
};

var validateToken = (req, res) => {
    try {
        let obj = verifyToken(req.headers.token);
        return res.status(200).json({...obj});
    } catch (error) {
        res.status(400).json({
            message: "Invalid token. Kindly login again."
        });
    }
}

module.exports = {login, validateToken};