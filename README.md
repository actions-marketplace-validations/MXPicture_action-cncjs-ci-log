# Github Action: CNCjs - CI Logging

## Example

```yaml
name: 'Example workflow'
on:
  pull_request:
  push:
    branches:
      - main

  workflow_dispatch:

jobs:
  logger:
    runs-on: ubuntu-latest
    steps:
      - name: Start CI Log
        id: log
        uses: mxpicture/action-cncjs-ci-log@v1
        with:
          process_id: '<process id>'
          run_idd: '${{ github.run_id }}'
          version: 'v1.10.3'
          step: 'ci'
          start: 'true'
          region: '<firebase region>'
          project: '<firebase project>'
          function_name: '<firebase function>'
          path: '<firebase path>'
          connection_id: '<connection id>'

      - name: An example step
        run: |
          echo '${{ steps.log.outputs.result }}'
```
