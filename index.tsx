/*
This function handles JSX
*/
class JSX {
    static h(identifier: (string | ((key: { [key: string]: any }, childs: any) => HTMLElement)), properties: { [key: string]: any }, ...childs: (Node | ((e: HTMLElement) => Node))[]) {
        let element: HTMLElement
        if (typeof identifier === "string") {
            element = document.createElement(identifier)
        } else if (typeof identifier === "function") {
            //@ts-ignore
            if (identifier === JSX.f) {
                return childs
            }
            element = identifier({ ...properties }, childs)
        } else {
            throw new Error("Identifier needs to be a function or an string")
        }

        for (let key in properties) {
            let v = properties[key]
            if(key.startsWith("on")){
                element.addEventListener(key.toLocaleLowerCase().substring(2),v)
            }else{
                element.setAttribute(key, v)
            }
        }
        if (childs != undefined) {
            for (let child of childs.flat(Infinity)) {
                if (typeof child === "function") {
                    let res: Node | Node[] = child(element)
                    if (res !== undefined && res !== null) {
                        if (Array.isArray(res)) {
                            element.append(...res)
                        } else {
                            element.append(res)
                        }
                    }
                }else {
                    element.append(child)
                }
            }
        }
        return element
    }
    static f() { }
}

function useState(state: any, renderElem: () => HTMLElement) {
    let activeElem = renderElem()
    let internmap = { ...state }
    if(Array.isArray(activeElem)){
        return activeElem               
    }
    for (let p in state) {
        Object.defineProperty(state, p, {
            get: () => {
                return internmap[p]
            },
            set: (v) => {
                internmap[p] = v
                let r = activeElem.getRootNode()
                if (r !== undefined) {
                    let ae = renderElem()
                    activeElem.replaceWith(ae)
                    activeElem = ae
                }
            }
        })
    }
    return activeElem
}