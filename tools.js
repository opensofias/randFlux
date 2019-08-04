'use strict'

const [O, A, N, d] = [Object, Array, Number, document]

const {elem, sel, selAll} = document ? {
	elem ({tag = 'div', attr = {}, mixin = {}, content = [], svg = false}) {
		const el = svg ?
			d.createElementNS ('http://www.w3.org/2000/svg', tag) :
			d.createElement (tag)
		for (const name in attr)
			typeof attr[name] == 'boolean' ?
				attr[name] && el.setAttribute(name, name) :
				el.setAttribute(name, attr[name])
		void {
			string () {el.innerText = content},
			number: ()=> el.innerText = content.toString(),
			undefined: ()=> undefined,
			object: ()=> content instanceof Array ?
				content.forEach(contEl => el.appendChild(contEl)) :
				el.appendChild(content)
		} [typeof content] ()

		return O.assign (el, mixin)
	},
	sel: selector => d.querySelector (selector),
	selAll: selector => [...d.querySelectorAll(selector)]
} : {}

const inherit = (parent, ...mixins) =>
	O.freeze (O.assign (
		O.create (parent), ...mixins
	))

const range = (start, end, step) => {
	typeof end == "undefined" &&
		([start, end] = [0, start])
	typeof step == "undefined" &&
		(step = Math.sign (end - start))
	if ((end - start) * step < 0) 
		throw 'invalid range: ' + 
			JSON.stringify ({start,end,step})
	return O.freeze ({
		start, end, step,
		__proto__: range.prototype
})}

range.prototype = O.freeze ({
	get length()
		{return Math.ceil ((this.end - this.start) / this.step)},
	forEach (callback) {
		let count = 0
		let val
		while (
			this.step > 0 ?
				(val = this.start + (count * this.step)) <= this.end :
				(val = this.start + (count * this.step)) >= this.end
		) callback (val, count ++)
	},
	get array () {
		let result = []
		this.forEach (val => result.push (val))
		return result
	},
	map (callback) {
		let result = []
		this.forEach ((val, index) =>
			result.push (
				callback (val, index)
		))
		return result
	},
	reduce (callback, inital) {
		let acc = inital
		this.forEach ((val, index) => 
			acc = callback (acc, val, index)
		); return acc
	},
	filter (callback) {
		let result = []
		this.forEach ((val, index) =>
			callback (val, index) && result.push (val)
		); return result
	},
	some (callback) {
		let count = 0
		let val
		while (
			(val = this.start + (count * this.step))
			<= this.end
		) if (callback (val, count ++)) return true
		
		return false
	},
	every (callback) {
		return ! this.some (
			(val, index) => ! callback (val, index))
	},
	find (callback) {
		let count = 0; let val
		while (
			(val = this.start + (count * this.step))
			<= this.end
		) if (callback (val, count ++)) return val
		
		return undefined
	},
	findIndex (callback) {
		let count = 0; let val
		while (
			(val = this.start + (count * this.step))
			<= this.end
		) if (callback (val, count ++)) return count - 1
		
		return undefined
	},
	indexOf (item) {
		if (mod (item - this.start, this.step) == 0 && (
			this.step > 0 ?
			this.start <= item && item <= this.end :
			this.start >= item && item >= this.end
		)) return (item - this.start) / this.step 
		else
			return -1
	},
	lastIndexOf : this.indexOf,
	reverse () {return range(
		this.end - mod (this.end,this.step),
		this.start, -this.step
	)},
	get reduceRight () {return this.reverse ().reduce},
	*[Symbol.iterator] () {
		let count = 0; let val
		while (this.step > 0 ?
			(val = this.start + (count * this.step)) <= this.end :
			(val = this.start + (count * this.step)) >= this.end
		) yield val
}})

const mod = (x, y) => ((x % y) + y) % y

const {sin, cos, floor, ceil, min, max,} = Math

const TAU = Math.PI * 2

const flatten = array =>
	array.reduce ((acc, child) =>
		acc.concat (
			A.isArray (child) ?
			flatten (child) :
			child
		), []
)

const str2byte = str =>
	str.split ('').map (chr => chr.charCodeAt(0))

const near = (array, index) => array [
	clamp (round (index), 0, array.length - 1)
]

const lin = (array, index) => {
	const limit = [0, array.length - 1]
	const low = clamp (floor (index), ...limit)
	const high = clamp (ceil (index), ...limit)
	if (low == high) return array [low]
	
	return array [low] * (high - index) +
		array [high] * (index - low)
}

const linEx = (array, index) => {
	const low = clamp (
		floor (index),
		0, array.length - 2
	)
	const high = clamp (
		ceil (index),
		1, array.length - 1
	)
	if (low == high) return array [low]
	
	return array [low] * (high - index) +
		array [high] * (index - low)
}

const clamp = (val, bottom, top) =>
	max (bottom, min (top, val))

const arrInter = (array, func, length, bottom, top) => {
	bottom = bottom == undefined ? 0 : bottom
	top = top == undefined ? array.length : top
	const step = (top - bottom) / length
	return length.map (i => func (array, i * step))
}
