const authService = require("../services/authService");

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            message: "Registration successful",
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

exports.profile = (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
        user: req.user,
    });
};