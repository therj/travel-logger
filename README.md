# Travel Logger

## TODO

- [ ] Setup Server
  - [x] Install Dependencies
  - [x] Setup Linter
  - [x] Setup Express App
  - [x] Setup 404 and error middlewares
- [ ] Model DB
  - Plan data to store
- [ ] Setup Mongoose Models
- [ ] POST /logs
  - Create a new log entry
- [ ] GET /logs
  - List all log entries
- [ ] Setup Client
- [ ] Create a form to add a new entry
- [ ] Setup Map SDK on client
- [ ] List all log entries on Map

VS Code Node Debugger Configuration

```javascript
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach To npm",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "restart": true,
      "stopOnEntry":false,
      "sourceMaps": false,
      "localRoot": "${workspaceRoot}",
      "remoteRoot": "${workspaceRoot}"
    }
  ]
}
```
