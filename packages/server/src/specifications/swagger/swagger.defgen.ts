/* eslint-disable no-use-before-define */

export class SwaggerDefGen {
  private outSwagger = '';
  private tabCount = 0;
  private indentator = '';
  private nullType = 'string';
  // ---- Functions definitions ----
  private changeIndentation(count: number) {
    /*
      Assign 'this.indentator' a string beginning with newline and followed by 'count' tabs
      Updates variable 'tabCount' with the number of tabs used
      Global variables updated:
      -identator
      -tabcount
      */

    let i;
    if (count >= this.tabCount) {
      i = this.tabCount;
    } else {
      i = 0;
      this.indentator = '\n';
    }
    for (; i < count; i += 1) {
      this.indentator += '\t';
    }
    // Update tabCount
    this.tabCount = count;
  }

  private isFloatNumber(num: number) {
    return Number(num) === num && num % 1 !== 0;
  }
  private convertNumber(num: number) {
    /*
      Append to 'this.outSwagger' string with Swagger schema attributes relative to given number
      Global variables updated:
      -this.outSwagger
      */

    if (Number.isInteger(num)) {
      this.outSwagger += `${this.indentator}"type": "integer",`;
      if (num < 2147483647 && num > -2147483647) {
        this.outSwagger += `${this.indentator}"format": "int32"`;
      } else if (Number.isSafeInteger(num)) {
        this.outSwagger += `${this.indentator}"format": "int64"`;
      } else {
        this.outSwagger += `${this.indentator}"format": "unsafe"`;
      }
    } else if (this.isFloatNumber(num)) {
      this.outSwagger += `${this.indentator}"type": "number",`;
      this.outSwagger += `${this.indentator}"format": "float"`;
    } else {
      this.outSwagger += `${this.indentator}"type": "number",`;
      this.outSwagger += `${this.indentator}"format": "unsafe"`;
    }
    this.outSwagger += `,${this.indentator}"example": ${num}`;
  }

  // date is ISO8601 format - https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
  private convertString(str: string) {
    /*
      Append to 'this.outSwagger' string with Swagger schema attributes relative to given string
      Global variables updated:
      -this.outSwagger
      */

    const regxDate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regxDateTime = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]{1,2})?(Z|(\+|-)([0-1][0-9]|2[0-3]):[0-5][0-9])$/;

    this.outSwagger += `${this.indentator}"type": "string"`;
    if (regxDateTime.test(str)) {
      this.outSwagger += ',';
      this.outSwagger += `${this.indentator}"format": "date-time"`;
    } else if (regxDate.test(str)) {
      this.outSwagger += ',';
      this.outSwagger += `${this.indentator}"format": "date"`;
    }

    this.outSwagger += `,${this.indentator}"example": "${str}"`;
  }

  private convertArray(obj: object) {
    /*
      Append to 'this.outSwagger' string with Swagger schema attributes relative to given array
      Global variables updated:
      -this.outSwagger
      */

    this.outSwagger += `${this.indentator}"type": "array",`;
    // ---- Begin items scope ----
    this.outSwagger += `${this.indentator}"items": {`;
    this.conversorSelection(obj);
    this.outSwagger += `${this.indentator}}`;
    // ---- End items scope ----
  }

  private convertObject(obj: object) {
    /*
      Append to 'this.outSwagger' string with Swagger schema attributes relative to given object
      Global variables updated:
      -this.outSwagger
      */

    // Convert null attributes to given type
    if (obj === null) {
      this.outSwagger += `${this.indentator}"type": "${this.nullType}",`;
      this.outSwagger += `${this.indentator}"format": "nullable"`;
      return;
    }
    // ---- Begin properties scope ----
    this.outSwagger += `${this.indentator}"type": "object",`;
    this.outSwagger += `${this.indentator}"properties": {`;
    this.changeIndentation(this.tabCount + 1);
    // For each attribute inside that object
    Object.keys(obj).forEach(prop => {
      // ---- Begin property type scope ----
      this.outSwagger += `${this.indentator}"${prop}": {`;
      this.conversorSelection(obj[prop]);
      this.outSwagger += `${this.indentator}},`;
      // ---- End property type scope ----
    });

    this.changeIndentation(this.tabCount - 1);
    if (Object.keys(obj).length > 0) {
      // At least 1 property inserted
      this.outSwagger = this.outSwagger.substring(
        0,
        this.outSwagger.length - 1
      ); // Remove last comma
      this.outSwagger += `${this.indentator}}`;
    } else {
      // No property inserted
      this.outSwagger += ' }';
    }
  }

  private conversorSelection(obj) {
    this.changeIndentation(this.tabCount + 1);
    if (typeof obj === 'number') {
      // attribute is a number
      this.convertNumber(obj);
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
      // attribute is an array
      this.convertArray(obj[0]);
    } else if (typeof obj === 'object') {
      // attribute is an object
      this.convertObject(obj);
    } else if (typeof obj === 'string') {
      // attribute is a string
      this.convertString(obj);
    } else if (typeof obj === 'boolean') {
      // attribute is a boolean
      this.outSwagger += `${this.indentator}"type": "boolean"`;
    } else {
      // not a valid Swagger type
      throw new Error(
        `Property type "${typeof obj}" not valid for Swagger definitions`
      );
    }
    this.changeIndentation(this.tabCount - 1);
  }

  generateDefinitions = (json: object) => {
    this.tabCount = 0;
    this.indentator = '\n';
    // ---- Begin definitions ----
    this.outSwagger = '{"definitions": {';
    this.changeIndentation(1);
    // For each object inside the JSON

    Object.keys(json).forEach(obj => {
      this.outSwagger += `${this.indentator}"${obj}": {`;
      this.conversorSelection(json[obj]);
      this.outSwagger += `${this.indentator}},`;
    });

    // Remove last comma
    this.outSwagger = this.outSwagger.substring(0, this.outSwagger.length - 1);
    // ---- End definitions ----
    this.changeIndentation(this.tabCount - 1);
    this.outSwagger += `${this.indentator}}}`;
    const jsonDefinition = JSON.parse(this.outSwagger);
    return jsonDefinition;
  };
}
