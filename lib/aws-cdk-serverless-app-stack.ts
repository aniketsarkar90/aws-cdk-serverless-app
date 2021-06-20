import * as cdk from '@aws-cdk/core';
import * as widget_service from '../lib/widget_service';

//Defines the stack  

export class AwsCdkServerlessAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new widget_service.WidgetService(this, "Widgets");
  }
}
