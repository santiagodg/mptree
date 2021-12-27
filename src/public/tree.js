class Tree {
    #lights;
    #sequence;
    #frameIndex;

    // coords: Coordinates.value [
    //     {
    //         x: 0,
    //         y: 0,
    //         z: 0
    //     },
    // ]
    // config: {
    //     treeScaling: 0,
    //     sphereSize: 0,
    // }
    constructor(coords, config) {
        this.#lights = [];
        this.#sequence = [];
        this.#frameIndex = 0;

        this.#lights = coords.value().map(c => {
            return new Light({
                x: c.x,
                y: c.y,
                z: c.z,
            }, config);
        });
    }

    // sequence: Sequence.value [
    //     [
    //         {
    //             r: 0,
    //             g: 0,
    //             b: 0,
    //         },
    //     ],
    // ]
    setSequence = (sequence) => {
        this.#sequence = sequence.value();
        this.#frameIndex = 0;
    }

    draw = () => {
        const frame = this.#sequence[this.#frameIndex];

        for (const [index, color] of frame.entries()) {
            const light = this.#lights[index];

            light.setRGB({
                r: color.r,
                g: color.g,
                b: color.b,
            });

            push();
            light.draw();
            pop();
        }

        this.#frameIndex++;
        if (this.#frameIndex >= this.#sequence.length) {
            this.#frameIndex = 0;
        }
    }
}

class Light {
    // position: {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    // }
    // config: {
    //     treeScaling: 0,
    //     sphereSize: 0,
    // }
    constructor(position, config) {
        this.position = {
            x: position.x,
            y: position.y,
            z: position.z,
        };

        this.config = config;

        this.color = {
            r: 0,
            g: 0,
            b: 0,
        };
    }

    setRGB = ({ r, g, b }) => {
        this.color = {
            r,
            g,
            b
        }
    }

    draw = () => {
        translate(this.position.y * this.config.treeScaling, -this.position.z * this.config.treeScaling, this.position.x * this.config.treeScaling);
        stroke(this.color.r, this.color.g, this.color.b);
        fill(this.color.r, this.color.g, this.color.b)
        sphere(this.config.sphereSize);
    }
}