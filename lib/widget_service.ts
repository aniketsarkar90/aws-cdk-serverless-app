import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";

export class WidgetService extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super (scope, id);

        //creating the s3 bucket
        const bucket = new s3.Bucket(this, "WidgetStore");

        //lambda function
        const handler = new lambda.Function (this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_10_X, //this will enable us to use async in resources/widget.js 
            code: lambda.Code.fromAsset("resources"),
            handler: "widgets.main",
            environment: {
                BUCKET: bucket.bucketName 
            }
        });

        //so that lambda can access bucket contents
        bucket.grantReadWrite(handler);

        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Widget Service",
            description: "Serves widget service"
        });

        //connecting api with lambda
        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: {"application/json": '{"statusCode": "200"}'}
        });

        //attaching a GET / method to the api gateway
        api.root.addMethod("GET", getWidgetsIntegration);

        const widget = api.root.addResource("{id}");

         // Add new widget to bucket with: POST /{id}
        const postWidgetIntegration = new apigateway.LambdaIntegration(handler);

        // Get a specific widget from bucket with: GET /{id}
        const getWidgetIntegration = new apigateway.LambdaIntegration(handler);

        // Remove a specific widget from the bucket with: DELETE /{id}
        const deleteWidgetIntegration = new apigateway.LambdaIntegration(handler);

        widget.addMethod("POST", postWidgetIntegration); // POST /{id}
        widget.addMethod("GET", getWidgetIntegration); // GET /{id}
        widget.addMethod("DELETE", deleteWidgetIntegration); // DELETE /{id}
    }
}