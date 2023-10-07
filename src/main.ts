import * as core from '@actions/core'
import { log, LogParameters } from './metadata'

async function run(): Promise<void> {
  try {
    const params: LogParameters = {
      processId: core.getInput('process_id'), // id defining the whole process
      runId: parseInt(core.getInput('run_id')), // github run id
      version: core.getInput('version'), // cncjs version
      step: core.getInput('step'), // step/workflow e.g. ci or docker_hub
      start: core.getBooleanInput('start'), // step started or finished
    }

    const result = await log(
      core.getInput('region'),
      core.getInput('project'),
      core.getInput('function_name'),
      core.getInput('path'),
      core.getInput('connection_id'),
      params,
    )

    core.setOutput('result', result)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
