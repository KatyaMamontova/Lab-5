class Method {
    constructor() {
        this.matrOperations = new MatrixOperations();
        this.vectOperations = new VectorOperations();
        /*this.round = this.matrOperations.round;*/
    }
    check(A, b, x) {
        let forCheck = this.matrOperations.multiplyMatrixByVector(A, x).map(val => Math.round(val));
        console.log(forCheck)
        console.log(b)
        return (!(b > forCheck || b < forCheck));
    }
}