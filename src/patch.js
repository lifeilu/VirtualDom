let patchIndex = 0;
function patch(node, patches) {
    patchWalk(node, patches);
}

function patchWalk(node, patches) {
    let currentPatch = patches[patchIndex++];
    node.childNodes.forEach(child => {
        patchWalk(child, patches);
    });
    if(currentPatch) {
        currentPatch.forEach(patch => {
            doPatch(node, patch);
        });
    }
}

function doPatch(node, patch) {
    const patchType = patch.type;
    const patchValue = getPatchValueByType(patchType, patch);
    switch(patchType) {
        case PATCHTYPE.TEXT:
            node.textContent = patchValue;
            break;
        case PATCHTYPE.REPLACE:
            let newNode = (patchValue instanceof Element) ? renderDom(patchValue)
            : document.createTextNode(patchValue);
            node.parentNode.replaceChild(newNode, node);
            break;
        case PATCHTYPE.REMOVE:
            node.parentNode.removeChild(node);
            break;
        case PATCHTYPE.ATTR:
            Object.keys(patchValue).forEach(key => {
                setAttrs(node, key, patchValue[key]);
            });
            break;
        default:
            break;
    }
}