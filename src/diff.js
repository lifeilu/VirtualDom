let diffIndex = 0;
function diff(oldNode, newNode) {
    let patches = {};
    diffWalk(oldNode, newNode, diffIndex, patches)
    return patches;
}

function diffAttr(oldAttrs, newAttrs) {
    let attrPatch = {};
    Object.keys(oldAttrs).forEach(propName => {
        if(oldAttrs[propName] !== newAttrs[propName]) {
            attrPatch[propName] = newAttrs[propName];
        }
    });
    Object.keys(newAttrs).forEach(propName => {
        if(!oldAttrs.hasOwnProperty(propName)) {
            attrPatch[propName] = newAttrs[propName];
        }
    });
    return attrPatch;
}

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, idx) => {
        diffWalk(child, newChildren[idx], ++diffIndex, patches);
    });
}

function diffWalk(oldNode, newNode, index, patches) {
    let currentPatches = [];
    if(!newNode) {
        currentPatches.push(genPatchByType(PATCHTYPE.REMOVE, index));
    } else if(isString(oldNode) && isString(newNode)) {
        if(oldNode !== newNode) {
            currentPatches.push(genPatchByType(PATCHTYPE.TEXT, newNode));
        }
    } else if(isString(oldNode) || isString(newNode)) {
        currentPatches.push(genPatchByType(PATCHTYPE.REPLACE, newNode));
    } else if(oldNode.type === newNode.type) {
        let attrPatchObj = diffAttr(oldNode.props, newNode.props);
        if(Object.keys(attrPatchObj).length > 0) {
            currentPatches.push(genPatchByType(PATCHTYPE.ATTR, attrPatchObj));
        }
        diffChildren(oldNode.children, newNode.children, patches);
    } else {
        currentPatches.push(genPatchByType(PATCHTYPE.REPLACE, newNode));
        diffChildren(oldNode.children, newNode.children, patches);
    }

    if(currentPatches.length > 0) {
        patches[index] = currentPatches;
    }
}