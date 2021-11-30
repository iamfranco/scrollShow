# Introduction
ScrollShow is a JavaScript library to make DOM elements "scroll to show". 

For example, if we want DOM elements to stay hidden initially and only becomes visible when user scrolls them into viewport.

[Demo](https://francochan.co/scrollShow/)

# Installation

Download `scrollShow.js`, and link it into the `HTML` file
``` HTML
<script src="scrollShow.js"></script>
```

# Usage

### Step 1: CSS
Add a CSS rule for `.scrollShow` so that those elements are initially **hidden**.

Add a CSS rule for `.scrollShow.show` so that those elements can be **visible** later. 
``` CSS
.scrollShow {
    opacity: 0; /* hidden */
    transition: 0.2s ease all;
}

.scrollShow.show {
    opacity: 1; /* now visible */
}
```

### Step 2: HTML
For DOM elements that you want to "scroll to show", add a `scrollShow` class to them
``` HTML
<div class="[some class...] scrollShow">
    [some content ...]
</div>
```

### Step 3: JavaScript
After the closing `body` tag, add the JavaScript
``` JavaScript
scrollShow.addItems()
```
so that all those DOM elements with the `scrollShow` class are tracked.

### Step 4: And that's it
Now, whenever a tracked element gets scrolled "into view", the element will have the `show` class automatically added to it, which makes the element visible.

# Advanced
### HTML
There are more `data-` options that you can specify in an element for more fine tuned `scrollShow` behaviour
``` HTML
<div class="scrollShow" 
    data-scroll-show-class="show"
    data-scroll-show-element-percent="100"
    data-scroll-show-viewport-percent="0">
    [...]
</div>
```
1. `data-scroll-show-class` is the class name to be added to the element when it is "in view". <br> By default, that's the `show` class.

2. `data-scroll-show-element-percent` is how much an element (measuring from the top, in percentage of height) should be visible, in order for it to be considered "in view". <br> By default, that's `100`%, i.e. right at the bottom of the element.

3. `data-scroll-show-viewport-percent` is where the "in view threshold" is located at within the viewport (measuring from the bottom, in percentage of height). <br> By default, that's `0`%, i.e. right at the bottom of the viewport.
