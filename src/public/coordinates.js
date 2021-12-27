class Coordinates {
    #coordinates;

    constructor(csvString) {
        csvString = csvString.toUpperCase();

        if (csvString[0] != "I") { // if does not have Harvard-style headers
            // then add Parker-style header
            csvString = "X,Y,Z\n" + csvString;
        }

        const json = csvToJson(csvString);

        this.#coordinates = json.map(coord => {
            return {
                x: coord["X"],
                y: coord["Y"],
                z: coord["Z"]
            }
        });
    }

    value() {
        return this.#coordinates;
    }
}