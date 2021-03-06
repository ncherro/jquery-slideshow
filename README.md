# jQuery Slideshow

provides slideshow functionality, uses CSS transitions to animate slides

## Example

### HTML

```html
<div id="slideshow">
  <ul class="slides">
    <li class="slide">
      <h1>Slide 1</h1>
    </li>
    <li class="slide">
      <h1>Slide 2</h1>
    </li>
    <li class="slide">
      <h1>Slide 3</h1>
    </li>
    <li class="slide">
      <h1>Slide 4</h1>
    </li>
    <li class="slide">
      <h1>Slide 5</h1>
    </li>
  </ul>
  <div class="controls">
  </div>
</div>
```

### JavaScript

```javascript
$('#slideshow').slideshow({
  wrap_sel: '.slides',
  slide_sel: '.slide',
  controls_sel: '.controls'
});

/*
 * OTHER OPTIONS
 * - delay (integer, 5000):
 *     amount of time to delay, in ms
 * - autoplay (boolean, true):
 *     autoplay?
 * - resize_on_slide (boolean, false):
 *     resize height on slide show?
 * - set_h_on_resize (boolean, true):
 *     reset slideshow height on window resize? useful for responsive designs
 *     will use $.debounce https://github.com/ncherro/jquery-debounce, if loaded
 * - on_class (string, 'on'): 
 *     css class to be appled to the 'current' dot
 * - prev_html (string, '<i class="ico-arr-left" />'):
 *     HTML for the 'previous' arrow. leave blank to omit
 * - next_html (string, '<i class="ico-arr-right" />'):
 *     HTML for the 'previous' arrow. leave blank to omit
 * - cur_html (string, '<i class="ico-bullet">&bull;</i>'):
 *     HTML for the 'current' dot. leave blank to omit
 */
```


### CSS

```css
#slideshow {
  overflow: hidden;
  position: relative;
  width: 500px; /* must be defined */
  height: 300px; /* will be overridden if we leave set_h_on_resize set to true */
}

.slides {
  position: relative;
  transition: left 0.2s ease-in-out;
  -moz-transition: left 0.2s ease-in-out;
  -webkit-transition: left 0.2s ease-in-out;
  -o-transition: left 0.2s ease-in-out;
}

.slide {
  position: absolute;
  top: 0;
}

.controls {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.controls i {
  color: #666;
}
.controls i.on {
  color: #f0f;
}
```
