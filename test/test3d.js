'use strict';

/* Modules */
const chai = require('chai');

/* Local module */
const paretoFrontier = require('..');

/* Variables */
const expect = chai.expect;
const assert = chai.assert;

/* Helper functions for tests */
function reflectGraph(graph, reflectX, reflectY, reflectZ) {
	return cloneGraph(graph).map(p => reflectPoint(p, reflectX, reflectY, reflectZ));
}

function reflectPoint(p, reflectX, reflectY, reflectZ) {
	if (reflectX) {
		p[0] = -p[0];
	}
	if (reflectY) {
		p[1] = -p[1];
	}
	if (reflectZ) {
		p[2] = -p[2];
	}
	return p;
}

function cloneGraph(graph) {
	return graph.map(p => Array.from(p));
}

/* Tests */
describe('pareto-frontier-3d', function tests() {

	it('should export a function', function test() {
		expect(paretoFrontier.getParetoFrontier).to.be.a('function');
	});

	it('should throw an error if provided an invalid option', function test() {
		const badValues = [
			'5',
			5,
			true,
			undefined,
			() => true,
			null,
			NaN, {},
			[
				[1]
			],
			[1, 2, 3],
			[
				[1, 2],
				[1]
			],
		];

		badValues.forEach(v => expect(() => paretoFrontier.getParetoFrontier(v)).to.throw(TypeError));
	});

	it('should return an empty array if provided an empty array', function test() {
		expect(paretoFrontier.getParetoFrontier([])).to.deep.equal([]);
	});

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

	// Expected is a for a top left optimization
	const expected = [
		[72, 73, 55],
		[93, 80, 23],
		[80, 25, 38],
		[3, 47, 98],
		[79, 36, 72],
		[35, 20, 90],
		[74, 50, 59],
		[28, 22, 88],
		[10, 88, 84],
		[6, 31, 91],
	];

	it('should calculate the pareto frontier for maxMaxMax', function test() {
		expect(paretoFrontier.getParetoFrontier(graph, {
			optimize: 'multiDimensional',
			dimensionMaximization: [true, true, true]
		})).to.deep.equal(expected);
	});

	it('should calculate the pareto frontier for maxMaxMin', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, false, false, true), {
			optimize: 'multiDimensional',
			dimensionMaximization: [true, true, false]
		})).to.deep.equal(reflectGraph(expected, false, false, true));
	});

	it('should calculate the pareto frontier for maxMinMax', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, false, true, false), {
			optimize: 'multiDimensional',
			dimensionMaximization: [true, false, true]
		})).to.deep.equal(reflectGraph(expected, false, true, false));
	});

	it('should calculate the pareto frontier for maxMinMin', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, false, true, true), {
			optimize: 'multiDimensional',
			dimensionMaximization: [true, false, false]
		})).to.deep.equal(reflectGraph(expected, false, true, true));
	});

	it('should calculate the pareto frontier for minMaxMax', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, false, false), {
			optimize: 'multiDimensional',
			dimensionMaximization: [false, true, true]
		})).to.deep.equal(reflectGraph(expected, true, false, false));
	});

	it('should calculate the pareto frontier for minMaxMin', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, false, true), {
			optimize: 'multiDimensional',
			dimensionMaximization: [false, true, false]
		})).to.deep.equal(reflectGraph(expected, true, false, true));
	});

	it('should calculate the pareto frontier for minMinMax', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, true, false), {
			optimize: 'multiDimensional',
			dimensionMaximization: [false, false, true]
		})).to.deep.equal(reflectGraph(expected, true, true, false));
	});

	it('should calculate the pareto frontier for minMinMin', function test() {
		expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, true, true), {
			optimize: 'multiDimensional',
			dimensionMaximization: [false, false, false]
		})).to.deep.equal(reflectGraph(expected, true, true, true));
	});

	it('should allow extra data stored in the points', function test() {
		const graphWithData = cloneGraph(graph).concat([
			[72, 73, 55, 'green', 100]
		]);
		expect(paretoFrontier.getParetoFrontier(graphWithData, {
			optimize: 'multiDimensional',
			dimensionMaximization: [true, true, true]
		})).to.deep.equal(expected.concat([
			[72, 73, 55, 'green', 100]
		]));
	});

});