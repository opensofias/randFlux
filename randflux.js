'use strict'

const fluxDefault = {
	steps: 2 ** 16,
	generations: 2 ** 6,
	populationSize: 2 ** 8,
	startCapital: 2 ** 8,
	scheme: normal,

	/* optional */
	minWealth: 0,
	maxWealth: Number.POSITIVE_INFINITY,

	/* for compareWealth */ 
	ifPoorer: 2, ifRicher: 1,

	/* for classBased */
	poor2poor: 1, poor2rich: 1,
	rich2poor: 2, rich2rich: 1,
}

const runFlux = (config) => {
	const {steps, generations, populationSize, startCapital, scheme} = config
	const fluxHist = [populationSize .map (()=> startCapital)]

	/*const fluxHist = [populationSize .map (()=> 0)] // start from maximally unequal position instead
	fluxHist [0][0] = startCapital*/

	let counter = 0

	generations.forEach (_=> {
		const currentGeneration = [...fluxHist [fluxHist.length - 1]]
		steps.forEach (_=> {
			counter ++
			scheme (config, currentGeneration, counter)
		})
		fluxHist.push(currentGeneration)
	})
	fluxHist.forEach (time => {
		/*d.body.appendChild (barChart (time, {min: 0}))*/
		d.body.appendChild (
			barChart (
				time.sort((a, b) => b - a),
				{min: 0}
			)
		)
	})
}

onload = ()=> runFlux (fluxDefault)