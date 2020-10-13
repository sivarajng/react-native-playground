this.webpackChunk([50],{62:function(e,r,n){"use strict";n.r(r),r.default='/*! *****************************************************************************\nCopyright (c) Microsoft Corporation. All rights reserved.\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use\nthis file except in compliance with the License. You may obtain a copy of the\nLicense at http://www.apache.org/licenses/LICENSE-2.0\n\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\nMERCHANTABLITY OR NON-INFRINGEMENT.\n\nSee the Apache Version 2.0 License for specific language governing permissions\nand limitations under the License.\n***************************************************************************** */\n\n\n\n/// <reference no-default-lib="true"/>\r\n\n\ninterface AggregateError extends Error {\r\n    errors: any[]\r\n}\r\n\r\ninterface AggregateErrorConstructor {\r\n    new(errors: Iterable<any>, message?: string): AggregateError;\r\n    (errors: Iterable<any>, message?: string): AggregateError;\r\n    readonly prototype: AggregateError;\r\n}\r\n\r\ndeclare var AggregateError: AggregateErrorConstructor;\r\n\r\n/**\r\n * Represents the completion of an asynchronous operation\r\n */\r\ninterface PromiseConstructor {\r\n    /**\r\n     * The any function returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an AggregateError containing an array of rejection reasons if all of the given promises are rejected. It resolves all elements of the passed iterable to promises as it runs this algorithm.\r\n     * @param values An array or iterable of Promises.\r\n     * @returns A new Promise.\r\n     */\r\n    any<T>(values: (T | PromiseLike<T>)[] | Iterable<T | PromiseLike<T>>): Promise<T>\r\n}\r\n'}});