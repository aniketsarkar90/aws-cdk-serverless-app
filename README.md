# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

# Simple Serverless CDK APP 

This app helps creating the resources for a simple widget dispensing service. This app includes 

* An AWS Lambda function.
* An Amazon API Gateway API to call the Lambda function.
* An Amazon S3 bucket that holds the widgets.

## Workflow for this app 
* Create a AWS CDK app
* Create a Lambda function that gets a list of widgets with HTTP GET /
* Create the service that calls the Lambda function
* Add the service to the AWS CDK app
