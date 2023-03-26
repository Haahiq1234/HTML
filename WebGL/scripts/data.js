var indices = [];
let size = 1;
const verts = [
    -size, size, -size,
     size, size, -size,
    size, -size, -size,
    -size, -size, -size,

     size, size, size,
    -size, size, size,
    -size, -size, size,
    size, -size, size,

    size, size, -size,
    size, size, size,
    size, -size, size,
    size, -size, -size,

    -size, size, size,
    -size, size, -size,
    -size, -size, -size,
    -size, -size, size,
    
    size, size, -size,
    -size, size, -size,
    -size, size, size,
    size, size, size,

    -size, -size, -size,                
    size, -size, -size,
    size, -size, size,
    -size, -size, size,
];
const colors = [
    1.0, .0, .0,
    1.0, .0, .0,
    1.0, .0, .0,
    1.0, .0, .0,
    
    .0, 1.0, 1.0,
    .0, 1.0, 1.0,
    .0, 1.0, 1.0,
    .0, 1.0, 1.0,

    .0, .0, 1.0,
    .0, .0, 1.0,
    .0, .0, 1.0,
    .0, .0, 1.0,
    
    1.0, 1.0, .0,
    1.0, 1.0, .0,
    1.0, 1.0, .0,
    1.0, 1.0, .0,
    
    .0, 1.0, .0,
    .0, 1.0, .0,
    .0, 1.0, .0,
    .0, 1.0, .0,

    1.0, .0, 1.0,
    1.0, .0, 1.0,
    1.0, .0, 1.0,
    1.0, .0, 1.0,
];

let length = colors.length / 12;
for (var i = 0; i < length; i++) {
    indices.push(
        i * 4, i * 4 + 1, i * 4 + 2,
        i * 4, i * 4 + 2, i * 4 + 3
    );
}