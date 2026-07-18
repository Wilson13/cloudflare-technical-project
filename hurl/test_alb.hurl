GET http://small-ec2-alb-1786535870.ap-southeast-1.elb.amazonaws.com/get
[Options]
delay: 1s
HTTP 405

POST http://small-ec2-alb-1786535870.ap-southeast-1.elb.amazonaws.com/headers
[Options]
delay: 1s
HTTP 405

GET http://small-ec2-alb-1786535870.ap-southeast-1.elb.amazonaws.com/headers
HTTP *
[Asserts]
status == 200