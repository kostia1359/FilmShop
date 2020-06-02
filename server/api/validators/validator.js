function createValid(validator, objectToValidate) {
    if (Object.keys(objectToValidate).length < Object.keys(validator).length) {
        throw Error('Object do not contain all necessary fields')
    }

    return updateValid(validator, objectToValidate);
}

function updateValid(validator, objectToValidate) {
    for (let key in objectToValidate) {
        if (!validator.hasOwnProperty(key)) {
            throw Error('Object contains extra field')
        }
        objectToValidate[key] = validator[key](objectToValidate[key]);
    }

    return objectToValidate;
}

module.exports = {updateValid, createValid};
