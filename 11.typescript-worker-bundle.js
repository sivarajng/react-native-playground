this.webpackChunk([11],{23:function(e,n,r){"use strict";r.r(n),n.default='/*! *****************************************************************************\nCopyright (c) Microsoft Corporation. All rights reserved.\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use\nthis file except in compliance with the License. You may obtain a copy of the\nLicense at http://www.apache.org/licenses/LICENSE-2.0\n\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\nMERCHANTABLITY OR NON-INFRINGEMENT.\n\nSee the Apache Version 2.0 License for specific language governing permissions\nand limitations under the License.\n***************************************************************************** */\n\n\n\n/// <reference no-default-lib="true"/>\r\n\n\ninterface SymbolConstructor {\r\n    /**\r\n     * A reference to the prototype.\r\n     */\r\n    readonly prototype: Symbol;\r\n\r\n    /**\r\n     * Returns a new unique Symbol value.\r\n     * @param  description Description of the new Symbol object.\r\n     */\r\n    (description?: string | number): symbol;\r\n\r\n    /**\r\n     * Returns a Symbol object from the global symbol registry matching the given key if found.\r\n     * Otherwise, returns a new symbol with this key.\r\n     * @param key key to search for.\r\n     */\r\n    for(key: string): symbol;\r\n\r\n    /**\r\n     * Returns a key from the global symbol registry matching the given Symbol if found.\r\n     * Otherwise, returns a undefined.\r\n     * @param sym Symbol to find the key for.\r\n     */\r\n    keyFor(sym: symbol): string | undefined;\r\n}\r\n\r\ndeclare var Symbol: SymbolConstructor;'}});