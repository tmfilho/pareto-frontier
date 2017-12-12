'use strict';

const multiDimensionalComparator = (a, b, dimensionMaximization) => {
	let result = 0;
	let countNegative = 0;
	let countPositive = 0;
	dimensionMaximization.forEach(function(value, index) {
		if (b[index] < a[index] && value) {
			countNegative++;
		} else if (b[index] > a[index] && !value) {
			countNegative++;
		} else if (b[index] > a[index] && value) {
			countPositive++;
		} else if (b[index] < a[index] && !value) {
			countPositive++;
		}
	});
	if (countPositive > 0 && countNegative === 0) {
		result = 1;
	} else if (countNegative > 0 && countPositive === 0) {
		result = -1;
	}
	return result;
}

const pointComparators = Object.freeze({
	topRight: (a, b) => multiDimensionalComparator(a, b, [true, true]),
	topLeft: (a, b) => multiDimensionalComparator(a, b, [false, true]),
	bottomRight: (a, b) => multiDimensionalComparator(a, b, [true, false]),
	bottomLeft: (a, b) => multiDimensionalComparator(a, b, [false, false]),
	multiDimensional: (a, b, dimensionMaximization) => multiDimensionalComparator(a, b,
		dimensionMaximization),
});

const getParetoFrontier = (points, options) => {
	if (!Array.isArray(points) || !points.every(p => Array.isArray(p) && p.length >= 2)) {
		throw new TypeError('Require array of points as input');
	}

	const pointComparator = options && pointComparators[options.optimize] || pointComparators.topRight;
	let frontier = [];
	let n = points.length;
	for (let i = 0; i < n; i++) {
		let foundBetter = false;
		let j = 0;
		while (!foundBetter && j < n) {
			if (i !== j) {
				if (pointComparator(points[i], points[j], options ? options.dimensionMaximization : null) > 0) {
					foundBetter = true;
				}
			}
			j++;
		}
		if (!foundBetter) {
			frontier.push(points[i]);
		}
	}
	return frontier;
}

exports.getParetoFrontier = getParetoFrontier;