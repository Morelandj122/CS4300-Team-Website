var generateRandom = function (n, e) { return Math.round(Math.random() * (e - n) + n) }, oRandom = function (n) { return Math.floor(1e3 * Math.random()) + 1 < 10 * n }; window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) { window.setTimeout(n, 1e3 / 60) } }(), window.cancelAnimFrame = function () { return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (n) { window.clearTimeout(n) } }(), Array.intersect = function () { for (var n = new Array, e = {}, t = 0; t < arguments.length; t++)for (var r = 0; r < arguments[t].length; r++) { var a = arguments[t][r]; e[a] ? (e[a]++, e[a] == arguments.length && n.push(a)) : e[a] = 1 } return n }; var dummyStyle = document.createElement("div").style, vendor = function () { for (var n, e = "t,webkitT,MozT,msT,OT".split(","), t = 0, r = e.length; r > t; t++)if (n = e[t] + "ransform", n in dummyStyle) return e[t].substr(0, e[t].length - 1); return !1 }(), _css3 = vendor ? "-" + vendor.toLowerCase() + "-" : "", translate3d = function (n, e, t) { return "translate(" + n + "," + e + "," + t + ")" }; Object.defineProperty(HTMLElement.prototype, "translate3d", { value: function (n, e, t) { this.style[_css3 + "transform"] = "translate3d(" + n + "," + e + "," + t + ")" } });