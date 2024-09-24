const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Для хешування паролів
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Для генерації токенів

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Заміни на свій секретний ключ

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/scheduleApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors()); // Дозволяє всі запити з інших джерел
app.use(express.json());

// Схема для користувачів
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema); // Модель користувача

// Схема для предметів
const subjectSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    time: { type: String, required: true },
});

const Subject = mongoose.model('Subject', subjectSchema); // Модель предмета

// Маршрут для реєстрації користувача
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Перевірка, чи користувач вже існує
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save(); // Зберегти нового користувача в базі даних
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Простий маршрут для отримання розкладу
app.get('/api/schedule', async (req, res) => {
    try {
        const subjects = await Subject.find(); // Отримати всі предмети з бази даних
        res.json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Маршрут для додавання нового предмета
app.post('/api/schedule', async (req, res) => {
    try {
        const { subject, time } = req.body;
        const newSubject = new Subject({ subject, time });
        await newSubject.save(); // Зберегти новий предмет в базі даних
        res.status(201).json(newSubject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Маршрут для входу користувача
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Генерація токена
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Головний маршрут
app.get('/', (req, res) => {
    res.send('API is running');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
