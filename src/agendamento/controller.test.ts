import {AppointmentResponse, AppointmentPayload} from './types';

test('Scheduling a new patient appointment', async () => {
  const payload: AppointmentPayload = {
    medico_id: 1,
    paciente_nome: 'Carlos Almeida',
    data_horario: '2024-10-05 09:00',
  };

  const schedule: AppointmentResponse = await scheduleAppointment(payload);

  expect(schedule.mensagem).toBe('Agendamento realizado com sucesso');
  expect(schedule.agendamento.medico).toBe('Dr. João Silva');
  expect(schedule.agendamento.paciente).toBe('Carlos Almeida');
  expect(schedule.agendamento.data_horario).toBe('2024-10-05 09:00');
});
