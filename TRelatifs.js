if (NodeList.prototype.forEach === undefined){
	NodeList.prototype.forEach = function(callback){
		[].forEach.call(this, callback)
	}
}

let terms = [{
	time:10,
	divide:1,
	text: "%d secondes"
},{
	time : 45,
	divide:1,
	text : "moins d'une minutes"
},
{
	time:3600,
	divide:60,
	text:"%d minute"
}]





document.querySelectorAll('[data-tr]').forEach(function(node){
	function setText(){
	let seconds = Math.round((new Date()).getTime() / 1000 -  parseInt(node.dataset.tr,10));
	let prefix = seconds > 0 ? 'il y a ' : 'Dans';
	let wording = "";
	let term = null;
	seconds = Math.abs(seconds);

	for(term of terms){
		if (seconds < term.time){
			break;
		}
	}

	node.innerHTML = prefix + term.text.replace ('%d',seconds / Math.round(term.divide));
}
	
})