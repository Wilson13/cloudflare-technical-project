#!/bin/bash
export AWS_CONFIG_FILE="./.aws/config"

aws sso login --profile wilson-aws

export AWS_PROFILE=wilson-aws
