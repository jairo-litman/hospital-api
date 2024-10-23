type DoctorSchedule = {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
};

type ScheduleResponse = {
  medicos: DoctorSchedule[];
};

export {DoctorSchedule, ScheduleResponse};
