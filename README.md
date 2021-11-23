# JadrJSX

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