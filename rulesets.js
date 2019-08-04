'use strict'

const noDebt = (gen, {population}) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [floor (random () * population)] ++
}}

const noDebtWealthCaps = ({minWeatlh, maxWealth}) => (gen, {population, startCapital}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > minWeatlh &&
		gen [reciever] < maxWealth
	) {
		gen [sender] --
		gen [reciever] ++
	}
}

const noDebtUBI = (gen, {population, startCapital}, counter) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [floor (random () * population)] ++
	}
	if (! (counter % 1024)) {
		gen.forEach ((money, index) => 
			gen[index] = round (money * (1 - 1 / 2 ** 10) + startCapital / 2 ** 10))
	}
}

const noDebtUBO = (gen, {population, startCapital}, counter) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [floor (random () * population)] ++
	}
	if (! (counter % 1024)) {
		gen.forEach ((money, index) => 
			gen[index] = max (0, round (money * (1 + 1 / 128) - startCapital / 128)))
	}
}

const noDebtCompareWealth = (ifPoorer, ifRicher) => (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] - poorer >= 0 &&
		gen [sender] <= gen [reciever]
	) {
		gen [sender] -= poorer
		gen [reciever] += poorer
	} else if (
		gen [sender] - richer >= 0
	) {
		gen [sender] -= richer
		gen [reciever] += richer
	}
}

/*
TODO: distribution scheme based on 'class'. that is, wether one has above or below average wealth.

const noDebtClassBased = (poor2poor, poor2rich, rich2poor, rich2rich) => (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] - poorer >= 0 &&
		gen [sender] <= gen [reciever]
	) {
		gen [sender] -= poorer
		gen [reciever] += poorer
	} else if (
		gen [sender] - richer >= 0
	) {
		gen [sender] -= richer
		gen [reciever] += richer
	}
}
*/

const richReset = (gen, {population, startCapital}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0
	) {
		gen [sender] --
		gen [reciever] ++
	if (gen[sender] == 0) {
		const sorted = gen.slice(0).sort((a, b) => b - a);
		gen[gen.indexOf(sorted[0])] -= startCapital;
		gen[sender] += startCapital;
	}
}}

const richResetFeedTheRich = (gen, {population, startCapital}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0 &&
		gen [sender] <= gen [reciever]
	) {
		gen [sender] --
		gen [reciever] ++
    
	if (gen[sender] == 0) {
		const sorted = gen.slice(0).sort((a, b) => b - a);
		gen[gen.indexOf(sorted[0])] -= startCapital;
		gen[sender] += startCapital;
	}
}}

const noDebtLocal = (gen, {population}) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [mod (
			sender + floor (random () * 3) - 1, population
		)] ++
}}

const noDebtLocalSort = (gen, {population}) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [mod (
			sender + floor (random () * 3) - 1, population
		)] ++
		gen = gen.sort ((x, y) => y - x)
}}