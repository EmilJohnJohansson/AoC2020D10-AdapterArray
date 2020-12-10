const fs = require('fs');

function parseInput(fileName) {
    var set = new Set();
    const content = fs.readFileSync(fileName, 'utf8');
    content.split('\n').forEach(c => set.add(parseInt(c)));
    return set;
}

function part1(input) {
    var copy = new Set(input);
    var jolt = 0;
    var ones = 0;
    var threes = 1;

    while (copy.size > 0) {
        for (var i = 1; i <= 3; i++) {
            jolt++;
            if (copy.has(jolt)) {
                switch (i) {
                    case 1:
                        ones++;
                        break;
                    case 3:
                        threes++
                        break;
                    default:
                        break;
                }
                copy.delete(jolt);
                break;
            }
        }
    }

    return ones * threes;
}

function dig(set, start) {
    var copy = new Set(set);

    if (copy.size === 1) {
        return 1
    }

    var total = 0;

    for (var i = 0; i < 3; i++) {
        start++;
        if (copy.has(start)) {
            copy.delete(start);
            total += dig(copy, start);
        }
    }

    return total;
}

function part2(input) {
    var copy = new Set(input);
    copy.add(0);
    copy.add(Math.max(...Array.from(copy.values())) + 3);

    var cache = { };
    var counter = 1;
    var total = 1;
    
    for (var i = 0; i <= Math.max(...Array.from(copy.values())); i++) {
        if (copy.has(i)) {
            if (copy.has(i+1)) {
                counter++;
            } else if (copy.has(i+2)) {
                if (counter !== 0) {
                    if (!cache.hasOwnProperty(counter)) {
                        cache[counter] = dig([...Array(counter).keys()], 0);
                    }
                    total *= cache[counter];
                    counter = 1;
                }
                total *= 2;
            } else if (copy.has(i+3)) {
                if (counter !== 0) {
                    if (!cache.hasOwnProperty(counter)) {
                        cache[counter] = dig([...Array(counter).keys()], 0);
                    }
                    total *= cache[counter];
                    counter = 1;
                }
            } else {
                if (!cache.hasOwnProperty(counter)) {
                    cache[counter] = dig([...Array(counter).keys()], 0);
                }
                return total *= cache[counter]
            }
        }
    }
}

const input = parseInput(process.argv[2]);

// console.log(input);

// console.log(part1(input));
console.log(part2(input));

// console.log(dig([...Array(7).keys()], 0))
