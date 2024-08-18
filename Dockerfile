# Dockerfile
FROM amazon/aws-cli:latest

# Set the working directory
WORKDIR /aws

# Copy the CloudFormation script and the shell script to the container
COPY cloudformation/ ./cloudformation/
COPY create_ou.sh ./

# Set execute permission for the script
RUN chmod +x create_ou.sh

# Run the script by default
CMD ["./create_ou.sh"]