let tree;
const input = new Input();

function setup() {
    const container = document.getElementById("myContainer");

    const canvas = createCanvas(container.offsetWidth, max(container.offsetHeight, 3 * windowHeight / 4), WEBGL);
    canvas.parent("myContainer");

    setupTree();
}

function windowResized() {
    const container = document.getElementById("myContainer");
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function setupTree() {
    if (!input.isReady()) {
        return;
    }

    tree = new Tree(input.coordinates(), {
        treeScaling: input.treeScaling(),
        sphereSize: input.sphereSize(),
    });

    tree.setSequence(input.sequence());
}

function draw() {
    background(200);
    orbitControl();

    if (!input.isReady()) {
        return;
    }

    translate(0, input.treeScaling(), 0);

    push();
    tree.draw();
    pop();
}

function loadTreeCoordinates() {
    document.getElementById("matts-coordinates").style.backgroundColor = "unset"
    const [file] = document.getElementById('coordinates-file').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file
        const coords = new Coordinates(reader.result);
        input.setCoordinates(coords);

        setupTree();
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

function loadMattsTreeCoordinates() {
    fetch("https://raw.githubusercontent.com/standupmaths/xmastree2021/main/coords_2021.csv")
        .then(response => response.text())
        .then(text => {
            const coords = new Coordinates(text);
            input.setCoordinates(coords);

            setupTree();
        });

    document.getElementById('coordinates-file').value = "";
    document.getElementById("matts-coordinates").style.backgroundColor = "chartreuse";
}

function loadLightSequence() {
    document.getElementById("random-sequence").style.backgroundColor = "unset"
    const [file] = document.getElementById('sequence-file').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file
        const sequence = new LightSequence(reader.result);
        input.setSequence(sequence);

        setupTree();
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

function loadRandomSequence() {
    const availableSequences = [
        "https://raw.githubusercontent.com/BoostCookie/xmastree2021/main/examples/bouncy-ball.csv",
        "https://raw.githubusercontent.com/d-albrecht/XMas-Tree-Explosions/main/v1/explosions6flicker.csv",
    ];

    const random = Math.floor(Math.random() * availableSequences.length);

    fetch(availableSequences[random])
        .then(response => response.text())
        .then(text => {
            const sequence = new LightSequence(text);
            input.setSequence(sequence);

            setupTree();
        });

    document.getElementById('sequence-file').value = "";
    document.getElementById("random-sequence").style.backgroundColor = "chartreuse";
}

function loadTreeScalingOption() {
    const treeScaling = document.getElementById('tree-scaling').value;
    input.setTreeScaling(treeScaling);

    setupTree();
}

function loadSphereSizeOption() {
    const sphereSize = document.getElementById('sphere-size').value;
    input.setSphereSize(sphereSize);

    setupTree();
}
