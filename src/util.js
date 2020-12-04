function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}

function setAttrs(node, key, value) {
    switch(key) {
        case 'value': {
            let tagName = node.tagName.toUpperCase();
            if(tagName === 'INPUT' || tagName === 'TEXTAREA') {
                tagName.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        }
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

function genPatchByType(patchName, value) {
    let patchObj = {
        type: patchName
    };
    switch(patchName) {
        case PATCHTYPE.ATTR:
            patchObj.attr = value;
            break;
        case PATCHTYPE.REPLACE:
            patchObj.newNode = value;
            break;
        case PATCHTYPE.TEXT:
            patchObj.text = value;
            break;
        case PATCHTYPE.REMOVE:
            patchObj.index = value;
            break;
        default:
            break;
    }
    return patchObj;
}

function getPatchValueByType(type, patchObj) {
    let patchValue;
    switch(type) {
        case PATCHTYPE.ATTR:
            patchValue = patchObj.attr;
            break;
        case PATCHTYPE.REPLACE:
            patchValue = patchObj.newNode;
            break;
        case PATCHTYPE.TEXT:
            patchValue = patchObj.text;
            break;
        case PATCHTYPE.REMOVE:
            patchValue = patchObj.index;
            break;
        default:
            break;
    }
    return patchValue;
}