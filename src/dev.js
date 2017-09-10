// pretty print
function pp(source, obj) {
  var date  = new Date(),
      h     = date.getHours(),
      m     = date.getMinutes(),
      s     = date.getSeconds(),
      now   = h+":"+m+":"+s+" <- "+source
  console.log("%c " + now, "color:blue;font-size:15px;");
  if (obj instanceof HTMLElement) {
  	console.log(obj);
  } else {
	  console.log(JSON.stringify(obj, null, 2));
  }
}