# JadrJSX - 720 bytes JSX consumer + State management

### Embed in HTML
```html
<script src="https://cdn.jsdelivr.net/gh/johannes-adr/JadrJSX/bundle.min.js"></script>
```

### Example:
```typescript
function Joink(){
    return <>
        <div>Join1</div>
        <div>Joink2</div>
    </>
}
function Button(props: {}, ...childs: HTMLElement[]) {
    let state = { active: false }
    return  useState(state,()=>
    <div onClick={(e) => {
        state.active = !state.active
        console.log(state.active)
        }}>
        Im a button<br />
        {state.active}
        <Joink />
    </div>)
}
document.body.append(<Button />)
```
#### State management:
```typescript
let useState = JSX.useState
function App() {
    let state = { counter: 0, show: false }
    return useState(state, () => <div id="root">
        <button onClick={() => state.counter++}>+1</button>
        <button onClick={() => state.counter--}>-1</button>
        <button onClick={() => state.show = !state.show}>show</button><br />
        {state.show ? <>Current count: {state.counter}</> : ""}
    </div>)
}

document.body.append(...[<App />].flat(1))
```

If you want to use jsx-fragments in toplevel, you need to spread its result
```typescript
document.body.append(...<>
Hello
<span> </span>
World
</>)
```

### Best Practise
```typescript
function App(){
    return <div>
    HI
    </div>
}

document.body.append(...[<App />].flat(1))
```
by flatting the Array you ensure that the code keeps working even if the app main component is a fragment
