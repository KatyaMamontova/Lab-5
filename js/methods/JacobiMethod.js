class JacobiMethod {
    constructor() {
        this.matrOperations = new CommonMatrixOperations();
        this.round = this.matrOperations.round;
    }

    /* setEps(eps) {
        this.eps = eps;
    } */

    defineMatrixB(A) {
        let n = A[0].length;
        let B = this.matrOperations.createZeroMatrix(n);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                B[i][j] = this.round(A[i][j] / A[i][i]);
                B[j][i] = this.round(A[j][i] / A[j][j]);
            }
        }
        return B;
    }

    defineVectorD(A, b) {
        let n = A[0].length;
        let d = new Array(n).fill(0);

        for (let i = 0; i < n; i++)
            d[i] = this.round(b[i] / A[i][i])

        return d;
    }

    defineQ(B) {
        let n = B[0].length;
        let sum = 0;
        let q = B[0][0];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i != j) sum += Math.abs(B[i][j]);
                //currentElem = sum / Math.abs(B[i][i]);
            }
            if (sum > q) q = sum;
            sum = 0;
        }
        return q;
    }

    solveTheEquation(A, b, eps) {
        let B = this.defineMatrixB(A);
        let d = this.defineVectorD(A, b);
        let q = this.defineQ(B);
        let x0 = b;
        let x1 = this.matrOperations.multiplyMatrixByVector(B, x0);

        let ifEnd = ((1 - q) / q) * eps; //название стремное
        let i = 0;

        while ((x[i + 1] - x[i]) > ifEnd) {
            x[i]
            i++;
        }
    }
}