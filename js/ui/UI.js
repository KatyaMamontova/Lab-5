class UI {
    constructor(/* A = null, b = null, eps = null */) {
        this.matrCalc = new MatrixOperations()
        this.vectCalc = new VectorOperations()
        this.jacobiMethod = new JacobiMethod()
        this.squareRootMethod = new SquareRootMethod()
        this.A = null;
        this.b = [1, 2, 3, 4, 5];
        //this.b = [2, 5, 13];
        this.eps = 0.0001;
        this.answer = 0;
        this.size = 2;
        this.fillInfo()
        this.addEventListeners()
    }

    round = num => Math.round(num * 100) / 100;

    fillInfo() {
        if (this.A)
            document.getElementById('matrixA').innerHTML = this.display(this.A)
        document.getElementById('vectorB').innerHTML = this.display(this.b)
    }

    addEventListeners() {
        document.getElementById('defineMatrixA').addEventListener('click', event => {
            event.target.style.color = 'black';
            const k = document.getElementById('kInput').value - 0
            const m = document.getElementById('mInput').value - 0
            this.A = [
                /* [-4, 1, 1],
                [1, -9, 3],
                [1, 2, -16] */
                [12 + k, 2, m / 4, 1, 2],
                [4, 113 + k, 1, m / 10, m - 4],
                [1, 2, -24 - k, 3, 4],
                [1, 2 / m, 4, 33 + k, 4],
                [-1, 2, -3, 3 + m, -44 - k]
            ]
            this.fillInfo()
        })
        document.getElementById('squareMethodBtn').addEventListener('click', () => { this.showAnswer('squareMethod') })
        document.getElementById('jacobiBtn').addEventListener('click', () => { this.showAnswer('Jacobi') })
        document.getElementById('checkBtn').addEventListener('click', () => {
            let checking = this.jacobiMethod.check(this.A, this.b, this.answer)
            document.getElementById('outputForCheck').innerHTML = `
            <p>Результат умножения матрицы А на вектор х: </p>
            <p>${this.display(checking.result)} </p>
            <p>Уравнение решено ${checking.isCorrect ? 'верно' : 'неверно'} </p>
            `
        })
        document.getElementById('checkConvergenceBtn').addEventListener('click', () => {
            document.getElementById('outputForCheck').innerHTML = `
                <p>А - ${(this.jacobiMethod.checkConvergenceCondition(this.A)) ? '' : 'не '}матрица с диагональным преобладанием </p>
            `
        })

    }

    showAnswer(method) {
        if (this.A) {
            this.answer = this.getResult(method);
            document.getElementById('outputForAnswer').innerHTML = `Ответ: ${this.display(this.answer)}`
        } else {
            document.getElementById('defineMatrixA').style.color = 'red';
        }
    }

    getResult(method) {
        if (method === 'squareMethod') {
            return this.squareRootMethod.solveTheEquation(this.A, this.b)
        } else if (method === 'Jacobi') {
            const eps = document.getElementById('epsInput').value - 0
            if (eps) this.eps = eps
            return this.jacobiMethod.solveTheEquation(this.A, this.b, this.eps)
        }
    }

    display(answer) {
        if (typeof answer[0] === 'number') {
            let str = '';
            let size = answer.length;
            for (let i = 0; i < size - 1; i++) {
                str += `${this.round(answer[i])}, `;
            }
            str += `${this.round(answer[size - 1])}`;
            return str;
        } else {
            let str = '';
            let size = answer.length;
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size - 1; j++) {
                    str += ` ${this.round(answer[i][j])}, `;
                }
                str += ` ${this.round(answer[i][size - 1])}`;
                str += '<br>';
            }
            return str;
        }
    }
}