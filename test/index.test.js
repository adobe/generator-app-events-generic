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

const helpers = require('yeoman-test')

const EventsAppGenerator = require('../index')
const Generator = require('yeoman-generator')

const composeWith = jest.spyOn(Generator.prototype, 'composeWith')
beforeAll(() => {
  // mock implementations
  composeWith.mockReturnValue(undefined)
})
beforeEach(() => {
  composeWith.mockClear()
})
afterAll(() => {
  composeWith.mockRestore()
})

describe('prototype', () => {
  test('exports a yeoman generator', () => {
    expect(EventsAppGenerator.prototype).toBeInstanceOf(Generator)
  })
})

describe('run', () => {
  const options = {
    // forward needed args
    'action-folder': 'actions',
    'config-path': 'app.config.yaml',
    'events-config-path': 'app.config.yaml',
    'full-key-to-manifest': 'application.runtimeManifest',
    'full-key-to-events-manifest': 'application.events'
  }

  test('basic app generator', async () => {
    await helpers.run(EventsAppGenerator)
    expect(composeWith).toHaveBeenCalledWith(
      expect.objectContaining({
        Generator: expect.any(Generator.constructor),
        path: 'unknown'
      }),
      expect.objectContaining(options))
  })
})
