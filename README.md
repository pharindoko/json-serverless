# json-server-less-λ
* Easily deploy json-server in the AWS cloud

- [json-server-less-λ](#json-server-less-%CE%BB)
- [Purpose](#purpose)
  - [Packages used](#packages-used)
  - [Compontents](#compontents)
  - [Get started / Installation](#get-started--installation)
      - [1. Clone solution](#1-clone-solution)
      - [2. Install serverless framework](#2-install-serverless-framework)
      - [3. Verify / Set AWS Credentials](#3-verify--set-aws-credentials)
  - [Deployment on AWS](#deployment-on-aws)
      - [1. Build solution with babel](#1-build-solution-with-babel)
      - [2. Deploy solution with serverless framework](#2-deploy-solution-with-serverless-framework)
  - [Develop or test locally](#develop-or-test-locally)


# Purpose

* I needed to create a demo backend for my frontend solution
* This is a simple API secured via API Key and https, which can be used for demo purposes or additional enhanced scenarios adding user authentication, etc.
* It can be create in minutes
* AWS Lambda is a good solution to host this api as the first million invocations per month are free.
* Less maintenance as the deployed solution runs **serverless**
  

## Packages used
* json-server
* serverless framework
* serverless http
* lowdb-adapter-aws-s3

## Compontents
* NodeJS 8.10 
* AWS API Gateway
* AWS Lambda
* AWS S3

## Get started / Installation

#### 1. Clone solution

```bash
    git clone .. 
    cd ..
```
#### 2. Install serverless framework

```bash
    npm install -g serverless
    npm install
```

#### 3. Verify / Set AWS Credentials
Required for deployment in AWS (for serverless framework)

* Set credentials manually in terminal 
```bash
    #export as environment variables
    export AWS_ACCESS_KEY_ID=XXXXXXXXXXXX
    export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXX
    export AWS_DEFAULT_REGION= e.g. us-east-1
```

**OR**

* Set via aws-cli
```bash
    aws configure list      #list current config
    aws configure           #set config
```



## Deployment on AWS
Deployment will be done via serverless framework


#### 1. Build solution with babel
```bash
npm run build
```

#### 2.  Deploy solution with serverless framework
```bash
serverless deploy
```

## Develop or test locally
* Start solution

```bash
npm run start
```
