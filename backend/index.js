import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import taskRouter from './routes/tasksRoutes.js';
import userRouter from './routes/usersRoutes.js';

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);

console.log('Katalogen vi är i:', path.resolve());
console.log('join:', path.join(path.resolve(), 'dist'));

//Om vi får en förfrågan på en fil som inte är "/api", så kolla i "dist"-mappen
app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Backend:et är igång på ${port}`);
});
