const {supabase} = require("../services/db");

var getAnnouncements = async(req, res) => {
    try {
        let { data, error } = await supabase.from("announcements").select("*").eq("class_id", req.query.class_id);
        if (error) {
            throw error;
        }
        return res.status(200).json({
            announcements: data
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

var createAnnouncement = async(req, res) => {
    try {
        let { data, error } = await supabase.from("announcements").insert([{...req.body}]);
        if (error) {
            throw error;
        }
        return res.status(200).json({
            message: "Announcement created successfully"
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

module.exports = {
    getAnnouncements
    , createAnnouncement
}