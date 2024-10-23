import {Request, Response} from 'express';
import {getSchedules, getSchedule} from './controller';
import {mockSchedule} from '../mock/doctors';
import {ScheduleResponse} from './types';

describe('Schedule Controller', () => {
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

  test('Retrieve all appointments', () => {
    const expectedAppointments: ScheduleResponse = {
      medicos: [...mockSchedule],
    };

    getSchedules(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expectedAppointments);
  });

  test('Retrieve a specific appointment by ID', () => {
    const mockId = '1';
    const mockScheduleItem = mockSchedule[0];

    req = {params: {id: mockId}};

    const expectedResponse: ScheduleResponse = {
      medicos: [mockScheduleItem],
    };

    getSchedule(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expectedResponse);
  });

  test('Return 400 if ID is not provided', () => {
    req = {params: {}};

    getSchedule(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({error: 'ID não informado'});
  });

  test('Return 404 if no schedule found for the given ID', () => {
    const mockId = '999';

    req = {params: {id: mockId}};

    getSchedule(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Não foi possível encontrar um médico com o ID informado',
    });
  });
});
