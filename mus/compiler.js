var compileT = function (time, expr) {
    if (expr.tag === 'note') return [
        {tag: 'note', pitch: expr.pitch, start: time, dur: expr.dur}
    ];
    var endt = endTime(0, expr.left);
    if (expr.tag === 'seq') return compileT(time, expr.left).concat(compileT(time, expr.right));

    if (expr.tag == 'par')return compileT(time, expr.left).concat(compileT(time, expr.right));
};

var endTime = function (time, expr) {
    //if(expr===null) return 0;
    if (expr.tag === 'note') return expr.dur + time;
    var endt = endTime(0, expr.left);
    if (expr.tag === 'seq') return compileT(time, expr.left).concat(compileT(time + endt, expr.right));

    if (expr.tag === 'par')if (endTime(time, expr.left) > endTime(time, expr.right)) return endTime(time, expr.left);
    else return endTime(time, expr.right);
};


var compile = function (musexpr) {
    return compileT(0, musexpr);
};
var melody_mus =
{ tag: 'seq',
    left: { tag: 'seq',
        left: { tag: 'note', pitch: 'a4', dur: 250 },
        right: { tag: 'note', pitch: 'b4', dur: 250 } },
    right: { tag: 'seq',
        left: { tag: 'note', pitch: 'c4', dur: 500 },
        right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));