import serverless from 'serverless-http';
import express from 'express';
import {getSchedules, getSchedule} from './schedule/controller';
import {scheduleAppointment} from './appointment/controller';

const app = express();

app.get('/agendas', getSchedules);

app.get('/agenda/:id', getSchedule);

app.post('/agendamento', scheduleAppointment);

app.use((_req, res) => {
  res.status(404).json({error: 'Endpoint não encontrado'});
});

export const handler = serverless(app);
