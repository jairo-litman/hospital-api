import {mockSchedule} from '../mock/doctors';
import {DoctorSchedule} from '../schedule/types';

const getDoctorScheduleFromId = (id: Number): DoctorSchedule | null => {
  const schedule = mockSchedule.find(schedule => schedule.id === id);
  if (!schedule) {
    return null;
  }
  return schedule;
};

export {getDoctorScheduleFromId};
