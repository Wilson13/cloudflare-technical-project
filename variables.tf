variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-southeast-1"
}

variable "instance_type" {
  description = "EC2 instance type (t3.micro is free-tier eligible for 12 months on a new AWS account)"
  type        = string
  default     = "t3.micro"
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into the instance. Restrict this to your own IP (e.g. \"203.0.113.5/32\") before applying."
  type        = string
  default     = "0.0.0.0/0"
}

variable "instance_name" {
  description = "Name tag for the EC2 instance"
  type        = string
  default     = "small-ec2"
}

variable "app_port" {
  description = "Port the application listens on inside the EC2 instance"
  type        = number
  default     = 3000
}

variable "domain_name" {
  description = "Domain name the ACM certificate should cover"
  type        = string
  default     = "*.wilson-here.uk"
}

variable "cloudflare_cidrs" {
  description = "Cloudflare published IPv4 CIDR ranges allowed to reach the ALB on 443 (see https://www.cloudflare.com/ips/)"
  type        = list(string)
  default = [
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "108.162.192.0/18",
    "131.0.72.0/22",
    "141.101.64.0/18",
    "162.158.0.0/15",
    "172.64.0.0/13",
    "173.245.48.0/20",
    "188.114.96.0/20",
    "190.93.240.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
  ]
}
