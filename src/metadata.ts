import { default as fetch } from 'node-fetch'

export interface LogParameters {
  processId: string // id defining the whole process
  runId: number // github run id
  version: string // cncjs version
  step: string // step/workflow e.g. ci or docker_hub
  start: boolean // step started or finished
}

interface Result {
  statusCode: number
  status: string
  message: string
  result?: object | string | number
}

export async function log(
  region: string,
  project: string,
  functionName: string,
  path: string,
  connectionId: string,
  logData: LogParameters,
): Promise<Result> {
  const response = await fetch(
    `https://${region}-${project}.cloudfunctions.net/${functionName}/${path}`,
    {
      method: 'POST',
      headers: {
        'x-connection-id': connectionId,
        'Content-Type': 'application/json',
        body: JSON.stringify(logData),
      },
    },
  )

  return (await response.json()) as Result
}
