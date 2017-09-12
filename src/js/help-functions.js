// pretty print
// function pp(source, obj) {
//   var date  = new Date(),
//       h     = date.getHours(),
//       m     = date.getMinutes(),
//       s     = date.getSeconds(),
//       now   = h+":"+m+":"+s+" <- "+source
//   console.log("%c " + now, "color:blue;font-size:15px;");
//   if (obj instanceof HTMLElement) {
//   	console.log(obj);
//   } else {
// 	  console.log(JSON.stringify(obj, null, 2));
//   }
// }

// Checks if String argument consists exclusively of numbers
const isStringOfIntegers = arg => {
  return /^[0-9]+$/.test(arg)
}

// Calculates the top offset from an element to the window's || document's top, Link: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
const offsetTop = el => {
  let rectTop = el.getBoundingClientRect().top,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return rectTop + scrollTop
}

// checks if the parallax image is in viewport.
const isInViewport = (offset, height) => {
  return (
    pv.windowProps.scrollTop + pv.windowProps.windowHeight - offset > 0 &&
    pv.windowProps.scrollTop < offset + height
  )
}

// Returns the extension of a media path
const getExtension = attrMediapath => {
  const extension = attrMediapath
    .substr(attrMediapath.lastIndexOf('.') + 1, attrMediapath.length)
    .toLowerCase()
  return extension === -1
    ? console.error('Invalid extension for media with media path: ' + attrMediapath)
    : extension
}

// returns {true} if media is a video
const isVideo = (attrMediatype, attrMediapath) => {
  return (
    attrMediatype === 'video' || pv.videoExtensions.indexOf(pv.getExtension(attrMediapath)) !== -1
  )
}

module.exports = { isStringOfIntegers, offsetTop, isInViewport, getExtension, isVideo }
