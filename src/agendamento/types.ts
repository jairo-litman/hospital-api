type AppointmentPayload = {
  medico_id: number;
  paciente_nome: string;
  data_horario: string;
};

type AppointmentResponse = {
  mensagem: string;
  agendamento: {
    medico: string;
    paciente: string;
    data_horario: string;
  };
};

export {AppointmentPayload, AppointmentResponse};
