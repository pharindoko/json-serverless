# JSON Serverless [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![Build Status](https://travis-ci.org/pharindoko/json-serverless.svg?branch=master)](https://travis-ci.org/pharindoko/json-serverless) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <a href="https://codeclimate.com/github/pharindoko/json-serverless/maintainability"><img src="https://api.codeclimate.com/v1/badges/12f2aa333ec4e24b1ac9/maintainability" /></a>

- [Architecture](#architecture)
- [Features](#features)
- [Quickstart](#quickstart)
- [Customization](#customization)
- [Used Packages](#used-packages)
- [Components](#components)
- [Develop and debug locally](#develop-and-debug-locally)
- [Develop locally with cloud resources](#develop-locally-with-cloud-resources)
- [Diagnose issues](#diagnose-issues)

## Architecture

![Architecture](docs/json-serverless.png)

## Features

- Easily generate routes and resources for the Api via ([json-server](https://github.com/typicode/json-server))
- **New:** Added Swagger UI support
- Deployment:
   - Deployed in AWS cloud within Minutes by a single command
   - Almost **zero costs** (First million requests for Lambda are free)
   - Less maintenance as the deployed solution runs **serverless**
- Security:
  -  Secured with https by default.
  -  Optional: Use a generated API Key
- Customization:
   - This solution written in **Typescript** can be easily extended for additional enhanced scenarios
      - adding user authentication
      - own custom domain
      - additional routes etc.
   - Develop and debug solution locally in Visual Studio Code

## Quickstart

### 1. Clone Solution

```bash
git clone https://github.com/pharindoko/json-serverless.git
cd json-serverless
```

### 2. Install dependencies

```bash
npm install -g serverless
npm i
```

### 3. Verify AWS Access / Credentials

=> You need to have access to AWS to upload the solution.

```bash
aws sts get-caller-identity
```

### 4. Update db.json file in root directory

- Root properties marked in **bold** are the generated endpoints of the API  ([route generation and json validation is done via json-server](https://github.com/typicode/json-server))

<pre><code>
{
    <b>"posts"</b>: [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    <b>"comments"</b>: [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    <b>"profile"</b>: { "name": "typicode" }
}
</code></pre>

### 5. Deploy via Serverless Framework

```bash
# set --stage parameter for different stages
serverless deploy --stage dev
```

- serverless-webpack is used
- the build will be triggered automatically

### 6. When the deployment with serverless framework was successful you can see following output

<pre>
<code>
Service Information
service: serverless-json-server
stage: dev
region: eu-central-1
stack: serverless-json-server-dev
api keys:
  serverless-json-server.dev: <b>{API-KEY}</b>
endpoints:
  ANY - <b>https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/ <== {ENDPOINTURL}</b>
  ANY - https://xxxxxxx.eu-central-1.amazonaws.com/dev/{proxy+}
functions:
  app: serverless-json-server-dev-app
layers:
  None
Serverless: Removing old service artifacts from S3...
</pre></code>

### 7. Test your Api

#### With Swagger

Open the {ENDPOINTURL}: https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/ that you received as output

**MIND**: If you have set enableApiKeyAuth to true => [SwaggerUI](#Cannot-use-Swagger-UI-when-enableApiKeyAuth-is-true)
)

#### With Curl

1. replace the url with the url provided by serverless (see above)
2. replace the {API-KEY} with the key you get from serverless (see above)
3. replace {route} at the end of the url e.g. with posts (default value)

Default Schema:

```bash
Default route is posts: (see db.json)
curl -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api/posts

# or another route given in db.json file
curl -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api/{route}

# with enableApiKeyAuth=true
curl -H "x-api-key: {API-KEY}" -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api/{route}

```

What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)

## Customization

### Update content of db.json

1. update local db.json file in root directory with new values
2. re-deploy the stack via serverless framework

   ```bash
    sls deploy
   ```

3. delete db.json file in S3 Bucket
4. Make a GET request against the root url https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api

```bash
curl -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api

# with enableApiKeyAuth=true
curl -H "x-api-key: {API-KEY}" -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api/{route}


```

=> With the next request a new db.json file will be created in the S3 Bucket

#### Change Stackname

[edit service property in serverless.yml (in root directory)](https://github.com/pharindoko/json-server-less-lambda/blob/66756961d960c44cf317ca307b097f595799a890/serverless.yml#L8)

#### Adapt settings in config/appconfig.yml file

| Attribute  | Description  | Type | Default |
|---|---|---|---|
| readOnly  |  Make API readonly - all API - write operations are forbidden (http 403)) | string |false |
| enableSwagger  | Enable swagger and swagger UI support  | string | true |
| enableApiKeyAuth  | Make your routes private by using an additional ApiKey | boolean | false |
| jsonFile  | path of json file that will be used  | string | db.json |

## Used Packages

- [json-server](https://github.com/typicode/json-server)
- [serverless framework](https://serverless.com/)
- [serverless http](https://github.com/dougmoscrop/serverless-http)
- [lowdb-adapter-aws-s3](https://github.com/nicekiwi/lowdb-adapter-aws-s3)

## Components

- [NodeJS 10](https://nodejs.org/en/about/)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/features/)
- [AWS S3](https://aws.amazon.com/s3/)

## Develop and debug locally

db.json file will be loaded directly from your local filesystem. No AWS access is needed.

### Start solution

```bash
npm run start
```

### Debug solution

If you want to debug locally in VS Code everything is already setup (using webpack with sourcemap support)

```bash
npm run debug
```

### Test your API

#### With Swagger

Open the {ENDPOINTURL}: http://localhost:3000/ that you received as output

#### With Curl

1. replace the url with the url provided by serverless (see above)
2. replace the {API - KEY} with the key you get from serverless (see above)
3. replace {route} at the end of the url e.g. with posts (default value)

Default Schema:

```bash
Default route is posts: (see db.json)
curl -H "Content-Type: application/json" http://localhost:3000/api/posts

#or another route given in db.json file
curl -H "Content-Type: application/json" http://localhost:3000/api/{route}
```

What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)

## Develop locally with cloud resources

Use same components (S3, LowDB) as the lambda does but have code executed locally.

### 1. Add .env file to root folder

**Mind:** If you haven`t deployed the solution yet, please create a private S3-Bucket and .json - file manually or deploy the solution first to AWS via serverless framework<br>
**Mind:** This function requires that you have access to AWS (e.g. via credentials)

- Copy the .env file from .env.sample in the root folder

```bash
cp .env.sample .env
```

- Required: Adapt settings in .env file

| Attribute  | Description  | Type | Default |
|---|---|---|---|
| S3File  |  JSON file used as db to read and write (will be created with a default json value - customize in db.json)   | string |db.json |
| S3Bucket  | S3-Bucket - this bucket must already exist in AWS  | string | json-server-less-lambda-dev |
| readOnly  | all API - write operations are forbidden (http 403))  | boolean | false |

#### 2. Start solution

```bash
npm run dev
```

#### 3. Test your API

#### With Swagger

Open the {ENDPOINTURL}: http://localhost:3000/ that you received as output

#### With Curl

1. replace the url with the url provided by serverless (see above)
2. replace the {API - KEY} with the key you get from serverless (see above)
3. replace {route} at the end of the url e.g. with posts (default value)

Default Schema:

```bash
Default route is posts: (see db.json)
curl -H "Content-Type: application/json" http://localhost:3000/api/posts

# or another route given in db.json file
curl -H "Content-Type: application/json" http://localhost:3000/api/{route}

# with enableApiKeyAuth=true
curl -H "x-api-key: {API-KEY}" -H "Content-Type: application/json" https://xxxxxx.execute-api.eu-central-1.amazonaws.com/dev/api/{route}

```

What`s my {route} ? -> see [json-server documentation](https://github.com/typicode/json-server)

## Diagnose issues

serverless-offline will help you to troubleshoot issues with the lambda execution in a fast manner.

**Mind:** The assumption is that the solution has been already deployed<br>
**Mind:** This function requires that you have access to AWS (e.g. via credentials)

### 1. build sources and execute serverless offline

- sources will be build with typescript (tsc) in advance to test the functionality.
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
- Replace {route} with the route you want to test e.g. /posts

<pre><code>
curl -H "x-api-key: {API-KEY}" -H "Content-Type: application/json" http://localhost:3000/api/{route}
</pre></code>

## FAQ

### How can I change the lambda region or stack name

Please have a look to the serverless guideline: https://serverless.com/framework/docs/providers/aws/guide/deploying/

### Cannot use Swagger UI when enableApiKeyAuth is true

The apiKey is set in AWS API Gateway. This means all requests (even the standard route) need to use the API-KEY.

If you want to see the Swagger UI you need to add a plugin e.g. ModHeader to Chrome and add the needed headers:
- Content-Type: application/json
- x-api-key:    {provided by sls info in the output after deployment}

![ModHeader](docs/header.png)

### I forgot the API-KEY I have set

Ensure you have credentials for AWS set.

```bash
sls info
```

### Destroy the stack in the cloud

```bash
sls remove
```

### I deployed the solution but I get back a http 500 error

Check Cloudwatch Logs in AWS - the issue should be describe there. Log has the same name as the stack that has been created.

