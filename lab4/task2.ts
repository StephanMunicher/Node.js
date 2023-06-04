function arrayChangeDelete<T>(
    array: T[],
    rule: (item: T) => boolean
): T[] {
    const deletedElements: T[] = [];
    let i = 0;
    while (i < array.length) {
        const item = array[i];
        if (rule(item)) {
            deletedElements.push(...array.splice(i, 1));
        } else {
            i++;
        }
    }
    return deletedElements;
}

// Приклад виклику
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

// Перевірка типів
// item: number
// deletedElements: Array<number>
// результат виклику:
// array = [1, 3, 7, 9]
// deletedElements = [2, 6]
console.log(array);
console.log(deletedElements);