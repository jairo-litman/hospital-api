import {AppointmentResponse, AppointmentPayload} from './types';

test('Scheduling a new patient appointment', async () => {
  const payload: AppointmentPayload = {
    medico_id: 1,
    paciente_nome: 'Carlos Almeida',
    data_horario: '2024-10-05 09:00',
  };

  const expectedResponse: AppointmentResponse = {
    mensagem: 'Agendamento realizado com sucesso',
    agendamento: {
      medico: 'Dr. João Silva',
      paciente: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    },
  };

  const schedule: AppointmentResponse = await scheduleAppointment(payload);

  expect(schedule).toEqual(expectedResponse);
});
