/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { EventsGenerator, commonTemplates } = require('@adobe/generator-app-common-lib')
const path = require('path')

class EventsStandardGenerator extends EventsGenerator {
  constructor (args, opts) {
    super(args, opts)
    this.props = {}
  }

  async prompting () {
    this.props.regDetails = await this.promptForEventsDetails({ regName: 'Event Registration Default', regDesc: 'Registration for IO Events' })
  }

  writing () {
    if (this.props.regDetails) {
      this.sourceRoot(path.join(__dirname, './templates'))

      this.addEvents(this.props.regDetails, './events-generic.js', {
        testFile: './test/events-generic.test.js',
        sharedLibFile: commonTemplates.utils,
        sharedLibTestFile: commonTemplates['utils.test'],
        actionManifestConfig: {
          web: 'no',
          inputs: { LOG_LEVEL: 'debug' },
          annotations: { 'require-adobe-auth': false, final: true }
        }
      })
    }
  }
}

module.exports = EventsStandardGenerator
