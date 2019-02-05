#Documentation


## Generating and using Sprite

### Flow

* All images imported in JSX files get collected in "dist" folder under "sprite-images"
* Custom webpack plugin generates sprite from these images and also generates corresponding css (uses spritesmith module)
* generated css is then concatenated to the final application css.

### Usage

Import image in as a module in component

```js
import image from '<relative-path>'
```

Add class "sprite" to the element to set generated sprite as background

Add class "sprite-[name of actual image]" to position the sprite accordingly.

#### Example:

Include 'logo.png'

component.jsx

```js
.
.
import logo from '../images/logo.png'

class MyComponent extends React.Component {
.
.
.
	render(){
		return <div className="sprite sprite-logo">
				</div>
	}
}
