const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Дозволяє всі запити з інших джерел
app.use(express.json());

// Простий маршрут для отримання розкладу
app.get('/api/schedule', (req, res) => {
    res.json([{ id: 1, subject: 'Math', time: '10:00 AM' }]);
});

// Головний маршрут
app.get('/', (req, res) => {
    res.send('API is running');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



let subjects = [{ id: 1, subject: 'Math', time: '10:00 AM' }]; // Ініціалізація масиву предметів

app.get('/api/schedule', (req, res) => {
    res.json(subjects);
});

// Додати новий маршрут
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

app.post('/api/schedule', (req, res) => {
    const newSubject = req.body;
    // Логіка для додавання нового предмета, наприклад, збереження в масив
    console.log('New subject added:', newSubject);
    res.status(201).json(newSubject); // Відправка відповіді з новим предметом
});
