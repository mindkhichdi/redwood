global.__dirname = __dirname
import path from 'path'

import { loadGeneratorFixture } from 'src/lib/test'

import * as page from '../page'

let singleWordFiles, multiWordFiles

beforeAll(() => {
  singleWordFiles = page.files({ name: 'Home' })
  multiWordFiles = page.files({ name: 'ContactUs' })
})

test('returns exactly 2 files', () => {
  expect(Object.keys(singleWordFiles).length).toEqual(2)
})

test('creates a page component', () => {
  expect(
    singleWordFiles[
      path.normalize('/path/to/project/web/src/pages/HomePage/HomePage.js')
    ]
  ).toEqual(loadGeneratorFixture('page', 'singleWordPage.js'))
})

test('creates a page test', () => {
  expect(
    singleWordFiles[
      path.normalize('/path/to/project/web/src/pages/HomePage/HomePage.test.js')
    ]
  ).toEqual(loadGeneratorFixture('page', 'singleWordPage.test.js'))
})

test('creates a page component', () => {
  expect(
    multiWordFiles[
      path.normalize(
        '/path/to/project/web/src/pages/ContactUsPage/ContactUsPage.js'
      )
    ]
  ).toEqual(loadGeneratorFixture('page', 'multiWordPage.js'))
})

test('creates a page test', () => {
  expect(
    multiWordFiles[
      path.normalize(
        '/path/to/project/web/src/pages/ContactUsPage/ContactUsPage.test.js'
      )
    ]
  ).toEqual(loadGeneratorFixture('page', 'multiWordPage.test.js'))
})

test('creates a single-word route name', () => {
  const names = ['Home', 'home']

  names.forEach((name) => {
    expect(page.routes({ name: name, path: 'home' })).toEqual([
      '<Route path="home" page={HomePage} name="home" />',
    ])
  })
})

test('creates a camelCase route name for multiple word names', () => {
  const names = ['FooBar', 'foo_bar', 'foo-bar', 'fooBar']

  names.forEach((name) => {
    expect(page.routes({ name: name, path: 'foo-bar' })).toEqual([
      '<Route path="foo-bar" page={FooBarPage} name="fooBar" />',
    ])
  })
})

test('creates a path equal to passed path', () => {
  expect(page.routes({ name: 'FooBar', path: 'fooBar-baz' })).toEqual([
    '<Route path="fooBar-baz" page={FooBarPage} name="fooBar" />',
  ])
})
