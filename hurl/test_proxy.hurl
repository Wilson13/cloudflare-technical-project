GET http://wilson-here.uk/get
[Options]
delay: 1s
HTTP 405

POST http://wilson-here.uk/headers
[Options]
delay: 1s
HTTP 405

GET https://wilson-here.uk/headers
HTTP *
[Asserts]
status == 200