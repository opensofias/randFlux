const noDebtNoRich = (gen, {population, startCapital}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0 &&
		gen[reciever] < startCapital * 2
	) {
		gen [sender] --
		gen [reciever] ++
	}
}

const noDebt = (gen, {population}) => {
	const sender = floor (random () * population)
	if (gen [sender] > 0) {
		gen [sender] --
		gen [floor (random () * population)] ++
}}

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

const noDebtGiveIfRicher = (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0 &&
		gen [sender] <= gen [reciever]
	) {
		gen [sender] --
		gen [reciever] ++
}}

const noDebtGiveIfPoorer = (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0 &&
		gen [sender] >= gen [reciever]
	) {
		gen [sender] --
		gen [reciever] ++
}}

const noDebtTwiceIfPoorer = (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 0 
	) {
		gen [sender] --
		gen [reciever] ++
		if (gen [sender] >= gen [reciever])
		{
			gen [sender] --
			gen [reciever] ++
		}
		
	}
}

const noDebtTwiceIfRicher = (gen, {population}) => {
	const sender = floor (random () * population)
	const reciever = floor (random () * population)
	if (
		gen [sender] > 1 
	) {
		gen [sender] --
		gen [reciever] ++
		if (gen [reciever] >= gen [sender])
		{
			gen [sender] --
			gen [reciever] ++
		}
	}
}

const noDebtCheritable = (poorer, richer) => (gen, {population}) => {
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

const fluxDefault = {
	steps: 2 ** 20,
	generations: 2 ** 5,
	population: 2 ** 6,
	startCapital: 2 ** 9,
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

