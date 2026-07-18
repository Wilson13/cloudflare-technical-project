output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.this.public_ip
}

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.this.id
}

output "private_key_path" {
  description = "Path to the generated private key file"
  value       = local_sensitive_file.private_key.filename
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i ${local_sensitive_file.private_key.filename} ec2-user@${aws_instance.this.public_ip}"
}

output "alb_dns_name" {
  description = "DNS name of the ALB - hit this on port 80, it forwards to the instance's app_port"
  value       = aws_lb.this.dns_name
}

output "acm_validation_records" {
  description = "DNS records to create in Cloudflare (as CNAME, DNS-only/grey-clouded) to validate the ACM certificate"
  value = [
    for o in aws_acm_certificate.this.domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ]
}
