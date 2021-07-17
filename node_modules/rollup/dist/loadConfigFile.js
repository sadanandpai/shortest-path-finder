/*
  @license
	Rollup.js v2.52.7
	Fri, 02 Jul 2021 03:59:47 GMT - commit b2218ccda2765c48ae1db8bade9ec6889aaab250


	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

require('fs');
require('path');
require('url');
var loadConfigFile_js = require('./shared/loadConfigFile.js');
require('./shared/rollup.js');
require('./shared/mergeOptions.js');
require('crypto');
require('events');



module.exports = loadConfigFile_js.loadAndParseConfigFile;
//# sourceMappingURL=loadConfigFile.js.map
