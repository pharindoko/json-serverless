# JSON Serverless [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![Build Status](https://travis-ci.org/pharindoko/json-serverless.svg?branch=master)](https://travis-ci.org/pharindoko/json-serverless) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <a href="https://codeclimate.com/github/pharindoko/json-serverless/maintainability"><img src="https://api.codeclimate.com/v1/badges/12f2aa333ec4e24b1ac9/maintainability" /></a>

  - [Features](#features)
  - [Quickstart](#quickstart)
  - [Customization](#customization)
  - [Used Packages](#used-packages)
  - [Components](#components)
  - [Develop locally](#develop-locally)
  - [Develop locally with cloud resources](#develop-locally-with-cloud-resources)
  - [Diagnose issues](#diagnose-issues)

## Features
- Development: 
   - Easily setup routes and resources for the REST Api via json file. [(via json-server)](https://github.com/typicode/json-server)
   - This solution written in **NodeJS** can be easily extended for additional enhanced scenarios
      * adding user authentication
      * own custom domain
      * additional routes etc.
   - Develop and test solution locally in Visual Studio Code
- Security: This Api is secured via API Key and https by default.
- Deployment: 
   - Deployed in AWS cloud within Minutes by a single command
   - Almost **zero costs** (First million requests for Lambda are free)
   - Less maintenance as the deployed solution runs **serverless**

## Quickstart
##### 1. Clone Solution
```bash
git clone https://github.com/pharindoko/json-serverless.git 
cd json-serverless
```

##### 2. Install dependencies
```bash
npm install -g serverless
npm i
```

##### 3. Verify AWS Access / Credentials
=> You need to have access to AWS to upload the solution.
```bash
aws sts get-caller-identity
```
##### 4. Update db.json file in root directory

- Childproperties are the REST endpoints you create
- Samplefile: Routes marked <b>bold</b>

<pre><code>
{
    "<b>basic</b>": {
        "hello": "world"
    }
}
</code></pre>

##### 5. Deploy via Serverless Framework


```bash
# set --stage parameter for different stages
serverless deploy --stage dev
```

- serverless-webpack is used
- the build will be triggered automatically

##### 6. When the deployment with serverless framework was successful you can see following output:
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
  ANY - https://xxxxxxx.eu-central-1.amazonaws.com/dev/{proxy+}
functions:
  app: serverless-json-server-dev-app
layers:
  None
Serverless: Removing old service artifacts from S3...
</pre></code>

##### 7. Test your Api
##### With Curl:

1. replace the url with the url provided by serverless (see above)
2. replace the {API - KEY} with the key you get from serverless (see above)
3. replace {route} at the end of the url e.g. with basic (default value)


```
Basic Schema:
curl -H "x-api-key: {API - KEY}" -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/{route}


Default route is basic: (see db.json)
curl -H "x-api-key: {API - KEY}" -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/basic 
```
##### With Postman:

* Create a new GET Request and add these values to the header section

   |Key|           Value|
   |---|---|
   |x-api-key | {API - KEY}|
   |Content-Type | application/json|

 * Enter as Url the endpoints url 

```bash 
    https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/{route} 
    # e.g. default value: https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/basic
```
What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)



## Customization

#### Update content of db.json
1. update local db.json file in root directory with new values
2. re-deploy the stack via serverless framework
   ```bash
    sls deploy
   ```
3. delete db.json file in S3 Bucket

=> With the next request a new db.json file will be created in the S3 Bucket

#### Change Stackname
[edit service property in serverless.yml (in root directory)](https://github.com/pharindoko/json-server-less-lambda/blob/66756961d960c44cf317ca307b097f595799a890/serverless.yml#L8)


#### Adapt settings in config/servleressconfig.yml file

| Attribute  | Description  | Type | Default |
|---|---|---|---|
| S3FILE  |  JSON file used as db to read and write (will be created with a default json value - customize in db.json)   | string |db.json |
| S3BUCKET  | S3-Bucket - this bucket must already exist in AWS  | string | json-server-less-lambda-dev |
| READONLY  | all API - write operations are forbidden (http 403))  | boolean | false |



## Used Packages
* [json-server](https://github.com/typicode/json-server)
* [serverless framework](https://serverless.com/)
* [serverless http](https://github.com/dougmoscrop/serverless-http)
* [lowdb-adapter-aws-s3](https://github.com/nicekiwi/lowdb-adapter-aws-s3)


## Components
* [NodeJS 8.10](https://nodejs.org/en/about/) 
* [AWS API Gateway](https://aws.amazon.com/api-gateway/)
* [AWS Lambda](https://aws.amazon.com/lambda/features/)
* [AWS S3](https://aws.amazon.com/s3/)

## Develop locally
db.json file will be loaded directly from your local filesystem. No AWS access is needed.

#### 1. Start solution
```
npm run start
```

#### 2. Test your API

To test you can use e.g. [Postman](https://www.getpostman.com/)


* Open Postman
* Enter as Url the endpoints url 

```bash
    https://localhost:3000/{route} #e.g. default value: https://localhost:3000/basic 
```


What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)



## Develop locally with cloud resources
Use same componentes (S3, LowDB) as the lambda does but have code executed locally.

#### 1. Add .env file to root folder


**Mind:** If you haven`t deployed the solution yet, please create a private S3-Bucket and .json - file manually or deploy the solution first to AWS via serverless framework<br>
**Mind:** This function requires that you have access to AWS (e.g. via credentials)

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
npm run dev
```

#### 3. Test your API

To test you can use e.g. [Postman](https://www.getpostman.com/)


* Open Postman
* Enter as Url the endpoints url 

```bash
    https://localhost:3000/{route} #e.g. default value: https://localhost:3000/basic 
```


What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)


## Diagnose issues 
serverless-offline will help you to troubleshoot issues with the lambda execution in a fast manner.

**Mind:** The assumption is that the solution has been already deployed<br>
**Mind:** This function requires that you have access to AWS (e.g. via credentials)



#### 1. build sources and execute serverless offline

- sources will be build with babel in advance to test the functionality.
- after that sls offline will be started

<pre><code>npm run diagnostic

<u>Result:</u>
Serverless: Starting Offline: dev/eu-central-1.
Serverless: Key with token: <b>{API-KEY}</b>
Serverless: Remember to use <b>x-api-key</b> on the request headers

```
</pre></code>

#### 2. make api calls

- Use a new terminal window and start to make api calls.
- Replace {API-KEY} with the api key in the sls offline output (see above). 
- Replace {route} with the route you want to test e.g. /basic

<pre><code>
curl -H "x-api-key: {API-KEY}" -H "Content-Type: application/json" http://localhost:3000/{route}
</pre></code>
