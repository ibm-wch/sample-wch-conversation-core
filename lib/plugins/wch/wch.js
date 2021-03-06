/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const WchConnector = require('sample-wch-node-connector');
const url = require('url');

/* All plugins must export this public signature.
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
module.exports = function setup (options, imports, register) {
  const {logging, env} = imports;
  const logger = logging('wch');
  logger.methodEntry('setup', options, imports);

  let serviceName = options.serviceName || 'wch_config';
  let wchCreds = imports.env.getService(serviceName);

  const apiurl = url.parse(wchCreds.credentials.apiurl);
  const wchAuthoring = new WchConnector({
    tenantid: wchCreds.credentials.hubid,
    endpoint: 'authoring',
    baseUrl: wchCreds.credentials.apiurl,
    credentials: {
      usrname: wchCreds.credentials.username,
      pwd: wchCreds.credentials.password
    },
    maxSockets: 10
  });

  const wchDelivery = new WchConnector({
    tenantid: wchCreds.credentials.hubid,
    endpoint: 'delivery',
    baseUrl: wchCreds.credentials.apiurl
  });

  register(null, {
    wch: {
      authoring: wchAuthoring,
      delivery: wchDelivery,
      hosturl: `${apiurl.protocol}//${apiurl.host}`
    }
  });
  logger.methodExit('setup');
}
