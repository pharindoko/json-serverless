import { DynamoDB } from 'aws-sdk';

export class DynamoDBLowDBAdapter {
  dynamo: DynamoDB.DocumentClient;
  defaultValue: {};
  table: string;
  keyId: string;
  source = '';
  readonly '@@reference': any;
  constructor(defaultValue = {}, table: string, keyId: string, region: string) {
    this.defaultValue = defaultValue;
    this.dynamo = new DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
      region,
    });
    this.table = table;
    this.keyId = keyId;
  }

  async read(): Promise<object> {
    let result = null;
    try {
      const params: DynamoDB.DocumentClient.GetItemInput = {
        TableName: this.table,
        Key: {
          keyId: this.keyId,
        },
      };
      console.log(JSON.stringify(params));
      result = await this.dynamo.get(params).promise();
    } catch (error) {
      console.log(error.message);
      throw error;
    }

    if (result.Item === undefined || result.Item === null) {
      this.write(this.defaultValue);
      return this.defaultValue;
    }
    return JSON.parse(result.Item![this.keyId]);
  }

  async write(data: object) {
    try {
      const params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: this.table,
        Item: {
          keyId: this.keyId,
          jsonsls: JSON.stringify(data),
        },
      };
      await this.dynamo.put(params).promise();
    } catch (error) {
      if (
        error.code === 'ValidationException' &&
        error.message === 'Item size has exceeded the maximum allowed size'
      ) {
        throw new Error(
          'Item size has exceeded the maximum allowed size (currently 400 kb) - Please use another storage provider e.g. S3 to store large files'
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
}
