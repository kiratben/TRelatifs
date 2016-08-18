if (NodeList.prototype.forEach === undefined) {
    NodeList.prototype.forEach = function(callback) {
        [].forEach.call(this, callback)
    }
}

let terms = [{
   time : 45,
   divide: 60,
   text: 'moins d\'une minute'
},{
    time: 90,
    divide: 60,
    text: 'environ une minute'
},{
    time: 45 * 60,
    divide: 60,
    text: "%d minutes"
},{
    time: 90 * 60,
    divide: 60 * 60,
    text: "environ une heure"
},{
    time: 24 * 60 * 60,
    divide: 60 * 60,
    text: "%d heures"
},{
    time: 42 * 60 * 60,
    divide: 24 * 60 * 60,
    text: "environ un jour"
},{
    time: 30 * 24 * 60 * 60,
    divide: 24 * 60 * 60,
    text: "%d jours"
},{
    time: 45 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: "environ un mois"
},{
    time: 365 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: "%d mois"
},{
    time: 365 * 1.5 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 365,
    text: "environ un an"
},{
    time: Infinity,
    divide: 24 * 60 * 60 * 365,
    text: "%d ans"
}]

document.querySelectorAll('[data-tr]').forEach(function(node) {
    function setText() {
        let seconds = Math.round((new Date()).getTime() / 1000 - parseInt(node.dataset.tr, 10));
        let prefix = seconds > 0 ? 'il y a ' : 'Dans';
        let wording = "";
        let term = null;
        seconds = Math.abs(seconds);

        for (term of terms) {
            if (seconds < term.time) {
                break;
            }
        }

        node.innerHTML = prefix + term.text.replace('%d',  Math.round(seconds / term.divide));

        window.setTimeout(function() {
         
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(setText);
            } else {
                setText();
            }  
                       
        },1000)
    }
    setText();
})