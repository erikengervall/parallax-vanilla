module.exports = () => {
  pv.windowProps.scrollTop = window.scrollY || document.documentElement.scrollTop
  pv.windowProps.windowHeight = window.innerHeight
  pv.windowProps.windowMidHeight = window.innerHeight / 2
  pv.init()
}
