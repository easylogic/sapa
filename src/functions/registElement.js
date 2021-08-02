const map = new Map();

/**
 * Element 등록
 * 
 * @param {object} classes 클래스명 리스트 
 */ 
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