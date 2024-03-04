const isPrimeNumber = (number) => {
    for (var i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number !== 1;
}

const splitName = (name) => {
    return name.split(" ", 2);
}

const splitUrlLocation = (urlLocation) => {
    const urlSplit = urlLocation.split("/");
    return urlSplit.at(urlSplit.length - 1);
}

const formatDate = (date) => {
    return date.split("T", 1).at(0);
}

module.exports = {
	isPrimeNumber,
    splitName,
    splitUrlLocation,
    formatDate
};