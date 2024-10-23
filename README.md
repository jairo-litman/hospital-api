# Appointment managing API

## Description

This is a very basic API to manage appointments. It allows the user to create new appointments, list the schedules of all doctors and list the schedules of a specific doctor.

The purpose of the API was to practice the concepts of RESTful APIs and to learn how to use the Serverless Framework to deploy an API to AWS Lambda. Because of this the API is very simple and only performs read operations on mocked data, no appointments are actually created or stored for example.

## Requirements and Technologies

- Node.js
- Serverless Framework
- Serverless-Offline plugin
- AWS Lambda
- Express.js
- Jest
- Google TypeScript Style

## How to run

To run the API locally you need to have Node.js and the Serverless Framework installed.

To install the Serverless Framework run:

```bash
npm install -g serverless
```

Then clone the repository and run:

```bash
npm install
```

This will install the dependencies of the project.

The Serverless-Offline plugin is used to run the API locally. To start the API run:

```bash
npm run offline
```

The API will be available at http://localhost:3000.

## Endpoints

The API has three endpoints:

- `GET /agendas`: Lists all the schedules of all doctors.
- `GET /agenda/{doctorId}`: Lists the schedule of a specific doctor.
- `POST /agendamento`: Creates a new appointment.

The `GET /agenda/{doctorId}` endpoint expects a path parameter with the id of the doctor. For example, to list the schedule of the doctor with id 1 you would make a request to `GET /agenda/1`.

If successful, both `GET` endpoints return a JSON object with the following format:

```json
{
  "medicos": [
    {
      "id": 1,
      "nome": "Dr. João Silva",
      "especialidade": "Cardiologista",
      "horarios_disponiveis": [
        "2024-10-05 09:00",
        "2024-10-05 10:00",
        "2024-10-05 11:00"
      ]
    }
    // More doctors...
  ]
}
```

The `POST /agendamento` endpoint expects a JSON body with the following format:

```json
{
  "medico_id": 1,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 09:00"
}
```

If successful, the endpoint will return a JSON object with the following format:

```json
{
  "mensagem": "Agendamento realizado com sucesso",
  "agendamento": {
    "medico": "Dr. João Silva",
    "paciente": "Carlos Almeida",
    "data_horario": "2024-10-05 09:00"
  }
}
```
