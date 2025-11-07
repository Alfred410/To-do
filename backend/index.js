import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRouter from './routes/tasksRoutes.js';
import userRouter from './routes/usersRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api/task', taskRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);

console.log('Katalogen vi är i:', path.resolve());
console.log('join:', path.join(path.resolve(), 'dist'));

//Om vi får en förfrågan på en fil som inte är "/api", så kolla i "dist"-mappen
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Backend:et är igång på ${port}`);
  console.log(`Tillåten frontend-origin: ${frontendURL}`);
});
