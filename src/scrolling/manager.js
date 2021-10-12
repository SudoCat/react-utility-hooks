function ScrollManager() {
  // Does not function server side!
  if (typeof window === 'undefined') return
  this.listeners = []
  this.lastTick = window.performance.now()
  this.deltaTime = 0
  this.isTicking = false
  this.update = this.update.bind(this)
  window.addEventListener('scroll', this.tick.bind(this), {
    passive: true,
  })
}

ScrollManager.prototype.addListener = function addListener(func) {
  if (this.listeners.includes(func)) return
  this.listeners.push(func)
}

ScrollManager.prototype.removeListener = function removeListener(func) {
  const index = this.listeners.indexOf(func)
  if (index === -1) return
  this.listeners.splice(index, 1)
}

ScrollManager.prototype.tick = function tick(evt) {
  if (this.isTicking) return
  this.isTicking = true
  this.evt = evt
  window.requestAnimationFrame(this.update)
}

ScrollManager.prototype.update = function update(timestamp) {
  this.deltaTime = timestamp - this.lastTick

  for (let i = this.listeners.length - 1; i >= 0; i -= 1) {
    this.listeners[i]()
  }

  this.lastTick = timestamp
  this.isTicking = false
}

export default new ScrollManager()
