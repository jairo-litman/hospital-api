import {Request, Response} from 'express';
import {AppointmentPayload, AppointmentResponse} from './types';
import {getDoctorScheduleFromId} from '../utils/doctors';

const scheduleAppointment = (req: Request, res: Response) => {
  const payload: AppointmentPayload = req.body;
  if (!payload.medico_id || !payload.paciente_nome || !payload.data_horario) {
    res.status(400).json({error: 'Faltam dados no payload'});
    return;
  }

  // Schedule appointment here

  const doctorSchedule = getDoctorScheduleFromId(payload.medico_id);
  if (!doctorSchedule) {
    res
      .status(404)
      .json({error: 'Nenhum médico encontrado com o ID informado'});
    return;
  }

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
