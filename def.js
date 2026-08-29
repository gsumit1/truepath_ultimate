var frames= document.getElementsByTagName("iframe");
	alert("frames=" + frames.length);
	for(var i = 0; i < frames.length; i++){
		var f = frames[i];
		alert(f);
		var frameSrc = ff.getAttribute("src");
		var frameName = ff.getAttribute("name");
		var frameId = ff.getAttribute("id");
		alert("ddd:::"+ff.getAttribute("src"));
}