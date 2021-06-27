function computeMostFrequent(numbers) {
    let mapa = new Map()

    for(let i = 0; i < numbers.length; i++) {
        if(!mapa.has(numbers[i])) {
            mapa.set(numbers[i], 1)
        } else if (mapa.has(numbers[i]) {
            mapa.set(numbers[i], mapa.get(numbers[i]) + 1)
        }
    }
}