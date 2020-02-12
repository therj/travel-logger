# Log Entry

- Title - Text
- Description - Text
- Comments - Text
- Rating - Scale of 1 - 10
- Image - Text - URL
- Latitude - Number
- Longitude - Number
- Created At - DateTime
- Updated At - DateTime

VS Code Node Debugger Configuration for Server

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
      "port": 9229, //default
      // "address": "localhost",
      "address": "172.23.0.3", // docker IP
      //  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' docker-node-mongo
      "restart": true,
      "stopOnEntry": false,
      "sourceMaps": false,
      "localRoot": "${workspaceRoot}",
      "remoteRoot": "/home/node/app"
    }
  ]
}
```
