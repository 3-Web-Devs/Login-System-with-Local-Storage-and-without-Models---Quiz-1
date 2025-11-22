const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const User = require('../models/user');

// GET /api/dashboard
router.get('/', fetchUser, async (req, res) => {
    try {
        // Example stats
        const totalUsers = await User.countDocuments();
        const activeUsers = Math.floor(totalUsers * 0.6); // dummy active users
        const conversions = Math.floor(Math.random() * 2000); // random number for demo

        // Example recent activity (dummy)
        const recentActivity = [
            { task: 'report.docx → PDF', time: '2 hours ago' },
            { task: 'slides.pptx → PDF', time: '1 day ago' },
            { task: 'notes.txt → DOCX', time: '3 days ago' },
        ];

        res.json({
            success: true,
            user: { id: req.user.id },
            stats: { totalUsers, activeUsers, conversions },
            recentActivity,
            storageUsage: 36 // percentage, example
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;