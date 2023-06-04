///Task1
function add(a) {
    let sum = a;

    function params(nextA) {
        if (nextA === undefined) {
            return sum;
        }
        sum += nextA;
        return params;
    }

    return params;
}

console.log(add(2)(5)(7)(1)(6)(5)(11)());




///Task2
function checkAnagram(a, b) {
    const normalA = a.replace(/\s/g, "").toLowerCase();
    const normalB = b.replace(/\s/g, "").toLowerCase();

    if (normalA.length !== normalB.length) {
        return false;
    }

    const sortedA = normalA.split("").sort().join("");
    const sortedB = normalB.split("").sort().join("");

    return sortedA === sortedB;
}

console.log(checkAnagram("dusty", "study"));
console.log(checkAnagram("bus", "sun"));


///Task3
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let clone;

    if (Array.isArray(obj)) {
        clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i]);
        }
    } else {
        clone = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
    }

    return clone;
}

const obj = {
    name: "Ford",
    params: {
        speed: "123 Main St",
        model: "Mustang",
    },
};

const clonedObj = deepClone(obj);
clonedObj.params.model = "Focus";

console.log(obj.params.model);
console.log(clonedObj.params.model);


///Task4
function wrapper(func) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.hasOwnProperty(key)) {
            console.log("cache");
            return cache[key];
        }

        const result = func(...args);
        cache[key] = result;
        console.log("Calc");
        return result;
    };
}

const calc = (a, b, c) => a + b * c;
const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 2, 3)); // calculated
console.log(cachedCalc(5, 8, 1)); // calculated
console.log(cachedCalc(2, 2, 3)); // from cache

