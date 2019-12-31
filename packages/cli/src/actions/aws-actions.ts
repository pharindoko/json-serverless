process.env.AWS_SDK_LOAD_CONFIG = 'true';
import AWS = require('aws-sdk');
const ec2: AWS.EC2 = new AWS.EC2();
const cloudformation: AWS.CloudFormation = new AWS.CloudFormation();
const sts: AWS.STS = new AWS.STS();
/* if (!AWS.config.region) {
    AWS.config.update({ region: 'us-east-1' });
}
 */

export class AWSActions {
  constructor() {}
  static getCurrentRegion(): string {
    if (!AWS.config.region) {
        AWS.config.update({ region: 'us-east-1' });
    }
    return AWS.config.region!;
  }

  static async checkValidAWSIdentity(): Promise<
    AWS.STS.GetCallerIdentityResponse
  > {
    try {
      return await sts.getCallerIdentity().promise();
    } catch (error) {
      throw Error('No valid identity set - please verify that credentials are set for your AWS Account');
    }
  }

  static async getAllRegionsByName(): Promise<Array<Object>> {
    try {
      let regions: Object[];
      const result = await ec2.describeRegions({ AllRegions: true }).promise();

      regions = result
        .Regions!.sort((a, b) => a.RegionName!.localeCompare(b.RegionName!))
        .map(x => {
          return new Object({
            name: x.RegionName,
          });
        });
      return regions;
    } catch (error) {
      throw Error(error);
    }
  }

  static async getAllStacksByName(): Promise<Array<Object>> {
    try {
      let stacks: any[];
      const result = await cloudformation.listStacks({}).promise();
      stacks = result
        .StackSummaries!.sort((a, b) =>
          a.StackName!.localeCompare(b.StackName!)
        )
        .map(x => {
          return new Object({
            name: x.StackName,
          });
        });

      return stacks;
    } catch (error) {
      throw Error(error);
    }
  }
}
