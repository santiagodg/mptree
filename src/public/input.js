class Input {
    #ready;
    #coordinates;
    #sequence;
    #treeScaling;
    #sphereSize;

    constructor() {
        this.#ready = false;

        this.#coordinates = undefined;
        this.#sequence = undefined;
        this.#treeScaling = 100;
        this.#sphereSize = 3;
    }

    setCoordinates(coordinates) {
        this.#coordinates = coordinates;
    }

    setSequence(sequence) {
        this.#sequence = sequence;
    }

    setTreeScaling(treeScaling) {
        this.#treeScaling = treeScaling;
    }

    setSphereSize(sphereSize) {
        this.#sphereSize = sphereSize;
    }

    isReady() {
        if (this.#ready) {
            return true;
        }

        if (
            this.#coordinates == undefined ||
            this.#sequence == undefined ||
            this.#treeScaling == undefined ||
            this.#sphereSize == undefined
        ) {
            return false;
        }

        this.#ready = true;
        return true;
    }

    coordinates() {
        return this.#coordinates;
    }

    sequence() {
        return this.#sequence;
    }

    treeScaling() {
        return this.#treeScaling;
    }

    sphereSize() {
        return this.#sphereSize;
    }
}