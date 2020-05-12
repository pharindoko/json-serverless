# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.5.37](https://github.com/pharindoko/json-serverless/compare/v1.5.36...v1.5.37) (2020-05-12)


### Features

* **common:** add option to enable/disable swagger interface ([e38766e](https://github.com/pharindoko/json-serverless/commit/e38766e811977959983430f72de8dcff764946ea))





## [1.5.36](https://github.com/pharindoko/json-serverless/compare/v1.5.35...v1.5.36) (2020-05-05)


### Bug Fixes

* **server:** exception when json file contains float values ([14e735d](https://github.com/pharindoko/json-serverless/commit/14e735dddd4d3407ef82dcf38623be71e658a51f))





## [1.5.35](https://github.com/pharindoko/json-serverless/compare/v1.5.34...v1.5.35) (2020-05-04)


### Bug Fixes

* **cli:** update-stack: get current working directory correctly ([f511ac0](https://github.com/pharindoko/json-serverless/commit/f511ac0375351089904a2bf4461672708543f4b1))





## [1.5.34](https://github.com/pharindoko/json-serverless/compare/v1.5.33...v1.5.34) (2020-05-04)


### Bug Fixes

* **cli:** update-stack: adapth path and file references ([67a14a9](https://github.com/pharindoko/json-serverless/commit/67a14a9e0d41721fdee7a47cbcea3cba9e7fa30c))
* **cli:** update-stack: add missing build-step ([1e6ecd2](https://github.com/pharindoko/json-serverless/commit/1e6ecd24d0307fd4b6fefc92890756e78247526f))


### Features

* **cli:** add option to update-stack to use another current working directory ([fcbbba5](https://github.com/pharindoko/json-serverless/commit/fcbbba58b9522735919c31fd5d51c617d9146b76))





## [1.5.33](https://github.com/pharindoko/json-serverless/compare/v1.5.32...v1.5.33) (2020-05-04)


### Bug Fixes

* **template:** adapt jsonfilepath in webpack config ([fd95387](https://github.com/pharindoko/json-serverless/commit/fd95387f137978766173a5ed0d4bad3706c73abd))





## [1.5.32](https://github.com/pharindoko/json-serverless/compare/v1.5.31...v1.5.32) (2020-05-04)


### Bug Fixes

* **template:** set correct webpack config file for npm package ([870ec59](https://github.com/pharindoko/json-serverless/commit/870ec590ef3e23f13c30dfd693bc4f84a3b747b1))





## [1.5.31](https://github.com/pharindoko/json-serverless/compare/v1.5.30...v1.5.31) (2020-05-04)


### Bug Fixes

* **references:** update dependencies ([b1b5414](https://github.com/pharindoko/json-serverless/commit/b1b5414e5361be89ca6f15ddb52a4fedbc54a4b9))
* **server:** correct wrong swagger response types ([f4ce050](https://github.com/pharindoko/json-serverless/commit/f4ce0507adb1b84e004f811ea80c100f22bdd6a2))
* **server:** fail on first request to swagger ui solved by initial request ot middleware ([9cb764d](https://github.com/pharindoko/json-serverless/commit/9cb764d209c33f0c2dc2a6f7ef2ec8db46ac2ef5))


### Features

* **cli:** list all relevant urls as output ([c9a053e](https://github.com/pharindoko/json-serverless/commit/c9a053ee0974ce8b5de68f36980354247ed21bba))
* **server:** add example to start the library directly ([01ec1a9](https://github.com/pharindoko/json-serverless/commit/01ec1a958391bd908cc668df4c3f0ae0ba8457e0))
* **server:** add graphql interface ([51aae16](https://github.com/pharindoko/json-serverless/commit/51aae16642a3694aedadbd80df702a4d8724eac2))


### Reverts

* **server:** revert change of db.json back to basic sample ([fbb743c](https://github.com/pharindoko/json-serverless/commit/fbb743ce055c16e6a79a1a5465d7250c2f6a3021))





## [1.5.30](https://github.com/pharindoko/json-serverless/compare/v1.5.27...v1.5.30) (2020-04-12)


### Bug Fixes

* **cli:** update create-stack to install dependencies (needed) ([7ed2859](https://github.com/pharindoko/json-serverless/commit/7ed2859374d5c0a39e015bbf7eaa701c33a3284e))


### Features

* **cli:** remove additional install step to improve performance ([ea9a8ab](https://github.com/pharindoko/json-serverless/commit/ea9a8abb64fc82fab0da96804cd1d07d0b9dafd5))





## [1.5.28](https://github.com/pharindoko/json-serverless/compare/v1.5.27...v1.5.28) (2020-04-12)


### Features

* **cli:** remove additional install step to improve performance ([ea9a8ab](https://github.com/pharindoko/json-serverless/commit/ea9a8abb64fc82fab0da96804cd1d07d0b9dafd5))





## [1.5.27](https://github.com/pharindoko/json-serverless/compare/v1.5.26...v1.5.27) (2020-04-02)


### Bug Fixes

* **deps:** update dependency chalk to v4 ([ce27e00](https://github.com/pharindoko/json-serverless/commit/ce27e009db3f9eee2d9e1171faa0ccd09d9463b2))





## [1.5.26](https://github.com/pharindoko/json-serverless/compare/v1.5.25...v1.5.26) (2020-03-29)


### Bug Fixes

* **cli:** validate apiname to avoid issues in deployment with s3 or cloudformation stack ([f564f87](https://github.com/pharindoko/json-serverless/commit/f564f87a6f5a3b4dde4bbfb57fac4e658df2c05b))





## [1.5.25](https://github.com/pharindoko/json-serverless/compare/v1.5.24...v1.5.25) (2020-03-29)


### Bug Fixes

* **cli:** add missing aws-sdk reference and fix audited vulnerabilities ([a9f7328](https://github.com/pharindoko/json-serverless/commit/a9f73285dab4ff63c82e9bf83ed8fa63fe6d9b1d))
* **server:** fix security vulnerabilities detected by snyk ([1b653c7](https://github.com/pharindoko/json-serverless/commit/1b653c7126129c577737fbe620ab821e5d07b4c3))





## [1.5.24](https://github.com/pharindoko/json-serverless/compare/v1.5.23...v1.5.24) (2020-03-01)


### Bug Fixes

* **json-server:** update to v 0.16 and that fixes issue of 0.15 ([a02a4ba](https://github.com/pharindoko/json-serverless/commit/a02a4baba21deb26b7feb641093746d12a479a69))





## [1.5.23](https://github.com/pharindoko/json-serverless/compare/v1.5.22...v1.5.23) (2020-02-16)


### Bug Fixes

* **server:** fix vulnerabilities ([1591bbe](https://github.com/pharindoko/json-serverless/commit/1591bbee5cc3fe0d2b89aabcc7e8e793786b8fbf))
* **template:** fix cors settings in serverless.yml ([c860566](https://github.com/pharindoko/json-serverless/commit/c8605661a66f97cf57328e2fb99bc8689cdf34ea))





## [1.5.22](https://github.com/pharindoko/json-serverless/compare/v1.5.21...v1.5.22) (2020-01-27)


### Bug Fixes

* **server:** fix missing property initialization in swagger spec ([942a38a](https://github.com/pharindoko/json-serverless/commit/942a38ad956c3934f7df4446b05c399295e0df65))


### Features

* **cli:** add readonly mode for local run option ([a16c5ee](https://github.com/pharindoko/json-serverless/commit/a16c5ee1031b255e07b3367055efcde9562ce47d))





## [1.5.21](https://github.com/pharindoko/json-serverless/compare/v1.5.19...v1.5.21) (2020-01-25)


### Bug Fixes

* **server:** fix cors issue for post, put, patch events ([d15e331](https://github.com/pharindoko/json-serverless/commit/d15e3317d2ce9f0815a0b48c66d52cc5b88423ac))





## [1.5.20](https://github.com/pharindoko/json-serverless/compare/v1.5.19...v1.5.20) (2020-01-19)

**Note:** Version bump only for package json-serverless





## [1.5.19](https://github.com/pharindoko/json-serverless/compare/v1.5.18...v1.5.19) (2020-01-18)

**Note:** Version bump only for package json-serverless





## [1.5.18](https://github.com/pharindoko/json-serverless/compare/v1.5.17...v1.5.18) (2020-01-18)


### Bug Fixes

* **cli:** fix wrong reference to serverless binary in update function ([be25968](https://github.com/pharindoko/json-serverless/commit/be25968382e7919d379620d016755634aa934ec6))





## [1.5.17](https://github.com/pharindoko/json-serverless/compare/v1.5.14...v1.5.17) (2020-01-18)


### Bug Fixes

* **cli:** adapt reference to serverless binary in create stack ([7136b22](https://github.com/pharindoko/json-serverless/commit/7136b22740dee7c7e0cdc6f168b6949b0e629f01))
* **deps:** update dependency globby to v11 ([0e5950e](https://github.com/pharindoko/json-serverless/commit/0e5950e9c0995d052b0d7a0f05725eed11965d85))
* **server:** add cors origin headers ([b3b6f16](https://github.com/pharindoko/json-serverless/commit/b3b6f16918a1a2888a1e3c9f426cccb4fe544c1c))





## [1.5.16](https://github.com/pharindoko/json-serverless/compare/v1.5.14...v1.5.16) (2020-01-06)

**Note:** Version bump only for package json-serverless





## [1.5.15](https://github.com/pharindoko/json-serverless/compare/v1.5.14...v1.5.15) (2020-01-05)

**Note:** Version bump only for package json-serverless





## [1.5.14](https://github.com/pharindoko/json-serverless/compare/v1.5.13...v1.5.14) (2020-01-03)


### Bug Fixes

* **cli:** update colors to fit to white and black terminal ([b4e6f57](https://github.com/pharindoko/json-serverless/commit/b4e6f573e3372376a82b38b0aa9183daea531d42))





## [1.5.13](https://github.com/pharindoko/json-serverless/compare/v1.5.12...v1.5.13) (2020-01-03)

**Note:** Version bump only for package json-serverless





## [1.5.12](https://github.com/pharindoko/json-serverless/compare/v1.5.11...v1.5.12) (2019-12-31)


### Bug Fixes

* **cli:** add missing directory config before create config files ([b39d30f](https://github.com/pharindoko/json-serverless/commit/b39d30f8b8655b83d3c56abc20b41ebd93eda76f))





## [1.5.11](https://github.com/pharindoko/json-serverless/compare/v1.5.8...v1.5.11) (2019-12-31)


### Bug Fixes

* **deps:** update dependency nodemon to v2 ([c755eff](https://github.com/pharindoko/json-serverless/commit/c755effe6fca0a846fbcbd1752f2dfd2057fdcf2))
* **deps:** update dependency terser-webpack-plugin to v2 ([ef6d71c](https://github.com/pharindoko/json-serverless/commit/ef6d71c77550d3abd43cc952e6571028018d4e31))





## [1.5.10](https://github.com/pharindoko/json-serverless/compare/v1.5.9...v1.5.10) (2019-12-31)

**Note:** Version bump only for package json-serverless





## [1.5.9](https://github.com/pharindoko/json-serverless/compare/v1.5.8...v1.5.9) (2019-12-31)

**Note:** Version bump only for package json-serverless





## [1.5.8](https://github.com/pharindoko/json-serverless/compare/v1.5.3...v1.5.8) (2019-12-31)


### Features

* **cli:** add cli to json-serverless project ([bf1213a](https://github.com/pharindoko/json-serverless/commit/bf1213a1ad18c59ae3cafacd8a6cb3c737caf6cc))


### Reverts

* Revert "v0.1.0-alpha.0" ([ccc6a6d](https://github.com/pharindoko/json-serverless/commit/ccc6a6d3e6bb349d8c51b83375610f8db25a762f))
* Revert "v0.0.6-alpha.16" ([8a7f087](https://github.com/pharindoko/json-serverless/commit/8a7f08784289b7936c704caecfbb8f757719b876))
* Revert "v0.0.6-alpha.10" ([dfb59d2](https://github.com/pharindoko/json-serverless/commit/dfb59d2458dfa2fb3e1426f1749409abfa4dd37d))





## [1.5.7](https://github.com/pharindoko/json-serverless/compare/v1.5.6...v1.5.7) (2019-12-31)

**Note:** Version bump only for package json-serverless




## [1.5.6](https://github.com/pharindoko/json-serverless/compare/v1.5.3...v1.5.6) (2019-12-30)


### Features

* **cli:** add cli to json-serverless project ([bf1213a](https://github.com/pharindoko/json-serverless/commit/bf1213a1ad18c59ae3cafacd8a6cb3c737caf6cc))


### Reverts

* Revert "v0.1.0-alpha.0" ([ccc6a6d](https://github.com/pharindoko/json-serverless/commit/ccc6a6d3e6bb349d8c51b83375610f8db25a762f))
* Revert "v0.0.6-alpha.16" ([8a7f087](https://github.com/pharindoko/json-serverless/commit/8a7f08784289b7936c704caecfbb8f757719b876))
* Revert "v0.0.6-alpha.10" ([dfb59d2](https://github.com/pharindoko/json-serverless/commit/dfb59d2458dfa2fb3e1426f1749409abfa4dd37d))





## [1.5.5](https://github.com/pharindoko/json-serverless/compare/v1.5.4...v1.5.5) (2019-12-30)

**Note:** Version bump only for package json-serverless





## [0.0.6](https://github.com/pharindoko/json-serverless/compare/v1.5.3...v0.0.6) (2019-12-30)


### Features

* **cli:** add cli to json-serverless project ([bf1213a](https://github.com/pharindoko/json-serverless/commit/bf1213a1ad18c59ae3cafacd8a6cb3c737caf6cc))


### Reverts

* Revert "v0.1.0-alpha.0" ([ccc6a6d](https://github.com/pharindoko/json-serverless/commit/ccc6a6d3e6bb349d8c51b83375610f8db25a762f))
* Revert "v0.0.6-alpha.16" ([8a7f087](https://github.com/pharindoko/json-serverless/commit/8a7f08784289b7936c704caecfbb8f757719b876))
* Revert "v0.0.6-alpha.10" ([dfb59d2](https://github.com/pharindoko/json-serverless/commit/dfb59d2458dfa2fb3e1426f1749409abfa4dd37d))




## [1.5.3](https://github.com/pharindoko/json-serverless/compare/v1.5.2...v1.5.3) (2019-12-15)


### Bug Fixes

* **logging:** fix error when pino pretty is not found ([f698257](https://github.com/pharindoko/json-serverless/commit/f698257df9ea85419acc8562f63ec89d33a3cc60))

## [1.5.2](https://github.com/pharindoko/json-serverless/compare/v1.5.1...v1.5.2) (2019-12-08)


### Bug Fixes

* **dependencies:** update package-lock.json and old packages ([da5f815](https://github.com/pharindoko/json-serverless/commit/da5f815d0c01fd5ca786160cfdde7cbcfff9a039))

## [1.5.1](https://github.com/pharindoko/json-serverless/compare/v1.5.0...v1.5.1) (2019-10-04)


### Bug Fixes

* package.json, package-lock.json & .snyk to reduce vulnerabilities ([6104846](https://github.com/pharindoko/json-serverless/commit/6104846))

# [1.5.0](https://github.com/pharindoko/json-serverless/compare/v1.4.1...v1.5.0) (2019-09-02)


### Features

* **server:** added additional json validation ([ecc1581](https://github.com/pharindoko/json-serverless/commit/ecc1581))

## [1.4.1](https://github.com/pharindoko/json-serverless/compare/v1.4.0...v1.4.1) (2019-09-02)


### Bug Fixes

* **server:** fixed issues when starting local instances after refactoring code ([d590898](https://github.com/pharindoko/json-serverless/commit/d590898))

# [1.4.0](https://github.com/pharindoko/json-serverless/compare/v1.3.0...v1.4.0) (2019-08-25)


### Features

* **settings:** added possiblity to set path of json file which will be imported ([ce10b0b](https://github.com/pharindoko/json-serverless/commit/ce10b0b))

# [1.3.0](https://github.com/pharindoko/json-serverless/compare/v1.2.0...v1.3.0) (2019-08-24)


### Features

* **swagger:** add swagger ui and spec support ([cbd8c82](https://github.com/pharindoko/json-serverless/commit/cbd8c82))

# [1.2.0](https://github.com/pharindoko/json-serverless/compare/v1.1.0...v1.2.0) (2019-08-16)


### Features

* **debugging:** enabled local debugging in vscode using webpack and sourcemaps ([1a004e1](https://github.com/pharindoko/json-serverless/commit/1a004e1))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.1 (2019-08-08)


### Bug Fixes

* **deps:** update dependency serverless-http to v2 ([c406652](https://github.com/pharindoko/ngx-chartboard-backend/commit/c406652))
* .snyk, package.json & package-lock.json to reduce vulnerabilities ([a05a6b7](https://github.com/pharindoko/ngx-chartboard-backend/commit/a05a6b7))
* .snyk, package.json & package-lock.json to reduce vulnerabilities ([9e14350](https://github.com/pharindoko/ngx-chartboard-backend/commit/9e14350))
* current serverless framework version has issue with stage parameters ([897cb9f](https://github.com/pharindoko/ngx-chartboard-backend/commit/897cb9f))


### Features

* **change management:** added version and changelog support ([46933e3](https://github.com/pharindoko/ngx-chartboard-backend/commit/46933e3))
