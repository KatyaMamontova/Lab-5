class Method {
    constructor() {
        this.matrOperations = new MatrixOperations();
        this.vectOperations = new VectorOperations();
    }
    check(A, b, x) {
        let result = this.matrOperations.multiplyMatrixByVector(A, x).map(val => Math.round(val));
        return {
            isCorrect: (!(b > result || b < result)),
            result
        };
    }
}