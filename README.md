[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![Build Status](https://travis-ci.org/pharindoko/json-server-less-lambda.svg?branch=master)](https://travis-ci.org/pharindoko/json-server-less-lambda)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<a href="https://codeclimate.com/github/pharindoko/json-server-less-lambda/maintainability"><img src="https://api.codeclimate.com/v1/badges/12f2aa333ec4e24b1ac9/maintainability" /></a>

## Quickstart
1. Clone Solution
```bash
git clone https://github.com/pharindoko/json-server-less-lambda.git 
cd json-server-less-lambda
```

2. Install dependencies
```bash
npm install -g serverless
npm i
```

3. Verify AWS Access / Credentials
=> You need to have access to AWS to upload the solution.
```bash
aws sts get-caller-identity
```

4. Build
```bash
npm run build
```

5. Update db.json in root directory

- Childproperties are the routes you can select
- Samplefile: Routes marked <b>bold</b>

<pre><code>
{
    "<b>basic</b>": {
        "hello": "world"
    }
}
</code></pre>

6. Deploy via Serverless Framework
```bash
# set --stage parameter for different stages
serverless deploy --stage dev
```


## Test your API
You can use e.g. [Postman](https://www.getpostman.com/)


1. When the deployment with serverless framework was successful you can see following output:
<pre>
<code>
Service Information
service: serverless-json-server
stage: dev
region: eu-central-1
stack: serverless-json-server-dev
api keys:
  serverless-json-server.dev: <b>{API - KEY}</b>
endpoints:
  ANY - <b>https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/</b>
  ANY - <b>https://xxxxxxx.eu-central-1.amazonaws.com/dev/{proxy+}</b>
functions:
  app: serverless-json-server-dev-app
layers:
  None
Serverless: Removing old service artifacts from S3...
</pre>
</code>

2. Open Postman
* Create a GET Request 
   Add as header the Api Key

   |Key|           Value|
   |---|---|
   |x-api-key | {API - KEY}|
   |Content-Type | application/json|

 * Enter as Url the endpoints url 

```
    https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/{route}
```
What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)



## Customization

#### Update content of db.json
1. update db.json file
2. re-deploy the stack via
   ```bash
    sls deploy
   ```
3. delete db.json file in S3 Bucket

=> With the next request a new db.json file will be created in the S3 Bucket.

#### Change Stackname
[edit service property in serverless.yml (in root directory)](https://github.com/pharindoko/json-server-less-lambda/blob/66756961d960c44cf317ca307b097f595799a890/serverless.yml#L8)


#### Adapt settings in config/servleressconfig.yml file

| Attribute  | Description  | Type | Default |
|---|---|---|---|
| S3FILE  |  JSON file used as db to read and write (will be created with a default json value - customize in db.json)   | string |db.json |
| S3BUCKET  | S3-Bucket - this bucket must already exist in AWS  | string | json-server-less-lambda-dev |
| READONLY  | all API - write operations are forbidden (http 403))  | boolean | false |


## Purpose

* I needed to create a demo backend for my frontend solution
* This is a simple API secured via API Key and https, which can be used for demo purposes or additional enhanced scenarios adding user authentication, etc.
* It can be created within minutes
* AWS Lambda is a good solution to host such an api as the first million invocations per month are free.
* Less maintenance as the deployed solution runs **serverless**
* This is just a starter project and can be enhanced in any directions
  

## Packages used
* [json-server](https://github.com/typicode/json-server)
* [serverless framework](https://serverless.com/)
* [serverless http](https://github.com/dougmoscrop/serverless-http)
* [lowdb-adapter-aws-s3](https://github.com/nicekiwi/lowdb-adapter-aws-s3)


## Components
* [NodeJS 8.10](https://nodejs.org/en/about/) 
* [AWS API Gateway](https://aws.amazon.com/api-gateway/)
* [AWS Lambda](https://aws.amazon.com/lambda/features/)
* [AWS S3](https://aws.amazon.com/s3/)


## Develop or test locally

#### 1. Add .env file to root folder

**Mind:** If you haven`t deployed the solution yet, please create a private S3-Bucket and .json - file manually or deploy the solution first to AWS via serverless framework

* Copy the .env file from .env.sample in the root folder
```
cp .env.sample .env
```

* Required: Adapt settings in .env file

| Attribute  | Description  | Type | Default |
|---|---|---|---|
| S3FILE  |  JSON file used as db to read and write (will be created with a default json value - customize in db.json)   | string |db.json |
| S3BUCKET  | S3-Bucket - this bucket must already exist in AWS  | string | json-server-less-lambda-dev |
| READONLY  | all API - write operations are forbidden (http 403))  | boolean | false |

#### 2. Start solution

```bash
npm run start
```
#### 3. Test your API

To test you can use e.g. [Postman](https://www.getpostman.com/)


* Open Postman
* Enter as Url the endpoints url 

```
    https://localhost:3000/{route}
```


What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)