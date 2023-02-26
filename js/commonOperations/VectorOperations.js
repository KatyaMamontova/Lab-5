class VectorOperations {
    constructor() { }

    round = num => Math.round(num * 100) / 100;

    createZeroVector(size) {
        return new Array(size).fill(0);
    }

    negateVector(a) {
        return a.map(val => - val);
    }

    addVectors(a, b) {
        return a.map((val, i) => a[i] + b[i]);
    }

    subVectors(a, b) {
        b = this.negateVector(b);
        return this.addVectors(a, b);
    }
}