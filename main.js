const {min, max, round, ceil, floor} = Math

const test = [1, 2, -1, 0]

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
