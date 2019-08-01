'use strict'

var barChart = (array, {hist, max, min}) => {
	min = min == undefined ? Math.min(...array) : min
	const total =
		(max == undefined ? Math.max(...array) : max) - min
	const [sampSize, ampSize, sampDir, ampDir] = hist ?
		['width', 'height', 'x', 'y'] :
		['height', 'width', 'y', 'x']
	const {length} = array
	const scale = hist ? length - 1 : total
	return elem ({tag : 'svg', svg : true,
		attr: {
			class: 'diagram ' + (hist ? 'histogram' : 'score'),
			viewBox: '0 0 ' + (hist ?
				length + ' ' + total :
				total + ' ' + length
			),
			preserveAspectRatio: 'none',
			[sampSize]: length, [ampSize]: total
		},
		content: array.map ((amplitide, index) => {
			const barSize = amplitide - min
			const greenness = hist ? index : barSize
			const redder = greenness <= scale / 2
			return elem ({tag : 'rect', svg : true,
				attr: {
					[ampDir]: hist ? total - barSize : 0,
					[sampDir]: index, [sampSize]: 1, [ampSize]: barSize,
					fill:
						(redder ?  '#C0xx00' : '#xxC000')
						.replace('xx', Math.round(
							(redder ? greenness : scale - greenness) /
							scale * 192 * 2
						).toString(16).padStart (2, '0')
				)},
				content : elem ({
					tag : 'title', svg : true,
					content : `$(index) : $(amplitide)`
})})})})}

if (! String.prototype.padStart) {
	String.prototype.padStart = function (padding, length) {
		let pad = padding
		while (this.length + pad.length < length) pad += padding
		return pad.slice (0, length - this.length) + this
}}