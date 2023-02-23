//node lab#5
this.window.onload = () => {

  let k = 28; m = 9;

  let A = [
    /* [18, -11, -17],
    [-11, 86, -58],
    [-17, -58, 266] */
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
  //[10, -17, -191]

  const squareRootMethod = new SquareRootMethod();
  squareRootMethod.output(A, b)
}