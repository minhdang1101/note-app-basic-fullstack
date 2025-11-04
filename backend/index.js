require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
        console.error("MongoDB connection FAILED:", error.message);
    });
const User = require('./models/user.model');
const Note = require('./models/note.model');
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('./utilities');
const { default: axiosInstance } = require('../frontend/notes-app/src/utils/axiosInstance');

app.use(express.json());
app.use(cors(
    { origin: "*" }
));

app.post('/create-account', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.
        status(400).
        json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email: email });

    if(isUser) {
        return res.status(409).json({ 
            error: true, message: "User with this email already exists"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign(
        { newUser },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3600m' }
    );

    res.json({
        accessToken ,error: false, message: "Account created successfully"
    });
});

app.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            error: true, message: "Email and password are required"
        });
    }

    const userInfor = await User.findOne({ email: email } );

    if(!userInfor) {
        return res.status(404).json({
            error: true, message: "User not found"
        });
    }
    
    const payload = {
            _id: userInfor._id,
            email: userInfor.email,
            username: userInfor.username
    };

    const isPasswordMatch = await bcrypt.compare(password, userInfor.password);
    if(userInfor.email === email && isPasswordMatch) {
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ accessToken ,error: false, message: "Login successful", user: {
                _id: userInfor._id,
                username: userInfor.username,
                email: userInfor.email
            } });
    } else {
        res.status(401).json({ error: true, message: "Invalid credentials" });
    }
});

app.post('/add-note', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const { _id: userId } = req.user;

    try {
        const newNote = new Note({
            userId: userId,
            title,
            content
        });
        await newNote.save();
        res.json({ error: false, message: "Note added successfully", note: newNote });
    } catch (error) {
        res.status(500)
        .json({ error: true, message: "Server error" });
    }
});

app.patch('/edit-note/:id', authenticateToken, async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const { _id: userId } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();
        res.json({ error: false, message: "Note updated successfully", note: note });
    }
    catch (error) {
        res.status(500).json({ error: true, message: "Server error" });
    }
});

app.delete('/delete-note/:id', authenticateToken, async (req, res) => {
    const noteId = req.params.id;
    const { _id: userId } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        
        await Note.deleteOne({ _id: noteId });
        res.json({ error: false, message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: true, message: "Server error" });
    }
});

app.get('/notes', authenticateToken,  async (req, res) => {
    const { _id: userId } = req.user;
    const { query } = req.query;

    try {
        const matchingCondition = {
            userId: userId,
        };
        if (query) {
            matchingCondition.$or = [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ];
        }
        const notes = await Note.find(matchingCondition).sort({ createdOn: -1 });

        return res.json({
            error: false,
            notes,
            message: "Notes fetched successfully"
        });

    } catch (error) {
        console.error("Get all notes error:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

app.get("/user", authenticateToken,async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        return res.status(401).json({ error: true, message: "User ID not found in token" });
    }
    
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        
        return res.json({
            error: false,
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            },
            message: "User fetched successfully"
        });

    } catch (error) {
        console.error("Get user error:", error); // Thêm log để debug
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});
app.listen(process.env.PORT || 3000)

module.exports = app;