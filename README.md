# Cloudflare Solutions Engineer – Technical Project

## Pre-requisite:

> 1. Please add a domain (new or existing, e.g. yourwebsite.com) to Cloudflare.
>    Cloudflare Free plan is sufficient.
> 2. Activate on Cloudflare by following the steps to change the nameservers at
>    your DNS Registrar.

Bought a domain on Cloudflare "wilson-here.uk".

## Step 1

> Create an origin web server on a platform of your choosing. This could be in
> AWS, Google Cloud, DigitalOcean, your Raspberry Pi, etc.
>
> This web server must run an endpoint that returns all HTTP request headers in
> the body of the HTTP response.
>
> The web server can be something that you have written yourself (e.g. in
> JavaScript, Python, etc) or by using a 3rd party application.

- Deployed an EC2 using Terraform.
- Ran a NodeJS http server.

![ec2_http_response](docs/ec2_http_response.png)

## Step 2

> Proxy traffic to this server through Cloudflare. Add necessary configurations
> on Cloudflare.

![cname_proxy](docs/cname_proxy.png)

Default TLS mode was Full. However HTTPS connection won't work due to no
certificate set up on ALB.

## Step 3

> Secure the communication between Cloudflare and your Origin Server with a
> non-Cloudflare provisioned TLS certificate using at least the Full-Strict mode
> on Cloudflare

Public cert was setup with wildcard (*.wilson-here.uk) using ACM on AWS and
attached to ALB.

After changing SSL/TLS encryption on Cloudflare to Full(Strict), the https
request was hit with `Error 526: invalid SSL certificate`.

And this issue

```sh
curl -v https://app.wilson-here.uk/headers

* Could not resolve host: app.wilson-here.uk
* Closing connection
curl: (6) Could not resolve host: app.wilson-here.uk
```

Resolved by flushing local DNS cache.

```sh
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

![full_strict_http_resp.png](docs/full_strict_http_resp.png)

![cloudflare_full_strict.png](docs/cloudflare_full_strict.png)

## Step 4

> Set a rate limiting rule on Cloudflare. How would you demonstrate to a
> customer that this rate limiting rule works?
