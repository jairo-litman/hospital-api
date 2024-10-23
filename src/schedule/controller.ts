import {Request, Response} from 'express';
import {mockSchedule} from '../mock/doctors';
import {ScheduleResponse} from './types';
import {getDoctorScheduleFromId} from '../utils/doctors';

const getSchedules = (_req: Request, res: Response) => {
  const response: ScheduleResponse = {
    medicos: mockSchedule,
  };

  res.status(200).json(response);
  return;
};

const getSchedule = (req: Request, res: Response) => {
  const {id} = req.params;
  if (!id) {
    res.status(400).json({error: 'ID não informado'});
    return;
  }

  const schedule = getDoctorScheduleFromId(Number(id));
  if (!schedule) {
    res
      .status(404)
      .json({error: 'Não foi possível encontrar um médico com o ID informado'});
    return;
  }

  const response: ScheduleResponse = {
    medicos: [schedule],
  };

  res.status(200).json(response);
  return;
};

export {getSchedules, getSchedule};
