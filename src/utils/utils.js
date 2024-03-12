const isPrimeNumber = (number) => {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number !== 1;
}

const splitName = (name) => {
    return name.split(" ", 2);
}

const getLastNumberUrl = (urlLocation, parameterSplit) => {
    const urlSplit = urlLocation.split(parameterSplit);
    return urlSplit.at(urlSplit.length - 1);
}

const formatDate = (date) => {
    return date.split("T", 1).at(0);
}

const splitArrayByBatch = (arrayToSplit, lengthBatch) => {
    const arraySplitted = new Array();

    for (let i = 0; i < arrayToSplit.length; i += lengthBatch) {
        arraySplitted.push(arrayToSplit.slice(i, i + lengthBatch));
    }

    return arraySplitted;
}



module.exports = {
    isPrimeNumber,
    splitName,
    getLastNumberUrl,
    formatDate,
    splitArrayByBatch
};