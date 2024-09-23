const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Для хешування паролів
const app = express();
const PORT = 5000;

app.use(cors()); // Дозволяє всі запити з інших джерел
app.use(express.json());

let users = []; // Масив для зберігання користувачів
let subjects = [{ id: 1, subject: 'Math', time: '10:00 AM' }]; // Ініціалізація масиву предметів

// Маршрут для реєстрації користувача
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Перевірка, чи користувач вже існує
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };
    users.push(newUser); // Додати нового користувача в масив
    res.status(201).json({ message: 'User registered successfully' });
});

// Простий маршрут для отримання розкладу
app.get('/api/schedule', (req, res) => {
    res.json(subjects);
});

// Маршрут для додавання нового предмета
app.post('/api/schedule', (req, res) => {
    const { subject, time } = req.body;
    const newSubject = {
        id: subjects.length + 1, // Простий спосіб генерувати ID
        subject,
        time,
    };
    subjects.push(newSubject);
    res.status(201).json(newSubject);
});

// Головний маршрут
app.get('/', (req, res) => {
    res.send('API is running');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



const jwt = require('jsonwebtoken'); // Для генерації токенів
const SECRET_KEY = 'your_secret_key'; // Заміни на свій секретний ключ

// Маршрут для входу користувача
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

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
