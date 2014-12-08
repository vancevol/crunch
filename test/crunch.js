var should = require('chai').should(),
    crunch = require('../crunch');

describe('#transform', function () {

  it('Transform 8 to 28 bit int array', function () {
    var x = [242, 62, 42, 2],
        y = [15, 37628418];

    y.negative = false;

    crunch.transform(x, true).should.eql(y);

    x.should.eql([242, 62, 42, 2]);
  });

  it('Transform 8 to 28 bit int array', function () {
    var x = [255, 255, 255, 255, 255, 255],
        y = [1048575, 268435455];

    y.negative = false;

    crunch.transform(x, true).should.eql(y);

    x.should.eql([255, 255, 255, 255, 255, 255]);
  });

  it('Transform 28 to 8 bit int array', function () {
    var x = [15, 37628418];

    crunch.transform(x).should.eql([242, 62, 42, 2]);

    x.should.eql([15, 37628418]);
  });

  it('Transform 28 to 8 bit int array', function () {
    var x = [1048575, 268435455];

    crunch.transform(x).should.eql([255, 255, 255, 255, 255, 255]);

    x.should.eql([1048575, 268435455]);
  });

});

describe('#misc', function () {

  it('Decrement big number', function () {
    var x = [5, 76];

    crunch.decrement(x).should.eql([5, 75]);

    x.should.eql([5, 76]);
  });

  it('Decrement big number', function () {
    var x = [5, 0];

    crunch.decrement(x).should.eql([4, 255]);

    x.should.eql([5, 0]);
  });

  it('Cut leading zeros', function () {
    var x = [0, 0, 0, 5, 76];

    crunch.cut(x).should.eql([5, 76]);

    x.should.eql([0, 0, 0, 5, 76]);
  });

  it('Cut leading zeros', function () {
    var x = [0, 0];

    crunch.cut(x).should.eql([0]);

    x.should.eql([0, 0]);
  });

  it('Xor two arrays', function () {
    var x = [22, 11],
        y = [255, 189];

    crunch.xor(x, y).should.eql([233, 182]);

    x.should.eql([22, 11]);
    y.should.eql([255, 189]);
  });

  it('Get zero filled array', function () {
    crunch.zero(5).should.eql([0, 0, 0, 0, 0]);
  });

});

describe('#compare', function () {

  it('Compare equal arrays', function () {
    var x = [5, 57, 84, 76],
        y = [5, 57, 84, 76];

    crunch.compare(x, y).should.equal(0);

    x.should.eql([5, 57, 84, 76]);
    y.should.eql([5, 57, 84, 76]);
  });

  it('Compare large to small array', function () {
    var x = [5, 57, 84, 76],
        y = [57, 84, 75];

    crunch.compare(x, y).should.equal(1);

    x.should.eql([5, 57, 84, 76]);
    y.should.eql([57, 84, 75]);
  });

  it('Compare small to large array', function () {
    var x = [5, 76],
        y = [6, 57, 84, 75];

    crunch.compare(x, y).should.equal(-1);

    x.should.eql([5, 76]);
    y.should.eql([6, 57, 84, 75]);
  });

  it('Compare equal negative arrays', function () {
    var x = [-5, 10],
        y = [-5, 10];

    crunch.compare(x, y).should.equal(0);

    x.should.eql([-5, 10]);
    y.should.eql([-5, 10]);
  });

  it('Compare positive to negative array', function () {
    var x = [5, 10],
        y = [-5, 10];

    crunch.compare(x, y).should.equal(1);

    x.should.eql([5, 10]);
    y.should.eql([-5, 10]);
  });

  it('Compare negative to positive array', function () {
    var x = [-5, 10],
        y = [5, 10];

    crunch.compare(x, y).should.equal(-1);

    x.should.eql([-5, 10]);
    y.should.eql([5, 10]);
  });

});

describe('#addition unsigned', function () {

  it('Add big numbers', function () {
    var x = [242, 62],
        y = [42, 2];

    crunch.add(x, y).should.eql([1, 28, 64]);

    x.should.eql([242, 62]);
    y.should.eql([42, 2]);
  });

  it('Add big numbers', function () {
    var x = [6, 17],
        y = [42, 2];

    crunch.add(x, y).should.eql([48, 19]);

    x.should.eql([6, 17]);
    y.should.eql([42, 2]);
  });

  it('Add big numbers', function () {
    var x = [26, 255, 230, 17],
        y = [42, 34];

    crunch.add(x, y).should.eql([27, 0, 16, 51]);

    x.should.eql([26, 255, 230, 17]);
    y.should.eql([42, 34]);
  });

  it('Add big numbers', function () {
    var x = [234, 34],
        y = [255, 255, 230, 17];

    crunch.add(x, y).should.eql([1, 0, 0, 208, 51]);

    x.should.eql([234, 34]);
    y.should.eql([255, 255, 230, 17]);
  });

  it('Add big numbers', function () {
    var x = [255, 255, 255, 255, 255, 255],
        y = [255, 255, 255, 255, 255, 255];

    crunch.add(x, y).should.eql([1, 255, 255, 255, 255, 255, 254]);

    x.should.eql([255, 255, 255, 255, 255, 255]);
    y.should.eql([255, 255, 255, 255, 255, 255]);
  });

});

describe('#addition signed', function () {

  it('Add big numbers', function () {
    var x = [51, 254, 144, 207],
        y = [-20, 89, 145, 32];

    crunch.add(x, y).should.eql([31, 164, 255, 175]);

    x.should.eql([51, 254, 144, 207]);
    y.should.eql([-20, 89, 145, 32]);
  });

  it('Add big numbers', function () {
    var x = [242, 62],
        y = [-242, 64];

    crunch.add(x, y).should.eql([-2]);

    x.should.eql([242, 62]);
    y.should.eql([-242, 64]);
  });

  it('Add big numbers', function () {
    var x = [-42, 2],
        y = [242, 62];

    crunch.add(x, y).should.eql([200, 60]);

    x.should.eql([-42, 2]);
    y.should.eql([242, 62]);
  });

  it('Add big numbers', function () {
    var x = [-42, 2],
        y = [42, 0];

    crunch.add(x, y).should.eql([-2]);

    x.should.eql([-42, 2]);
    y.should.eql([42, 0]);
  });

  it('Add big numbers', function () {
    var x = [-242, 62],
        y = [-42, 2];

    crunch.add(x, y).should.eql([-1, 28, 64]);

    x.should.eql([-242, 62]);
    y.should.eql([-42, 2]);
  });

});

describe('#addition zero', function () {

  it('Add big numbers', function () {
    var x = [26, 255, 230, 17],
        y = [0];

    crunch.add(x, y).should.eql([26, 255, 230, 17]);

    x.should.eql([26, 255, 230, 17]);
    y.should.eql([0]);
  });

  it('Add big numbers', function () {
    var x = [0],
        y = [43, 123, 200, 1];

    crunch.add(x, y).should.eql([43, 123, 200, 1]);

    x.should.eql([0]);
    y.should.eql([43, 123, 200, 1]);
  });

  it('Add big numbers', function () {
    var x = [0],
        y = [0];

    crunch.add(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([0]);
  });

});

describe('#subtraction unsigned', function () {

  it('Subtract big numbers', function () {
    var x = [242, 62],
        y = [42, 2];

    crunch.sub(x, y).should.eql([200, 60]);

    x.should.eql([242, 62]);
    y.should.eql([42, 2]);
  });

  it('Subtract big numbers', function () {
    var x = [170, 1, 79, 119, 242, 62],
        y = [17, 241, 123, 250, 42, 2];

    crunch.sub(x, y).should.eql([152, 15, 211, 125, 200, 60]);

    x.should.eql([170, 1, 79, 119, 242, 62]);
    y.should.eql([17, 241, 123, 250, 42, 2]);
  });

  it('Subtract big numbers', function () {
    var x = [240, 0, 0, 0, 0, 0],
        y = [1];

    crunch.sub(x, y).should.eql([239, 255, 255, 255, 255, 255]);

    x.should.eql([240, 0, 0, 0, 0, 0]);
    y.should.eql([1]);
  });

  it('Subtract big numbers', function () {
    var x = [244, 137, 7, 161],
        y = [2, 59, 86];

    crunch.sub(x, y).should.eql([244, 134, 204, 75]);

    x.should.eql([244, 137, 7, 161]);
    y.should.eql([2, 59, 86]);
  });

  it('Subtract big numbers', function () {
    var x = [20, 0, 0],
        y = [19, 0, 0];

    crunch.sub(x, y).should.eql([1, 0, 0]);

    x.should.eql([20, 0, 0]);
    y.should.eql([19, 0, 0]);
  });
});

describe('#subtraction signed', function () {

  it('Subtract big numbers', function () {
    var x = [26],
        y = [255];

    crunch.sub(x, y).should.eql([-229]);

    x.should.eql([26]);
    y.should.eql([255]);
  });

  it('Subtract big numbers', function () {
    var x = [188, 196],
        y = [188, 197];

    crunch.sub(x, y).should.eql([-1]);

    x.should.eql([188, 196]);
    y.should.eql([188, 197]);
  });

  it('Subtract big numbers', function () {
    var x = [240, 0, 0, 0, 0, 0],
        y = [-1];

    crunch.sub(x, y).should.eql([240, 0, 0, 0, 0, 1]);

    x.should.eql([240, 0, 0, 0, 0, 0]);
    y.should.eql([-1]);
  });

  it('Subtract big numbers', function () {
    var x = [-240, 0, 0, 0, 0, 0],
        y = [1];

    crunch.sub(x, y).should.eql([-240, 0, 0, 0, 0, 1]);

    x.should.eql([-240, 0, 0, 0, 0, 0]);
    y.should.eql([1]);
  });

  it('Subtract big numbers', function () {
    var x = [-240, 0, 0, 0, 0, 0],
        y = [-1];

    crunch.sub(x, y).should.eql([-239, 255, 255, 255, 255, 255]);

    x.should.eql([-240, 0, 0, 0, 0, 0]);
    y.should.eql([-1]);
  });

});

describe('#subtraction zero', function () {

  it('Subtract big numbers', function () {
    var x = [20],
        y = [20];

    crunch.sub(x, y).should.eql([0]);

    x.should.eql([20]);
    y.should.eql([20]);
  });

  it('Subtract big numbers', function () {
    var x = [244, 137, 7, 161],
        y = [0];

    crunch.sub(x, y).should.eql([244, 137, 7, 161]);

    x.should.eql([244, 137, 7, 161]);
    y.should.eql([0]);
  });

  it('Subtract big numbers', function () {
    var x = [0],
        y = [0];

    crunch.sub(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([0]);
  });

});

describe('#multiplication unsigned', function () {

  it('Multiply big numbers', function () {
    var x = [242, 62],
        y = [42, 2];

    crunch.mul(x, y).should.eql([39, 192, 16, 124]);

    x.should.eql([242, 62]);
    y.should.eql([42, 2]);
  });

  it('Multiply big numbers', function () {
    var x = [162, 51, 95],
        y = [42, 18, 204];

    crunch.mul(x, y).should.eql([26, 168, 86, 115, 157, 180]);

    x.should.eql([162, 51, 95]);
    y.should.eql([42, 18, 204]);
  });

  it('Multiply big numbers', function () {
    var x = [255, 65, 34, 51, 95],
        y = [42, 18, 204];

    crunch.mul(x, y).should.eql([41, 243, 109, 152, 188, 115, 157, 180]);

    x.should.eql([255, 65, 34, 51, 95]);
    y.should.eql([42, 18, 204]);
  });

  it('Multiply big numbers', function () {
    var x = [255, 255, 255, 255],
        y = [255, 255, 255, 255];

    crunch.mul(x, y).should.eql([255, 255, 255, 254, 0, 0, 0, 1]);

    x.should.eql([255, 255, 255, 255]);
    y.should.eql([255, 255, 255, 255]);
  });

  it('Multiply big numbers', function () {
    var x = [60, 193, 71, 209],
        y = [93, 8, 143, 237];

    crunch.mul(x, y).should.eql([22, 20, 63, 73, 97, 149, 59, 125]);

    x.should.eql([60, 193, 71, 209]);
    y.should.eql([93, 8, 143, 237]);
  });

});

describe('#multiplication signed', function () {

  it('Multiply big numbers', function () {
    var x = [77, 242, 62],
        y = [-42, 2, 113, 43, 57, 65];

    crunch.mul(x, y).should.eql([-12, 202, 124, 133, 146, 125, 36, 79, 190]);

    x.should.eql([77, 242, 62]);
    y.should.eql([-42, 2, 113, 43, 57, 65]);
  });

  it('Multiply big numbers', function () {
    var x = [-255, 17, 162, 62],
        y = [255, 17, 162, 62];

    crunch.mul(x, y).should.eql([-254, 36, 34, 110, 119, 14, 135, 4]);

    x.should.eql([-255, 17, 162, 62]);
    y.should.eql([255, 17, 162, 62]);
  });

  it('Multiply big numbers', function () {
    var x = [-162, 51, 95],
        y = [-42, 18, 204];

    crunch.mul(x, y).should.eql([26, 168, 86, 115, 157, 180]);

    x.should.eql([-162, 51, 95]);
    y.should.eql([-42, 18, 204]);
  });

});

describe('#multiplication zero', function () {

  it('Multiply big numbers', function () {
    var x = [77, 242, 62],
        y = [0];

    crunch.mul(x, y).should.eql([0]);

    x.should.eql([77, 242, 62]);
    y.should.eql([0]);
  });

  it('Multiply big numbers', function () {
    var x = [0],
        y = [77, 242, 62];

    crunch.mul(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([77, 242, 62]);
  });

  it('Multiply big numbers', function () {
    var x = [0],
        y = [0];

    crunch.mul(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([0]);
  });

});

describe('#squaring', function () {

  it('Squaring a big number', function () {
    var x = [162, 62];

    crunch.sqr(x).should.eql([102, 210, 135, 4]);

    x.should.eql([162, 62]);
  });

  it('Squaring a big number', function () {
    var x = [78, 42, 255, 88, 11];

    crunch.sqr(x).should.eql([23, 222, 58, 210, 110, 72, 32, 49, 144, 121]);

    x.should.eql([78, 42, 255, 88, 11]);
  });

  it('Squaring a big number', function () {
    var x = [255, 17, 162, 62];

    crunch.sqr(x).should.eql([254, 36, 34, 110, 119, 14, 135, 4]);

    x.should.eql([255, 17, 162, 62]);
  });

  it('Squaring a negative number', function () {
    var x = [-162, 62];

    crunch.sqr(x).should.eql([102, 210, 135, 4]);

    x.should.eql([-162, 62]);
  });

  it('Squaring zero', function () {
    var x = [0];

    crunch.sqr(x).should.eql([0]);

    x.should.eql([0]);
  });

});

describe('#division unsigned', function () {

  it('Divide big numbers', function () {
    var x = [170, 153, 136],
        y = [17, 68];

    crunch.div(x, y).should.eql([9, 225]);

    x.should.eql([170, 153, 136]);
    y.should.eql([17, 68]);
  });

  it('Divide big numbers', function () {
    var x = [170, 153, 136, 119, 102, 85],
        y = [17, 68];

    crunch.div(x, y).should.eql([9, 225, 129, 255, 9]);

    x.should.eql([170, 153, 136, 119, 102, 85]);
    y.should.eql([17, 68]);
  });

  it('Divide big numbers', function () {
    var x = [52, 155, 168, 23, 6, 85],
        y = [19, 26, 247];

    crunch.div(x, y).should.eql([2, 192, 234, 136]);

    x.should.eql([52, 155, 168, 23, 6, 85]);
    y.should.eql([19, 26, 247]);
  });

  it('Divide by one', function () {
    var x = [15, 127, 73, 1],
        y = [1];

    crunch.div(x, y).should.eql([15, 127, 73, 1]);

    x.should.eql([15, 127, 73, 1]);
    y.should.eql([1]);
  });

  it('Divide by self', function () {
    var x = [15, 127, 73, 1],
        y = [15, 127, 73, 1];

    crunch.div(x, y).should.eql([1]);

    x.should.eql([15, 127, 73, 1]);
    y.should.eql([15, 127, 73, 1]);
  });

});

describe('#division signed', function () {

  it('Divide big numbers', function () {
    var x = [-170, 153, 136],
        y = [17, 68];

    crunch.div(x, y).should.eql([-9, 225]);

    x.should.eql([-170, 153, 136]);
    y.should.eql([17, 68]);
  });

  it('Divide big numbers', function () {
    var x = [170, 153, 136, 119, 102, 85],
        y = [-17, 68];

    crunch.div(x, y).should.eql([-9, 225, 129, 255, 9]);

    x.should.eql([170, 153, 136, 119, 102, 85]);
    y.should.eql([-17, 68]);
  });

  it('Divide big numbers', function () {
    var x = [-52, 155, 168, 23, 6, 85],
        y = [-19, 26, 247];

    crunch.div(x, y).should.eql([2, 192, 234, 136]);

    x.should.eql([-52, 155, 168, 23, 6, 85]);
    y.should.eql([-19, 26, 247]);
  });

});

describe('#division zero', function () {

  it('Divide zero', function () {
    var x = [0],
        y = [17, 68];

    crunch.div(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([17, 68]);
  });

  it('Divide by zero', function () {
    var x = [170, 153],
        y = [0];

    should.not.exist(crunch.div(x, y));

    x.should.eql([170, 153]);
    y.should.eql([0]);
  });

  it('Divide zero by zero', function () {
    var x = [0],
        y = [0];

    should.not.exist(crunch.div(x, y));

    x.should.eql([0]);
    y.should.eql([0]);
  });

});

describe('#modular reduction', function () {

  it('Big modulo smaller', function () {
    var x = [170, 153, 136, 119, 102, 85],
        y = [17, 68];

    crunch.mod(x, y).should.eql([14, 241]);

    x.should.eql([170, 153, 136, 119, 102, 85]);
    y.should.eql([17, 68]);
  });

  it('Big modulo smaller', function () {
    var x = [52, 155, 168, 23, 6, 85],
        y = [19, 26, 247];

    crunch.mod(x, y).should.eql([10, 237, 29]);

    x.should.eql([52, 155, 168, 23, 6, 85]);
    y.should.eql([19, 26, 247]);
  });

  it('Smaller modulo big', function () {
    var x = [1, 0],
        y = [1, 241];

    crunch.mod(x, y).should.eql([1, 0]);

    x.should.eql([1, 0]);
    y.should.eql([1, 241]);
  });

  it('Modulus modulo', function () {
    var x = [1, 241],
        y = [1, 241];

    crunch.mod(x, y).should.eql([0]);

    x.should.eql([1, 241]);
    y.should.eql([1, 241]);
  });

  it('Zero modulo', function () {
    var x = [0],
        y = [1, 241];

    crunch.mod(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([1, 241]);
  });

});

describe('#barret modular reduction', function () {

  it('Big modulo smaller', function () {
    var x = [170, 153, 136, 119, 102, 85],
        y = [17, 68];

    crunch.bmr(x, y).should.eql([14, 241]);

    x.should.eql([170, 153, 136, 119, 102, 85]);
    y.should.eql([17, 68]);
  });

  it('Big modulo smaller', function () {
    var x = [52, 155, 168, 23, 6, 85],
        y = [19, 26, 247];

    crunch.bmr(x, y).should.eql([10, 237, 29]);

    x.should.eql([52, 155, 168, 23, 6, 85]);
    y.should.eql([19, 26, 247]);
  });

  it('Smaller modulo big', function () {
    var x = [1, 0],
        y = [1, 241];

    crunch.bmr(x, y).should.eql([1, 0]);

    x.should.eql([1, 0]);
    y.should.eql([1, 241]);
  });

  it('Modulus modulo', function () {
    var x = [1, 241],
        y = [1, 241];

    crunch.bmr(x, y).should.eql([0]);

    x.should.eql([1, 241]);
    y.should.eql([1, 241]);
  });

  it('Zero modulo', function () {
    var x = [0],
        y = [1, 241];

    crunch.bmr(x, y).should.eql([0]);

    x.should.eql([0]);
    y.should.eql([1, 241]);
  });

});

describe('#modular exponentiation', function () {

  it('Big number exponentiation', function () {
    var x = [2, 92, 160],
        y = [45],
        z = [188, 14, 2];

    crunch.exp(x, y, z).should.eql([58, 164, 236]);

    x.should.eql([2, 92, 160]);
    y.should.eql([45]);
    z.should.eql([188, 14, 2]);
  });

  it('Big number exponentiation', function () {
    var x = [2, 92, 160],
        y = [17, 190],
        z = [188, 14, 2];

    crunch.exp(x, y, z).should.eql([50, 49, 208]);

    x.should.eql([2, 92, 160]);
    y.should.eql([17, 190]);
    z.should.eql([188, 14, 2]);
  });

  it('Big number exponentiation', function () {
    var x = [6, 252, 83],
        y = [58, 219, 102, 99],
        z = [74, 192, 238, 73];

    crunch.exp(x, y, z).should.eql([52, 174, 18, 245]);

    x.should.eql([6, 252, 83]);
    y.should.eql([58, 219, 102, 99]);
    z.should.eql([74, 192, 238, 73]);
  });

  it('Big number exponentiation', function () {
    var x = [1, 142, 233, 15, 246, 195, 115, 224, 238, 78, 63, 10, 210],
        y = [1, 0, 1],
        z = [10, 188, 222, 250, 188, 222, 250, 190, 250, 188, 222, 253, 174];

    crunch.exp(x, y, z).should.eql([7, 133, 195, 224, 133, 127, 5, 215, 82, 76, 89, 1, 192]);

    x.should.eql([1, 142, 233, 15, 246, 195, 115, 224, 238, 78, 63, 10, 210]);
    y.should.eql([1, 0, 1]);
    z.should.eql([10, 188, 222, 250, 188, 222, 250, 190, 250, 188, 222, 253, 174]);
  });

  it('Big number exponentiation', function () {
    var x = [1, 35, 101, 20, 152, 20, 54, 18, 53, 20, 138, 254, 255, 18, 55, 134, 19, 25, 171, 205, 225, 56, 113, 70, 16, 151, 69, 1, 152, 20, 152, 97, 40, 151, 18, 70, 171, 237, 254, 253, 190, 18, 135, 54, 20, 145, 71, 97, 57, 25, 98, 20, 54, 175, 175, 171, 187, 190, 18, 54, 112],
        y = [1, 1],
        z = [8, 118, 18, 52, 175, 233, 135, 42, 203, 50, 232, 144, 71, 24, 18, 70, 23, 255, 19, 106, 196, 235, 103, 39, 21, 63, 234, 16, 148, 115, 38, 113, 144, 11, 190, 241, 67, 143, 233, 129, 47, 229, 18, 55, 129, 18, 56, 151, 18, 70, 18, 152, 87, 18, 97, 41, 20, 101, 129, 70, 18];

    crunch.exp(x, y, z).should.eql([1, 159, 78, 124, 229, 239, 112, 56, 255, 59, 96, 97, 44, 130, 171, 143, 191, 104, 65, 205, 217, 254, 68, 206, 182, 177, 214, 54, 223, 237, 14, 37, 120, 130, 214, 30, 91, 225, 128, 141, 153, 17, 15, 231, 171, 74, 34, 208, 10, 42, 178, 194, 68, 76, 124, 129, 74, 203, 8, 100, 40]);

    x.should.eql([1, 35, 101, 20, 152, 20, 54, 18, 53, 20, 138, 254, 255, 18, 55, 134, 19, 25, 171, 205, 225, 56, 113, 70, 16, 151, 69, 1, 152, 20, 152, 97, 40, 151, 18, 70, 171, 237, 254, 253, 190, 18, 135, 54, 20, 145, 71, 97, 57, 25, 98, 20, 54, 175, 175, 171, 187, 190, 18, 54, 112]);
    y.should.eql([1, 1]);
    z.should.eql([8, 118, 18, 52, 175, 233, 135, 42, 203, 50, 232, 144, 71, 24, 18, 70, 23, 255, 19, 106, 196, 235, 103, 39, 21, 63, 234, 16, 148, 115, 38, 113, 144, 11, 190, 241, 67, 143, 233, 129, 47, 229, 18, 55, 129, 18, 56, 151, 18, 70, 18, 152, 87, 18, 97, 41, 20, 101, 129, 70, 18]);
  });

});

describe('#garner`s algo', function () {

  it('Big number exponentiation', function () {
    var v = [54, 11, 203],
        w = [147, 221, 12, 0, 9],
        x = [11, 58, 199, 45],
        y = [6, 40, 116, 206, 132, 151, 64, 46, 129],
        z = [1, 90, 87, 231];

    crunch.gar(v, w, x, y, z).should.eql([79, 149, 175, 182, 42, 220, 11, 5]);

    v.should.eql([54, 11, 203]);
    w.should.eql([147, 221, 12, 0, 9]);
    x.should.eql([11, 58, 199, 45]);
    y.should.eql([6, 40, 116, 206, 132, 151, 64, 46, 129]);
    z.should.eql([1, 90, 87, 231]);
  });

  it('Big number exponentiation', function () {
    var v = [37,72,61,128,78,4,188,90,40,148,179,25,237,153,121,180],
        w = [83,109,25,53,121,92,247,51],
        x = [149,43,167,106,70,148,98,21],
        y = [48,149,33,24,195,123,244,243,237,251,39,62,179,25,87,169],
        z = [103,210,31,75,139,194,84,88];

    crunch.gar(v, w, x, y, z).should.eql([1,2,3,4,5,6,7,8]);

    v.should.eql([37,72,61,128,78,4,188,90,40,148,179,25,237,153,121,180]);
    w.should.eql([83,109,25,53,121,92,247,51]);
    x.should.eql([149,43,167,106,70,148,98,21]);
    y.should.eql([48,149,33,24,195,123,244,243,237,251,39,62,179,25,87,169]);
    z.should.eql([103,210,31,75,139,194,84,88]);
  });

  it('Big number exponentiation', function () {
    var v = [104,46,8,117,98,161,111,189,113,175,163,83,217,166,91,28],
        w = [158,239,229,2,116,132,105,151],
        x = [178,27,170,77,131,87,103,33],
        y = [26,39,124,1,92,246,113,161,76,42,194,69,211,163,133,193],
        z = [39,51,110,215,203,200,103,61];

    crunch.gar(v, w, x, y, z).should.eql([1,2,3,4,5,6,7,8]);

    v.should.eql([104,46,8,117,98,161,111,189,113,175,163,83,217,166,91,28]);
    w.should.eql([158,239,229,2,116,132,105,151]);
    x.should.eql([178,27,170,77,131,87,103,33]);
    y.should.eql([26,39,124,1,92,246,113,161,76,42,194,69,211,163,133,193]);
    z.should.eql([39,51,110,215,203,200,103,61]);
  });

});

describe('#modular inverse', function () {

  it('Modular inverse', function () {
    var x = [170, 153, 149],
        y = [63, 253];

    crunch.inv(x, y).should.eql([38, 133]);

    x.should.eql([170, 153, 149]);
    y.should.eql([63, 253]);
  });

  it('Modular inverse', function () {
    var x = [147, 221, 12, 0, 9],
        y = [11, 58, 199, 45];

    crunch.inv(x, y).should.eql([1, 90, 87, 231]);

    x.should.eql([147, 221, 12, 0, 9]);
    y.should.eql([11, 58, 199, 45]);
  });

  it('Modular inverse', function () {
    var x = [54, 100, 205],
        y = [78, 79];

    crunch.inv(x, y).should.eql([28, 15]);

    x.should.eql([54, 100, 205]);
    y.should.eql([78, 79]);
  });

  it('No inverse', function () {
    var x = [123],
        y = [24];

    should.not.exist(crunch.inv(x, y));

    x.should.eql([123]);
    y.should.eql([24]);
  });

});

describe('#test prime', function () {

  it('Number is prime', function () {
    var x = [254, 87, 121, 7, 0, 217];

    crunch.testPrime(x).should.be.ok;

    x.should.eql([254, 87, 121, 7, 0, 217]);
  });

  it('Number is prime', function () {
    var x = [7, 201];

    crunch.testPrime(x).should.be.ok;

    x.should.eql([7, 201]);
  });

  it('Number is not prime', function () {
    var x = [58, 222, 67];

    crunch.testPrime(x).should.not.be.ok;

    x.should.eql([58, 222, 67]);
  });

  it('Number is not prime', function () {
    var x = [9];

    crunch.testPrime(x).should.not.be.ok;

    x.should.eql([9]);
  });

  it('Number is not prime', function () {
    var x = [44, 78, 64, 128];

    crunch.testPrime(x).should.not.be.ok;

    x.should.eql([44, 78, 64, 128]);
  });

});

describe('#next prime', function () {

  it('Find next prime', function () {
    var x = [5, 57, 84, 76];

    crunch.nextPrime(x).should.eql([5, 57, 84, 81]);

    x.should.eql([5, 57, 84, 76]);
  });

  it('Find next prime', function () {
    var x = [18, 214, 136];

    crunch.nextPrime(x).should.eql([18, 214, 145]);

    x.should.eql([18, 214, 136]);
  });

  it('Find next prime', function () {
    var x = [5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 8];

    crunch.nextPrime(x).should.eql([5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 107]);

    x.should.eql([5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 8]);
  });

  it('Find next prime', function () {
    var x = [17];

    crunch.nextPrime(x).should.eql([19]);

    x.should.eql([17]);
  });

  it('Find next prime', function () {
    var x = [7, 200];

    crunch.nextPrime(x).should.eql([7, 201]);

    x.should.eql([7, 200]);
  });

  it('Find next prime', function () {
    var x = [3];

    crunch.nextPrime(x).should.eql([5]);

    x.should.eql([3]);
  });

});

describe('#factorial', function () {

  it('Find 10 factorial', function () {
    crunch.factorial(10).should.eql([55, 95, 0]);
  });

  it('Find 50 factorial', function () {
    crunch.factorial(50).should.eql([73, 238, 188, 150, 30, 210, 121, 176, 43, 30, 244, 242, 141, 25, 168, 79, 89, 115, 161, 210, 199, 128, 0, 0, 0, 0, 0]);
  });

  it('Find 100 factorial', function () {
    crunch.factorial(100).should.eql([27, 48, 150, 78, 195, 149, 220, 36, 6, 149, 40, 213, 75, 189, 164, 13, 22, 233, 102, 239, 154, 112, 235, 33, 181, 178, 148, 58, 50, 28, 223, 16, 57, 23, 69, 87, 12, 202, 148, 32, 198, 236, 179, 183, 46, 210, 238, 139, 2, 234, 39, 53, 198, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

});

describe('#stringify', function () {

  it('Convert Integer to String', function () {
    var x = [1, 2, 3, 4];

    crunch.stringify(x).should.equal("16909060");

    x.should.eql([1, 2, 3, 4]);
  });

  it('Convert Integer to String', function () {
    var x = [5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 8];

    crunch.stringify(x).should.equal("6315359056060240643798024");

    x.should.eql([5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 8]);
  });

});

describe('#parse', function () {

  it('Convert String to Integer', function () {
    var s = "16909060";

    crunch.parse(s).should.eql([1, 2, 3, 4]);

    s.should.equal("16909060");
  });

  it('Convert String to Integer', function () {
    var s = "6315359056060240643798024";

    crunch.parse(s).should.eql([5, 57, 84, 76, 233, 0, 120, 91, 180, 180, 8]);

    s.should.equal("6315359056060240643798024");
  });

});