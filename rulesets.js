'use strict'

const transfer = ({
		population,
		minWeatlh = 0,
		maxWealth = Number.POSITIVE_INFINITY
	}) => (sender, receiver, amount = 1) => {
		if (
			population [sender] - amount >= minWeatlh &&
			population [receiver] + amount <= maxWealth
		) {
			population [sender] -= amount
			population [receiver] += amount
		}
}

const normal = (config, population) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	transfer ({population, __proto__ : config}) (sender, receiver, config.transferAmount)
}

const compareWealth = (config, population) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	const {ifPoorer = 1, ifRicher = 2} = config
	transfer ({population, __proto__ : config}) (
		sender, receiver,
		population [sender] <= population [receiver] ?
		ifPoorer : ifRicher
	)
}

const classBased = (config, population) => {
	const {
		poor2poor = 2, poor2rich = 1,
		rich2poor = 3, rich2rich = 2,
		startCapital
	} = config
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	transfer ({population, __proto__ : config}) (
		sender, receiver,
		[poor2poor, poor2rich, rich2poor, rich2rich] [
			(population [receiver] > startCapital ? 1 : 0) +
			(population [sender] > startCapital ? 2 : 0)
		]
	)
}

/* TODO: seperate out redistribution schemes */

const normalWithUBI = (config, population, counter) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	transfer ({population, __proto__ : config}) (sender, receiver, config.transferAmount)

	if (! (counter % 1024)) {
		population.forEach ((money, index) => 
			population[index] = round (money * (1 - 1 / 2 ** 10) + config.startCapital / 2 ** 10))
	}
}

const yardGamblingMin = (config, population) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	const wager = Math.min (population [sender] * .1, population [receiver] * .1)
	transfer ({population, __proto__ : config}) (sender, receiver, wager)
}

const yardGamblingMax = (config, population) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	const wager = Math.max (population [sender] * .1, population [receiver] * .1)
	transfer ({population, __proto__ : config}) (sender, receiver, wager)
}

const yardGamblingAvg = (config, population) => {
	const [sender, receiver] = 2 .map (
		() => floor (random () * config.populationSize)
	)
	const wager = population [sender] * .5 + population [receiver] * .5
	transfer ({population, __proto__ : config}) (sender, receiver, wager)
}

/*
const richReset = (population, {population, startCapital}) => {
	const sender = floor (random () * population)
	const receiver = floor (random () * population)
	if (
		population [sender] > 0
	) {
		population [sender] --
		population [receiver] ++
	if (population[sender] == 0) {
		const sorted = population.slice(0).sort((a, b) => b - a);
		population[population.indexOf(sorted[0])] -= startCapital;
		population[sender] += startCapital;
	}
}}

const noDebtLocal = (population, {population}) => {
	const sender = floor (random () * population)
	if (population [sender] > 0) {
		population [sender] --
		population [mod (
			sender + floor (random () * 3) - 1, population
		)] ++
}}

const noDebtLocalSort = (population, {population}) => {
	const sender = floor (random () * population)
	if (population [sender] > 0) {
		population [sender] --
		population [mod (
			sender + floor (random () * 3) - 1, population
		)] ++
		population = population.sort ((x, y) => y - x)
}}

*/