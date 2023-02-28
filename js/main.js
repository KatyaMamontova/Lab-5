//node lab#5
this.window.onload = () => {

  let k = 28; m = 9;

  let A = [
    /* [-4, 1, 1],
    [1, -9, 3],
    [1, 2, -16] */
    [12 + k, 2, m / 4, 1, 2],
    [4, 113 + k, 1, m / 10, m - 4],
    [1, 2, -24 - k, 3, 4],
    [1, 2 / m, 4, 33 + k, 4],
    [-1, 2, -3, 3 + m, -44 - k]
  ];

  //let b = [2, 5, 13];
  let b = [1, 2, 3, 4, 5];

  let eps = 1e-4;

  const squareRootMethod = new SquareRootMethod();
  const jacobiMethod = new JacobiMethod();
  squareRootMethod.output(A, b)
  console.log(jacobiMethod.check(A, b, squareRootMethod.solveTheEquation(A, b)));
  jacobiMethod.output(A, b, eps)
  console.log(jacobiMethod.check(A, b, jacobiMethod.solveTheEquation(A, b, eps)));
  console.log(jacobiMethod.checkConvergenceConditions(jacobiMethod.solveTheEquation(A, b, eps)));
}