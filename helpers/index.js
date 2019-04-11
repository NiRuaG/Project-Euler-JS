
//% 1+2+3+...+k = k*(k+1)/2 <- closed-form expression, aka triangle numbers
exports.triangleNum = k => k*k+k >> 1;

exports.triangleNum_n = k => k*k+k >> 1n;
