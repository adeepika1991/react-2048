

const flipMatrix = matrix => (
    matrix[0].map((column, index) => (
        matrix.map(row => row[index])
    ))
);

const rotateRight = matrix => {
    return flipMatrix(matrix.reverse())
};

const rotateLeft = matrix => {
    return flipMatrix(matrix).reverse()
};

export { rotateRight, rotateLeft };




