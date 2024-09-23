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
