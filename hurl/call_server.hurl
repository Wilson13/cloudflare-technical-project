GET http://localhost:3000/get
[Options]
delay: 1s
HTTP 405

POST http://localhost:3000/headers
[Options]
delay: 1s
HTTP 405

GET http://localhost:3000/headers
HTTP *
[Asserts]
status == 200