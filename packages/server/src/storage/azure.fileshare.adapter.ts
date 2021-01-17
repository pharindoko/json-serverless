import { ShareFileClient, ShareServiceClient } from '@azure/storage-file-share';

export class AzureFileShareLowDBAdapter {
  defaultValue: {};
  fileClient: ShareFileClient;
  readonly '@@reference': any;
  constructor(
    defaultValue = {},
    azureStorageConnectionString: string,
    shareName: string,
    directoryName: string,
    fileName: string
  ) {
    this.defaultValue = defaultValue;
    const serviceClient = ShareServiceClient.fromConnectionString(
      azureStorageConnectionString //process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    this.fileClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName)
      .getFileClient(fileName);
  }

  async read(): Promise<object> {
    let result = null;
    try {
      if (await this.fileClient.exists()) {
        const downloadFileResponse = await this.fileClient.download();
        const readableStream = downloadFileResponse.readableStreamBody;
        result = await this.streamToString(readableStream);
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }

    if (result === undefined || result === null) {
      this.write(this.defaultValue);
      return this.defaultValue;
    }
    return JSON.parse(result);
  }

  private async streamToString(readableStream: NodeJS.ReadableStream) {
    return new Promise((resolve, reject) => {
      const chunks: string[] = [];
      readableStream.on('data', data => {
        chunks.push(data.toString());
      });
      readableStream.on('end', () => {
        resolve(chunks.join(''));
      });
      readableStream.on('error', reject);
    });
  }

  async write(data: object) {
    try {
      const content = JSON.stringify(data);
      await this.fileClient.create(content.length);
      await this.fileClient.uploadRange(content, 0, content.length);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
