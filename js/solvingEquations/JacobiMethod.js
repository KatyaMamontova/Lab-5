class JacobiMethod {
    constructor() {
        this.matrOperations = new MatrixOperations();
        this.vectOperations = new VectorOperations();
        /*this.round = this.matrOperations.round;*/
    }

    /* setEps(eps) {
        this.eps = eps;
    } */

    defineMatrixB(A) {
        let n = A[0].length;
        let B = this.matrOperations.createZeroMatrix(n);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                B[i][j] = - /*this.round*/(A[i][j] / A[i][i]);
                B[j][i] = - /*this.round*/(A[j][i] / A[j][j]);
            }
        }
        return B;
    }

    defineVectorD(A, b) {
        let n = A[0].length;
        let d = this.vectOperations.createZeroVector(n);

        for (let i = 0; i < n; i++)
            d[i] = /*this.round*/(b[i] / A[i][i])

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

    defineNorm(a, b) {
        let c = this.vectOperations.subVectors(a, b);
        return Math.max.apply(null, c.map(val => Math.abs(val)));
    }

    solveTheEquation(A, b, eps) {
        let B = this.defineMatrixB(A);
        let d = this.defineVectorD(A, b);
        let q = this.defineQ(B);
        let x0 = this.vectOperations.createZeroVector(d.length);
        let x1 = this.vectOperations.addVectors(
            this.matrOperations.multiplyMatrixByVector(B, x0), d
        );
        let norm = this.defineNorm(x1, x0);
        let ifEnd = ((1 - q) / q) * eps; //название стремное

        while (norm > ifEnd) {
            let x2 = this.vectOperations.addVectors(
                this.matrOperations.multiplyMatrixByVector(B, x1), d
            );
            x0 = x1;
            x1 = x2;
            norm = this.defineNorm(x1, x0);
        }

        return x1.map(val => /*this.round*/(val))
    }

    output(A, b, eps) {
        console.log('Метод Якоби');
        console.log('___A___\n', A);
        console.log('___b___\n', b);
        console.log(`eps = ${eps}`);

        console.log('___x___\n', this.solveTheEquation(A, b, eps));
    }

    //TODO сделать общим для обоих методов решения
    check(A, b, x) {
        let forCheck = this.matrOperations.multiplyMatrixByVector(A, x).map(val => Math.round(val));
        console.log(forCheck)
        console.log(b)
        return (!(b > forCheck || b < forCheck));
    }

    // "Для сходимости итерационного метода Якоби необходимо и достаточно, чтобы все корни уравнения по модулю не превосходили единицы"
    // https://intuit.ru/studies/courses/1012/168/lecture/4592?page=7&ysclid=leoc707cog495599831

    checkConvergenceConditions(x) {
        x.map(val => {
            if (Math.abs(val) > 1) return false;
        })
        return true;
    }
}