'use strict';

module.exports = class S3Storage {
    constructor() {
      // ...
    }
  
    read() {
      return {
        "posts": [
          { "id": 1, "title": "json-server", "author": "typicode" }
        ],
        "comments": [
          { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
      };
    }
  
    write(data) {
      console.log("yeehaw");
    }
  }

  
