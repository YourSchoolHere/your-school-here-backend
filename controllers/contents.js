const {supabase} = require("../services/db");

var getSectionsForClass = async (req, res) => {
    try {
        let resp;
        if(req.options.teacher_id)
            resp = await supabase.from("sections").select("*").eq("class_id", req.query.class_id);
        else
            resp = await supabase.from("sections").select("*").eq("class_id", req.query.class_id).eq("visible_to_students", true);
        if (resp.error) {
            throw resp.error;
        }
        return res.status(200).json({
            sections: resp.data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An unknown error occurred",
        });
    }
}

var createSection = async (req, res) => {
    try {
        let { error } = await supabase
            .from("sections")
            .insert([{ ...req.body }]);
        if (error) {
            throw error;
        }
        return res.status(200).json({
            message: "Section created successfully",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An unknown error occurred",
        });
    }
}

var getContentsForSection = async (req, res) => {
    try {
        let resp;
        if(req.options.teacher_id)
            resp = await supabase.from("contents").select("*").eq("content_section_id", req.query.section_id);
        else
            resp = await supabase.from("contents").select("*").eq("content_section_id", req.query.section_id).eq("visible_to_students", true);
        if (resp.error) {
            throw resp.error;
        }
        return res.status(200).json({
            contents: resp.data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An unknown error occurred",
        });
    }
}

var createContent = async (req, res) => {
    try {
        let { error } = await supabase
            .from("contents")
            .insert([{ ...req.body }]);
        if (error) {
            throw error;
        }
        return res.status(200).json({
            message: "Content created successfully",
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An unknown error occurred",
        });
    }
}

module.exports = {
    getSectionsForClass,
    createSection,
    getContentsForSection,
    createContent,
};