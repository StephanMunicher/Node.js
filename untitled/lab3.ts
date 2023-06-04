///Task1

const add = (num: number) => {
    let sum = num;

    const innerAdd = (nextNum: number) => {
        sum += nextNum;
        return innerAdd;
    };

    innerAdd.valueOf = () => sum;
    return innerAdd;
};

console.log(add(2)(5)(7)(1)(6)(5)(11)); // 37



///Task2

const isAnagram = (a: string, b: string) => {
    if (a.length !== b.length) {
        return false;
    }

    const sortedA = a.toLowerCase().split("").sort().join("");
    const sortedB = b.toLowerCase().split("").sort().join("");

    return sortedA === sortedB;
};

console.log(isAnagram("study", "dusty"));
console.log(isAnagram("bus", "sun"));


///Task3

const deepClone = <T>(obj: T): T => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    const clone: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
};

const obj = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4],
    },
};

const clonedObj = deepClone(obj);
console.log(clonedObj);
console.log(obj === clonedObj);

///Task4

const wrap = (func: Function) => {
    const cache: { [key: string]: any } = {};

    return (...args: any[]) => {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("From cache");
            return cache[key];
        }

        const result = func(...args);
        cache[key] = result;
        console.log("Calculated");
        return result;
    };
};

const add = (a: number, b: number, c: number) => a + b + c;
const cachedAdd = wrap(add);

console.log(cachedAdd(2, 2, 3)); // calculated
console.log(cachedAdd(5, 8, 1)); // calculated
console.log(cachedAdd(2, 2, 3)); // from cache

