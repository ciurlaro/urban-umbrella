#!/bin/bash

# Variables
STACK_NAME="create-OU-stack"
TEMPLATE_FILE="cloudformation/ou_template.yml"
OU_NAME="NewOrganizationalUnit"

# Validate the CloudFormation template
aws cloudformation validate-template --template-body file://$TEMPLATE_FILE

# Create or update the CloudFormation stack to create the OU
aws cloudformation deploy \
    --stack-name $STACK_NAME \
    --template-file $TEMPLATE_FILE \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides OUName=$OU_NAME

# Check the stack status
aws cloudformation describe-stacks --stack-name $STACK_NAME