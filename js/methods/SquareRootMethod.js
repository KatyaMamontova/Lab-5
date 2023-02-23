class SquareRootMethod {
    constructor(/* matrix, vector */) {
        // this.A = matrix;
        // this.b = vector;

        this.matrOperations = new CommonMatrixOperations();
        this.round = this.matrOperations.round;

        //this.transposedMatrix = this.matrOperations.transposeMatrix(this.A);

        //this.n = this.A[0].length;
        //console.log(this.solveTheEquation(this.A, this.b))
    }

    /* console.log('___A___\n', A);
    console.log('___b___\n', b); */

    defineMatrixT(givenMatrix) {
        let n = givenMatrix[0].length;
        let T = this.matrOperations.createZeroMatrix(n);
        T[0][0] = this.round(Math.pow(givenMatrix[0][0], 0.5));

        for (let j = 1; j < n; j++) {
            T[0][j] = this.round(givenMatrix[0][j] / T[0][0]);
        }

        for (let i = 1; i < n; i++) {
            let sum = 0;
            for (let k = 0; k < i; k++) {
                sum += Math.pow(T[k][i], 2)
            }
            T[i][i] = this.round(Math.pow(givenMatrix[i][i] - sum, 0.5))
            for (let j = i + 1; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++)
                    sum += T[k][i] * T[k][j];
                T[i][j] = this.round((givenMatrix[i][j] - sum) / T[i][i])
            }
        }

        return T;
        console.log('___T___\n', T)
    }

    defineY(T, b) {
        let n = T[0].length;
        let y = new Array(n).fill(0);

        y[0] = this.round(b[0] / T[0][0]);

        for (let i = 1; i < n; i++) {
            let sum = 0;
            for (let k = 0; k < i; k++) {
                sum += T[k][i] * y[k]
            }
            y[i] = this.round((b[i] - sum) / T[i][i])
        }

        return y;
        console.log('___y___\n', y)
    }

    solveTheEquation(A, b) {
        let transposedMatrix = this.matrOperations.transposeMatrix(A);

        if (A > transposedMatrix || A < transposedMatrix) {
            A = this.matrOperations.multiplyMatrices(transposedMatrix, A);
            b = this.matrOperations.multiplyMatrixByVector(transposedMatrix, b);
        }

        let T = this.defineMatrixT(A);
        let y = this.defineY(T, b);
        let n = A[0].length;
        let x = new Array(n).fill(0);

        x[n - 1] = this.round(y[n - 1] / T[n - 1][n - 1]);

        for (let i = n - 1; i > -1; i--) {
            let sum = 0;
            for (let k = i + 1; k < n; k++) {
                sum += T[i][k] * x[k]
            }
            x[i] = this.round((y[i] - sum) / T[i][i])
        }

        return x;
        console.log('___x___\n', x)
    }

    output(A, b) {
        console.log('___A___\n', A);
        console.log('___b___\n', b);

        console.log('___x___\n', this.solveTheEquation(A, b));
    }
}