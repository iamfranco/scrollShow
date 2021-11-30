let scrollShow = {
    items: [], // arary of objects containing DOM element and parameters for scrollShow
    delay: 0.05, // time delay (seconds) on simutaneously showing elements
    
    // populate this.items to keep track of scrollShow elements
    addItems: function(classname="scrollShow") {
        let elements = document.getElementsByClassName(classname)
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i]
            const showClass = el.getAttribute('data-scroll-show-class') || 'show'
            const elPercent = parseInt(el.getAttribute('data-scroll-show-element-percent') || '100')
            const vpPercent = parseInt(el.getAttribute('data-scroll-show-viewport-percent') || '0')
            let item = {
                element: el,
                showClass: showClass,
                elPercent: elPercent,
                vpPercent: vpPercent,
                top: null,
                height: null,
                keyY: null
            }
            item = this.updateRect(item)
            this.items.push(item)
        }
        this.onScroll()
    },

    // update scrollShow elements rectangular position
    updateRect: function(item) {
        const rect = item.element.getBoundingClientRect()
        item.top = rect.top + scrollY
        item.height = rect.height
        item.keyY = item.top + item.height * item.elPercent / 100 - innerHeight * (1 - item.vpPercent / 100)
        return item
    },

    onResize: function() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = this.updateRect(this.items[i])
        }
    },
    
    onScroll: function() {
        const isAfterY = this.items.map(function(item) {
            return item.keyY <= scrollY
        })
        const alreadyShown = this.items.map(function(item) {
            return item.element.classList.contains(item.showClass)
        })

        let count = 0
        for (let i = 0; i < isAfterY.length; i++) {
            const showClass = this.items[i].showClass
            let el = this.items[i].element
            el.style.transitionDelay = null
            if (isAfterY[i] && !alreadyShown[i]) {
                el.style.transitionDelay = `${this.delay*count}s`
                count++
                el.classList.add(showClass)
            } else if (!isAfterY[i] && alreadyShown[i]) {
                el.classList.remove(showClass)
            }
        }
    },
}

// listens to window resize and scroll events
window.addEventListener('resize', () => scrollShow.onResize())
window.addEventListener('scroll', () => scrollShow.onScroll())