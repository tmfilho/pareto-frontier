Pareto Frontier
===
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

The [Pareto Frontier](https://en.wikipedia.org/wiki/Pareto_efficiency), or Pareto set, is the set of choices which optimizes a system. This package calculates the optimal set of points in a multi-dimensional system.

For a given system, the Pareto frontier or Pareto set is the set of parameterizations (allocations) that are all Pareto efficient. Finding Pareto frontiers is particularly useful in engineering. By yielding all of the potentially optimal solutions, a designer can make focused tradeoffs within this constrained set of parameters, rather than needing to consider the full ranges of parameters.

The Pareto frontier, P(Y), may be more formally described as follows. Consider a system with function <a href="https://www.codecogs.com/eqnedit.php?latex=f:&space;\mathbb{R}^n&space;\rightarrow&space;\mathbb{R}^m" target="_blank"><img src="https://latex.codecogs.com/gif.latex?f:&space;\mathbb{R}^n&space;\rightarrow&space;\mathbb{R}^m" title="f: \mathbb{R}^n \rightarrow \mathbb{R}^m" /></a>, where ''X'' is a compact set of feasible decisions in the metric space <a href="https://www.codecogs.com/eqnedit.php?latex=\mathbb{R}^n" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\mathbb{R}^n" title="\mathbb{R}^n" /></a>, and ''Y'' is the feasible set of criterion vectors in <a href="https://www.codecogs.com/eqnedit.php?latex=\mathbb{R}^m" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\mathbb{R}^m" title="\mathbb{R}^m" /></a>, such that <div class="equation" align="center" data-raw-text="Y = \{ y \in \mathbb{R}^m:\; y = f(x), x \in X\;\}" data-equation=""> <a href="https://www.codecogs.com/eqnedit.php?latex=Y&space;=&space;\{&space;y&space;\in&space;\mathbb{R}^m:\;&space;y&space;=&space;f(x),&space;x&space;\in&space;X\;\}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?Y&space;=&space;\{&space;y&space;\in&space;\mathbb{R}^m:\;&space;y&space;=&space;f(x),&space;x&space;\in&space;X\;\}" title="Y = \{ y \in \mathbb{R}^m:\; y = f(x), x \in X\;\}" /></a>.</div>

We assume that the preferred directions of criteria values are known. A point <a href="https://www.codecogs.com/eqnedit.php?latex=y^{\prime\prime}&space;\in&space;\mathbb{R}^m\;" target="_blank"><img src="https://latex.codecogs.com/gif.latex?y^{\prime\prime}&space;\in&space;\mathbb{R}^m\;" title="y^{\prime\prime} \in \mathbb{R}^m\;" /></a> is preferred to (strictly dominates) another point <a href="https://www.codecogs.com/eqnedit.php?latex=y^{\prime}&space;\in&space;\mathbb{R}^m\;" target="_blank"><img src="https://latex.codecogs.com/gif.latex?y^{\prime}&space;\in&space;\mathbb{R}^m\;" title="y^{\prime} \in \mathbb{R}^m\;" /></a>, written as <a href="https://www.codecogs.com/eqnedit.php?latex=y^{\prime\prime}&space;\succ&space;y^{\prime}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?y^{\prime\prime}&space;\succ&space;y^{\prime}" title="y^{\prime\prime} \succ y^{\prime}" /></a>. The Pareto frontier is thus written as:

<div class="equation" align="center" data-raw-text="P(Y) = \{ y^\prime \in Y: \; \{y^{\prime\prime} \in Y:\; y^{\prime\prime} \succ y^\prime, y^{\prime\prime} \neq y^\prime \; \} = \empty \}." data-equation="eq:paretofrontier">
<a href="https://www.codecogs.com/eqnedit.php?latex=P(Y)&space;=&space;\{&space;y^\prime&space;\in&space;Y:&space;\;&space;\{y^{\prime\prime}&space;\in&space;Y:\;&space;y^{\prime\prime}&space;\succ&space;y^\prime,&space;y^{\prime\prime}&space;\neq&space;y^\prime&space;\;&space;\}&space;=&space;\emptyset&space;\}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?P(Y)&space;=&space;\{&space;y^\prime&space;\in&space;Y:&space;\;&space;\{y^{\prime\prime}&space;\in&space;Y:\;&space;y^{\prime\prime}&space;\succ&space;y^\prime,&space;y^{\prime\prime}&space;\neq&space;y^\prime&space;\;&space;\}&space;=&space;\emptyset&space;\}" title="P(Y) = \{ y^\prime \in Y: \; \{y^{\prime\prime} \in Y:\; y^{\prime\prime} \succ y^\prime, y^{\prime\prime} \neq y^\prime \; \} = \emptyset \}" /></a>.
</div>

## Installation

``` bash
$ npm install --save pareto-frontier
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
const pf = require('pareto-frontier');
```

#### pf.getParetoFrontier(graph)

Evaluates the [Pareto Frontier](https://en.wikipedia.org/wiki/Pareto_efficiency). `graph` must be an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of points. Each point must be an array of length two (or more). Additional information can be stored in each point and will pass through. Eg: `[55, 42, 'red']`.

Returned points are the Pareto Optimal set sorted to form a line.

##### Examples with a 2D system:

``` javascript
const graph = [
    [55, 42],
    [60, 22],
    [83, 20],
    [20, 81],
    [41, 35],
    [12, 32],
    [29, 17],
    [64, 55],
    [47, 31],
    [89, 10],
    [68, 66],
    [33, 35],
    [72, 47],
    [33, 90],
    [49, 25],
];

//For maximizing both dimensions, there are three ways of getting the same output:

const out = pf.getParetoFrontier(graph);
const out = pf.getParetoFrontier(graph, {optimize: 'topRight'});
const out = pf.getParetoFrontier(graph, {optimize: 'multiDimensional', maximizeDimension: [true, true]});

/* All three will return:
[
    [83, 20],
    [89, 10],
    [68, 66],
    [72, 47],
    [33, 90]
]
*/

//For minimizing the first dimension and maximizing the second one, there are two ways of getting the same output:

const out = pf.getParetoFrontier(graph, {optimize: 'topLeft'});
const out = pf.getParetoFrontier(graph, {optimize: 'multiDimensional', maximizeDimension: [false, true]});

/* Both will return:
[
    [20, 81],
    [12, 32],
    [33, 90]
]
*/

```

##### Examples with a 3D system:

``` javascript
const graph = [
	[93, 65, 14],
	[74, 79, 15],
	[72, 73, 55],
	[93, 80, 23],
	[78, 7, 33],
	[80, 25, 38],
	[3, 47, 98],
	[79, 36, 72],
	[35, 20, 90],
	[74, 50, 59],
	[19, 57, 8],
	[28, 22, 88],
	[10, 88, 84],
	[22, 17, 8],
	[71, 21, 47],
	[68, 7, 72],
	[6, 31, 91],
];

//For maximizing all dimensions:

const out = pf.getParetoFrontier(graph, {optimize: 'multiDimensional', maximizeDimension: [true, true, true]});

/* returns:
[
	[72, 73, 55],
	[93, 80, 23],
	[80, 25, 38],
	[3, 47, 98],
	[79, 36, 72],
	[35, 20, 90],
	[74, 50, 59],
	[28, 22, 88],
	[10, 88, 84],
	[6, 31, 91]
]
*/

//For minimizing all dimensions:

const out = pf.getParetoFrontier(graph, {optimize: 'multiDimensional', maximizeDimension: [false, false, false]});

/* Both will return:
[
	[78, 7, 33],
	[3, 47, 98],
	[19, 57, 8],
	[10, 88, 84],
	[22, 17, 8],
	[68, 7, 72],
	[6, 31, 91]
]
*/

```

##### Direction of Pareto Frontier
For 2D systems, there are shorthand ways to specify which direction to optimize in the `options` object that is passed to `getParetoFrontier(graph, options)`.

| Top Left Pareto Frontier |
| ------ |
| <center><img src="images/top-left.png?raw=true" width="342" alt="Top Left Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'topLeft' });``` |

| Top Right Pareto Frontier |
| ------ |
| <center><img src="images/top-right.png?raw=true" width="342" alt="Top Left Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'topRight'} );``` |

| Bottom Right Pareto Frontier |
| ------ |
| <center><img src="images/bottom-right.png?raw=true" width="342" alt="Bottom Right Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'bottomRight'} );``` |

| Bottom Left Pareto Frontier |
| ------ |
| <center><img src="images/bottom-left.png?raw=true" width="342" alt="Bottom Right Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'bottomLeft'} );``` |

##### Bad inputs
For non-wellformed inputs, a `TypeError` will be thrown.

``` javascript
const graph = [
	[0,-4],
	[1],  // Missing second dimension
	[2,0],
];

// Throws a TypeError
const out = pf.getParetoFrontier(graph);
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ npm test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ npm run test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [pareto-frontier](https://github.com/justinormont/pareto-frontier) Authors.

Description text partially via [Wikipedia](https://en.wikipedia.org/wiki/Pareto_efficiency).


[npm-image]: https://img.shields.io/npm/v/pareto-frontier.svg
[npm-url]: https://npmjs.org/package/pareto-frontier

[travis-image]: http://img.shields.io/travis/justinormont/pareto-frontier/master.svg
[travis-url]: https://travis-ci.org/justinormont/pareto-frontier

[codecov-image]: https://img.shields.io/codecov/c/github/justinormont/pareto-frontier/master.svg
[codecov-url]: https://codecov.io/github/justinormont/pareto-frontier?branch=master

[dependencies-image]: http://img.shields.io/david/justinormont/pareto-frontier.svg
[dependencies-url]: https://david-dm.org/justinormont/pareto-frontier

[dev-dependencies-image]: http://img.shields.io/david/dev/justinormont/pareto-frontier.svg
[dev-dependencies-url]: https://david-dm.org/dev/justinormont/pareto-frontier

[github-issues-image]: http://img.shields.io/github/issues/justinormont/pareto-frontier.svg
[github-issues-url]: https://github.com/justinormont/pareto-frontier/issues
