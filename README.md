Fill Readme
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Generates code comments for a compute-io README.


## Installation

``` bash
$ npm install
```


## Usage

``` javascript
var fill = require( 'compute-fill-readme' );
```

#### fillReadme( directory[, clbk] )

Asynchronously create code comments for a `README.md` file in a specified `directory` and insert them into the file.

``` javascript
fillReadme( 'path/to/a/directory', onCompletion );

function onCompletion( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Success!' );
}
```

#### fillReadme.sync( dir )

Synchronously create code comments for a `README.md` file in a specified `directory` and insert them into the file.

``` javascript
fillReadme.sync( 'path/to/a/directory' );
```

## Examples

``` javascript
var fillReadme = require( 'compute-fill-readme' ),
	fs = require( 'fs' );

fillReadme( './examples/sqrt', function onCompletion() {
	fs.readFile( './examples/sqrt/README.md', 'utf-8', function onRead( error, file ) {
		console.log( file );
	});
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```
---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g compute-fill-readme
```


### Usage

``` bash
Usage: fillReadme [options] [directory]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
```

### Examples

``` bash
$ cd ~/my/project/directory
$ fillReadme
# => Generates code comments for the README.md file in the current working directory and overwrites it
```

To specify a location other than the current working directory, provide a `directory`.

``` bash
$ fillReadme ./../some/other/directory
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/.svg
[npm-url]: https://npmjs.org/package/

[travis-image]: http://img.shields.io/travis/compute-io/fill-readme/master.svg
[travis-url]: https://travis-ci.org/compute-io/fill-readme

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/fill-readme/master.svg
[codecov-url]: https://codecov.io/github/compute-io/fill-readme?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/fill-readme.svg
[dependencies-url]: https://david-dm.org/compute-io/fill-readme

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/fill-readme.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/fill-readme

[github-issues-image]: http://img.shields.io/github/issues/compute-io/fill-readme.svg
[github-issues-url]: https://github.com/compute-io/fill-readme/issues
