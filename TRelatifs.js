if (NodeList.prototype.forEach === undefined) {
    NodeList.prototype.forEach = function(callback) {
        [].forEach.call(this, callback)
    }
}
const LANGUAGE_CODE = "en";

let terms = [{
    time: 45,
    divide: 60,
    text: {
        fr: 'moins d\'une minute',
        en: 'less than a minute'
    }
}, {
    time: 90,
    divide: 60,
    text: {
        fr: 'environ une minute',
        en: 'about one minute '
    }
}, {
    time: 45 * 60,
    divide: 60,
    text: {
        fr: '%d minutes',
        en: '%d minutes'
    }
}, {
    time: 90 * 60,
    divide: 60 * 60,
    text: {
        fr: 'environ une heure',
        en: 'about an hour'
    }
}, {
    time: 24 * 60 * 60,
    divide: 60 * 60,
    text: {
        fr: '%d heures',
        en: '%d hours'
    }
}, {
    time: 42 * 60 * 60,
    divide: 24 * 60 * 60,
    text: {
        fr: 'environ un jour',
        en: 'about a day'
    }
}, {
    time: 30 * 24 * 60 * 60,
    divide: 24 * 60 * 60,
    text: {
        fr: '%d jours',
        en: '%d days'
    }
}, {
    time: 45 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: {
        fr: 'environ un mois',
        en: 'about a month '
    }
}, {
    time: 365 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: {
        fr: '%d mois',
        en: '%d months'
    }
}, {
    time: 365 * 1.5 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 365,
    text: {
        fr: 'environ un an',
        en: 'about one year'
    }
}, {
    time: Infinity,
    divide: 24 * 60 * 60 * 365,
    text: {
        fr: '%d ans',
        en: '%d years'
    }
}]

document.querySelectorAll('[data-tr]').forEach(function(node) {
    function setText() {
        let seconds = Math.floor((new Date()).getTime() / 1000 - parseInt(node.dataset.tr, 10));
        let prefix = '';

        switch (LANGUAGE_CODE) {
            case "fr":
                prefix = seconds > 0 ? 'il y a ?' : 'dans ?';
                break;
            case "en":
                prefix = seconds > 0 ? '? ago' : 'in ?';
                break;
        }

        let term = null;
        seconds = Math.abs(seconds);

        for (term of terms) {
            if (seconds < term.time) {
                break;
            }
        }

        node.innerHTML = prefix.replace('?', term.text[LANGUAGE_CODE].replace('%d', Math.round(seconds / term.divide)));
        let nextTick = seconds % term.divide
        if (nextTick === 0) {
            nextTick = term.divide;
        }
        window.setTimeout(function() {
            if (node.parentNode) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(setText);
                } else {
                    setText();
                }
            }
        }, nextTick * 1000)
    }
    setText();
})