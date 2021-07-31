const map = new Map();


export function registElement(classes = {}) {

    Object.keys(classes).forEach(key => {
        if (map.has(key)) {
            // console.warn(`${key} element is duplicated.`)
            return;
        } 

        map.set(key, classes[key]);
    })
}

export function retriveElement(className) {
    return map.get(className);
}