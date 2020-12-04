class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children);
}

function renderDom(eleObj) {
    let node = document.createElement(eleObj.type);
    Object.keys(eleObj.props).forEach(key => {
        setAttrs(node, key, eleObj.props[key]);
    });
    eleObj.children.forEach(child => {
        let childNode = (child instanceof Element) ? renderDom(child) : document.createTextNode(child);
        node.appendChild(childNode);
    })
    return node;
}