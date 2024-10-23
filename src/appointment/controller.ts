import {Request, Response} from 'express';
import {AppointmentPayload, AppointmentResponse} from './types';
import {getDoctorScheduleFromId} from '../utils/doctors';

const scheduleAppointment = (req: Request, res: Response) => {
  try {
    req.body = JSON.parse(req.body.toString());
  } catch (err) {
    res.status(400).json({error: 'Dados JSON inválidos'});
    return;
  }

  const payload: AppointmentPayload = req.body;
  if (!payload.medico_id || !payload.paciente_nome || !payload.data_horario) {
    res.status(400).json({error: 'Faltam dados no payload'});
    return;
  }

  const doctorSchedule = getDoctorScheduleFromId(Number(payload.medico_id));
  if (!doctorSchedule) {
    res
      .status(404)
      .json({error: 'Nenhum médico encontrado com o ID informado'});
    return;
  }

  // Schedule appointment here

  const response: AppointmentResponse = {
    mensagem: 'Agendamento realizado com sucesso',
    agendamento: {
      medico: doctorSchedule.nome,
      paciente: payload.paciente_nome,
      data_horario: payload.data_horario,
    },
  };

  res.status(200).json(response);
};

export {scheduleAppointment};
