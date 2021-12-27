class LightSequence {
    #sequence;

    constructor(csvString) {
        csvString = csvString.toUpperCase();

        const json = csvToJson(csvString);

        const lightsAmount = (Object.keys(json[0]).length - 1) / 3;

        this.#sequence = json.map(frame => {
            let newFrame = [];

            for (let i = 0; i < lightsAmount; i++) {
                newFrame.push({
                    r: frame[`R_${i}`],
                    g: frame[`G_${i}`],
                    b: frame[`B_${i}`],
                })
            }

            return newFrame;
        });
    }

    value() {
        return this.#sequence;
    }
}
