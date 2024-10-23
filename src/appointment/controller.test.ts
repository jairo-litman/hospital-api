import {Request, Response} from 'express';
import {scheduleAppointment} from './controller';
import {mockSchedule} from '../mock/doctors';
import {AppointmentPayload, AppointmentResponse} from './types';

describe('Appointment Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn().mockReturnThis();
    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  test('Schedule an appointment', () => {
    const mockPayload: AppointmentPayload = {
      medico_id: 1,
      paciente_nome: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    };

    const mockScheduleItem = mockSchedule[0];

    req = {body: JSON.stringify(mockPayload)};

    const expectedResponse: AppointmentResponse = {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: mockScheduleItem.nome,
        paciente: mockPayload.paciente_nome,
        data_horario: mockPayload.data_horario,
      },
    };

    scheduleAppointment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expectedResponse);
  });

  test('Return 400 if payload is missing', () => {
    req = {body: undefined};

    scheduleAppointment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({error: 'Dados JSON inválidos'});
  });

  test('Return 400 if payload is missing data', () => {
    const mockPayload: AppointmentPayload = {
      medico_id: 1,
      paciente_nome: 'Carlos Almeida',
      data_horario: '',
    };

    req = {body: JSON.stringify(mockPayload)};

    scheduleAppointment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({error: 'Faltam dados no payload'});
  });

  test('Return 404 if doctor ID is not found', () => {
    const mockPayload: AppointmentPayload = {
      medico_id: 999,
      paciente_nome: 'Carlos Almeida',
      data_horario: '2024-10-05 09:00',
    };

    req = {body: JSON.stringify(mockPayload)};

    scheduleAppointment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Nenhum médico encontrado com o ID informado',
    });
  });
});
