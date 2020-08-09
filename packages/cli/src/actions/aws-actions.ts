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
      throw Error(
        'No valid identity set - please verify that credentials are set for your AWS Account'
      );
    }
  }

  static async getAllRegionsByName(): Promise<Array<Object>> {
    try {
      let regions: Object[];
      const result = await ec2.describeRegions({ AllRegions: true }).promise();

      regions = result
        .Regions!.sort((a, b) => a.RegionName!.localeCompare(b.RegionName!))
        .map((x) => {
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
        .map((x) => {
          return new Object({
            name: x.StackName,
          });
        });

      return stacks;
    } catch (error) {
      throw Error(error);
    }
  }

  static async getSSMParameter(key: string, region: string): Promise<string> {
    try {
      AWS.config.update({ region });
      const ssm = new AWS.SSM();
      const result = await ssm
        .getParameter({
          Name: key,
          WithDecryption: true,
        })
        .promise();
      return (result.$response.data as AWS.SSM.GetParameterResult).Parameter!
        .Value!;
    } catch (error) {
      throw new Error(
        'Cannot request SSM Parameter Value for ' +
          process.env.authPath +
          ' - please ensure that key is available in AWS SSM - further details: ' +
          error.message
      );
    }
  }

  static async putSSMParameter(
    key: string,
    value: string,
    region: string
  ): Promise<void> {
    try {
      AWS.config.update({ region });
      const ssm = new AWS.SSM();
      const result = await ssm
        .putParameter({
          Name: key,
          Value: value,
          Type: 'SecureString',
          Overwrite: true,
        })
        .promise();
      console.log(result);
    } catch (error) {
      throw new Error(
        'Cannot put SSM Parameter Value for ' +
          process.env.authPath +
          ' - further details: ' +
          error.message
      );
    }
  }

  static async deleteSSMParameter(key: string, region: string): Promise<void> {
    try {
      AWS.config.update({ region });
      const ssm = new AWS.SSM();
      await ssm
        .deleteParameter({
          Name: key,
        })
        .promise();
      return;
    } catch (error) {
      throw new Error(
        'Cannot delete SSM Parameter Value for ' +
          process.env.authPath +
          ' - further details: ' +
          error.message
      );
    }
  }
}
