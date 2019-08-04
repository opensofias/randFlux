'use strict'

const fluxDefault = {
	steps: 2 ** 18,
	generations: 2 ** 6,
	population: 2 ** 8,
	startCapital: 2 ** 8,
	scheme: noDebt
}

const runFlux = (config) => {
	const {steps, generations, population, startCapital, scheme} = config
	const fluxHist = [population .map (()=> startCapital)]
	let counter = 0

	generations.forEach (_=> {
		const currentGen = [...fluxHist [fluxHist.length - 1]]
		steps.forEach (_=> {
			counter ++
			scheme (currentGen, config, counter)
		})
		fluxHist.push(currentGen)
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