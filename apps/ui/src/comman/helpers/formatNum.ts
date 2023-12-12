export const formatNum = (
    num: number | string,
    fixed?: number,
    fixedLessOne?: boolean,
    isNotFixed?: boolean
): string => {
    if (num === null || num === undefined || (!Number(num) && Number(num) !== 0)) return '-';
    const newNumber: number = Number(num);
    if (newNumber === 0) return '0';
    if (newNumber < 1 && newNumber > -1 && fixedLessOne) {
        const arrPrecisionNumber: string[] = newNumber.toString().split('e');
        if (arrPrecisionNumber.length > 1) {
            const numberOfZero = arrPrecisionNumber[1];
            const integerNumber = Number(Math.abs(Number(arrPrecisionNumber[0])));
            const arrOfZero = new Array(Math.abs(Number(numberOfZero) || 0))?.fill(0);
            arrOfZero[arrOfZero?.length - 1] = integerNumber.toFixed();
            const firstNum = newNumber > 0 ? '0.' : '-0.';
            arrOfZero.unshift(firstNum);
            return arrOfZero.join('');
        }
        const arrNumbers = num.toString().split('.')?.[1]?.split('') || [];
        const indexNumber = arrNumbers.findIndex((item) => Number(item) > 0);

        const result = newNumber.toFixed(indexNumber + (fixed || 0));
        if (result[result.length - 1] === '0') {
            return result.slice(0, -1);
        }

        return result;
    }

    const number = isNotFixed ? newNumber.toString() : newNumber.toFixed(fixed);
    const arr = number.split('.');
    const int = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (arr[1] !== undefined) {
        arr[1] = arr[1].replace(/0*$/, '');
    }
    if (arr[1] !== undefined && arr[1].trim() !== '') {
        return int + '.' + arr[1];
    }
    return int;
};
