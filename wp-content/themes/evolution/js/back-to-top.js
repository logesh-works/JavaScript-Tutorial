"use strict";
function addBackToTop() {
	var o,
		t,
		e,
		n,
		i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
		r = i.backgroundColor,
		d = void 0 === r ? "#000" : r,
		a = i.cornerOffset,
		c = void 0 === a ? 20 : a,
		s = i.diameter,
		l = void 0 === s ? 56 : s,
		u = i.ease,
		p =
			void 0 === u
				? function (o) {
						return 0.5 * (1 - Math.cos(Math.PI * o));
				  }
				: u,
		m = i.id,
		h = void 0 === m ? "back-to-top" : m,
		b = i.innerHTML,
		v =
			void 0 === b
				? '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>'
				: b,
		f = i.onClickScrollTo,
		x = void 0 === f ? 0 : f,
		w = i.scrollContainer,
		g = void 0 === w ? document.body : w,
		k = i.scrollDuration,
		y = void 0 === k ? 100 : k,
		T = i.showWhenScrollTopIs,
		M = void 0 === T ? 1 : T,
		z = i.size,
		E = void 0 === z ? l : z,
		C = i.textColor,
		L = void 0 === C ? "#fff" : C,
		N = i.zIndex,
		I = void 0 === N ? 1 : N,
		A = g === document.body,
		B = A && document.documentElement;
	(o = Math.round(0.43 * E)),
		(t = Math.round(0.29 * E)),
		(e =
			"#" +
			h +
			"{background:" +
			d +
			";-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;bottom:" +
			c +
			"px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);color:" +
			L +
			";cursor:pointer;display:block;height:" +
			E +
			"px;opacity:1;outline:0;position:fixed;right:" +
			c +
			"px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-transition:bottom .2s,opacity .2s;-o-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:" +
			E +
			"px;z-index:" +
			I +
			"}#" +
			h +
			" svg{display:block;fill:currentColor;height:" +
			o +
			"px;margin:" +
			t +
			"px auto 0;width:" +
			o +
			"px}#" +
			h +
			".hidden{bottom:-" +
			E +
			"px;opacity:0}"),
		(n = document.createElement("style")).appendChild(document.createTextNode(e)),
		document.head.insertAdjacentElement("afterbegin", n);
	var D = (function () {
			var o = document.createElement("div");
			return (
				(o.id = h),
				(o.className = "hidden"),
				(o.innerHTML = v),
				o.addEventListener("click", function (o) {
					o.preventDefault(),
						(function () {
							var o = "function" == typeof x ? x() : x,
								t = window,
								e = t.performance,
								n = t.requestAnimationFrame;
							if (y <= 0 || void 0 === e || void 0 === n) return q(o);
							var i = e.now(),
								r = j(),
								d = r - o;
							n(function o(t) {
								var e = Math.min((t - i) / y, 1);
								q(r - Math.round(p(e) * d)), e < 1 && n(o);
							});
						})();
				}),
				document.body.appendChild(o),
				o
			);
		})(),
		H = !0;
	function S() {
		j() >= M
			? (function () {
					if (!H) return;
					(D.className = ""), (H = !1);
			  })()
			: (function () {
					if (H) return;
					(D.className = "hidden"), (H = !0);
			  })();
	}
	function j() {
		return g.scrollTop || (B && document.documentElement.scrollTop) || 0;
	}
	function q(o) {
		(g.scrollTop = o), B && (document.documentElement.scrollTop = o);
	}
	(A ? window : g).addEventListener("scroll", S), S();
}
