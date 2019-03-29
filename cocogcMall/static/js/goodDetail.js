// var _cacheThisModule_, $ = require('zepto'), 
// urlParam = require('url'), 
// loopScroll = require('loopScroll'), 
// mLs = require('loadJs'), 
// util = require('util'), 
// itemComm = require('wq.item.common'),
// itemUtil = require('jd.item.util')

// commDet = require('wq.item.detail'), 

// mWfdata = require('wfdata'), 

// jdVideo = require('jdVideo'), 



define("zepto", function(require, exports, t) {
    var _cacheThisModule_;
    var e = function() {
        var t, e, n, i, r = [], o = r.concat, a = r.filter, s = r.slice, u = window.document, f = {}, c = {}, l = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, h = /^\s*<(\w+|!)[^>]*>/, p = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, d = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, m = /^(?:body|html)$/i, v = /([A-Z])/g, g = ["val", "css", "html", "text", "data", "width", "height", "offset"], y = ["after", "prepend", "before", "append"], b = u.createElement("table"), w = u.createElement("tr"), x = {
            tr: u.createElement("tbody"),
            tbody: b,
            thead: b,
            tfoot: b,
            td: w,
            th: w,
            "*": u.createElement("div")
        }, E = /complete|loaded|interactive/, T = /^[\w-]*$/, S = {}, j = S.toString, C = {}, O, N, A = u.createElement("div"), P = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, M = Array.isArray || function(t) {
            return t instanceof Array
        }
        ;
        C.matches = function(t, e) {
            if (!e || !t || t.nodeType !== 1)
                return false;
            var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n)
                return n.call(t, e);
            var i, r = t.parentNode, o = !r;
            if (o)
                (r = A).appendChild(t);
            i = ~C.qsa(r, e).indexOf(t);
            o && A.removeChild(t);
            return i
        }
        ;
        function D(t) {
            return t == null ? String(t) : S[j.call(t)] || "object"
        }
        function k(t) {
            return D(t) == "function"
        }
        function F(t) {
            return t != null && t == t.window
        }
        function L(t) {
            return t != null && t.nodeType == t.DOCUMENT_NODE
        }
        function $(t) {
            return D(t) == "object"
        }
        function R(t) {
            return $(t) && !F(t) && Object.getPrototypeOf(t) == Object.prototype
        }
        function _(t) {
            var e = !!t && "length"in t && t.length
              , i = n.type(t);
            return "function" != i && !F(t) && ("array" == i || e === 0 || typeof e == "number" && e > 0 && e - 1 in t)
        }
        function q(t) {
            return a.call(t, function(t) {
                return t != null
            })
        }
        function z(t) {
            return t.length > 0 ? n.fn.concat.apply([], t) : t
        }
        O = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ""
            })
        }
        ;
        function I(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        N = function(t) {
            return a.call(t, function(e, n) {
                return t.indexOf(e) == n
            })
        }
        ;
        function W(t) {
            return t in c ? c[t] : c[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }
        function Z(t, e) {
            return typeof e == "number" && !l[I(t)] ? e + "px" : e
        }
        function B(t) {
            var e, n;
            if (!f[t]) {
                e = u.createElement(t);
                u.body.appendChild(e);
                n = getComputedStyle(e, "").getPropertyValue("display");
                e.parentNode.removeChild(e);
                n == "none" && (n = "block");
                f[t] = n
            }
            return f[t]
        }
        function V(t) {
            return "children"in t ? s.call(t.children) : n.map(t.childNodes, function(t) {
                if (t.nodeType == 1)
                    return t
            })
        }
        function H(t, e) {
            var n, i = t ? t.length : 0;
            for (n = 0; n < i; n++)
                this[n] = t[n];
            this.length = i;
            this.selector = e || ""
        }
        C.fragment = function(e, i, r) {
            var o, a, f;
            if (p.test(e))
                o = n(u.createElement(RegExp.$1));
            if (!o) {
                if (e.replace)
                    e = e.replace(d, "<$1></$2>");
                if (i === t)
                    i = h.test(e) && RegExp.$1;
                if (!(i in x))
                    i = "*";
                f = x[i];
                f.innerHTML = "" + e;
                o = n.each(s.call(f.childNodes), function() {
                    f.removeChild(this)
                })
            }
            if (R(r)) {
                a = n(o);
                n.each(r, function(t, e) {
                    if (g.indexOf(t) > -1)
                        a[t](e);
                    else
                        a.attr(t, e)
                })
            }
            return o
        }
        ;
        C.Z = function(t, e) {
            return new H(t,e)
        }
        ;
        C.isZ = function(t) {
            return t instanceof C.Z
        }
        ;
        C.init = function(e, i) {
            var r;
            if (!e)
                return C.Z();
            else if (typeof e == "string") {
                e = e.trim();
                if (e[0] == "<" && h.test(e))
                    r = C.fragment(e, RegExp.$1, i),
                    e = null;
                else if (i !== t)
                    return n(i).find(e);
                else
                    r = C.qsa(u, e)
            } else if (k(e))
                return n(u).ready(e);
            else if (C.isZ(e))
                return e;
            else {
                if (M(e))
                    r = q(e);
                else if ($(e))
                    r = [e],
                    e = null;
                else if (h.test(e))
                    r = C.fragment(e.trim(), RegExp.$1, i),
                    e = null;
                else if (i !== t)
                    return n(i).find(e);
                else
                    r = C.qsa(u, e)
            }
            return C.Z(r, e)
        }
        ;
        n = function(t, e) {
            return C.init(t, e)
        }
        ;
        function U(n, i, r) {
            for (e in i)
                if (r && (R(i[e]) || M(i[e]))) {
                    if (R(i[e]) && !R(n[e]))
                        n[e] = {};
                    if (M(i[e]) && !M(n[e]))
                        n[e] = [];
                    U(n[e], i[e], r)
                } else if (i[e] !== t)
                    n[e] = i[e]
        }
        n.extend = function(t) {
            var e, n = s.call(arguments, 1);
            if (typeof t == "boolean") {
                e = t;
                t = n.shift()
            }
            n.forEach(function(n) {
                U(t, n, e)
            });
            return t
        }
        ;
        C.qsa = function(t, e) {
            var n, i = e[0] == "#", r = !i && e[0] == ".", o = i || r ? e.slice(1) : e, a = T.test(o);
            return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 ? [] : s.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }
        ;
        function X(t, e) {
            return e == null ? n(t) : n(t).filter(e)
        }
        n.contains = u.documentElement.contains ? function(t, e) {
            return t !== e && t.contains(e)
        }
        : function(t, e) {
            while (e && (e = e.parentNode))
                if (e === t)
                    return true;
            return false
        }
        ;
        function Y(t, e, n, i) {
            return k(e) ? e.call(t, n, i) : e
        }
        function G(t, e, n) {
            n == null ? t.removeAttribute(e) : t.setAttribute(e, n)
        }
        function J(e, n) {
            var i = e.className || ""
              , r = i && i.baseVal !== t;
            if (n === t)
                return r ? i.baseVal : i;
            r ? i.baseVal = n : e.className = n
        }
        function K(t) {
            try {
                return t ? t == "true" || (t == "false" ? false : t == "null" ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }
        n.type = D;
        n.isFunction = k;
        n.isWindow = F;
        n.isArray = M;
        n.isPlainObject = R;
        n.isEmptyObject = function(t) {
            var e;
            for (e in t)
                return false;
            return true
        }
        ;
        n.isNumeric = function(t) {
            var e = Number(t)
              , n = typeof t;
            return t != null && n != "boolean" && (n != "string" || t.length) && !isNaN(e) && isFinite(e) || false
        }
        ;
        n.inArray = function(t, e, n) {
            return r.indexOf.call(e, t, n)
        }
        ;
        n.camelCase = O;
        n.trim = function(t) {
            return t == null ? "" : String.prototype.trim.call(t)
        }
        ;
        n.uuid = 0;
        n.support = {};
        n.expr = {};
        n.noop = function() {}
        ;
        n.map = function(t, e) {
            var n, i = [], r, o;
            if (_(t))
                for (r = 0; r < t.length; r++) {
                    n = e(t[r], r);
                    if (n != null)
                        i.push(n)
                }
            else
                for (o in t) {
                    n = e(t[o], o);
                    if (n != null)
                        i.push(n)
                }
            return z(i)
        }
        ;
        n.each = function(t, e) {
            var n, i;
            if (_(t)) {
                for (n = 0; n < t.length; n++)
                    if (e.call(t[n], n, t[n]) === false)
                        return t
            } else {
                for (i in t)
                    if (e.call(t[i], i, t[i]) === false)
                        return t
            }
            return t
        }
        ;
        n.grep = function(t, e) {
            return a.call(t, e)
        }
        ;
        if (window.JSON)
            n.parseJSON = JSON.parse;
        n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            S["[object " + e + "]"] = e.toLowerCase()
        });
        n.fn = {
            constructor: C.Z,
            length: 0,
            forEach: r.forEach,
            reduce: r.reduce,
            push: r.push,
            sort: r.sort,
            splice: r.splice,
            indexOf: r.indexOf,
            concat: function() {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++) {
                    e = arguments[t];
                    n[t] = C.isZ(e) ? e.toArray() : e
                }
                return o.apply(C.isZ(this) ? this.toArray() : this, n)
            },
            map: function(t) {
                return n(n.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return n(s.apply(this, arguments))
            },
            ready: function(t) {
                if (E.test(u.readyState) && u.body)
                    t(n);
                else
                    u.addEventListener("DOMContentLoaded", function() {
                        t(n)
                    }, false);
                return this
            },
            get: function(e) {
                return e === t ? s.call(this) : this[e >= 0 ? e : e + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    if (this.parentNode != null)
                        this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                r.every.call(this, function(e, n) {
                    return t.call(e, n, e) !== false
                });
                return this
            },
            filter: function(t) {
                if (k(t))
                    return this.not(this.not(t));
                return n(a.call(this, function(e) {
                    return C.matches(e, t)
                }))
            },
            add: function(t, e) {
                return n(N(this.concat(n(t, e))))
            },
            is: function(t) {
                return this.length > 0 && C.matches(this[0], t)
            },
            not: function(e) {
                var i = [];
                if (k(e) && e.call !== t)
                    this.each(function(t) {
                        if (!e.call(this, t))
                            i.push(this)
                    });
                else {
                    var r = typeof e == "string" ? this.filter(e) : _(e) && k(e.item) ? s.call(e) : n(e);
                    this.forEach(function(t) {
                        if (r.indexOf(t) < 0)
                            i.push(t)
                    })
                }
                return n(i)
            },
            has: function(t) {
                return this.filter(function() {
                    return $(t) ? n.contains(this, t) : n(this).find(t).size()
                })
            },
            eq: function(t) {
                return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !$(t) ? t : n(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !$(t) ? t : n(t)
            },
            find: function(t) {
                var e, i = this;
                if (!t)
                    e = n();
                else if (typeof t == "object")
                    e = n(t).filter(function() {
                        var t = this;
                        return r.some.call(i, function(e) {
                            return n.contains(e, t)
                        })
                    });
                else if (this.length == 1)
                    e = n(C.qsa(this[0], t));
                else
                    e = this.map(function() {
                        return C.qsa(this, t)
                    });
                return e
            },
            closest: function(t, e) {
                var i = []
                  , r = typeof t == "object" && n(t);
                this.each(function(n, o) {
                    while (o && !(r ? r.indexOf(o) >= 0 : C.matches(o, t)))
                        o = o !== e && !L(o) && o.parentNode;
                    if (o && i.indexOf(o) < 0)
                        i.push(o)
                });
                return n(i)
            },
            parents: function(t) {
                var e = []
                  , i = this;
                while (i.length > 0)
                    i = n.map(i, function(t) {
                        if ((t = t.parentNode) && !L(t) && e.indexOf(t) < 0) {
                            e.push(t);
                            return t
                        }
                    });
                return X(e, t)
            },
            parent: function(t) {
                return X(N(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return X(this.map(function() {
                    return V(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return this.contentDocument || s.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return X(this.map(function(t, e) {
                    return a.call(V(e.parentNode), function(t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return n.map(this, function(e) {
                    return e[t]
                })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = "");
                    if (getComputedStyle(this, "").getPropertyValue("display") == "none")
                        this.style.display = B(this.nodeName)
                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var e = k(t);
                if (this[0] && !e)
                    var i = n(t).get(0)
                      , r = i.parentNode || this.length > 1;
                return this.each(function(o) {
                    n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(true) : i)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    n(this[0]).before(t = n(t));
                    var e;
                    while ((e = t.children()).length)
                        t = e.first();
                    n(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var e = k(t);
                return this.each(function(i) {
                    var r = n(this)
                      , o = r.contents()
                      , a = e ? t.call(this, i) : t;
                    o.length ? o.wrapAll(a) : r.append(a)
                })
            },
            unwrap: function() {
                this.parent().each(function() {
                    n(this).replaceWith(n(this).children())
                });
                return this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(true)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(e) {
                return this.each(function() {
                    var i = n(this);
                    (e === t ? i.css("display") == "none" : e) ? i.show() : i.hide()
                })
            },
            prev: function(t) {
                return n(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return n(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var i = this.innerHTML;
                    n(this).empty().append(Y(this, t, e, i))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var n = Y(this, t, e, this.textContent);
                    this.textContent = n == null ? "" : "" + n
                }) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function(n, i) {
                var r;
                return typeof n == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (r = this[0].getAttribute(n)) != null ? r : t : this.each(function(t) {
                    if (this.nodeType !== 1)
                        return;
                    if ($(n))
                        for (e in n)
                            G(this, e, n[e]);
                    else
                        G(this, n, Y(this, i, t, this.getAttribute(n)))
                })
            },
            removeAttr: function(t) {
                return this.each(function() {
                    this.nodeType === 1 && t.split(" ").forEach(function(t) {
                        G(this, t)
                    }, this)
                })
            },
            prop: function(t, e) {
                t = P[t] || t;
                return 1 in arguments ? this.each(function(n) {
                    this[t] = Y(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            removeProp: function(t) {
                t = P[t] || t;
                return this.each(function() {
                    delete this[t]
                })
            },
            data: function(e, n) {
                var i = "data-" + e.replace(v, "-$1").toLowerCase();
                var r = 1 in arguments ? this.attr(i, n) : this.attr(i);
                return r !== null ? K(r) : t
            },
            val: function(t) {
                if (0 in arguments) {
                    if (t == null)
                        t = "";
                    return this.each(function(e) {
                        this.value = Y(this, t, e, this.value)
                    })
                } else {
                    return this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                }
            },
            offset: function(t) {
                if (t)
                    return this.each(function(e) {
                        var i = n(this)
                          , r = Y(this, t, e, i.offset())
                          , o = i.offsetParent().offset()
                          , a = {
                            top: r.top - o.top,
                            left: r.left - o.left
                        };
                        if (i.css("position") == "static")
                            a["position"] = "relative";
                        i.css(a)
                    });
                if (!this.length)
                    return null;
                if (u.documentElement !== this[0] && !n.contains(u.documentElement, this[0]))
                    return {
                        top: 0,
                        left: 0
                    };
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function(t, i) {
                if (arguments.length < 2) {
                    var r = this[0];
                    if (typeof t == "string") {
                        if (!r)
                            return;
                        return r.style[O(t)] || getComputedStyle(r, "").getPropertyValue(t)
                    } else if (M(t)) {
                        if (!r)
                            return;
                        var o = {};
                        var a = getComputedStyle(r, "");
                        n.each(t, function(t, e) {
                            o[e] = r.style[O(e)] || a.getPropertyValue(e)
                        });
                        return o
                    }
                }
                var s = "";
                if (D(t) == "string") {
                    if (!i && i !== 0)
                        this.each(function() {
                            this.style.removeProperty(I(t))
                        });
                    else
                        s = I(t) + ":" + Z(t, i)
                } else {
                    for (e in t)
                        if (!t[e] && t[e] !== 0)
                            this.each(function() {
                                this.style.removeProperty(I(e))
                            });
                        else
                            s += I(e) + ":" + Z(e, t[e]) + ";"
                }
                return this.each(function() {
                    this.style.cssText += ";" + s
                })
            },
            index: function(t) {
                return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                if (!t)
                    return false;
                return r.some.call(this, function(t) {
                    return this.test(J(t))
                }, W(t))
            },
            addClass: function(t) {
                if (!t)
                    return this;
                return this.each(function(e) {
                    if (!("className"in this))
                        return;
                    i = [];
                    var r = J(this)
                      , o = Y(this, t, e, r);
                    o.split(/\s+/g).forEach(function(t) {
                        if (!n(this).hasClass(t))
                            i.push(t)
                    }, this);
                    i.length && J(this, r + (r ? " " : "") + i.join(" "))
                })
            },
            removeClass: function(e) {
                return this.each(function(n) {
                    if (!("className"in this))
                        return;
                    if (e === t)
                        return J(this, "");
                    i = J(this);
                    Y(this, e, n, i).split(/\s+/g).forEach(function(t) {
                        i = i.replace(W(t), " ")
                    });
                    J(this, i.trim())
                })
            },
            toggleClass: function(e, i) {
                if (!e)
                    return this;
                return this.each(function(r) {
                    var o = n(this)
                      , a = Y(this, e, r, J(this));
                    a.split(/\s+/g).forEach(function(e) {
                        (i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e)
                    })
                })
            },
            scrollTop: function(e) {
                if (!this.length)
                    return;
                var n = "scrollTop"in this[0];
                if (e === t)
                    return n ? this[0].scrollTop : this[0].pageYOffset;
                return this.each(n ? function() {
                    this.scrollTop = e
                }
                : function() {
                    this.scrollTo(this.scrollX, e)
                }
                )
            },
            scrollLeft: function(e) {
                if (!this.length)
                    return;
                var n = "scrollLeft"in this[0];
                if (e === t)
                    return n ? this[0].scrollLeft : this[0].pageXOffset;
                return this.each(n ? function() {
                    this.scrollLeft = e
                }
                : function() {
                    this.scrollTo(e, this.scrollY)
                }
                )
            },
            position: function() {
                if (!this.length)
                    return;
                var t = this[0]
                  , e = this.offsetParent()
                  , i = this.offset()
                  , r = m.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                i.top -= parseFloat(n(t).css("margin-top")) || 0;
                i.left -= parseFloat(n(t).css("margin-left")) || 0;
                r.top += parseFloat(n(e[0]).css("border-top-width")) || 0;
                r.left += parseFloat(n(e[0]).css("border-left-width")) || 0;
                return {
                    top: i.top - r.top,
                    left: i.left - r.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var t = this.offsetParent || u.body;
                    while (t && !m.test(t.nodeName) && n(t).css("position") == "static")
                        t = t.offsetParent;
                    return t
                })
            }
        };
        n.fn.detach = n.fn.remove;
        ["width", "height"].forEach(function(e) {
            var i = e.replace(/./, function(t) {
                return t[0].toUpperCase()
            });
            n.fn[e] = function(r) {
                var o, a = this[0];
                if (r === t)
                    return F(a) ? a["inner" + i] : L(a) ? a.documentElement["scroll" + i] : (o = this.offset()) && o[e];
                else
                    return this.each(function(t) {
                        a = n(this);
                        a.css(e, Y(this, r, t, a[e]()))
                    })
            }
        });
        function Q(t, e) {
            e(t);
            for (var n = 0, i = t.childNodes.length; n < i; n++)
                Q(t.childNodes[n], e)
        }
        y.forEach(function(e, i) {
            var r = i % 2;
            n.fn[e] = function() {
                var e, o = n.map(arguments, function(i) {
                    var r = [];
                    e = D(i);
                    if (e == "array") {
                        i.forEach(function(e) {
                            if (e.nodeType !== t)
                                return r.push(e);
                            else if (n.zepto.isZ(e))
                                return r = r.concat(e.get());
                            r = r.concat(C.fragment(e))
                        });
                        return r
                    }
                    return e == "object" || i == null ? i : C.fragment(i)
                }), a, s = this.length > 1;
                if (o.length < 1)
                    return this;
                return this.each(function(t, e) {
                    a = r ? e : e.parentNode;
                    e = i == 0 ? e.nextSibling : i == 1 ? e.firstChild : i == 2 ? e : null;
                    var f = n.contains(u.documentElement, a);
                    o.forEach(function(t) {
                        if (s)
                            t = t.cloneNode(true);
                        else if (!a)
                            return n(t).remove();
                        a.insertBefore(t, e);
                        if (f)
                            Q(t, function(t) {
                                if (t.nodeName != null && t.nodeName.toUpperCase() === "SCRIPT" && (!t.type || t.type === "text/javascript") && !t.src) {
                                    var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
                                    e["eval"].call(e, t.innerHTML)
                                }
                            })
                    })
                })
            }
            ;
            n.fn[r ? e + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
                n(t)[e](this);
                return this
            }
        });
        C.Z.prototype = H.prototype = n.fn;
        C.uniq = N;
        C.deserializeValue = K;
        n.zepto = C;
        return n
    }();
    window.Zepto = e;
    window.$ === undefined && (window.$ = e);
    (function(t) {
        var e = 1, n, i = Array.prototype.slice, r = t.isFunction, o = function(t) {
            return typeof t == "string"
        }, a = {}, s = {}, u = "onfocusin"in window, f = {
            focus: "focusin",
            blur: "focusout"
        }, c = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents";
        function l(t) {
            return t._zid || (t._zid = e++)
        }
        function h(t, e, n, i) {
            e = p(e);
            if (e.ns)
                var r = d(e.ns);
            return (a[l(t)] || []).filter(function(t) {
                return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || l(t.fn) === l(n)) && (!i || t.sel == i)
            })
        }
        function p(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function d(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function m(t, e) {
            return t.del && (!u && t.e in f) || !!e
        }
        function v(t) {
            return c[t] || u && f[t] || t
        }
        function g(e, i, r, o, s, u, f) {
            var h = l(e)
              , d = a[h] || (a[h] = []);
            i.split(/\s/).forEach(function(i) {
                if (i == "ready")
                    return t(document).ready(r);
                var a = p(i);
                a.fn = r;
                a.sel = s;
                if (a.e in c)
                    r = function(e) {
                        var n = e.relatedTarget;
                        if (!n || n !== this && !t.contains(this, n))
                            return a.fn.apply(this, arguments)
                    }
                    ;
                a.del = u;
                var l = u || r;
                a.proxy = function(t) {
                    t = T(t);
                    if (t.isImmediatePropagationStopped())
                        return;
                    t.data = o;
                    var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));
                    if (i === false)
                        t.preventDefault(),
                        t.stopPropagation();
                    return i
                }
                ;
                a.i = d.length;
                d.push(a);
                if ("addEventListener"in e)
                    e.addEventListener(v(a.e), a.proxy, m(a, f))
            })
        }
        function y(t, e, n, i, r) {
            var o = l(t);
            (e || "").split(/\s/).forEach(function(e) {
                h(t, e, n, i).forEach(function(e) {
                    delete a[o][e.i];
                    if ("removeEventListener"in t)
                        t.removeEventListener(v(e.e), e.proxy, m(e, r))
                })
            })
        }
        t.event = {
            add: g,
            remove: y
        };
        t.proxy = function(e, n) {
            var a = 2 in arguments && i.call(arguments, 2);
            if (r(e)) {
                var s = function() {
                    return e.apply(n, a ? a.concat(i.call(arguments)) : arguments)
                };
                s._zid = l(e);
                return s
            } else if (o(n)) {
                if (a) {
                    a.unshift(e[n], e);
                    return t.proxy.apply(null, a)
                } else {
                    return t.proxy(e[n], e)
                }
            } else {
                throw new TypeError("expected function")
            }
        }
        ;
        t.fn.bind = function(t, e, n) {
            return this.on(t, e, n)
        }
        ;
        t.fn.unbind = function(t, e) {
            return this.off(t, e)
        }
        ;
        t.fn.one = function(t, e, n, i) {
            return this.on(t, e, n, i, 1)
        }
        ;
        var b = function() {
            return true
        }
          , w = function() {
            return false
        }
          , x = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
          , E = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        function T(e, i) {
            if (i || !e.isDefaultPrevented) {
                i || (i = e);
                t.each(E, function(t, n) {
                    var r = i[t];
                    e[t] = function() {
                        this[n] = b;
                        return r && r.apply(i, arguments)
                    }
                    ;
                    e[n] = w
                });
                e.timeStamp || (e.timeStamp = Date.now());
                if (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue"in i ? i.returnValue === false : i.getPreventDefault && i.getPreventDefault())
                    e.isDefaultPrevented = b
            }
            return e
        }
        function S(t) {
            var e, i = {
                originalEvent: t
            };
            for (e in t)
                if (!x.test(e) && t[e] !== n)
                    i[e] = t[e];
            return T(i, t)
        }
        t.fn.delegate = function(t, e, n) {
            return this.on(e, t, n)
        }
        ;
        t.fn.undelegate = function(t, e, n) {
            return this.off(e, t, n)
        }
        ;
        t.fn.live = function(e, n) {
            t(document.body).delegate(this.selector, e, n);
            return this
        }
        ;
        t.fn.die = function(e, n) {
            t(document.body).undelegate(this.selector, e, n);
            return this
        }
        ;
        t.fn.on = function(e, a, s, u, f) {
            var c, l, h = this;
            if (e && !o(e)) {
                t.each(e, function(t, e) {
                    h.on(t, a, s, e, f)
                });
                return h
            }
            if (!o(a) && !r(u) && u !== false)
                u = s,
                s = a,
                a = n;
            if (u === n || s === false)
                u = s,
                s = n;
            if (u === false)
                u = w;
            return h.each(function(n, r) {
                if (f)
                    c = function(t) {
                        y(r, t.type, u);
                        return u.apply(this, arguments)
                    }
                    ;
                if (a)
                    l = function(e) {
                        var n, o = t(e.target).closest(a, r).get(0);
                        if (o && o !== r) {
                            n = t.extend(S(e), {
                                currentTarget: o,
                                liveFired: r
                            });
                            return (c || u).apply(o, [n].concat(i.call(arguments, 1)))
                        }
                    }
                    ;
                g(r, e, u, s, a, l || c)
            })
        }
        ;
        t.fn.off = function(e, i, a) {
            var s = this;
            if (e && !o(e)) {
                t.each(e, function(t, e) {
                    s.off(t, i, e)
                });
                return s
            }
            if (!o(i) && !r(a) && a !== false)
                a = i,
                i = n;
            if (a === false)
                a = w;
            return s.each(function() {
                y(this, e, a, i)
            })
        }
        ;
        t.fn.trigger = function(e, n) {
            e = o(e) || t.isPlainObject(e) ? t.Event(e) : T(e);
            e._args = n;
            return this.each(function() {
                if (e.type in f && typeof this[e.type] == "function")
                    this[e.type]();
                else if ("dispatchEvent"in this)
                    this.dispatchEvent(e);
                else
                    t(this).triggerHandler(e, n)
            })
        }
        ;
        t.fn.triggerHandler = function(e, n) {
            var i, r;
            this.each(function(a, s) {
                i = S(o(e) ? t.Event(e) : e);
                i._args = n;
                i.target = s;
                t.each(h(s, e.type || e), function(t, e) {
                    r = e.proxy(i);
                    if (i.isImmediatePropagationStopped())
                        return false
                })
            });
            return r
        }
        ;
        ("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function(e) {
            t.fn[e] = function(t) {
                return 0 in arguments ? this.bind(e, t) : this.trigger(e)
            }
        });
        t.Event = function(t, e) {
            if (!o(t))
                e = t,
                t = e.type;
            var n = document.createEvent(s[t] || "Events")
              , i = true;
            if (e)
                for (var r in e)
                    r == "bubbles" ? i = !!e[r] : n[r] = e[r];
            n.initEvent(t, i, true);
            return T(n)
        }
    }
    )(e);
    (function(t) {
        var e = +new Date, n = window.document, i, r, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, a = /^(?:text|application)\/javascript/i, s = /^(?:text|application)\/xml/i, u = "application/json", f = "text/html", c = /^\s*$/, l = n.createElement("a");
        l.href = window.location.href;
        function h(e, n, i) {
            var r = t.Event(n);
            t(e).trigger(r, i);
            return !r.isDefaultPrevented()
        }
        function p(t, e, i, r) {
            if (t.global)
                return h(e || n, i, r)
        }
        t.active = 0;
        function d(e) {
            if (e.global && t.active++ === 0)
                p(e, null, "ajaxStart")
        }
        function m(e) {
            if (e.global && !--t.active)
                p(e, null, "ajaxStop")
        }
        function v(t, e) {
            var n = e.context;
            if (e.beforeSend.call(n, t, e) === false || p(e, n, "ajaxBeforeSend", [t, e]) === false)
                return false;
            p(e, n, "ajaxSend", [t, e])
        }
        function g(t, e, n, i) {
            var r = n.context
              , o = "success";
            n.success.call(r, t, o, e);
            if (i)
                i.resolveWith(r, [t, o, e]);
            p(n, r, "ajaxSuccess", [e, n, t]);
            b(o, e, n)
        }
        function y(t, e, n, i, r) {
            var o = i.context;
            i.error.call(o, n, e, t);
            if (r)
                r.rejectWith(o, [n, e, t]);
            p(i, o, "ajaxError", [n, i, t || e]);
            b(e, n, i)
        }
        function b(t, e, n) {
            var i = n.context;
            n.complete.call(i, e, t);
            p(n, i, "ajaxComplete", [e, n]);
            m(n)
        }
        function w(t, e, n) {
            if (n.dataFilter == x)
                return t;
            var i = n.context;
            return n.dataFilter.call(i, t, e)
        }
        function x() {}
        t.ajaxJSONP = function(i, r) {
            if (!("type"in i))
                return t.ajax(i);
            var o = i.jsonpCallback, a = (t.isFunction(o) ? o() : o) || "Zepto" + e++, s = n.createElement("script"), u = window[a], f, c = function(e) {
                t(s).triggerHandler("error", e || "abort")
            }, l = {
                abort: c
            }, h;
            if (r)
                r.promise(l);
            t(s).on("load error", function(e, n) {
                clearTimeout(h);
                t(s).off().remove();
                if (e.type == "error" || !f) {
                    y(null, n || "error", l, i, r)
                } else {
                    g(f[0], l, i, r)
                }
                window[a] = u;
                if (f && t.isFunction(u))
                    u(f[0]);
                u = f = undefined
            });
            if (v(l, i) === false) {
                c("abort");
                return l
            }
            window[a] = function() {
                f = arguments
            }
            ;
            s.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a);
            n.head.appendChild(s);
            if (i.timeout > 0)
                h = setTimeout(function() {
                    c("timeout")
                }, i.timeout);
            return l
        }
        ;
        t.ajaxSettings = {
            type: "GET",
            beforeSend: x,
            success: x,
            error: x,
            complete: x,
            context: null,
            global: true,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: u,
                xml: "application/xml, text/xml",
                html: f,
                text: "text/plain"
            },
            crossDomain: false,
            timeout: 0,
            processData: true,
            cache: true,
            dataFilter: x
        };
        function E(t) {
            if (t)
                t = t.split(";", 2)[0];
            return t && (t == f ? "html" : t == u ? "json" : a.test(t) ? "script" : s.test(t) && "xml") || "text"
        }
        function T(t, e) {
            if (e == "")
                return t;
            return (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function S(e) {
            if (e.processData && e.data && t.type(e.data) != "string")
                e.data = t.param(e.data, e.traditional);
            if (e.data && (!e.type || e.type.toUpperCase() == "GET" || "jsonp" == e.dataType))
                e.url = T(e.url, e.data),
                e.data = undefined
        }
        t.ajax = function(e) {
            var o = t.extend({}, e || {}), a = t.Deferred && t.Deferred(), s, u;
            for (i in t.ajaxSettings)
                if (o[i] === undefined)
                    o[i] = t.ajaxSettings[i];
            d(o);
            if (!o.crossDomain) {
                s = n.createElement("a");
                s.href = o.url;
                s.href = s.href;
                o.crossDomain = l.protocol + "//" + l.host !== s.protocol + "//" + s.host
            }
            if (!o.url)
                o.url = window.location.toString();
            if ((u = o.url.indexOf("#")) > -1)
                o.url = o.url.slice(0, u);
            S(o);
            var f = o.dataType
              , h = /\?.+=\?/.test(o.url);
            if (h)
                f = "jsonp";
            if (o.cache === false || (!e || e.cache !== true) && ("script" == f || "jsonp" == f))
                o.url = T(o.url, "_=" + Date.now());
            if ("jsonp" == f) {
                if (!h)
                    o.url = T(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === false ? "" : "callback=?");
                return t.ajaxJSONP(o, a)
            }
            var p = o.accepts[f], m = {}, b = function(t, e) {
                m[t.toLowerCase()] = [t, e]
            }, j = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol, C = o.xhr(), O = C.setRequestHeader, N;
            if (a)
                a.promise(C);
            if (!o.crossDomain)
                b("X-Requested-With", "XMLHttpRequest");
            b("Accept", p || "*/*");
            if (p = o.mimeType || p) {
                if (p.indexOf(",") > -1)
                    p = p.split(",", 2)[0];
                C.overrideMimeType && C.overrideMimeType(p)
            }
            if (o.contentType || o.contentType !== false && o.data && o.type.toUpperCase() != "GET")
                b("Content-Type", o.contentType || "application/x-www-form-urlencoded");
            if (o.headers)
                for (r in o.headers)
                    b(r, o.headers[r]);
            C.setRequestHeader = b;
            C.onreadystatechange = function() {
                if (C.readyState == 4) {
                    C.onreadystatechange = x;
                    clearTimeout(N);
                    var e, n = false;
                    if (C.status >= 200 && C.status < 300 || C.status == 304 || C.status == 0 && j == "file:") {
                        f = f || E(o.mimeType || C.getResponseHeader("content-type"));
                        if (C.responseType == "arraybuffer" || C.responseType == "blob")
                            e = C.response;
                        else {
                            e = C.responseText;
                            try {
                                e = w(e, f, o);
                                if (f == "script")
                                    (1,
                                    eval)(e);
                                else if (f == "xml")
                                    e = C.responseXML;
                                else if (f == "json")
                                    e = c.test(e) ? null : t.parseJSON(e)
                            } catch (i) {
                                n = i
                            }
                            if (n)
                                return y(n, "parsererror", C, o, a)
                        }
                        g(e, C, o, a)
                    } else {
                        y(C.statusText || null, C.status ? "error" : "abort", C, o, a)
                    }
                }
            }
            ;
            if (v(C, o) === false) {
                C.abort();
                y(null, "abort", C, o, a);
                return C
            }
            var A = "async"in o ? o.async : true;
            C.open(o.type, o.url, A, o.username, o.password);
            if (o.xhrFields)
                for (r in o.xhrFields)
                    C[r] = o.xhrFields[r];
            for (r in m)
                O.apply(C, m[r]);
            if (o.timeout > 0)
                N = setTimeout(function() {
                    C.onreadystatechange = x;
                    C.abort();
                    y(null, "timeout", C, o, a)
                }, o.timeout);
            C.send(o.data ? o.data : null);
            return C
        }
        ;
        function j(e, n, i, r) {
            if (t.isFunction(n))
                r = i,
                i = n,
                n = undefined;
            if (!t.isFunction(i))
                r = i,
                i = undefined;
            return {
                url: e,
                data: n,
                success: i,
                dataType: r
            }
        }
        t.get = function() {
            return t.ajax(j.apply(null, arguments))
        }
        ;
        t.post = function() {
            var e = j.apply(null, arguments);
            e.type = "POST";
            return t.ajax(e)
        }
        ;
        t.getJSON = function() {
            var e = j.apply(null, arguments);
            e.dataType = "json";
            return t.ajax(e)
        }
        ;
        t.fn.load = function(e, n, i) {
            if (!this.length)
                return this;
            var r = this, a = e.split(/\s/), s, u = j(e, n, i), f = u.success;
            if (a.length > 1)
                u.url = a[0],
                s = a[1];
            u.success = function(e) {
                r.html(s ? t("<div>").html(e.replace(o, "")).find(s) : e);
                f && f.apply(r, arguments)
            }
            ;
            t.ajax(u);
            return this
        }
        ;
        var C = encodeURIComponent;
        function O(e, n, i, r) {
            var o, a = t.isArray(n), s = t.isPlainObject(n);
            t.each(n, function(n, u) {
                o = t.type(u);
                if (r)
                    n = i ? r : r + "[" + (s || o == "object" || o == "array" ? n : "") + "]";
                if (!r && a)
                    e.add(u.name, u.value);
                else if (o == "array" || !i && o == "object")
                    O(e, u, i, n);
                else
                    e.add(n, u)
            })
        }
        t.param = function(e, n) {
            var i = [];
            i.add = function(e, n) {
                if (t.isFunction(n))
                    n = n();
                if (n == null)
                    n = "";
                this.push(C(e) + "=" + C(n))
            }
            ;
            O(i, e, n);
            return i.join("&").replace(/%20/g, "+")
        }
    }
    )(e);
    (function(t) {
        t.fn.serializeArray = function() {
            var e, n, i = [], r = function(t) {
                if (t.forEach)
                    return t.forEach(r);
                i.push({
                    name: e,
                    value: t
                })
            };
            if (this[0])
                t.each(this[0].elements, function(i, o) {
                    n = o.type,
                    e = o.name;
                    if (e && o.nodeName.toLowerCase() != "fieldset" && !o.disabled && n != "submit" && n != "reset" && n != "button" && n != "file" && (n != "radio" && n != "checkbox" || o.checked))
                        r(t(o).val())
                });
            return i
        }
        ;
        t.fn.serialize = function() {
            var t = [];
            this.serializeArray().forEach(function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            });
            return t.join("&")
        }
        ;
        t.fn.submit = function(e) {
            if (0 in arguments)
                this.bind("submit", e);
            else if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n);
                if (!n.isDefaultPrevented())
                    this.get(0).submit()
            }
            return this
        }
    }
    )(e);
    (function() {
        try {
            getComputedStyle(undefined)
        } catch (t) {
            var e = getComputedStyle;
            window.getComputedStyle = function(t, n) {
                try {
                    return e(t, n)
                } catch (i) {
                    return null
                }
            }
        }
    }
    )();
    (function(t) {
        function e(t, e) {
            var n = this.os = {}
              , i = this.browser = {}
              , r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/)
              , o = t.match(/(Android);?[\s\/]+([\d.]+)?/)
              , a = !!t.match(/\(Macintosh\; Intel /)
              , s = t.match(/(iPad).*OS\s([\d_]+)/)
              , u = t.match(/(iPod)(.*OS\s([\d_]+))?/)
              , f = !s && t.match(/(iPhone\sOS)\s([\d_]+)/)
              , c = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
              , l = /Win\d{2}|Windows/.test(e)
              , h = t.match(/Windows Phone ([\d.]+)/)
              , p = c && t.match(/TouchPad/)
              , d = t.match(/Kindle\/([\d.]+)/)
              , m = t.match(/Silk\/([\d._]+)/)
              , v = t.match(/(BlackBerry).*Version\/([\d.]+)/)
              , g = t.match(/(BB10).*Version\/([\d.]+)/)
              , y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
              , b = t.match(/PlayBook/)
              , w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/)
              , x = t.match(/Firefox\/([\d.]+)/)
              , E = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/)
              , T = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
              , S = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
              , j = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
            if (i.webkit = !!r)
                i.version = r[1];
            if (o)
                n.android = true,
                n.version = o[2];
            if (f && !u)
                n.ios = n.iphone = true,
                n.version = f[2].replace(/_/g, ".");
            if (s)
                n.ios = n.ipad = true,
                n.version = s[2].replace(/_/g, ".");
            if (u)
                n.ios = n.ipod = true,
                n.version = u[3] ? u[3].replace(/_/g, ".") : null;
            if (h)
                n.wp = true,
                n.version = h[1];
            if (c)
                n.webos = true,
                n.version = c[2];
            if (p)
                n.touchpad = true;
            if (v)
                n.blackberry = true,
                n.version = v[2];
            if (g)
                n.bb10 = true,
                n.version = g[2];
            if (y)
                n.rimtabletos = true,
                n.version = y[2];
            if (b)
                i.playbook = true;
            if (d)
                n.kindle = true,
                n.version = d[1];
            if (m)
                i.silk = true,
                i.version = m[1];
            if (!m && n.android && t.match(/Kindle Fire/))
                i.silk = true;
            if (w)
                i.chrome = true,
                i.version = w[1];
            if (x)
                i.firefox = true,
                i.version = x[1];
            if (E)
                n.firefoxos = true,
                n.version = E[1];
            if (T)
                i.ie = true,
                i.version = T[1];
            if (j && (a || n.ios || l)) {
                i.safari = true;
                if (!n.ios)
                    i.version = j[1]
            }
            if (S)
                i.webview = true;
            n.tablet = !!(s || b || o && !t.match(/Mobile/) || x && t.match(/Tablet/) || T && !t.match(/Phone/) && t.match(/Touch/));
            n.phone = !!(!n.tablet && !n.ipod && (o || f || c || v || g || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || T && t.match(/Touch/)))
        }
        e.call(t, navigator.userAgent, navigator.platform);
        t.__detect = e
    }
    )(e);
    (function(t) {
        var e = [], n;
        t.fn.remove = function() {
            return this.each(function() {
                if (this.parentNode) {
                    if (this.tagName === "IMG") {
                        e.push(this);
                        this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                        if (n)
                            clearTimeout(n);
                        n = setTimeout(function() {
                            e = []
                        }, 6e4)
                    }
                    this.parentNode.removeChild(this)
                }
            })
        }
    }
    )(e);
    (function(t) {
        var e = {}
          , n = t.fn.data
          , i = t.camelCase
          , r = t.expando = "Zepto" + +new Date
          , o = [];
        function a(o, a) {
            var u = o[r]
              , f = u && e[u];
            if (a === undefined)
                return f || s(o);
            else {
                if (f) {
                    if (a in f)
                        return f[a];
                    var c = i(a);
                    if (c in f)
                        return f[c]
                }
                return n.call(t(o), a)
            }
        }
        function s(n, o, a) {
            var s = n[r] || (n[r] = ++t.uuid)
              , f = e[s] || (e[s] = u(n));
            if (o !== undefined)
                f[i(o)] = a;
            return f
        }
        function u(e) {
            var n = {};
            t.each(e.attributes || o, function(e, r) {
                if (r.name.indexOf("data-") == 0)
                    n[i(r.name.replace("data-", ""))] = t.zepto.deserializeValue(r.value)
            });
            return n
        }
        t.fn.data = function(e, n) {
            return n === undefined ? t.isPlainObject(e) ? this.each(function(n, i) {
                t.each(e, function(t, e) {
                    s(i, t, e)
                })
            }) : 0 in this ? a(this[0], e) : undefined : this.each(function() {
                s(this, e, n)
            })
        }
        ;
        t.data = function(e, n, i) {
            return t(e).data(n, i)
        }
        ;
        t.hasData = function(n) {
            var i = n[r]
              , o = i && e[i];
            return o ? !t.isEmptyObject(o) : false
        }
        ;
        t.fn.removeData = function(n) {
            if (typeof n == "string")
                n = n.split(/\s+/);
            return this.each(function() {
                var o = this[r]
                  , a = o && e[o];
                if (a)
                    t.each(n || a, function(t) {
                        delete a[n ? i(this) : t]
                    })
            })
        }
        ;
        ["remove", "empty"].forEach(function(e) {
            var n = t.fn[e];
            t.fn[e] = function() {
                var t = this.find("*");
                if (e === "remove")
                    t = t.add(this);
                t.removeData();
                return n.call(this)
            }
        })
    }
    )(e);
    (function(t) {
        var e = Array.prototype.slice;
        function n(e) {
            var i = [["resolve", "done", t.Callbacks({
                once: 1,
                memory: 1
            }), "resolved"], ["reject", "fail", t.Callbacks({
                once: 1,
                memory: 1
            }), "rejected"], ["notify", "progress", t.Callbacks({
                memory: 1
            })]]
              , r = "pending"
              , o = {
                state: function() {
                    return r
                },
                always: function() {
                    a.done(arguments).fail(arguments);
                    return this
                },
                then: function() {
                    var e = arguments;
                    return n(function(n) {
                        t.each(i, function(i, r) {
                            var s = t.isFunction(e[i]) && e[i];
                            a[r[1]](function() {
                                var e = s && s.apply(this, arguments);
                                if (e && t.isFunction(e.promise)) {
                                    e.promise().done(n.resolve).fail(n.reject).progress(n.notify)
                                } else {
                                    var i = this === o ? n.promise() : this
                                      , a = s ? [e] : arguments;
                                    n[r[0] + "With"](i, a)
                                }
                            })
                        });
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return e != null ? t.extend(e, o) : o
                }
            }
              , a = {};
            t.each(i, function(t, e) {
                var n = e[2]
                  , s = e[3];
                o[e[1]] = n.add;
                if (s) {
                    n.add(function() {
                        r = s
                    }, i[t ^ 1][2].disable, i[2][2].lock)
                }
                a[e[0]] = function() {
                    a[e[0] + "With"](this === a ? o : this, arguments);
                    return this
                }
                ;
                a[e[0] + "With"] = n.fireWith
            });
            o.promise(a);
            if (e)
                e.call(a, a);
            return a
        }
        t.when = function(i) {
            var r = e.call(arguments), o = r.length, a = 0, s = o !== 1 || i && t.isFunction(i.promise) ? o : 0, u = s === 1 ? i : n(), f, c, l, h = function(t, n, i) {
                return function(r) {
                    n[t] = this;
                    i[t] = arguments.length > 1 ? e.call(arguments) : r;
                    if (i === f) {
                        u.notifyWith(n, i)
                    } else if (!--s) {
                        u.resolveWith(n, i)
                    }
                }
            };
            if (o > 1) {
                f = new Array(o);
                c = new Array(o);
                l = new Array(o);
                for (; a < o; ++a) {
                    if (r[a] && t.isFunction(r[a].promise)) {
                        r[a].promise().done(h(a, l, r)).fail(u.reject).progress(h(a, c, f))
                    } else {
                        --s
                    }
                }
            }
            if (!s)
                u.resolveWith(l, r);
            return u.promise()
        }
        ;
        t.Deferred = n
    }
    )(e);
    (function(t) {
        t.Callbacks = function(e) {
            e = t.extend({}, e);
            var n, i, r, o, a, s, u = [], f = !e.once && [], c = function(t) {
                n = e.memory && t;
                i = true;
                s = o || 0;
                o = 0;
                a = u.length;
                r = true;
                for (; u && s < a; ++s) {
                    if (u[s].apply(t[0], t[1]) === false && e.stopOnFalse) {
                        n = false;
                        break
                    }
                }
                r = false;
                if (u) {
                    if (f)
                        f.length && c(f.shift());
                    else if (n)
                        u.length = 0;
                    else
                        l.disable()
                }
            }, l = {
                add: function() {
                    if (u) {
                        var i = u.length
                          , s = function(n) {
                            t.each(n, function(t, n) {
                                if (typeof n === "function") {
                                    if (!e.unique || !l.has(n))
                                        u.push(n)
                                } else if (n && n.length && typeof n !== "string")
                                    s(n)
                            })
                        };
                        s(arguments);
                        if (r)
                            a = u.length;
                        else if (n) {
                            o = i;
                            c(n)
                        }
                    }
                    return this
                },
                remove: function() {
                    if (u) {
                        t.each(arguments, function(e, n) {
                            var i;
                            while ((i = t.inArray(n, u, i)) > -1) {
                                u.splice(i, 1);
                                if (r) {
                                    if (i <= a)
                                        --a;
                                    if (i <= s)
                                        --s
                                }
                            }
                        })
                    }
                    return this
                },
                has: function(e) {
                    return !!(u && (e ? t.inArray(e, u) > -1 : u.length))
                },
                empty: function() {
                    a = u.length = 0;
                    return this
                },
                disable: function() {
                    u = f = n = undefined;
                    return this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    f = undefined;
                    if (!n)
                        l.disable();
                    return this
                },
                locked: function() {
                    return !f
                },
                fireWith: function(t, e) {
                    if (u && (!i || f)) {
                        e = e || [];
                        e = [t, e.slice ? e.slice() : e];
                        if (r)
                            f.push(e);
                        else
                            c(e)
                    }
                    return this
                },
                fire: function() {
                    return l.fireWith(this, arguments)
                },
                fired: function() {
                    return !!i
                }
            };
            return l
        }
    }
    )(e);
    (function(t) {
        var e = t.zepto
          , n = e.qsa
          , i = e.matches;
        function r(e) {
            e = t(e);
            return !!(e.width() || e.height()) && e.css("display") !== "none"
        }
        var o = t.expr[":"] = {
            visible: function() {
                if (r(this))
                    return this
            },
            hidden: function() {
                if (!r(this))
                    return this
            },
            selected: function() {
                if (this.selected)
                    return this
            },
            checked: function() {
                if (this.checked)
                    return this
            },
            parent: function() {
                return this.parentNode
            },
            first: function(t) {
                if (t === 0)
                    return this
            },
            last: function(t, e) {
                if (t === e.length - 1)
                    return this
            },
            eq: function(t, e, n) {
                if (t === n)
                    return this
            },
            contains: function(e, n, i) {
                if (t(this).text().indexOf(i) > -1)
                    return this
            },
            has: function(t, n, i) {
                if (e.qsa(this, i).length)
                    return this
            }
        };
        var a = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*")
          , s = /^\s*>/
          , u = "Zepto" + +new Date;
        function f(t, e) {
            t = t.replace(/=#\]/g, '="#"]');
            var n, i, r = a.exec(t);
            if (r && r[2]in o) {
                n = o[r[2]],
                i = r[3];
                t = r[1];
                if (i) {
                    var s = Number(i);
                    if (isNaN(s))
                        i = i.replace(/^["']|["']$/g, "");
                    else
                        i = s
                }
            }
            return e(t, n, i)
        }
        e.qsa = function(i, r) {
            return f(r, function(o, a, f) {
                try {
                    var c;
                    if (!o && a)
                        o = "*";
                    else if (s.test(o))
                        c = t(i).addClass(u),
                        o = "." + u + " " + o;
                    var l = n(i, o)
                } catch (h) {
                    console.error("error performing selector: %o", r);
                    throw h
                } finally {
                    if (c)
                        c.removeClass(u)
                }
                return !a ? l : e.uniq(t.map(l, function(t, e) {
                    return a.call(t, e, l, f)
                }))
            })
        }
        ;
        e.matches = function(t, e) {
            return f(e, function(e, n, r) {
                return (!e || i(t, e)) && (!n || n.call(t, null, r) === t)
            })
        }
    }
    )(e);
    (function(t) {
        var e = {}, n, i, r, o, a = 750, s;
        function u(t, e, n, i) {
            return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
        }
        function f() {
            o = null;
            if (e.last) {
                e.el.trigger("longTap");
                e = {}
            }
        }
        function c() {
            if (o)
                clearTimeout(o);
            o = null
        }
        function l() {
            if (n)
                clearTimeout(n);
            if (i)
                clearTimeout(i);
            if (r)
                clearTimeout(r);
            if (o)
                clearTimeout(o);
            n = i = r = o = null;
            e = {}
        }
        function h(t) {
            return (t.pointerType == "touch" || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
        }
        function p(t, e) {
            return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
        }
        t(document).ready(function() {
            var d, m, v = 0, g = 0, y, b;
            if ("MSGesture"in window) {
                s = new MSGesture;
                s.target = document.body
            }
            t(document).bind("MSGestureEnd", function(t) {
                var n = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                if (n) {
                    e.el.trigger("swipe");
                    e.el.trigger("swipe" + n)
                }
            }).on("touchstart MSPointerDown pointerdown", function(i) {
                if ((b = p(i, "down")) && !h(i))
                    return;
                y = b ? i : i.touches[0];
                if (i.touches && i.touches.length === 1 && e.x2) {
                    e.x2 = undefined;
                    e.y2 = undefined
                }
                d = Date.now();
                m = d - (e.last || d);
                e.el = t("tagName"in y.target ? y.target : y.target.parentNode);
                n && clearTimeout(n);
                e.x1 = y.pageX;
                e.y1 = y.pageY;
                if (m > 0 && m <= 250)
                    e.isDoubleTap = true;
                e.last = d;
                o = setTimeout(f, a);
                if (s && b)
                    s.addPointer(i.pointerId)
            }).on("touchmove MSPointerMove pointermove", function(t) {
                if ((b = p(t, "move")) && !h(t))
                    return;
                y = b ? t : t.touches[0];
                c();
                e.x2 = y.pageX;
                e.y2 = y.pageY;
                v += Math.abs(e.x1 - e.x2);
                g += Math.abs(e.y1 - e.y2)
            }).on("touchend MSPointerUp pointerup", function(o) {
                if ((b = p(o, "up")) && !h(o))
                    return;
                c();
                if (e.x2 && Math.abs(e.x1 - e.x2) > 30 || e.y2 && Math.abs(e.y1 - e.y2) > 30)
                    r = setTimeout(function() {
                        if (e.el) {
                            e.el.trigger("swipe");
                            e.el.trigger("swipe" + u(e.x1, e.x2, e.y1, e.y2))
                        }
                        e = {}
                    }, 0);
                else if ("last"in e)
                    if (v < 30 && g < 30) {
                        i = setTimeout(function() {
                            var i = t.Event("tap");
                            i.pageX = e.x2 || e.x1 || 0;
                            i.pageY = e.y2 || e.y1 || 0;
                            i.cancelTouch = l;
                            if (e.el)
                                e.el.trigger(i);
                            if (e.isDoubleTap) {
                                if (e.el)
                                    e.el.trigger("doubleTap");
                                e = {}
                            } else {
                                n = setTimeout(function() {
                                    n = null;
                                    if (e.el)
                                        e.el.trigger("singleTap");
                                    e = {}
                                }, 250)
                            }
                        }, 0)
                    } else {
                        e = {}
                    }
                v = g = 0
            }).on("touchcancel MSPointerCancel pointercancel", l);
            t(window).on("scroll", l)
        });
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
            t.fn[e] = function(t) {
                return this.on(e, t)
            }
        })
    }
    )(e);
    (function(t) {
        if (t.os.ios) {
            var e = {}, n;
            function i(t) {
                return "tagName"in t ? t : t.parentNode
            }
            t(document).bind("gesturestart", function(t) {
                var r = Date.now()
                  , o = r - (e.last || r);
                e.target = i(t.target);
                n && clearTimeout(n);
                e.e1 = t.scale;
                e.last = r
            }).bind("gesturechange", function(t) {
                e.e2 = t.scale
            }).bind("gestureend", function(n) {
                if (e.e2 > 0) {
                    Math.abs(e.e1 - e.e2) != 0 && t(e.target).trigger("pinch") && t(e.target).trigger("pinch" + (e.e1 - e.e2 > 0 ? "In" : "Out"));
                    e.e1 = e.e2 = e.last = 0
                } else if ("last"in e) {
                    e = {}
                }
            });
            ["pinch", "pinchIn", "pinchOut"].forEach(function(e) {
                t.fn[e] = function(t) {
                    return this.bind(e, t)
                }
            })
        }
    }
    )(e);
    (function(t) {
        t.fn.end = function() {
            return this.prevObject || t()
        }
        ;
        t.fn.andSelf = function() {
            return this.add(this.prevObject || t())
        }
        ;
        "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(e) {
            var n = t.fn[e];
            t.fn[e] = function() {
                var t = n.apply(this, arguments);
                t.prevObject = this;
                return t
            }
        })
    }
    )(e);
    (function(t) {
        if (String.prototype.trim === t)
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, "")
            }
            ;
        if (Array.prototype.reduce === t)
            Array.prototype.reduce = function(e) {
                if (this === void 0 || this === null)
                    throw new TypeError;
                var n = Object(this), i = n.length >>> 0, r = 0, o;
                if (typeof e != "function")
                    throw new TypeError;
                if (i == 0 && arguments.length == 1)
                    throw new TypeError;
                if (arguments.length >= 2)
                    o = arguments[1];
                else
                    do {
                        if (r in n) {
                            o = n[r++];
                            break
                        }
                        if (++r >= i)
                            throw new TypeError
                    } while (true);while (r < i) {
                    if (r in n)
                        o = e.call(t, o, n[r], r, n);
                    r++
                }
                return o
            }
    }
    )();
    return t.exports = exports = e
});
define("url", function(require, exports, module) {
    var _cacheThisModule_;
    module.exports = {
        setHash: function(e) {
            setTimeout(function() {
                location.hash = e
            }, 0)
        },
        getHash: function(e) {
            var t = e || location.hash;
            return t ? t.replace(/.*#/, "") : ""
        },
        getHashModelName: function() {
            var e = this.getHash();
            return e ? e.split("&")[0].split("=")[0] : []
        },
        getHashActionName: function() {
            var e = this.getHash();
            return e == "" ? "" : (e ? e.split("&") : [])[0].split("=")[1]
        },
        getHashParam: function(e) {
            var t = this.getHash().match(new RegExp("(^|&)" + e + "=([^&]*)(&|$)"));
            return t != null ? t[2] : ""
        },
        getUrlParam: function(e, t) {
            var n = arguments[1] || window.location.search
              , r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)","i")
              , i = n.substr(n.indexOf("?") + 1).match(r);
            return i != null ? i[2] : ""
        },
        getParams: function() {
            var e = []
              , t = this.getHash();
            paramArr = t ? t.split("&") : [];
            for (var n = 1, r = paramArr.length; n < r; n++)
                e.push(paramArr[n]);
            return e
        },
        decodeUrl: function(e) {
            e = decodeURIComponent(e);
            var t = this.parseUrl(e)
              , n = [];
            $.each(t.params, function(e, t) {
                t = decodeURIComponent(t),
                n.push(e + "=" + t)
            });
            var r = e.split("?")[0];
            return r + "?" + n.join("&")
        },
        parseUrl: function(e) {
            var t = document.createElement("a");
            return t.href = e,
            {
                source: e,
                protocol: t.protocol.replace(":", ""),
                host: t.hostname,
                port: t.port,
                query: t.search,
                params: function() {
                    var e = {}, n = t.search.replace(/^\?/, "").split("&"), r = n.length, i = 0, s;
                    for (; i < r; i++) {
                        if (!n[i])
                            continue;
                        s = n[i].split("="),
                        e[s[0]] = s[1]
                    }
                    return e
                }(),
                file: (t.pathname.match(/([^\/?#]+)$/i) || [, ""])[1],
                hash: t.hash.replace("#", ""),
                path: t.pathname.replace(/^([^\/])/, "/$1"),
                relative: (t.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
                segments: t.pathname.replace(/^\//, "").split("/")
            }
        },
        replaceParam: function(e, t, n, r) {
            n = n || location.href;
            var i = new RegExp("([\\?&]" + e + "=)[^&#]*");
            return n.match(i) ? r ? n.replace(i, "$1" + t) : n : n.indexOf("?") == -1 ? n + "?" + e + "=" + t : n + "&" + e + "=" + t
        }
    }
});
;define("loopScroll", function(require, exports, t) {
    var _cacheThisModule_;
    var i = require("zepto");
    var e = function(t) {
        this.opt = {
            tp: "text",
            moveDom: null,
            moveChild: [],
            tab: [],
            viewDom: null,
            touchDom2: [],
            sp: {
                x: 0,
                y: 0
            },
            min: 0,
            minp: 0,
            step: 0,
            len: 1,
            index: 1,
            offset: 0,
            loadImg: false,
            image: [],
            loopScroll: false,
            lockScrY: false,
            stopOnce: false,
            autoTime: 0,
            holdAuto: false,
            tabClass: "cur",
            transition: .3,
            imgInit: true,
            imgInitLazy: 4e3,
            enableTransX: false,
            transXVal: 100,
            useVue: false,
            ignoreAppend: false,
            fun: function() {}
        };
        i.extend(this, this.opt, t);
        this.len = this.moveChild.length;
        this.min = this.min || {
            text: 100,
            img: 1
        }[this.tp];
        this.minp = this.minp || Math.max(this.min, 30);
        if (!this.viewDom)
            this.viewDom = i(window);
        if (this.len > 1)
            this.startEvent();
        if (this.loadImg)
            this.image = this.moveDom.find("img");
        this.resize(this.step || this.moveChild.eq(0).width());
        if (this.autoTime) {
            var e = this;
            setInterval(function() {
                if (!e.holdAuto) {
                    if (!e.stopOnce)
                        e.stepMove(e.index + 1);
                    e.stopOnce = false
                }
            }, this.autoTime)
        }
    };
    i.extend(e.prototype, {
        resize: function(t) {
            this.step = t || this.step;
            var i = (this.viewDom.width() - this.step) / 2;
            this.offset = this.loopScroll ? this.step - i : i;
            if (this.len == 1)
                this.offset = -i;
            this.stepMove(this.index, true)
        },
        addChild: function(t, i) {
            if (!this.loopScroll)
                return;
            this.moveChild.eq(0).after(t);
            this.len += 1;
            this.tab.eq(this.len - 2).after(i);
            this.tab = this.tab.parent().children();
            if (this.len == 2) {
                this.moveChild = this.moveDom.children();
                this.startEvent()
            } else {
                this.stepMove(2)
            }
        },
        startEvent: function() {
            var t = this
              , e = this.moveDom.get(0)
              , s = function(i) {
                i.addEventListener("touchstart", t, false);
                i.addEventListener("touchmove", t, false);
                i.addEventListener("touchend", t, false);
                i.addEventListener("touchcancel", t, false);
                i.addEventListener("webkitTransitionEnd", t, false)
            };
            s(e);
            this.tab.each(function(e, s) {
                i(s).attr("no", e + 1);
                i(s).click(function() {
                    t.stepMove(i(this).attr("no"))
                })
            });
            if (this.loopScroll) {
                var n = this.moveChild.eq(0).clone().attr({
                    id: "",
                    onload: ""
                });
                n.find("img").attr({
                    id: "",
                    onload: ""
                });
                !this.ignoreAppend && this.moveDom.append(n);
                var o = this.moveChild.eq(this.len - 1).clone().attr({
                    id: "",
                    onload: ""
                });
                o.find("img").attr({
                    id: "",
                    onload: ""
                });
                !this.ignoreAppend && this.moveDom.prepend(o)
            }
            for (var h = 0; h < this.touchDom2.length; h++) {
                s(this.touchDom2[h])
            }
        },
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
                this.sp = this.getPosition(t);
                this.holdAuto = true;
                this.stopOnce = true;
                break;
            case "touchmove":
                this.touchmove(t);
                break;
            case "touchend":
            case "touchcancel":
                this.move(t);
                this.holdAuto = false;
                break;
            case "webkitTransitionEnd":
                t.preventDefault();
                break
            }
        },
        getPosition: function(t) {
            var i = t.changedTouches ? t.changedTouches[0] : t;
            return {
                x: i.pageX,
                y: i.pageY
            }
        },
        touchmove: function(t) {
            var i = this.getPosition(t)
              , e = i.x - this.sp.x
              , s = i.y - this.sp.y;
            if (Math.abs(e) - Math.abs(s) > this.min) {
                t.preventDefault();
                var n = e - this.step * (this.index - 1) - this.offset;
                !this.useVue && this.moveDom.css({
                    "-webkit-backface-visibility": "hidden",
                    "-webkit-transform": this.enableTransX ? "translateX(" + (this.loopScroll ? this.index : this.index - 1) * -this.transXVal + "%)" : "translate3D(" + n + "px,0,0)",
                    "-webkit-transition": "0"
                })
            } else {
                if (!this.lockScrY)
                    t.preventDefault()
            }
        },
        move: function(t) {
            var i = this.getPosition(t)
              , e = i.x - this.sp.x
              , s = i.y - this.sp.y;
            if (Math.abs(e) < Math.abs(s) || Math.abs(e) < this.minp) {
                this.stepMove(this.index);
                return
            }
            if (e > 0) {
                t.preventDefault();
                this.stepMove(this.index - 1)
            } else {
                t.preventDefault();
                this.stepMove(this.index + 1)
            }
        },
        loadImage: function(t) {
            var e = this.image;
            var s = function(t) {
                if (e[t] && i(e[t]).attr("back_src")) {
                    e[t].src = i(e[t]).attr("back_src");
                    i(e[t]).removeAttr("back_src")
                }
            };
            s(t);
            (function(t, i, e) {
                setTimeout(function() {
                    s(t - 1);
                    s(t + 1)
                }, i ? e : 0)
            }
            )(t, this.imgInit, this.imgInitLazy);
            this.imgInit = false
        },
        stepMove: function(t, i) {
            this.index = t > this.len ? this.len : t < 1 ? 1 : t;
            this.tab.removeClass(this.tabClass);
            this.tab.eq(this.index - 1).addClass(this.tabClass);
            var e = -this.step * ((this.loopScroll ? t : this.index) - 1) - this.offset;
            !this.useVue && this.moveDom.css({
                "-webkit-transform": this.enableTransX ? "translateX(" + (this.loopScroll ? t : this.index - 1) * -this.transXVal + "%)" : "translate3D(" + e + "px,0,0)",
                "-webkit-transition": i ? "0ms" : "all " + this.transition + "s ease"
            });
            if (this.loadImg)
                this.loadImage(this.index);
            this.fun(this.index);
            if (this.loopScroll && !i) {
                var s = this
                  , n = t;
                if (t <= 0)
                    n = this.len;
                if (t > this.len)
                    n = 1;
                if (n != t)
                    setTimeout(function() {
                        s.stepMove(n, true)
                    }, this.transition * 1e3)
            }
        },
        _isOutScreen: function(t) {
            return t.offset().top >= i(window).height() + window.scrollY || t.offset().top + t.height() < window.scrollY
        },
        _isElementHidden: function(t) {
            var i = t.parents().concat();
            i.unshift(t[0]);
            return i.some(function(t) {
                if (getComputedStyle(t, "").getPropertyValue("display") == "none") {
                    return true
                }
            })
        }
    });
    exports.init = function(t) {
        return new e(t)
    }
});

define('loadJs', function(require, exports, module) {
    var _cacheThisModule_;
    var ck = require('cookie');
    var callbackNameCount = {}
      , letterMap = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    function transToLetter(num) {
        var arr = (num + '').split('')
          , v = [];
        for (var i = 0; i < arr.length; i++) {
            v.push(letterMap[arr[i]])
        }
        return v.join('');
    }
    function callbackNameUnique(str) {
        if (!callbackNameCount[str]) {
            callbackNameCount[str] = 1;
        } else {
            callbackNameCount[str] += 1;
        }
        return str + transToLetter(callbackNameCount[str]);
    }
    function ignoreUrl(url) {
        return url.indexOf('wq.360buyimg.com') > -1 || url.indexOf('wqs.jd.com') > -1 || url.indexOf("wqcoss.jd.com/mcoss/") > -1 || url.indexOf("btshow.jd.com/queryBtPlanInfo.do") > -1 || url.indexOf('storage.360buyimg.com') > -1;
    }
    function sendJs(url, opt) {
        var option = {
            onLoad: null,
            onError: null,
            onTimeout: null,
            timeout: 8000,
            isToken: true,
            keepProtocol: false,
            charset: "utf-8",
            setReportUrl: ""
        };
        var code = 0;
        var timer;
        var clear = function() {
            if (!el) {
                return;
            }
            timer && clearTimeout(timer);
            el.onload = el.onreadystatechange = el.onerror = null;
            el.parentNode && (el.parentNode.removeChild(el));
            el = null;
        }
        if (arguments.length == 1) {
            if (typeof arguments[0] == "object") {
                opt = arguments[0];
                url = opt.url;
            } else {
                opt = {};
            }
        }
        if (typeof (opt.data) == 'object') {
            var param = [];
            for (var k in opt.data) {
                param.push(k + '=' + opt.data[k])
            }
            if (param.length > 0) {
                param = param.join('&');
                url += (url.indexOf('?') > 0 ? '&' : '?') + param;
            }
        }
        if (window.traceid) {
            var lh = url.split('#');
            url += (lh[0].indexOf('?') > 0 ? '&' : '?') + 'traceid=' + window.traceid + (lh[1] ? '#' + lh[1] : '');
        }
        for (var i in opt) {
            if (opt.hasOwnProperty(i)) {
                option[i] = opt[i];
            }
        }
        var el = document.createElement("script");
        el.charset = option.charset || "utf-8";
        var needCheck = false;
        var cgiLoadOK = false;
        var reportUrl = "";
        if (opt.setReportUrl && typeof opt.setReportUrl == "function") {
            reportUrl = opt.setReportUrl();
            !reportUrl && (reportUrl = url);
        } else {
            reportUrl = window.CGI302ReportKeepUrl ? url : url.replace(/\?.*/, '');
        }
        el.onload = el.onreadystatechange = function() {
            if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
                option.onLoad && option.onLoad();
                if (needCheck && !cgiLoadOK) {
                    if (window.JD) {
                        JD.report.umpBiz({
                            bizid: 24,
                            operation: 3,
                            result: "1",
                            source: 0,
                            message: reportUrl
                        });
                    }
                    option.onError && option.onError();
                    window.onerror('', '', '', '', {
                        stack: 'servererror:' + reportUrl
                    });
                    console.log('loadJs Failed:' + url);
                }
                clear();
            }
        }
        ;
        el.onerror = function() {
            window.__reloadResource && __reloadResource(el);
            option.onError && option.onError();
            clear();
        }
        ;
        var targetUrl = option.isToken ? addToken(url, "ls") : url;
        if (!ignoreUrl(targetUrl)) {
            var originFunctionName;
            var newFunctionName;
            var originFunction;
            var newUrl = targetUrl.replace(/callback=([^&]+)/, function(a, b) {
                originFunctionName = b;
                newFunctionName = callbackNameUnique(originFunctionName);
                return 'callback=' + newFunctionName;
            });
            if (originFunctionName && window[originFunctionName]) {
                needCheck = true;
                targetUrl = newUrl;
                originFunction = window[originFunctionName];
                window[newFunctionName] = function(d) {
                    cgiLoadOK = true;
                    originFunction(d, code);
                }
                ;
            }
        }
        if (window.JD) {
            targetUrl = JD.url.getCgiUrl(targetUrl);
        }
        el.src = option.keepProtocol ? targetUrl : targetUrl.replace(/^http(s?):/, "");
        !opt.cancleLog && console.log('loadJs request:' + el.src);
        document.getElementsByTagName('head')[0].appendChild(el);
        if (typeof option.onTimeout == "function") {
            timer = setTimeout(function() {
                code = 1;
                option.onTimeout();
            }, option.timeout);
        }
    }
    ;function addToken(url, type) {
        if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
            return url;
        }
        var wq_token = getToken("wq_skey");
        var pt_token = getToken("pt_key");
        var parts = url.split("#");
        var parts2 = parts[0].split("?");
        var path = parts2[0];
        var param = (parts2.length == 2 ? parts2[1] : "").split("&");
        var hash = parts.length == 2 ? parts[1] : "";
        var hasSceneval = false;
        param = param.filter(function(m) {
            if (m.match(/^sceneval=/))
                hasSceneval = true
            return !(/g_tk=\d+/.test(m) || /g_pt_tk=\d+/.test(m) || /g_ty=\w+/.test(m));
        });
        wq_token && param.push("g_tk=" + wq_token);
        pt_token && param.push("g_pt_tk=" + pt_token);
        (wq_token || pt_token) && param.push("g_ty=" + type);
        if (!hasSceneval && window.location && location.href.match(/(\?|&)sceneval=2/)) {
            param.push("sceneval=2");
        }
        var paramStr = param.join("&");
        return path + (paramStr ? ("?" + paramStr) : "") + (hash ? ("#" + hash) : "");
    }
    ;function getToken(key) {
        key = key || "wq_skey";
        var skey = ck.get(key);
        return skey ? time33(skey) : "";
    }
    ;function time33(str) {
        for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        }
        return hash & 0x7fffffff;
    }
    exports.loadScript = function(url, opt) {
        var args = [].slice.call(arguments);
        setTimeout(function() {
            sendJs.apply(null, args);
        }, 0);
    }
    ;
    exports.addToken = addToken;
});
define("util", function(require, exports, e) {
    var _cacheThisModule_;
    var t = require("zepto")
      , n = require("loadJs");
    function r(e, n, r) {
        var o = document.documentElement.clientHeight
          , i = t(document.body).scrollTop()
          , a = o + i
          , u = n || 0
          , c = e.offset()
          , l = c.top - u
          , f = l + c.height
          , s = r || "";
        if (s === "up") {
            if (f < i) {
                return true
            }
        } else if (s === "down") {
            if (l > a) {
                return true
            }
        } else if (s === "partup") {
            if (l < i) {
                return true
            }
        } else if (s === "partdown") {
            if (f > a) {
                return true
            }
        } else {
            if (l < a && l > i || f < a && f > i) {
                return true
            } else if (l < i && f > a) {
                return true
            }
        }
        return false
    }
    function o(e, t) {
        var n = Date.now, r = 0, o, i, a = function() {
            r = n();
            e.apply(o, i)
        };
        return function() {
            cur = n();
            o = this,
            i = arguments;
            if (cur - r > t) {
                a()
            }
        }
    }
    function i() {
        var e, t, n = [];
        this.listen = function(e) {
            if (typeof e === "function") {
                n.push(e)
            }
        }
        ;
        this.remove = function(e) {
            if (typeof e !== "function")
                return;
            for (var t = 0, r = n.length; t < r; t++) {
                if (e === n[t]) {
                    n.splice(t, 1)
                }
            }
        }
        ;
        document.addEventListener("touchstart", function(t) {
            var n = t.touches[0];
            e = n.clientY
        });
        document.addEventListener("touchmove", function(n) {
            var r = n.changedTouches[0]
              , o = r.clientY;
            if (o - e > 0) {
                t = "up"
            } else if (e - o > 0) {
                t = "down"
            }
        });
        document.addEventListener("touchend", o(function() {
            r(t)
        }, 80));
        document.addEventListener("scroll", o(function() {
            r(t)
        }, 80));
        function r(e) {
            for (var t = 0, r = n.length; t < r; t++) {
                n[t].apply(null, [e])
            }
        }
    }
    function a(e) {
        try {
            var e = new Date(e);
            e = null;
            return true
        } catch (t) {
            return false
        }
    }
    function u(e) {
        var t = /{\d+}/g
          , n = Array.prototype.slice.call(arguments, 1)
          , r = e.toString();
        return r.replace(t, function(e) {
            var t = e.substr(1, e.length - 2);
            return typeof n[t] === "undefined" ? e : n[t]
        })
    }
    function c(e) {
        var t = {
            bid: "1",
            mid: "01",
            res: [],
            onBeforeReport: null,
            delay: 5e3
        };
        for (var r in e) {
            t[r] = e[r]
        }
        if (t.res.length > 0) {
            window.reportWebInfo = function(e) {}
            ;
            window.setTimeout(function() {
                t.onBeforeReport && t.onBeforeReport(t);
                var e = t.bid + t.mid + "-" + t.res.join("|");
                var r = "http://bases.wanggou.com/mcoss/webreport/ReportWebInfo?report=" + e + "&t=" + new Date / 1e3;
                n.loadScript({
                    url: r
                })
            }, t.delay)
        }
    }
    function l(e, t) {
        var n = arguments[1] || window.location.search
          , r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
          , o = n.substr(n.indexOf("?") + 1).match(r);
        return o != null ? o[2] : ""
    }
    function f(e, t) {
        var n = t ? t.match(/#.*/) && t.match(/#.*/)[0] || "" : location.hash
          , r = t ? t.replace(/#.*/, "").match(/\?.*/) && t.replace(/#.*/, "").match(/\?.*/)[0] || "" : location.search
          , o = t ? t.replace(/#.*/, "").replace(/\?.*/, "") : location.protocol + "//" + location.host + location.pathname;
        for (var i in e) {
            var a = i + "=" + e[i]
              , u = l(i, r);
            if (u) {
                r = r.replace(i + "=" + u, i + "=" + e[i])
            } else {
                r = r.length > 0 ? r + "&" + a : "?" + a
            }
        }
        return o + r + n
    }
    function s(e) {
        var t = new RegExp("(^| )" + e + "(?:=([^;]*))?(;|$)")
          , n = document.cookie.match(t);
        return n ? n[2] ? unescape(n[2]).replace(/(^")|("$)/g, "") : "" : null
    }
    function g(e, t, n, r, o, i) {
        var a = new Date
          , n = arguments[2] || null
          , r = arguments[3] || "/"
          , o = arguments[4] || null
          , i = arguments[5] || false;
        n ? a.setMinutes(a.getMinutes() + parseInt(n)) : "";
        document.cookie = e + "=" + escape(t) + (n ? ";expires=" + a.toGMTString() : "") + (r ? ";path=" + r : "") + (o ? ";domain=" + o : "") + (i ? ";secure" : "")
    }
    function d(e) {
        var t = arguments[1] || location.hash;
        var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
        var r = t.substr(t.indexOf("#") + 1).match(n);
        if (r != null) {
            return r[2]
        }
        return ""
    }
    function p(e) {
        return typeof e != "string" ? "" : e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    }
    function h(e) {
        return typeof e != "string" ? "" : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;").replace(/ /g, "&nbsp;")
    }
    function v(e, t, n, r) {
        var o = m(e);
        if (o > n - t) {
            var r = r || "";
            var i = e.replace(/[\u00FF-\uFFFF]/g, "@-").substr(t, n);
            var a = i.match(/@-/g) ? i.match(/@-/g).length : 0;
            return e.substring(0, n - a) + r
        }
        return e
    }
    function m(e) {
        return e.replace(/[\u00FF-\uFFFF]/g, "  ").length
    }
    function w() {
        var e = navigator.userAgent.toLowerCase();
        return e.match(/micromessenger/) ? true : false
    }
    function y(e) {
        window.localStorage.removeItem(e)
    }
    function S(e, t, n) {
        try {
            window.localStorage.setItem(e, n ? JSON.stringify(t) : t)
        } catch (r) {
            console.error(r)
        }
    }
    function b(e) {
        return window.localStorage.getItem(e)
    }
    function x() {
        if (!window.localStorage) {
            return false
        }
        try {
            window.localStorage.setItem("test", true);
            window.localStorage.removeItem("test");
            return true
        } catch (e) {
            return false
        }
    }
    function L() {
        var e = s("cid");
        if (e == 2)
            return true;
        if (/qq\/([\d\.]+)*/i.test(navigator.userAgent)) {
            return true
        }
        return false
    }
    function D() {
        var e = s("cid");
        if (e == 1)
            return true;
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            return true
        }
        return false
    }
    function F(e) {
        e[0].ontouchstart = t;
        function t(t) {
            e[0].ontouchmove = n
        }
        function n(t) {
            t.preventDefault();
            e[0].ontouchend = r
        }
        function r() {
            e[0].ontouchend = null;
            e[0].ontouchmove = null
        }
    }
    function k(e) {
        if (s("wg_uin") && s("wg_skey")) {
            location.href = e
        } else {
            q(e)
        }
    }
    function q(e) {
        e = e || location.href;
        if (D()) {
            window.location.href = "http://party.wanggou.com/tws64/m/wxv2/Login?appid=1&rurl=" + encodeURIComponent(e)
        } else {
            window.location.href = "http://party.wanggou.com/tws64/m/h5v1/cpLogin?rurl=" + encodeURIComponent(e) + "&sid=" + s("sid") + "&uk=" + s("uk")
        }
    }
    function A(e, t) {
        e = e.replace(/？/g, "?");
        var n = /ptag[=,]\d+\.\d+\.\d+/i
          , r = /\?/.test(e);
        hasAnchor = e.indexOf("#") > -1;
        if (n.test(e)) {
            e = e.replace(n, "PTAG=" + t)
        } else {
            e = hasAnchor ? e.replace("#", (r ? "&" : "?") + "PTAG=" + t + "#") : e + (r ? "&" : "?") + "PTAG=" + t
        }
        return e
    }
    function I(e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++) {
            ("," + t + ",").indexOf("," + e[n] + ",") < 0 ? t.push(e[n]) : ""
        }
        return t
    }
    function R(e) {
        var t = false;
        return function() {
            !t && (t = !t,
            typeof e === "function" && e.call())
        }
    }
    function E(e) {
        var t, n, r = {};
        function o(e) {
            if (e && e.longitude) {
                var t = JSON.stringify(e);
                JD.cookie.set("coords", t, 60, "/", "jd.com")
            }
        }
        function i() {
            var e;
            e = JD.cookie.get("coords");
            try {
                if (e) {
                    e = JSON.parse(e)
                }
            } catch (t) {
                e = false;
                console.log(t)
            }
            if (!e || !e.longitude || !e.latitude) {
                e = false;
                JD.cookie.del("coords", "/", "jd.com")
            }
            return e
        }
        function a() {
            if (/qq\/([\d\.]+)*/.test(navigator.userAgent.toLowerCase())) {
                return true
            }
            return false
        }
        function u() {
            if (navigator.userAgent.indexOf("MicroMessenger") > 0) {
                return true
            }
            return false
        }
        t = i();
        if (t) {
            e && e(t)
        } else {
            if (u() && JD.wxapi) {
                JD.wxapi.ready(function(t) {
                    t.beta = true;
                    wx.getLocation({
                        type: "gcj02",
                        success: function(t) {
                            n = {
                                latitude: t.latitude,
                                longitude: t.longitude
                            };
                            o(n);
                            e && e(n)
                        },
                        fail: function() {
                            e && e(r)
                        }
                    })
                })
            } else if (a() && window.mqq) {
                mqq.sensor.getLocation(function(t, i, a) {
                    if (t === 0) {
                        n = {
                            latitude: i,
                            longitude: a
                        };
                        o(n);
                        e && e(n)
                    } else {
                        e && e(r)
                    }
                })
            } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(t) {
                    n = {
                        latitude: t.coords.latitude,
                        longitude: t.coords.longitude
                    };
                    o(n);
                    e && e(n)
                }, function(t) {
                    e && e(r)
                })
            } else {
                e && e(r)
            }
        }
    }
    return {
        checkInScreen: r,
        delay: o,
        delegateMove: i,
        isDate: a,
        format: u,
        itilReport: c,
        getQuery: l,
        setQuery: f,
        getCookie: s,
        setCookie: g,
        getHash: d,
        htmlDecode: p,
        htmlEncode: h,
        strSubGB: v,
        strLenGB: m,
        canWxPay: w,
        isSupportStorage: x,
        isSQ: L,
        isWX: D,
        saveStorage: S,
        getStorage: b,
        removeStorage: y,
        preventPageScroll: F,
        loginLocation: k,
        login: q,
        addRd: A,
        arrayUniq: I,
        once: R,
        getMyLocation: E
    }
});
define('wq.item.common', function(require, exports, module) {
    var _cacheThisModule_, $ = require("zepto"), mUtil = require('util'), pageWidth = $(window).width();
    window._imagePC_data = {
        num: 0
    };
    var detLeftPadding = 10
      , detRightPadding = 10;
    function setDetPadding(padding) {
        if (padding == undefined)
            return;
        if ($.isArray(padding)) {
            if (padding.length < 1 || padding.length > 4) {
                return;
            } else if (padding.length === 4) {
                detLeftPadding = (padding[3] + '').replace('px', '') - 0;
                detRightPadding = (padding[1] + '').replace('px', '') - 0;
            } else if (padding.length === 3 || padding.length === 2) {
                detLeftPadding = detRightPadding = (padding[1] + '').replace('px', '') - 0;
            } else {
                detLeftPadding = detRightPadding = (padding[0] + '').replace('px', '') - 0;
            }
        } else {
            detLeftPadding = detRightPadding = (padding + '').replace('px', '') - 0;
        }
    }
    function initLoadImg(opt) {
        var data = {
            cache: []
        }
          , commId = opt.commId
          , $img = $('#' + commId + ' img');
        $img.each(function(i) {
            var dom = $(this);
            data.cache.push({
                url: dom.attr('item_init_src'),
                dom: dom
            });
        });
        data.num = data.cache.length;
        if (!window._imagePC_data[commId]) {
            window._imagePC_data.num += 1;
            startResizeer(commId);
        }
        window._imagePC_data[commId] = data;
        var scale = areaResize(commId);
        var oDiv = document.getElementById(commId);
        if (scale && Math.ceil(14 / scale) > 10) {
            oDiv.style.fontSize = Math.ceil(14 / scale) + 'px';
        }
        oDiv.style.lineHeight = 2;
        loadImg();
    }
    function loadImg() {
        var d = window._imagePC_data;
        if (!d || d.num <= 0) {
            return;
        }
        var scrollHeight = $(window).scrollTop()
          , visibleHeight = $(window).height() + scrollHeight + 100;
        for (var key in window._imagePC_data) {
            if (key == 'num')
                continue;
            var dd = window._imagePC_data[key];
            $.each(dd.cache, function(i, data) {
                var em = data.dom
                  , imgH = em.offset().top;
                if (visibleHeight > imgH && !em.attr("loaded") && em.is(':visible')) {
                    if (data.url) {
                        em.on('load', (function(commId) {
                            return function() {
                                areaResize(commId);
                            }
                            ;
                        }
                        )(key));
                        em.attr("src", data.url);
                    }
                    em.removeAttr('item_init_src');
                    em.attr("loaded", dd.num);
                    dd.num--;
                }
            });
            if (dd.num <= 0) {
                delete window._imagePC_data[key];
                window._imagePC_data.num -= 1;
            }
        }
    }
    function areaResize(commId) {
        var oDiv = document.getElementById(commId);
        if (!oDiv)
            return 0;
        var pDiv = oDiv.parentNode
          , w = oDiv.offsetWidth
          , h = oDiv.offsetHeight
          , cw = (window.isMScene && pageWidth > 640 ? 640 : pageWidth) - detLeftPadding - detRightPadding;
        if (w > 0) {
            var scale = cw / w;
            if (scale < 1) {
                oDiv.style.WebkitTransformOrigin = 0 + 'px ' + 0 + 'px';
                oDiv.style.transformOrigin = 0 + 'px ' + 0 + 'px';
                oDiv.style.WebkitTransform = 'scale(' + scale + ')';
                oDiv.style.transform = 'scale(' + scale + ')';
                pDiv.style.width = (w * scale) + 'px';
                pDiv.style.height = (h * scale) + 'px';
            }
            if (scale && Math.ceil(14 / scale) > 10) {
                var oDiv = document.getElementById(commId);
                oDiv.style.fontSize = Math.ceil(14 / scale) + 'px';
            }
            return scale;
        }
        return 0;
    }
    function startResizeer(commId) {
        var inter = window.setInterval(function() {
            areaResize(commId);
        }, 1500);
        window.setTimeout(function() {
            window.clearInterval(inter);
        }, 6000);
    }
    function tavlHTML(str) {
        if (!str)
            return '';
        var imgReg = /<img([^>]*?\s+)src=["']([^"']+)["']([^>]*>)/ig
          , backgroundReg = /background\s*=\s*"([^"]+)"/ig
          , iframeReg = /<iframe([^>]+)src\s*=\s*"([^"]+)"(.*?\/iframe>)/ig
          , imgReg3 = /src\s*=\s*"\s*(done|null|undefined|\s)*?"/g
          , emptyImg = '//wq.360buyimg.com/fd/h5/base/detail/images/transparent_a38f0a03.png'
          , linkReg3 = /height="0px"/ig
          , urlReg = /^(https*:){0,1}\/\//
          , focReg = /\![^\.]*(\..+)$/
          , base64Reg = /^data:image\/(jpeg|png|gif);base64,/
          , flashvar = ''
          , width = ''
          , height = '';
        str = htmlDecode(str);
        str = str.replace(imgReg, function($0, $1, $2, $3) {
            if (base64Reg.test($2)) {} else {
                $2 = adverImgurl($2);
                if (urlReg.test($2)) {
                    $2 = $2.replace(focReg, '$1');
                    $2 = JD.img.getImgUrl($2);
                } else {
                    $2 = emptyImg;
                }
            }
            $3 = ($3 || '').replace(/src\s*=\s*".*?"/g, '');
            return '<img' + $1 + 'item_init_src="' + $2 + '" src="' + emptyImg + '"' + $3;
        }).replace(backgroundReg, function($0, $1) {
            if (base64Reg.test($1)) {} else {
                $1 = adverImgurl($1);
                if (urlReg.test($1)) {
                    $1 = JD.img.getImgUrl($1);
                } else {
                    $1 = '';
                }
            }
            return $1 ? 'background="' + $1 + '"' : '';
        }).replace(imgReg3, '').replace(linkReg3, 'style="display:none"').replace(iframeReg, function($0, $1, $2, $3) {
            flashvar = ($2 || '').split('?')[1];
            var outStr = '';
            if (flashvar) {
                flashvar = htmlDecode(flashvar);
                width = JD.url.getUrlParam('w', flashvar);
                height = JD.url.getUrlParam('h', flashvar);
                if (height > 0 && width > 0) {
                    if (width > pageWidth) {
                        height = (pageWidth / width) * height;
                        width = pageWidth;
                    }
                    flashvar += '&height=' + height + '&width=' + width;
                    outStr = '<p class="warning_text">播放视频将会使用较多流量，建议在 Wi-Fi 环境下查看</p><iframe src="' + '//s.yuntv.letv.com/bcloud.html?' + flashvar + '" height="' + height + '" width="' + width + '"></iframe>'
                }
            }
            return outStr;
        }).replace(/\>\s*[\?]+\s*\</g, '><').replace(/http:\/\//g, '//');
        try {
            str = adverTransferCss(str);
            str = adverTransfer(str, '', '');
        } catch (e) {}
        return str;
    }
    function htmlDecode(str) {
        return typeof (str) != "string" ? "" : str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    }
    function adverImgurl(imgurl) {
        imgurl = imgurl.replace(/(^.*)\/\//i, '//').replace(/img10/g, 'img1' + parseInt(Math.random() * 5, 10));
        return imgurl;
    }
    function adverTransferCss(str) {
        var out = str
          , styleReg = /<\s*style[^>]*>([^<]*)<\s*\/\s*style\s*>/ig
          , emptyBgUrlReg = /background(?:-image)?\s*\:[^\;]*url\(\s*\)[^\;\}]*[\;]?/ig
          , cssReg = /([^\{]*)(\{[^\}]*\})/ig
          , annotReg = /\/\*[^\*]*\*\//ig;
        out = out.replace(styleReg, function($0, $1) {
            if (!$1)
                return '';
            var str = $1.replace(emptyBgUrlReg, '');
            str = str.replace(annotReg, '');
            str = str.replace(cssReg, function(a0, a1, a2) {
                if (!a1)
                    return '';
                var tempA1s = a1.split(',')
                  , a1s = [];
                for (var i = 0, len = tempA1s.length; i < len; ++i) {
                    if (/^\s*\./.test(tempA1s[i])) {
                        a1s.push(tempA1s[i]);
                    }
                }
                if (a1s.length == 0)
                    return '';
                return a1s.join(',') + a2;
            });
            if (!str || /^\s*$/.test(str))
                return '';
            return '<style type="text/css">' + str + '</style>';
        });
        return out;
    }
    function adverTransfer(ad, flag, ptag) {
        if (!ad)
            return '';
        var out = ''
          , urlReg = /^(https*:){0,1}\/\//;
        flag = flag || urlReg.test(ad);
        if (flag) {
            out = window.isKeplerPinGou ? keplerPinGouTransferUrl(ad, ptag) : ((window.isMScene) ? mTransferUrl(ad, ptag) : transferUrl(ad, ptag));
        } else {
            var linkReg = /<a([^>]+)href\s*=\s*"([^"]+)"(.*?\/a>[，？。！：,\?\.!:]*)/ig
              , linkReg1 = /<area([^>]+)href\s*=\s*"([^"]+)"(.*?>[，？。！：,\?\.!:]*)/ig
              , linkUrl = '';
            out = ad.replace(/\\\\*['"]/ig, '"').replace(/\r|\n/g, '').replace(linkReg, function($0, $1, $2, $3) {
                linkUrl = window.isKeplerPinGou ? keplerPinGouTransferUrl($2) : ((window.isMScene) ? mTransferUrl($2) : transferUrl($2));
                return (linkUrl ? ('<a' + $1 + 'href="' + linkUrl + '" ' + $3).replace('_blank', '_self') : '');
            });
            out = out.replace(linkReg1, function($0, $1, $2, $3) {
                linkUrl = window.isKeplerPinGou ? keplerPinGouTransferUrl($2) : ((window.isMScene) ? mTransferUrl($2) : transferUrl($2));
                return (linkUrl ? ('<area' + $1 + 'href="' + linkUrl + '" ' + $3).replace('_blank', '_self') : '');
            });
        }
        return out;
    }
    function transferUrl(url, ptag) {
        if (!url)
            return '';
        var urlReg = /^(https*:)?\/\//
          , outUrl = ''
          , replaceReg = [/^(https*:)?\/\/item(\.m)?\.jd\.com\/(product\/)?(\d+)\.html/, /^(https*:)?\/\/item\.m\.jd\.com\/ware\/view\.action(?=\?).*[?|&]wareId=(\d+)/, /^(https*:)?\/\/m?item\.jd\.hk\/(product\/)?(\d+)\.html/, /^(https*:)?\/\/mitem\.jd\.hk\/ware\/view\.action(?=\?).*[?|&]wareId=(\d+)/, /^(https*:)?\/\/(ite)?m\.yiyaojd\.com\/(product\/)?(\d+)\.html/, /^(https*:)?\/\/m\.yiyaojd\.com\/ware\/view\.action(?=\?).*[?|&]wareId=(\d+)/, ]
          , wqReg = /^(https*:)?\/\/(wqs|wq|wqitem|wqmitem|wqsou)\.jd\.(com\/|hk\/)/
          , skuId = ''
          , wqRegs = [];
        if (window.itemWhitelist) {
            wqRegs = window.itemWhitelist.filter(function(item) {
                return item.channel === 'wq'
            })[0].reg.split(';');
        } else {
            JD.report.umpBiz({
                bizid: '25',
                operation: '31',
                result: '1',
                source: '0',
                message: 'this url doesn\'t config the item_whiteList ppms' + location.href
            });
            wqRegs = ['/^(https*:)?\/\/red\.jd\.com\/redList-.+?-0-0-1\.html\s*?$/', '/^(https*:)?\/\/red\.jd\.com\/redList-.+?-0-0-1\.html\s*?$/', '/^(https*:)?\/\/redact\.m\.jd\.com\/(detail\/|foreDetail\/|wq\/detail\/|wq\/foreDetail\/).+?\.html\s*?$/', '/^(https*:)?\/\/(wqs|wq|wqitem|wqmitem|wqsou)\.jd\.(com\/|hk\/)/', '/^(https*:)?\/\/www\.healthjd\.com/', '/^(https*:)?\/\/sale\.jd\.com\/m-\w{1,}\.html/', '/^(https*:)?\/\/sale\.jd\.com\/m\/h5\/\w{1,}\.html/', '/^(https*:)?\/\/item\.(yiyao)?jd\.(com|hk)/'];
        }
        if (!urlReg.test(url))
            return '';
        if (wqReg.test(url)) {
            outUrl = url.replace(/(https*:)?/, '');
        } else {
            for (var i = 0, len = replaceReg.length; i < len; i++) {
                var matchRegArr = url.match(replaceReg[i]);
                if (matchRegArr) {
                    skuId = matchRegArr[matchRegArr.length - 1];
                    if (skuId > 0) {
                        try {
                            var params;
                            if (url.indexOf('http') === -1) {
                                params = new URL('http:' + url).search;
                            } else {
                                params = new URL(url).search;
                            }
                            if (params.indexOf('wareId') !== -1) {
                                outUrl = '//wqitem.jd.com/item/view' + params.replace('wareId', 'sku');
                            } else {
                                outUrl = '//wqitem.jd.com/item/view' + (params ? params + '&' : '?') + 'sku=' + skuId;
                            }
                        } catch (e) {
                            outUrl = '';
                        }
                    }
                    break;
                }
            }
        }
        if (wqRegs.length > 0 && wqRegs[0]) {
            wqRegs.forEach(function(reg) {
                reg = new RegExp(reg.slice(1, -1));
                try {
                    if (reg.test(url)) {
                        outUrl = url.replace(/(https*:)?/, '');
                    }
                } catch (e) {}
            })
        }
        if (urlReg.test(outUrl)) {
            outUrl = ptag ? mUtil.addRd(outUrl, ptag) : outUrl;
        } else {
            outUrl = '';
        }
        return outUrl;
    }
    function mTransferUrl(url, ptag) {
        if (!url)
            return '';
        var urlReg = /^(https*:){0,1}\/\//
          , outUrl = ''
          , mRegs = [];
        if (window.itemWhitelist) {
            mRegs = window.itemWhitelist.filter(function(item) {
                return item.channel === 'mm'
            })[0].reg.split(';');
        } else {
            JD.report.umpBiz({
                bizid: '25',
                operation: '31',
                result: '1',
                source: '0',
                message: 'this url doesn\'t config the item_whiteList ppms' + location.href
            });
            mRegs = ['/^(https*:){0,1}\/\/sale\.jd\.com/', '/^(https*:){0,1}\/\/car\.m\.jd\.com/', '/^(https*:){0,1}\/\/msc\.jd\.com/', '/^(https*:){0,1}\/\/item\.jd\.com/', '/^(https*:){0,1}\/\/coupon\.m\.jd\.com/', '/^(https*:){0,1}\/\/red\.jd\.com/', '/^(https*:){0,1}\/\/red\.m\.jd\.com/', '/^(https*:){0,1}\/\/h5\.m\.jd\.com/', '/^(https*:){0,1}\/\/v\.m\.jd\.com/', '/^(https*:){0,1}\/\/jdw\.jd\.hk/', '/^(https*:){0,1}\/\/shop\.m\.jd\.com/', '/^(https*:){0,1}\/\/pro(\.m){0,1}\.jd\.com/', '/^(https*:){0,1}\/\/m\.jr\.jd\.com/', '/^(https*:){0,1}\/\/credit\.jd\.com/', '/^(https*:){0,1}\/\/phrase\.jd\.com/', '/^(https*:){0,1}\/\/mall\.jd\.com/', '/^(https*:){0,1}\/\/m\.jd\.com\/html\/quanqiugou\/ebayIntro\.html/', '/^(https*:){0,1}\/\/ihelp\.jd\.com\/l\/help\/scene\/getSceneDetail/', '/^(https*:){0,1}\/\/home\.m\.jd\.com\/sam\/bandCard\.action/', '/^(https*:){0,1}\/\/home\.m\.jd\.com\/sam\/myCard\.action/', '/^(https*:){0,1}\/\/crmsam\.jd\.com\/samclub\/index\.html/', '/^(https*:){0,1}\/\/m\.huishou\.jd\.com/', '/^(https*:){0,1}\/\/item\.m\.jd\.com/', '/^(https*:){0,1}\/\/coll\.jd\.com/', '/^(https*:){0,1}\/\/book\.jd\.com/', '/^(https*:){0,1}\/\/channel\.jd\.com/', '/^(https*:){0,1}\/\/c-nfa\.jd\.com/', '/^(https*:){0,1}\/\/tob\.jd\.com/', '/^(https*:){0,1}\/\/surveys\.jd\.com/', '/^(https*:){0,1}\/\/poplist\.m\.jd\.com/', '/^(https*:){0,1}\/\/uranus\.jd\.com/', '/^(https*:){0,1}\/\/answer\.jd\.com/', '/^(https*:){0,1}\/\/www\.healthjd\.com/', ];
        }
        if (!urlReg.test(url))
            return '';
        if (mRegs.length > 0 && mRegs[0]) {
            try {
                mRegs.forEach(function(reg) {
                    reg = new RegExp(reg.slice(1, -1));
                    if (reg.test(url)) {
                        outUrl = url.replace(/(https*:){0,1}/, '');
                    }
                })
            } catch (e) {}
        }
        if (urlReg.test(outUrl)) {
            outUrl = ptag ? mUtil.addRd(outUrl, ptag) : outUrl;
        } else {
            outUrl = '';
        }
        return outUrl;
    }
    function keplerPinGouTransferUrl(url, ptag) {
        if (!url)
            return '';
        var urlReg = /^(https*:){0,1}\/\//;
        if (!urlReg.test(url))
            return '';
        var keplerRegs = []
          , outUrl = '';
        if (window.itemWhitelist) {
            keplerRegs = window.itemWhitelist.filter(function(item) {
                return item.channel === 'kepler'
            })[0].reg.split(';');
        } else {
            JD.report.umpBiz({
                bizid: '25',
                operation: '31',
                result: '1',
                source: '0',
                message: 'this url doesn\'t config the item_whiteList ppms' + location.href
            });
            keplerRegs = [];
        }
        if (keplerRegs.length > 0 && keplerRegs[0]) {
            try {
                keplerRegs.forEach(function(reg) {
                    reg = new RegExp(reg.slice(1, -1));
                    if (reg.test(url)) {
                        outUrl = url.replace(/(https*:){0,1}/, '');
                    }
                })
            } catch (e) {}
        }
        if (urlReg.test(outUrl)) {
            outUrl = ptag ? mUtil.addRd(outUrl, ptag) : outUrl;
        } else {
            outUrl = '';
        }
        return outUrl;
    }
    function transEmbed(commId) {
        var $dom = $('#' + commId)
          , $embed = $dom.find('embed')
          , $item = '';
        if ($embed.length) {
            $embed.hide();
            $.each($embed, function(i, item) {
                $item = $(item);
                var flashvar = $item.attr('flashvars')
                  , height = $item.attr('h')
                  , width = $item.attr('w');
                if (flashvar && height > 0 && width > 0) {
                    if (width > pageWidth) {
                        height = (pageWidth / width) * height;
                        width = pageWidth;
                    }
                    flashvar += '&height=' + height + '&width=' + width;
                    $item.after('<p class="warning_text">播放视频将会使用较多流量，建议在 Wi-Fi 环境下查看</p><iframe src="' + '//s.yuntv.letv.com/bcloud.html?' + flashvar + '" height="' + height + '" width="' + width + '"></iframe>');
                }
            });
            $embed.remove();
        }
    }
    function moduleReport() {
        var cacheTime = 0
          , factoryTime = 0
          , loadTime = 0
          , startWaste = 0;
        try {
            if (window._itemGlobal && window._itemGlobal.startRepTime) {
                var navigationStart = (window.performance || window.webkitPerformance)['timing']['navigationStart'];
                if (navigationStart > 1000)
                    startWaste = window._itemGlobal.startRepTime.getTime() - navigationStart;
            }
        } catch (e) {}
        var cgi = '//fd.3.cn/cesu/r?pid=277';
        var OS = getOS(navigator.userAgent);
        if (window.JD && JD.device && JD.device.getNetwork) {
            JD.device.getNetwork(function(network) {
                var reportImg = new Image();
                var os = OS ? OS.replace(/%20/g, "") : "other"
                  , net = (network || '').toLowerCase();
                reportImg.src = [cgi, 'os=' + os, 'apn=' + net, 's1=' + loadTime, 's2=' + cacheTime, 's3=' + factoryTime, 's4=' + startWaste].join('&');
            });
        }
    }
    function getOS(ua) {
        var OSTypeList = {
            'android': [/(Android);?[\s\/]+([\d.]+)?/, [1, 2]],
            'ios': [/((iPad)|(iPod)|(iPhone)).*\s+OS\s+([\d_]+)/, function(r) {
                return ['ios', (r[5] ? r[5].replace(/_/g, '.') : "")]
            }
            ],
            'unknow': [/(Android);?[\s\/]+([\d.]+)?/],
            'win': [/(\(|\s)*(Windows)[^\d.]+([\d\.]+).*((WOW64)*)/gi, [2, 3]]
        };
        var r, it;
        for (var k in OSTypeList) {
            it = OSTypeList[k];
            if (it[0]instanceof Function) {
                r = it[0](ua);
                return k += r[1] ? ' ' + r[1] : '';
            } else if (r = it[0].exec(ua)) {
                if (it.length > 1) {
                    if (it[1]instanceof Function) {
                        r = it[1](r);
                    } else if (it[1]instanceof Array) {
                        r = [r[it[1][0]], r[it[1][1]]];
                    }
                }
                return k += r[1] ? ' ' + r[1] : '';
            }
        }
        return 'other';
    }
    function jsonToTpl(json, tpl) {
        var outStr = '';
        try {
            outStr = (tpl || '').replace(/{#(\w+)#}/g, function(a, b) {
                return json[b] === 0 ? '0' : (json[b] || "");
            });
        } catch (e) {}
        return outStr;
    }
    function setItemOrderChannel(skuId) {
        var urlKey = JD.url.getUrlParam('channelkey')
          , urlValue = JD.url.getUrlParam('channelvalue')
          , urlKeyWhiteList_wq = ['cubeinvite']
          , urlKeyWhiteList_m = ['cubeinvite']
          , urlKeyWhiteList = [];
        urlKeyWhiteList = window.isMScene ? urlKeyWhiteList_m : urlKeyWhiteList_wq;
        if (urlKeyWhiteList.indexOf(urlKey) >= 0 && urlValue) {
            var itemOrderchannel = JD.cookie.get('item_orderchannel') ? JSON.parse(JD.cookie.get('item_orderchannel')) : {};
            itemOrderchannel[urlKey] = {
                value: urlValue,
                skuId: skuId,
                timeStamp: new Date().getTime()
            };
            JD.cookie.set('item_orderchannel', JSON.stringify(itemOrderchannel), 24 * 60, '/', 'jd.com');
            setTimeout(function() {
                JD.cookie.set('item_orderchannel', JSON.stringify(itemOrderchannel), 24 * 60, '/', 'jd.com');
            }, 4500);
        }
    }
    function updateItemOrderChannel(skuId) {
        var urlKey = JD.url.getUrlParam('channelkey')
          , urlValue = JD.url.getUrlParam('channelkey')
          , urlKeyWhiteList_wq = ['cubeinvite']
          , urlKeyWhiteList_m = ['cubeinvite']
          , urlKeyWhiteList = [];
        urlKeyWhiteList = window.isMScene ? urlKeyWhiteList_m : urlKeyWhiteList_wq;
        if (urlKeyWhiteList.indexOf(urlKey) >= 0 && urlValue) {
            var itemOrderchannel = JSON.parse(JD.cookie.get('item_orderchannel'));
            itemOrderchannel[urlKey].skuId = skuId;
            itemOrderchannel[urlKey].timeStamp = new Date().getTime();
            JD.cookie.set('item_orderchannel', JSON.stringify(itemOrderchannel), 24 * 60, '/', 'jd.com');
        }
    }
    exports.setItemOrderChannel = setItemOrderChannel;
    exports.updateItemOrderChannel = updateItemOrderChannel;
    exports.setDetPadding = setDetPadding;
    exports.initLoadImg = initLoadImg;
    exports.loadImg = loadImg;
    exports.tavlHTML = tavlHTML;
    exports.adverTransfer = adverTransfer;
    exports.transEmbed = transEmbed;
    exports.moduleReport = moduleReport;
    exports.jsonToTpl = jsonToTpl;
});

define('lazyLoad', function(require, exports, module) {
    var _cacheThisModule_;
    var $ = require('zepto');
    var g = {};
    g.autoLoadImage = function(option) {
        var opt = {
            scrollOffsetH: 100,
            initSrcName: 'init_src',
            container: document.body,
            fadeIn: false,
            zoom: 1,
            skip_invisible: false,
            afterImgLoaded: null
        };
        if (option) {
            for (var key in option) {
                opt[key] = option[key];
            }
        }
        function init() {
            var cont = typeof opt.container == "string" ? $("#" + opt.container) : $(opt.container);
            var objImages = $("img[" + opt.initSrcName + "]", cont);
            objImages.each(function(i) {
                var dom = $(this);
                var src = dom.attr(opt.initSrcName);
                if (window.JD) {
                    var size = dom.attr('data-size') || '';
                    var width = 0
                      , height = 0
                      , cutstr = '!cc_';
                    if (/^(\d+)x(\d+)$/i.test(size)) {
                        width = RegExp.$1;
                        height = RegExp.$2;
                        if (+width > 0 && +height > 0) {
                            cutstr = cutstr + width + 'x' + height;
                            src = JD.img.getImgUrl(src, width, height, cutstr);
                        }
                    }
                    src = JD.url.getImageUrl(src, width, height);
                }
                images_data.cache.push({
                    url: src,
                    loaded: 0,
                    slider: dom.attr("slider"),
                    obj: dom,
                    top: (opt.skip_invisible && isElementHidden(dom) ? Infinity : dom[0].getBoundingClientRect().top) * opt.zoom + window.pageYOffset
                });
            });
            images_data.num = images_data.cache.length;
        }
        var images_data = {
            viewHeight: $(window).height(),
            viewWidth: $(window).width(),
            ptr: "",
            cache: [],
            num: 0
        };
        init();
        if (images_data.ptr) {
            clearInterval(images_data.ptr);
        }
        images_data.ptr = setInterval(doScroll, 100);
        function doScroll() {
            var scrollHeight = window.pageYOffset
              , visibleHeight = images_data.viewHeight + opt.scrollOffsetH + scrollHeight
              , visibleWidth = images_data.viewWidth;
            $.each(images_data.cache, function(i, data) {
                var element = data.obj
                  , loaded = data.loaded;
                if (visibleHeight > data.top && !loaded) {
                    if (data.slider) {
                        if (element.offset().left > visibleWidth || element.offset().left < 0) {
                            return;
                        }
                    }
                    if (data.slider) {
                        element.attr("slider", "");
                        data.slider = null;
                    }
                    element.attr("onerror", "__reloadResource(this)");
                    element.attr("src", data.url);
                    element.on("load", function() {
                        opt.afterImgLoaded && opt.afterImgLoaded(element);
                    })
                    element.removeAttr(opt.initSrcName);
                    data.loaded = images_data.num;
                    element.attr("loaded", images_data.num);
                    opt.fadeIn && element.css("opacity", "1");
                    images_data.num--;
                }
            });
            if (images_data.num == 0) {
                clearInterval(images_data.ptr);
                images_data.ptr = null;
            }
            opt.callback && opt.callback();
        }
    }
    function isElementHidden(ele) {
        var _relate = $(ele).parents().concat();
        _relate.unshift($(ele)[0]);
        return _relate.some(function(e) {
            if (getComputedStyle(e, '').getPropertyValue("display") == "none") {
                return true;
            }
        });
    }
    module.exports = g;
});
define("jd.item.util", function(require, exports, module) {
    var _cacheThisModule_, $ = require('zepto'), urlParam = require('url'), itemComm = require('wq.item.common'), loopScroll = require('loopScroll'), domainStr = document.domain.split('.').slice(1).join('.'), isAndroid = $.os && $.os && $.os.android, network = '', protocol = window.location.protocol || 'http:', isJDChoice = window._itemGlobal.isJDChoice;
    (function($) {
        var o = $({});
        $.subscribe = function() {
            o.on.apply(o, arguments);
        }
        ;
        $.unsubscribe = function() {
            o.off.apply(o, arguments);
        }
        ;
        $.publish = function() {
            o.trigger.apply(o, arguments);
        }
        ;
    }($));
    JD && JD.device && JD.device.getNetwork(function(nt) {
        network = nt;
    });
    function getNetWork() {
        return network;
    }
    function formatTime(date) {
        var addZero = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
        return {
            year: date.getFullYear(),
            month: addZero(date.getMonth() + 1),
            day: addZero(date.getDate()),
            hour: addZero(date.getHours()),
            min: addZero(date.getMinutes()),
            sec: addZero(date.getSeconds())
        };
    }
    function showNotice(opt) {
        if (!opt || !opt.str)
            return;
        var iconFlag = opt.iconFlag ? opt.iconFlag : 0
          , t = opt.t ? opt.t : 2000
          , str = opt.str;
        var $iconDom = $('#noticeIcon');
        $iconDom.removeClass('icon_fail').removeClass('icon_success');
        switch (iconFlag) {
        case 0:
            $iconDom.hide();
            break;
        case 1:
            $iconDom.show();
            $iconDom.addClass('icon_success');
            break;
        case 2:
            $iconDom.show();
            $iconDom.addClass('icon_fail');
            break;
        }
        $('#noticeStr').html(str);
        $('#noticePanel').show();
        $('#noticePanel').css('margin-left', '-' + ($('#noticePanel').width()) / 2 + 'px');
        setTimeout(function() {
            $('#noticePanel').hide();
        }, t);
    }
    function setDelayTime() {
        window.holdAction = true;
        setTimeout(function() {
            window.holdAction = false;
        }, 400);
    }
    var imageViewer = {
        lockScrollH: 0,
        hasBindEvent: false,
        blackCoverShow: false,
        toggleBlackCover: function(show) {
            var obj = this;
            obj.blackCoverShow = show;
            var $body = $(document.body)
              , bodyFixed = $body.hasClass('overflowHide');
            if (show) {
                obj.lockScrollH = bodyFixed ? (popUp && popUp.mainViewScroll) : $(window).scrollTop();
                $('#blackCover').show();
                window.location.hash = '#img';
                if (obj.hasBindHashEvent)
                    return;
                $(window).on('hashchange', function() {
                    if (window.location.hash != '#img') {
                        obj.closeImagePreview();
                    }
                });
                obj.hasBindHashEvent = true;
            } else {
                $('#blackCover').hide();
                setTimeout(function() {
                    bodyFixed ? $body.css('top', -1 * obj.lockScrollH) : window.scrollTo(0, obj.lockScrollH);
                }, 10);
            }
        },
        previewImage: function(src) {
            if (!src)
                return;
            var obj = this;
            if (~domainStr.indexOf('jd.com') && window.WeixinJSBridge && window.location.hash != '#img') {
                try {
                    src = (src.indexOf('http') > -1 ? '' : protocol) + src;
                    window.WeixinJSBridge.invoke('imagePreview', {
                        'current': src,
                        'urls': [src]
                    });
                } catch (e) {}
            } else {
                obj.toggleBlackCover(true);
                $('#fullImg').attr('src', src);
                $('#imageViewer').show();
                if (obj.hasBindImagePreviewEvent)
                    return;
                $('#imageViewer,#fullImg,#blackCover').on('click', function() {
                    window.history.go(-1);
                });
                $('body').on('touchend', function(e) {
                    var target = e.srcElement || e.target
                      , em = target
                      , i = 1;
                    while (em && !em.id && i <= 3) {
                        em = em.parentNode;
                        i++;
                    }
                    if (!em || !em.id)
                        return;
                    if (em.id == 'imageViewer' || em.id == 'fullImg' || em.id == 'blackCover') {
                        e.preventDefault();
                        window.history.go(-1);
                    }
                });
                obj.hasBindImagePreviewEvent = true;
            }
        },
        closeImagePreview: function() {
            var obj = this;
            obj.toggleBlackCover(false);
            $('#fullImg').attr('src', '');
            $('#imageViewer').hide();
            $('#evalLoopImg').hide();
        },
        loopImagesPreview: function(opt) {
            var obj = this;
            var imgList = opt.imgList || []
              , curIndex = opt.curIndex || 1;
            if (~domainStr.indexOf('jd.com') && window.WeixinJSBridge && window.location.hash != '#img') {
                var loopImg = [];
                for (var i = 0, len = imgList.length; i < len; i++) {
                    loopImg.push((imgList[i].indexOf('http') > -1 ? '' : protocol) + imgList[i]);
                }
                window.WeixinJSBridge.invoke('imagePreview', {
                    'current': loopImg[curIndex - 1],
                    'urls': loopImg
                });
            } else {
                var _wb = document.body.clientWidth
                  , tpl = '<div class="mod_slider mod_slider_s1 mod_slider_viewer" id="evalLoopImg" style="height:' + _wb + 'px;">' + '<div class="inner">' + '<ul class="pic_list" id="evalLoopImgUl">' + '{#loopImgLi#}' + '</ul>' + '</div>' + '<div class="bar_wrap">' + '<ul class="bar" id="evalLoopImgBar"></ul>' + '</div>' + '<div class="decoration" style="display:none;">' + '<div class="text_wrap"></div>' + '<div class="remind"></div>' + '</div>' + '</div>'
                  , loopImgLiArr = []
                  , html = ''
                  , $loopImg = $('#evalLoopImg')
                  , $loopImgUl = $('#evalLoopImgUl');
                if (imgList.length > 0) {
                    imgList.forEach(function(imgPath) {
                        loopImgLiArr.push('<li style="height:' + _wb + 'px;width:' + _wb + 'px"><img src="' + imgPath + '" onerror="__reloadResource(this)"></li>');
                    });
                    html = itemComm.jsonToTpl({
                        loopImgLi: loopImgLiArr.join('')
                    }, tpl);
                    if ($loopImg.length && $loopImgUl.length) {
                        $loopImgUl.attr('style', '');
                        $loopImgUl.html(loopImgLiArr.join(''));
                        $loopImg.show();
                    } else {
                        $('#imageViewer').after(html);
                        $loopImg = $('#evalLoopImg');
                    }
                    obj.toggleBlackCover(true);
                }
                loopScroll.init({
                    tp: 'img',
                    viewDom: $('#evalLoopImgUl li').eq(0),
                    len: imgList.length,
                    loadImg: true,
                    moveDom: $('#evalLoopImgUl'),
                    moveChild: $('#evalLoopImgUl li'),
                    tab: $('#evalLoopImgBar li'),
                    loopScroll: false,
                    lockScrY: true,
                    imgInitLazy: 1000,
                    index: curIndex
                });
                $loopImg.off().on('click', function(event) {
                    event.preventDefault && event.preventDefault();
                    event.stopPropagation && event.stopPropagation();
                    window.history.go(-1);
                });
            }
        }
    };
    var popUp = {
        popupshow: false,
        popupBody: {},
        $domCache: {},
        setPopupBody: function(key, value) {
            if (!key)
                return;
            this.popupBody[key] = value;
        },
        createPopup: function(opt) {
            var flag = opt.flag
              , stopMove = opt.stopMove
              , msg = opt.msg
              , noCoverEvent = opt.noCoverEvent
              , priceVerifyImg = opt.priceVerifyImg
              , stopMoveFun = function(e) {
                e.preventDefault();
            }
              , btnClose = false
              , btnConfirm = false
              , btnCancel = false
              , btnEvent = function() {
                setDelayTime();
                $('#modAlertDiv,#modAlertMask').hide().removeClass(' mod_alert_info show fixed');
                if (stopMove)
                    document.removeEventListener('touchmove', stopMoveFun, false);
            };
            if (!$('#modAlertDiv').length) {
                $('body').append('<div id="modAlertDiv" class="mod_alert" style="display: none;"></div><div id="modAlertMask" class="mod_alert_mask" style="display: none;"></div>');
            }
            var $el = $('#modAlertDiv')
              , $cover = $('#modAlertMask');
            switch (flag) {
            case 1:
                $el.html('<i class="icon"></i><p>您还没关注京东服务号，<br>关注后才可以收到微信提醒噢~</p><div class="follow"><img src="' + JD.img.getImgUrl('//img11.360buyimg.com/jdphoto/s280x280_jfs/t3469/354/312631197/5626/21e9275b/5806d31eN2884548b.png', 180, 180) + '" alt="京东二维码"><p class="text">长按二维码关注</p></div>');
                break;
            case 2:
                $el.addClass('mod_alert_info');
                $el.html('<span class="close"></span><h3 class="title">' + opt.title + '</h3><div class="inner">' + opt.msg + '</div>');
                btnClose = 'span.close';
                break;
            case 3:
                if (opt.isNeedInfo)
                    $el.addClass('mod_alert_info');
                $el.html('<p>' + msg + '</p><p class="btns"><a href="javascript:void(0);" class="btn btn_1">' + (opt.btnTxt || '知道了') + '</a></p>');
                btnConfirm = 'p.btns';
                break;
            case 4:
                $el.html((opt.icon != 'none' ? ('<i class="icon' + (opt.icon != 'info' ? (' icon_' + opt.icon) : '') + '"></i>') : '') + '<p>' + msg + '</p>' + (opt.small ? '<p class="small">' + opt.small + '</p>' : '') + '<p class="btns"><a href="javascript:;" class="btn btn_2">' + opt.cancelText + '</a><a href="javascript:;" class="btn btn_1">' + opt.okText + '</a></p>');
                btnConfirm = 'a.btn_1';
                btnCancel = 'a.btn_2';
                break;
            case 5:
                msg = '<i class="icon"></i><p>' + msg + '</p><div class="verify_input"><input class="input" type="text" id="verifyInput"><span class="wrap"><img src="' + (priceVerifyImg || '//fpoimg.com/75x30') + '" alt="点击刷新" id="verifyCodeImg"></span></div><p class="warn_text" id="warnTip">验证码错误，请重新输入</p>';
                $el.html(msg + '<p class="btns"><a href="javascript:void(0);" class="btn btn_1">提交</a></p>');
                break;
            case 6:
                $el.html('<span class="close"></span><i class="icon"></i><p>' + msg + '</p><p class="small">' + opt.small + '</p><p class="btns">' + '<a href="javascript:void(0);" class="btn" style="background: #e4393c;color: #fff">' + opt.btnTxt + '</a></p>');
                btnClose = 'span.close';
                btnConfirm = 'p.btns';
                break;
            case 7:
                $el.addClass('mod_alert_info');
                $el.html('<span class="close"></span><h3 class="title">手机号码登录</h3><div class="verify_inputs"><div class="verify_input"><input class="input" type="tel" mark="phonenum" placeholder="请输入手机号" maxlength="11"></div><div class="verify_input"><input class="input" mark="imgcode" type="text" placeholder="请输入图形码"><span class="wrap" mark="genimgcode"><img mark="img"/></span></div><div class="verify_input"><input class="input" mark="msgcode" type="text" placeholder="请输入验证码"><div class="verify_input_btn" mark="sendcode">发送验证码</div><div class="verify_input_btn type_disabled" style="display:none;"><span mark="sendcodesed"></span>后重发</div></div></div><p class="warn_text" style="display:none;" mark="errtips"></p><p class="btns"><a href="javascript:" class="btn btn_1">登录</a></p>');
                btnClose = 'span.close';
                btnConfirm = 'p.btns';
                break;
            case 8:
                $el.addClass('mod_alert_info');
                $el.html('<span class="close"></span><h3 class="title">历史收货人校验</h3><p class="alignLeft">您已有京东账号，为了保障账号安全，需要对您历史已完成订单的收货人信息进行校验（任意一个即可）</p><div class="verify_input type_no_padding"><input class="input" mark="shname" type="text" placeholder="历史完成订单的收货人姓名"></div><p class="warn_text" style="display:none;" mark="errtips"></p><p class="btns"><a href="javascript:" class="btn btn_1">完成校验去结算</a></p>');
                btnClose = 'span.close';
                btnConfirm = 'p.btns';
                break;
            case 9:
                $el.addClass('mod_alert_info');
                $el.html('<h3 class="title">设置到货通知</h3><p class="alignLeft" style="font-size:14px;">商品在两个月内一旦有货，我们将马上通过短信通知您。</p><div class="verify_input type_no_padding"><input class="input" mark="phoneNum" type="text" placeholder="请输入手机号码"></div><p class="warn_text" style="display:none;" mark="errtips"></p><p class="btns"><a href="javascript:;" class="btn btn_2">取消</a><a href="javascript:;" class="btn btn_1">确认</a></p>');
                btnConfirm = 'a.btn_1';
                btnCancel = 'a.btn_2';
                break;
            case 10:
                $el.addClass('mod_alert_info');
                $el.html('<h3 class="title">设置降价提醒</h3><p class="alignLeft" style="font-size:14px;">商品一旦在90天内低于您订阅的价格，我们将马上通过短信通知您。</p><div class="verify_input type_no_padding"><input class="input" mark="price" type="number" placeholder="请输入期望价格"></div><p class="warn_text" style="display:none;" mark="errtips1"></p><div class="verify_input type_no_padding"><input class="input" mark="phoneNum" type="text" placeholder="请输入手机号码"></div><p class="warn_text" style="display:none;" mark="errtips2"></p><p class="btns"><a href="javascript:;" class="btn btn_2">取消</a><a href="javascript:;" class="btn btn_1">确认</a></p>');
                btnConfirm = 'a.btn_1';
                btnCancel = 'a.btn_2';
                break;
            case 11:
                $el.addClass('mod_alert_info');
                $el.html('<h3 class="title" style="margin-bottom:12px;">' + opt.title + '</h3><p class="alignLeft" style="font-size:14px;">' + opt.msg + '</p><p class="btns" style="margin-top:12px;"><a href="javascript:;" class="btn btn_1">知道了</a></p>');
                btnConfirm = 'a.btn_1';
                break;
            }
            setTimeout(function() {
                $el.show().addClass('show fixed');
                $cover.show().addClass('show fixed');
            }, isAndroid ? 100 : 400);
            $el.off();
            if (btnClose) {
                $el.on('click', btnClose, function() {
                    btnEvent();
                    opt.onClose && opt.onClose();
                });
            }
            if (btnConfirm) {
                $el.on('click', btnConfirm, function() {
                    var keep = false;
                    if (opt.onConfirm) {
                        keep = !!opt.onConfirm();
                    }
                    if (keep)
                        return;
                    btnEvent();
                });
            }
            if (btnCancel) {
                $el.on('click', btnCancel, function() {
                    btnEvent();
                    opt.onCancel && opt.onCancel();
                });
            }
            if (!noCoverEvent) {
                $cover.off().on('click', function() {
                    btnEvent();
                    opt.onClose && opt.onClose();
                });
            }
            if (stopMove)
                document.addEventListener('touchmove', stopMoveFun, false);
        },
        createPopDom: function(opt) {
            if (!opt)
                return;
            var obj = this
              , className = opt.className
              , oldChoice = obj.popupBody.lastChoice
              , btnTxt = opt.btnTxt || '确定'
              , newChoice = (opt.isSku ? opt.skuId + className : className);
            var $el = $('#popupDom')
              , $popBody = $el.find('div.body');
            if (oldChoice && oldChoice == newChoice && $el.length) {
                obj.showHidePopup($el, true);
                return;
            }
            obj.popupBody.lastChoice = newChoice;
            var setDom = function() {
                $el = $('#popupDom');
                $popBody = $el.find('div.body');
                var $main = $el.find('.main');
                var closeEvent = function(tar) {
                    if (tar.hasClass('mod_btns')) {
                        opt.onConfirm && opt.onConfirm();
                        if (!opt.needConfirm)
                            obj.showHidePopup($el);
                    } else {
                        opt.onCancel && opt.onCancel();
                        obj.showHidePopup($el);
                    }
                };
                $el.off().on('click', function() {
                    closeEvent($(this));
                });
                $main.off().on('click', function(event) {
                    event.stopPropagation && event.stopPropagation();
                });
                $main.on('click', 'i.close,i.close_sp,div.mod_btns', function() {
                    closeEvent($(this));
                });
                if (opt.isPresent) {
                    $main.on('click', '.de_pm_list', function() {
                        var url = $(this).attr('tourl')
                          , urlReg = /^(https*:){0,1}\/\//;
                        if (urlReg.test(url)) {
                            window.location.href = url;
                        }
                    });
                }
                $el.attr('class', className);
                var $btn = $el.find('div.mod_btns');
                if (~className.indexOf('detail_promote_B_main')) {
                    $btn.hide();
                } else if (btnTxt) {
                    $btn.show().find('div.mod_btn').text(btnTxt);
                } else {
                    $btn.hide();
                }
                $el.find('div.header').html(opt.title + '<i class=' + (opt.closeClass || 'close') + '></i>');
                $popBody.html(opt.body || '');
                obj.showHidePopup($el, true);
            };
            if (oldChoice && $el.length) {
                obj.replaceDom({
                    $old: $el,
                    oldKey: 'popup_' + oldChoice,
                    newKey: 'popup_' + newChoice,
                    cb: function(hasNew) {
                        if (hasNew) {
                            $el = $('#popupDom');
                            obj.showHidePopup($el, true);
                        } else {
                            setDom();
                        }
                    }
                });
                if (className == 'detail_ease_service_main') {
                    $el.find('.mod_btn.bg_1').removeClass('bg_1');
                } else {
                    $el.find('.mod_btn').addClass('bg_1');
                }
                return;
            }
            if (!$el.length) {
                $('body').append('<div id="popupDom"><div class="main"><div class="header"><i class="close"></i></div><div class="body"></div><div class="mod_btns"><div class="mod_btn bg_1"' + (isJDChoice ? 'style="background-color: #c19b47;"' : '') + '></div></div></div>');
                $el = $('#popupDom');
                if (className == 'detail_ease_service_main') {
                    $el.find('.mod_btn.bg_1').removeClass('bg_1');
                } else {
                    $el.find('.mod_btn').addClass('bg_1');
                }
            }
            setDom();
        },
        showPopupArea: function(flag) {
            this.showHidePopup($('#popupBuyArea'), true);
            JD.events.trigger('item.util.showPopupArea');
            window.wa && window.wa('ptagExposure', {
                ptag: '7001.1.234'
            });
            if (flag == '1' || flag == '2') {
                $('#buyBtn1').parent().removeClass('show').hide();
                $('#popupConfirm').attr('tag', flag).parent().addClass('show').show();
                reporter.reportExposure({
                    ptag: '7001.11.4'
                });
            } else if (flag == '3') {
                $('#buyBtn1').parent().removeClass('show').hide();
                $('#popupConfirm').attr('tag', '0').parent().removeClass('show').hide();
                $('#popupNotice').hide();
                $('#storePopupConfirm').parent().addClass('show').show();
            } else {
                $('#buyBtn1').parent().addClass('show').show();
                $('#popupConfirm').attr('tag', '0').parent().removeClass('show').hide();
                $('#storePopupConfirm').parent().removeClass('show').hide();
            }
        },
        showHidePopup: function($dom, flag) {
            var obj = this;
            if (flag) {
                this.mainViewScroll = $(window).scrollTop();
                $dom.show();
                setTimeout(function() {
                    $dom.addClass('show');
                    $('body').css('top', '-' + $(window).scrollTop() + 'px').addClass('overflowHide');
                    obj.popupshow = true;
                }, 50);
            } else {
                setDelayTime();
                $dom.removeClass('show');
                $('body').removeClass('overflowHide').css('top', '0');
                window.scrollTo(0, this.mainViewScroll);
                setTimeout(function() {
                    $dom.hide();
                }, 50);
                obj.popupshow = false;
            }
        },
        replaceDom: function(opt) {
            if (!opt)
                return;
            var obj = this
              , $old = opt.$old
              , $new = ''
              , oldKey = opt.oldKey
              , newKey = opt.newKey;
            if ($old.length && oldKey && newKey) {
                if (!obj.$domCache[oldKey]) {
                    obj.$domCache[oldKey] = $old;
                }
                $new = obj.$domCache[newKey];
                var hasNew = false;
                if ($new && $new.length) {
                    $old.replaceWith($new);
                    hasNew = true;
                } else {
                    $new = $old.clone();
                    $old.replaceWith($new);
                    hasNew = false;
                }
                opt.cb && opt.cb(hasNew);
            }
        }
    };
    var umpMonitor = {
        bizid: '',
        cgiTimeout: 4000,
        timeout: {},
        setBizid: function(bizid) {
            this.bizid = bizid;
        },
        report: function(config) {
            if (!config)
                return;
            config.bizid = this.bizid;
            JD.report.umpBiz(config);
        },
        delTimeout: function(key, msg) {
            var obj = this;
            if (obj.timeout[key]) {
                clearTimeout(obj.timeout[key]);
                obj.timeout[key] = null;
                if (msg) {
                    var operation = key.replace('itil', '');
                    JD.report.umpBiz({
                        bizid: obj.bizid,
                        operation: operation,
                        result: '0',
                        source: '0',
                        message: msg
                    });
                }
            }
        },
        createTimeout: function(operationNo, msg, timeout) {
            var obj = this;
            var itilStr = 'itil' + operationNo;
            obj.delTimeout(itilStr);
            obj.timeout[itilStr] = setTimeout(function() {
                JD.report.umpBiz({
                    bizid: obj.bizid,
                    operation: operationNo,
                    result: '1',
                    source: '0',
                    message: msg
                });
            }, timeout || obj.cgiTimeout);
        }
    };
    var reporter = {
        isPgScene: false,
        isJDChoice: '',
        koStatus: 0,
        baseSkuId: '',
        skuId: '',
        isZiying: false,
        jdCategory: [],
        jdPrice: 0,
        venderName: '',
        venderId: '',
        brandName: '',
        brandId: '',
        jdAddrId: '',
        pTag: '',
        jdPvLogobj: {
            category: '',
            sku_change: '0'
        },
        txPvLogobj: {
            pv_type: '0',
            scn_type: '3'
        },
        init: function(config) {
            var obj = this;
            $.extend(obj, config);
            obj.reportPV();
        },
        setJdPvLogobj: function(key, value) {
            var obj = this;
            if (!key)
                return;
            obj.jdPvLogobj[key] = value;
        },
        reportPV: function() {
            var obj = this
              , dapeiId = urlParam.getUrlParam('dapeiid');
            obj.jdPvLogobj.sku_id = obj.skuId;
            obj.jdPvLogobj.area = obj.jdAddrId.join('|');
            obj.jdPvLogobj.leaf = obj.jdCategory.join('_');
            obj.jdPvLogobj.vender_id = obj.venderId;
            obj.jdPvLogobj.isJX = (obj.isJDChoice ? '1' : '0');
            obj.jdPvLogobj.isQianggou = (obj.koStatus > 0 ? '1' : '0');
            if (obj.jdPvLogobj.sku && ~obj.jdPvLogobj.sku.indexOf('|')) {
                var skuArr = obj.jdPvLogobj.sku.split('|');
                skuArr[1] = obj.jdPrice;
                obj.jdPvLogobj.sku = skuArr.join('|');
            }
            if (dapeiId)
                obj.jdPvLogobj.dapeiid = dapeiId;
            if (obj.pTag)
                obj.jdPvLogobj.ptag_id = obj.pTag + '';
            window.wa && window.wa('jdPv', obj.jdPvLogobj);
            obj.jdPvLogobj.sku_change = '1';
            if (window.isMScene) {
                if (!window.MPing)
                    return;
                var pv = new MPing.inputs.PV();
                if (pv && obj.isPgScene)
                    pv.page_param = 'pingou';
                if (pv)
                    pv.sku = obj.skuId;
                var mping = new MPing();
                mping.send(pv);
                MPing.inputs.Click.attachEvent();
            } else {
                obj.txReport({
                    isPV: true
                });
            }
        },
        txReport: function(opt) {
            opt = opt || {};
            var obj = this
              , ptag = opt.ptag
              , isPV = opt.isPV
              , skuId = opt.skuId || obj.skuId;
            if (isPV) {
                $.extend(obj.txPvLogobj, {
                    detail_sku: skuId,
                    detail_baseSku: obj.baseSkuId,
                    detail_ispop: (obj.isZiying ? '0' : '1'),
                    detail_cid: obj.jdCategory.slice(0, 3).join('_'),
                    detail_price: obj.jdPrice,
                    detail_brand: (obj.brandName || '') + '_' + (obj.brandId || ''),
                    detail_vendor: (obj.venderName || '') + '_' + (obj.venderId || '')
                });
                obj.txPvLogobj.detail_action = '';
                try {
                    window.wa && window.wa('tencent.send', 'pv', obj.txPvLogobj);
                    obj.txPvLogobj.pv_type = '1';
                    window.wa && window.wa('reportToWeixin', {
                        scn_type: 3,
                        detail_sku: '' + skuId,
                        detail_ispop: (obj.isZiying ? 0 : 1),
                        detail_cid: obj.jdCategory.slice(0, 3).join('_'),
                        detail_price: parseFloat(obj.jdPrice),
                        detail_vendor: (obj.venderName || '') + '_' + (obj.venderId || ''),
                        ddetail_baseSku: '' + obj.baseSkuId
                    });
                } catch (e) {}
            } else {
                try {
                    if (!opt.noJd && window.wa)
                        window.wa('jdClick', {
                            sku_id: skuId,
                            vender_id: obj.venderId || '',
                            ptag: ptag,
                            isJX: (obj.isJDChoice ? '1' : '0')
                        });
                    if (!window.isMScene) {
                        obj.txPvLogobj.detail_action = ptag;
                        window.wa && window.wa('tencent.send', 'click', obj.txPvLogobj);
                    }
                } catch (e) {}
            }
        },
        reports: function(opt) {
            var obj = this;
            if (window.wa && opt && opt.ptag) {
                if (window.isPingouScene)
                    opt.item_type = 1;
                if (obj.skuId)
                    opt.sku_id = obj.skuId;
                window.wa('jdClick', opt);
            }
        },
        reportExposure: function(opt) {
            var obj = this;
            if (window.wa && opt && opt.ptag) {
                if (window.isPingouScene)
                    opt.item_type = 1;
                if (obj.skuId)
                    opt.sku_id = obj.skuId;
                window.wa('ptagExposure', opt);
            }
        },
        pingClick: function(report_eventid, report_eventparam, report_eventlevel, report_pageparam) {
            if (!window.isMScene)
                return;
            if (!window.MPing)
                return;
            try {
                var click = new MPing.inputs.Click(report_eventid);
                click.event_param = report_eventparam || '';
                click.event_level = report_eventlevel || '';
                click.page_param = report_pageparam || '';
                var mping = new MPing();
                mping.send(click);
            } catch (e) {}
        },
        pingAddClick: function(report_eventid, report_eventparam, report_eventlevel, report_pageparam) {
            if (!window.isMScene)
                return;
            if (!window.MPing)
                return;
            try {
                var cart = new MPing.inputs.AddCart(report_eventid,report_pageparam);
                cart.event_param = report_eventparam || '';
                cart.event_level = report_eventlevel || '';
                cart.page_param = report_pageparam || '';
                var mping = new MPing();
                mping.send(cart);
            } catch (e) {}
        }
    };
    function $jsonToTpl(json, tpl) {
        var outStr = '';
        try {
            outStr = (tpl || '').replace(/{#(\w+)#}/g, function(a, b) {
                return json[b] === 0 ? '0' : (json[b] || "");
            });
        } catch (e) {}
        return outStr;
    }
    function getAppWebviewUrl(url, type) {
        var obj = this;
        if (JD && JD.device && JD.device.scene == 'jdapp') {
            url = 'openapp.jdmobile://virtual?params={"des":"m","category":"jump","url":"https:' + JD.url.addUrlParam(url, {
                'jdshwkon': '1'
            }) + '"}';
            switch (type) {
            case 'cart':
                url = 'openapp.jdmobile://virtual?params={"des":"cartB","category":"jump","sourceValue":"","sourceType":""}';
                break;
            }
        }
        return url;
    }
    function getImgUrl(jfsimg, size) {
        var url = '//m.360buyimg.com/mobilecms/s' + (size ? size : '750x750') + '_' + jfsimg;
        if (/2g|3g/i.test(network)) {
            url = JD.img.getImgUrl(url, '', '', '', '!q50');
        } else {
            url = JD.img.getImgUrl(url, '', '', '', '!q80');
        }
        return url;
    }
    exports.getNetWork = getNetWork;
    exports.formatTime = formatTime;
    exports.showNotice = showNotice;
    exports.setDelayTime = setDelayTime;
    exports.imageViewer = imageViewer;
    exports.popUp = popUp;
    exports.umpMonitor = umpMonitor;
    exports.reporter = reporter;
    exports.$jsonToTpl = $jsonToTpl;
    exports.getAppWebviewUrl = getAppWebviewUrl;
    exports.getImgUrl = getImgUrl;
});

define('ui', function(require, exports, module) {
    var _cacheThisModule_, container = document.body, removeAlertCoverDiv = 0;
    var bInit1111Tips = false;
    var goLink = "//wqs.jd.com/my/mywx1111.shtml?p=my1111Record";
    var alertCoverDiv = document.createElement('div');
    alertCoverDiv.className = 'mod_alert_mask show';
    function notNeedLoadCss() {
        var uiCSSUrl2 = 'base/gb/css/gb.min_'
          , uiCSSUrl3 = 'wx/gb/css/gb.min_'
          , uiCSSUrl4 = 'sq/gb/css/gb.min_'
          , uiCSSUrl6 = 'wxsq_dev/gb/css/gb.min_'
          , uiCSSUrl7 = 'wxsq_dev/gb/css/failover_gb.min_'
          , uiCSSUrl5 = 'mod_alert.min'
          , uiCSSUrl8 = 'page_hdcp/gb/css/gb.min_'
          , uiCSSUrl9 = 'nb1807/gb/css/gb.min_'
          , links = document.getElementsByTagName('link')
          , isHave = false;
        var homeUrl = window.JD ? JD.url.homeUrl : '//wq.jd.com/mcoss/wxportal/mainentry?tpl=index_v5';
        if (location.href.indexOf(homeUrl) > -1) {
            isHave = true;
        }
        for (var i = 0, l = links.length; i < l; i++) {
            if (links[i].rel == 'stylesheet' && (links[i].href.indexOf(uiCSSUrl2) >= 0 || links[i].href.indexOf(uiCSSUrl3) >= 0 || links[i].href.indexOf(uiCSSUrl4) >= 0 || links[i].href.indexOf(uiCSSUrl5) >= 0 || links[i].href.indexOf(uiCSSUrl8) >= 0 || links[i].href.indexOf(uiCSSUrl9) >= 0 || links[i].href.indexOf(uiCSSUrl6) >= 0) || links[i].href.indexOf(uiCSSUrl7) >= 0) {
                isHave = true;
                break;
            }
        }
        return isHave;
    }
    function loadCss(url) {
        if (notNeedLoadCss()) {
            return;
        }
        var l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', url);
        document.getElementsByTagName("head")[0].appendChild(l);
    }
    function showTip(obj) {
        if (!obj)
            return;
        var className = obj.className || 'g_small_tips'
          , tips = document.querySelector("." + className)
          , t = obj.t || 2000
          , title = obj.title || '操作成功!';
        if (!tips) {
            tips = document.createElement('div');
            tips.className = className;
            document.body.appendChild(tips);
        }
        tips.innerText = title;
        tips.style.display = 'block';
        setTimeout(function() {
            tips.style.display = 'none';
        }, t);
    }
    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }
    function info(opts) {
        var option = {
            msg: "",
            icon: "none",
            delay: 2000,
            showcoverdiv: false
        };
        opts = opts || {};
        extend(option, opts);
        var el = document.createElement('div');
        el.className = "mod_alert show fixed";
        el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>';
        container.appendChild(el);
        if (option.showcoverdiv) {
            document.body.appendChild(alertCoverDiv);
            removeAlertCoverDiv++;
        }
        setTimeout(function() {
            clear();
        }, option.delay);
        function clear() {
            if (option.showcoverdiv) {
                removeAlertCoverDiv--;
                removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
            }
            el.style.display = 'none';
            container.contains(el) && container.removeChild(el);
        }
    }
    function alert(opts) {
        var option = {
            showClose: false,
            msg: "",
            confirmText: '确认',
            icon: "none",
            onConfirm: null,
            stopMove: false,
            btnClass: 'btn_1',
            confirmColor: ""
        }
          , stopMove = function(e) {
            e.preventDefault();
        }
          , el = document.createElement('div');
        opts = opts || {};
        extend(option, opts);
        option.delay = parseInt(option.delay || 0);
        container = opts.container || container;
        el.className = "mod_alert show fixed";
        el.innerHTML = (option.showClose ? '<span class="close"></span>' : '') + (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>' + (option.subMsg ? '<p class="small">' + option.subMsg + '</p>' : '') + '<p class="btns"><a href="javascript:;" ' + (option.confirmColor ? ('style="color:' + option.confirmColor + '"') : '') + ' class="btn ' + option.btnClass + '">' + option.confirmText + '</a></p>';
        container.appendChild(el);
        option.showClose && (el.querySelector(".close").onclick = function(e) {
            option.onCancel && option.onCancel();
            this.onclick = null;
            clear();
        }
        );
        el.querySelector(".btn").onclick = function(e) {
            option.onConfirm && option.onConfirm();
            this.onclick = null;
            clear();
        }
        ;
        option.delay && setTimeout(function() {
            clear();
        }, option.delay);
        document.body.appendChild(alertCoverDiv);
        option.stopMove && document.addEventListener("touchmove", stopMove, false);
        removeAlertCoverDiv++;
        function clear() {
            removeAlertCoverDiv--;
            removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
            el.style.display = 'none';
            container.contains(el) && container.removeChild(el);
            option.stopMove && document.removeEventListener("touchmove", stopMove, false);
        }
    }
    function confirm(opts) {
        var option = {
            msg: "",
            icon: "none",
            okText: "确定",
            cancelText: "取消",
            onConfirm: null,
            onCancel: null,
            onClearCb: null,
            okClass: 'btn_1',
            cancelClass: 'btn_1',
            cancelColor: "",
            confirmColor: ""
        };
        opts = opts || {};
        extend(option, opts);
        container = opts.container || container;
        var el = document.createElement('div');
        el.className = "mod_alert show fixed";
        el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>' + (option.subMsg ? '<p class="small">' + option.subMsg + '</p>' : '') + '<p class="btns"><a href="javascript:;" id="ui_btn_confirm" ' + (option.confirmColor ? ('style="color:' + option.confirmColor + '"') : '') + ' class="btn ' + option.okClass + '">' + option.okText + '</a><a href="javascript:;" id="ui_btn_cancel" ' + (option.cancelColor ? ('style="color:' + option.cancelColor + '"') : '') + ' class="btn ' + option.cancelClass + '">' + option.cancelText + '</a></p>';
        container.appendChild(el);
        document.body.appendChild(alertCoverDiv);
        el.querySelector("#ui_btn_cancel").onclick = function(e) {
            option.onCancel && option.onCancel();
            clear();
        }
        ;
        el.querySelector("#ui_btn_confirm").onclick = function(e) {
            option.onConfirm && option.onConfirm();
            clear();
        }
        ;
        removeAlertCoverDiv++;
        function clear() {
            removeAlertCoverDiv--;
            el.style.display = 'none';
            container.contains(el) && container.removeChild(el);
            removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
            option.onClearCb && option.onClearCb();
        }
    }
    var toast = function() {
        var wrap = document.createElement('div');
        wrap.style.cssText = 'text-align: center; position: fixed; z-index: 310; top: 40%; width: 100%;';
        var main = document.createElement('p');
        var mainCssText = 'display: inline-block; padding: 10px 15px; background-color: rgba(0,0,0,.7); border-radius: 4px; color: #fff; font-size: 14px; text-align: left; word-break: break-all; max-width: 70%; transition: opacity .7s;';
        wrap.appendChild(main);
        var timeout;
        return function(opts) {
            var _opts = {
                msg: '',
                style: '',
                delay: 2000
            };
            opts = typeof opts === 'object' ? opts : {
                msg: opts
            };
            _opts = extend(_opts, opts);
            main.innerText = _opts.msg;
            main.style.cssText = mainCssText + _opts.style;
            main.style.opacity = '1';
            document.body.appendChild(wrap);
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                main.style.opacity = '0';
                timeout = setTimeout(function() {
                    document.body.removeChild(wrap);
                }, 700);
            }, _opts.delay);
        }
    }();
    loadCss(JD.url.getStaticDisRec("//wq.360buyimg.com/fd/h5/base/gb/css/mod_alert.min_79c590c3.css"));
    module.exports = {
        showTip: showTip,
        toast: toast,
        info: info,
        alert: alert,
        confirm: confirm
    };
});

/**
 * Created by sunjunwei on 2018/3/27.
 */

define("wq.item.detail", function(require, exports, module) {
    var _cacheThisModule_, $ = require("zepto"), mLs = require('loadJs'), itemComm = require('wq.item.common'), gVar = {
        timeout: {},
        cgiTimeout: 4000,
        pageWidth: $(window).width(),
        pageHeight: $(window).height(),
        cdnGray: window._itemGlobal && window._itemGlobal.cdnGray,
        cdnFail: {}
    }, cgiUrl = {
        commdet: '//yx.3.cn/service/info.action?',
        newCommdet: '//wq.jd.com/commodity/introduction/get?',
        cdnCommdet: '//wqsitem.jd.com/detail/',
        notice: '//www.jd.hk/notice/getInfo.do?',
        newParam: '//wq.jd.com/commodity/itembranch/getspecification?'
    };
    function setDetPadding(opt) {
        if (!opt || !opt.containerId || opt.padding === undefined)
            return;
        var $detContainer = $('#' + opt.containerId);
        if (!$detContainer.length)
            return;
        if ($.isArray(opt.padding)) {
            if (opt.padding[0].indexOf && opt.padding[0].indexOf('px') > 0) {
                $detContainer.css('padding', opt.padding.join(' '));
            } else {
                $detContainer.css('padding', opt.padding.join('px ') + 'px');
            }
        } else {
            $detContainer.css('padding', opt.padding);
        }
        itemComm.setDetPadding(opt.padding);
    }
    function loadCommDet(opt) {
        var skuType = opt.skuType
          , jsonData = opt.json
          , descriptionId = opt.descriptionId
          , callback = opt.callback
          , skuId = opt.skuId
          , showMobileDet = opt.showMobileDet
          , commId = opt.commId
          , pcLinkId = opt.pcLinkId
          , userType = opt.isPlus == 1 ? 'plus' : 'normal';
        if (!commId)
            return;
        var $dom = $('#' + commId);
        $dom.attr('hasdata', '0');
        if (!gVar.timeout.loadDetagain) {
            gVar.timeout.loadDetagain = setTimeout(function() {
                if ($dom.attr('hasdata') != '1') {
                    loadCommDet(opt);
                }
            }, gVar.cgiTimeout);
        }
        if (skuType == 2 || skuType == 3) {
            loadCommDetAct(opt);
            return;
        }
        if (showMobileDet) {
            loadCommDetMobile(opt);
            return;
        }
        window.commDetCallBack = function(json) {
            if (!jsonData)
                JD.report.umpBiz({
                    bizid: '25',
                    operation: '9',
                    result: '12',
                    source: '0',
                    message: 'yx.3.cn back'
                });
            var str = '该商品暂无商品详情<br>';
            if (json.success == '1') {
                str = itemComm.tavlHTML(json.content);
                $dom.html(str).attr('hasdata', '1');
                itemComm.transEmbed(commId);
                $dom.find('tr').each(function() {
                    var td = $(this).find('td');
                    if (td.length == 1) {
                        $(td[0]).css('width', gVar.pageWidth).css('background-size', 'contain');
                    }
                });
            }
            json.showMobileDet = '1';
            $('#' + pcLinkId).hide();
            callback && callback(json);
            itemComm.initLoadImg({
                commId: commId
            });
        }
        ;
        if (jsonData) {
            window.commDetCallBack(jsonData);
        } else {
            descriptionId = (descriptionId || 'd' + skuId);
            if (gVar.cdnGray && !gVar.cdnFail[skuId]) {
                window['cb0'] = function(json) {
                    if (json && json.retry === '1') {
                        gVar.cdnFail[skuId] = true;
                        opt.showMobileDet = false;
                        loadCommDet(opt);
                        return;
                    }
                    window.commDetCallBack(json);
                }
                ;
                mLs.loadScript({
                    url: cgiUrl.cdnCommdet + '0_' + descriptionId + '_' + userType + '.html',
                    setReportUrl: function() {
                        return cgiUrl.cdnCommdet;
                    }
                });
            } else {
                mLs.loadScript(cgiUrl.commdet + 'callback=commDetCallBack&source=wxsqitemsou&k=' + descriptionId + '&type=' + userType);
            }
        }
    }
    function loadCommDetAct(opt) {
        var skuType = opt.skuType
          , jsonData = opt.json
          , descriptionId = opt.descriptionId
          , callback = opt.callback
          , skuId = opt.skuId
          , showMobileDet = opt.showMobileDet
          , commId = opt.commId
          , pcLinkId = opt.pcLinkId
          , userType = opt.isPlus == 1 ? 'plus' : 'normal';
        if (!commId)
            return;
        window.commDetActCallBack = function(json) {
            var str = ''
              , bookTitle = {
                "productFeatures": "产品特色",
                "editerDesc": "编辑推荐",
                "contentDesc": "内容简介",
                "authorDesc": "作者简介",
                "image": "内页插图",
                "comments": "精彩书评",
                "catalogue": "目录",
                "bookAbstract": "精彩书摘",
                "introduction": "前言/序言"
            }
              , actTitle = {
                "productFeatures": "产品特色",
                "editerDesc": "编辑推荐",
                "contentDesc": "专辑介绍",
                "biography": "艺人介绍",
                "catalogue": "曲目",
                "comments": "精彩赏评",
                "image": "精彩剧照",
                "mvdColor": "色差"
            };
            if (json.success == '1') {
                if (json.isMobileDesc) {
                    str = itemComm.tavlHTML(json.content);
                    $('#' + pcLinkId).show();
                    bindImgEvents(opt);
                } else {
                    var title = (skuType == 2 ? bookTitle : actTitle);
                    for (var key in title) {
                        if (json[key]) {
                            if (key == 'image' && json[key].indexOf('>') == -1)
                                json[key] = '<img src="' + json[key].replace(/;/g, '"><img src="') + '">';
                            str += '<div class="p_desc_ptitle"><span class="p_desc_ptitle_text">' + title[key] + '</span></div>' + json[key];
                        }
                    }
                    if (str == '' && json.content) {
                        str = json.content;
                    }
                    str = itemComm.tavlHTML(str);
                    $('#' + pcLinkId).hide();
                }
            }
            if (str == '')
                str = '该商品暂无商品详情<br>';
            $('#' + commId).html(str).attr('hasdata', '1');
            itemComm.transEmbed(commId);
            callback && callback(json);
            itemComm.initLoadImg({
                commId: commId
            });
        }
        ;
        if (jsonData) {
            window.commDetActCallBack(jsonData);
        } else {
            descriptionId = (descriptionId || 'd' + skuId);
            var cbKey = (showMobileDet ? skuId : '0');
            if (gVar.cdnGray && !gVar.cdnFail[skuId]) {
                window['cb' + cbKey] = function(json) {
                    if (json && json.retry === '1') {
                        gVar.cdnFail[skuId] = true;
                        loadCommDetAct(opt);
                        return;
                    }
                    window.commDetActCallBack(json);
                }
                ;
                mLs.loadScript({
                    url: cgiUrl.cdnCommdet + cbKey + '_' + descriptionId + '_' + userType + '.html',
                    setReportUrl: function() {
                        return cgiUrl.cdnCommdet;
                    }
                });
            } else {
                mLs.loadScript(cgiUrl.commdet + 'callback=commDetActCallBack&source=wxsqitemsou' + (showMobileDet ? ('&skuId=' + skuId) : '') + '&k=' + descriptionId + '&type=' + userType);
            }
        }
    }
    function loadCommDetMobile(opt) {
        var jsonData = opt.json
          , descriptionId = opt.descriptionId
          , callback = opt.callback
          , userType = opt.isPlus == 1 ? 'plus' : 'normal'
          , skuId = opt.skuId
          , commId = opt.commId
          , pcLinkId = opt.pcLinkId;
        if (!commId)
            return;
        window.commDetMobileCallBack = function(json) {
            if (!jsonData)
                JD.report.umpBiz({
                    bizid: '25',
                    operation: '9',
                    result: '10',
                    source: '0',
                    message: 'yx.3.cn mobile back'
                });
            var str = '';
            if (json.content) {
                str = itemComm.tavlHTML(json.content);
            }
            if (!str) {
                opt.showMobileDet = false;
                opt.json = null;
                loadCommDet(opt);
                return;
            }
            $('#' + commId).html(str).attr('hasdata', '1');
            itemComm.transEmbed(commId);
            if (json.isMobileDesc) {
                $('#' + pcLinkId).show();
                bindImgEvents(opt);
            } else {}
            callback && callback(json);
            itemComm.initLoadImg({
                commId: commId
            });
        }
        ;
        if (jsonData) {
            window.commDetMobileCallBack(jsonData);
        } else {
            descriptionId = (descriptionId || 'd' + skuId);
            if (gVar.cdnGray && !gVar.cdnFail[skuId]) {
                window['cb' + skuId] = function(json) {
                    if (json && json.retry === '1') {
                        gVar.cdnFail[skuId] = true;
                        loadCommDetMobile(opt);
                        return;
                    }
                    window.commDetMobileCallBack(json);
                }
                ;
                mLs.loadScript({
                    url: cgiUrl.cdnCommdet + skuId + '_' + descriptionId + '_' + userType + '.html',
                    setReportUrl: function() {
                        return cgiUrl.cdnCommdet;
                    }
                });
            } else {
                mLs.loadScript(cgiUrl.commdet + 'callback=commDetMobileCallBack&source=wxsqitemsou&skuId=' + skuId + '&k=' + descriptionId + '&type=' + userType);
            }
        }
    }
    function globalBuyNotice(opt) {
        var jsonData = opt.json
          , category1 = opt.category
          , callback = opt.callback
          , globalType = opt.type
          , commId = opt.commId;
        if (!category1 || !(globalType > 0))
            return;
        window.globalBuyNoticeCB = function(json) {
            var $dom = $('#' + commId);
            if (json.resultCode == '1' && json.notices && json.notices.length) {
                var notices = [];
                for (var i = 0, leni = json.notices.length; i < leni; i++) {
                    if (json.notices[i].htmlNotice)
                        notices.push(json.notices[i].htmlNotice);
                }
                $dom.html(itemComm.tavlHTML(notices.join(''))).attr('hasdata', '1').find('a').attr('href', 'javascript:void(0);');
                itemComm.initLoadImg({
                    commId: commId
                });
            } else {
                $dom.attr('hasdata', '0');
            }
            callback && callback(json);
        }
        ;
        if (jsonData) {
            window.globalBuyNoticeCB(jsonData);
        } else {
            mLs.loadScript(cgiUrl.notice + 'callback=globalBuyNoticeCB&platform=3&type=' + globalType + '&category=' + category1 + '&t=' + Math.random());
        }
    }
    function bindImgEvents(opt) {
        var pcLinkId = opt.pcLinkId
          , commId = opt.commId
          , callback = opt.callback;
        $('#' + pcLinkId).off().on('click', function() {
            opt.showMobileDet = false;
            opt.json = null;
            opt.callback = function(json) {
                callback && callback(json);
                if ($('#detailBaseLine').offset())
                    window.scrollTo(0, $('#detailBaseLine').offset().top + 20);
                setTimeout(function() {
                    var $em;
                    for (var i = 0; i < 3; i++) {
                        $em = $('#' + commId + ' img').eq(i);
                        var init_src = $em.attr('init_src');
                        if (init_src)
                            $em.attr('src', init_src);
                    }
                }, 200);
            }
            ;
            loadCommDet(opt);
        });
    }
    function loadCommParam(opt) {
        var isZiying = opt.isZiying
          , packId = opt.packId
          , skuType = opt.skuType
          , jsonData = opt.json
          , expandAttrDesc = opt.expandAttrDesc
          , specificationId = opt.specificationId
          , skuId = opt.skuId
          , callback = opt.callback;
        if (!packId)
            return;
        if ((skuType == 2 || skuType == 3) && isZiying !== false) {
            loadCommParamAct(opt);
            callback && callback();
            return;
        }
        var commParamPlanB = function(data) {
            window.commParamBCallBack = function(json) {
                var NOtr = '<tr><td>商品编号</td><td>' + skuId + '</td></tr>'
                  , str = '<table cellpadding="0" cellspacing="1" width="100%" border="0" class="Ptable">';
                if (json.success == '1') {
                    var content = json.content.replace(/>[^<]+</g, function($0) {
                        var temp = $0.replace(/^>|<$/g, '').split('|');
                        if (temp.length > 1) {
                            return '><p style="position:relative;display:inline-block;padding-right:20px;">' + temp[0] + '<i class="inline_tip" tips="' + temp[1].replace(/\"/g, '&quot;') + '"></i></p><';
                        } else {
                            return $0;
                        }
                    });
                    if (content && content.indexOf('table') > -1 && content.indexOf('</td></tr>') > -1) {
                        str = content;
                    } else if (expandAttrDesc) {
                        var strTbody = '<tbody>'
                          , expandStr = ''
                          , expandArr = [];
                        for (var key in expandAttrDesc) {
                            expandArr = expandAttrDesc[key] || [];
                            expandStr = (isType('Array', expandArr) ? expandArr[0] : expandArr);
                            if (expandStr)
                                strTbody += ('<tr><td class="tdTitle">' + key + '</td><td>' + expandStr + '</td></tr>');
                        }
                        strTbody += '</tbody>';
                        str += strTbody + '</table>';
                    }
                    $('#' + packId).html(str);
                    $('#' + packId + ' table').addClass('param_table').prepend(NOtr);
                }
                callback && callback(json);
            }
            if (data) {
                commParamBCallBack(data);
            } else {
                mLs.loadScript(cgiUrl.commdet + 'callback=commParamBCallBack&source=wxsqitemsou&k=' + (specificationId || 'g' + skuId));
            }
        };
        var overTimer = window.setTimeout(function() {
            commParamPlanB();
        }, 4000);
        window.commParamCallBack = function(json) {
            if (json && json.errcode == 0 && json.data && json.data.propGroups && json.data.propGroups.length > 0) {
                window.clearTimeout(overTimer);
                var propGroups = json.data.propGroups
                  , $packDom = $('#' + packId);
                var htmlArr = ['<table cellpadding="0" cellspacing="1" width="100%" border="0" class="Ptable param_table"><tr><td>商品编号</td><td>' + skuId + '</td></tr><tbody>'];
                propGroups.forEach(function(val, idx) {
                    if (val.groupName && val.atts && val.atts.length > 0) {
                        htmlArr.push('<tr><th class="tdTitle" colspan="2">' + val.groupName + '</th></tr>');
                        val.atts = val.atts.sort(function(a, b) {
                            return a.sort - b.sort;
                        });
                        val.atts.forEach(function(item, index) {
                            if (item.attName && item.vals && item.vals.length > 0) {
                                if (item.attRemark) {
                                    htmlArr.push('<tr><td class="tdTitle">' + item.attName + '<i class="inline_tip" tips="' + item.attRemark.replace(/\"/g, '&quot;') + '"></i></td><td>' + item.vals.join('；') + '</td></tr>');
                                } else {
                                    htmlArr.push('<tr><td class="tdTitle">' + item.attName + '</td><td>' + item.vals.join('；') + '</td></tr>');
                                }
                            }
                        });
                    }
                });
                htmlArr.push('</tbody></table>');
                if (htmlArr.length > 2 && $packDom.length) {
                    $packDom.html(htmlArr.join(''));
                }
                callback && callback(json);
            } else {
                window.clearTimeout(overTimer);
                commParamPlanB();
            }
        }
        ;
        if (jsonData) {
            if (jsonData.content && jsonData.content.indexOf('table') > -1) {
                window.clearTimeout(overTimer);
                commParamPlanB(jsonData);
            } else {
                window.commParamCallBack(jsonData);
            }
        } else {
            mLs.loadScript(cgiUrl.newParam + 'callback=commParamCallBack&skuid=' + skuId + '&t=' + Math.random());
        }
    }
    function loadCommParamAct(opt) {
        var packId = opt.packId
          , skuType = opt.skuType
          , info = opt.infoItem
          , skuId = opt.skuId;
        if (!packId || !info)
            return;
        var str = '<table class="param_table">'
          , tr = function(t, n) {
            return '<tr><td>' + t + '</td><td>' + n + '</td></tr>';
        };
        str += tr('商品编号', skuId);
        var bookKey = {
            ISBN: "ISBN",
            ISSN: "ISSN",
            BookName: "营销书名",
            ForeignBookName: "外文书名",
            Language: "图书语言",
            Author: "作者",
            Editer: "编者",
            Proofreader: "校对",
            Remarker: "注释",
            Transfer: "译者",
            Drawer: "绘者",
            Publishers: "出版社",
            PublishNo: "出版社号",
            Series: "丛书名",
            Brand: "品牌",
            Format: "格式",
            Package: "包装(装帧)",
            Pages: "页数",
            BatchNo: "版次",
            PublishTime: "出版时间",
            SizeAndHeight: "尺寸及重量",
            ChinaCatalog: "中国法分类号",
            Sheet: "印张",
            Papers: "用纸",
            Attachment: "附件",
            AttachmentNum: "附件数量",
            PackNum: "套装数量",
            Letters: "字数",
            KeyWords: "主题词",
            PickState: "捡货标记",
            Compile: "编纂",
            Photography: "摄影",
            Dictation: "口述",
            Read: "朗读",
            Finishing: "整理",
            Write: "书写",
            saleDate: "上架时间",
            Format: "开本",
            PicNo: "审图号"
        };
        var actKey = {
            Aka: "又名",
            Brand: "品牌",
            Foreignname: "外文名",
            ISBN: "ISBN",
            Mvd_Wxjz: "文像进字",
            Mvd_Gqyz: "国权音字",
            Mvd_wyjz: "文音进字",
            ISRC: "ISRC",
            Mvd_Dcz: "电出字",
            Mvd_Xcyg: "新出音管",
            Press: "出版社",
            Publishing_Company: "发行公司",
            Production_Company: "出品公司",
            Copyright: "版权提供",
            Actor: "演员",
            Director: "导演",
            Dub: "配音",
            Voiceover: "解说者",
            Screenwriter: "编剧",
            Producer: "监制",
            Singer: "演唱者",
            Performer: "演奏者",
            Authorsstr: "作词",
            Compose: "作曲",
            Command: "指挥",
            Orchestra: "知名乐团",
            Media: "介质",
            Soundtrack: "碟数",
            Number_Of_Discs: "碟片数",
            Episode: "集数",
            Record_Number: "唱片数量",
            Publication_Date: "出版日期",
            Release_Date: "投放市场的日期",
            ReleaseDate: "上映日期",
            Accessories: "附件",
            Included_Additional_Item: "附件数量",
            Set_The_Number_Of: "套装数量",
            Format: "格式",
            Color: "色差",
            Region: "区码",
            Length: "片长",
            Screen_Ratio: "屏幕比例",
            Audio_Encoding_Chinese: "音频格式",
            Quality_Description: "品质说明",
            Dregion: "地区",
            Language: "图书语言",
            Language_Dubbed: "配音语言",
            Language_Subtitled: "字幕语言",
            Version_Language: "版本语言",
            Language_Pronunciation: "发音语言",
            Menu_Language: "菜单语言",
            Version: "版本",
            Type: "类型",
            Platform: "操作系统",
            Minimum_System_Requirement_Description: "最低配置要求",
            Recommended_System_Description: "推荐配置要求",
            Online_Play_Description: "在线游戏",
            Awards: "获奖情况",
            Type_Keywords: "商品类型关键词",
            Keywords: "主题词",
            Readers: "读者对象",
            Number_Of_Players: "游戏人员数量",
            Mfg_Minimum: "最小年龄",
            Mfg_Maximum: "最大年龄",
            Compile: "编纂",
            Photography: "摄影",
            Dictation: "口述",
            Read: "朗读",
            Finishing: "整理",
            Write: "书写",
            Version: "产品评级（可链入搜索结果页）",
            Color: "厂牌（可链入搜索结果页）",
            Type: "录音模式",
            Format: "画面色彩",
            saleDate: "上架时间:"
        };
        if (skuType == '2') {
            for (var k in bookKey) {
                if (info[k])
                    str += tr(bookKey[k], info[k]);
            }
        } else if (skuType == '3') {
            if (!info.Authorsstr) {
                info.Authorsstr = '';
                var tmp = []
                  , aut = info.Authors || []
                  , item = {};
                for (var i = 0; i < aut.length; i++) {
                    item = aut[i];
                    item.author = item.author || [];
                    for (var j = 0; j < item.author.length; j++) {
                        tmp.push(item.author[j].author);
                    }
                }
                info.Authorsstr = tmp.join('，');
            }
            for (var k in actKey) {
                if (info[k])
                    str += tr(actKey[k], info[k]);
            }
        }
        $('#' + packId).html(str + '</table>');
    }
    function loadPackgeSer(opt) {
        var jsonData = opt.json
          , skuId = opt.skuId
          , callback = opt.callback
          , $detServer = $('#' + opt.detServer)
          , $detPackage = $('#' + opt.detPackage);
        window.packageService = function(json) {
            $detServer.html(json.afterSale || '');
            $detPackage.html(json.packList || '');
            callback && callback(json);
        }
        ;
        if (jsonData) {
            window.packageService(jsonData);
        } else {
            if (!skuId)
                return;
            mLs.loadScript(cgiUrl.commdet + 'k1=' + skuId + '&source=wxsqitemsou&callback=packageService&t=' + Math.random());
        }
    }
    function isType(type, obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]"
    }
    exports.setDetPadding = setDetPadding;
    exports.loadCommDet = loadCommDet;
    exports.loadCommParam = loadCommParam;
    exports.loadPackgeSer = loadPackgeSer;
    exports.globalBuyNotice = globalBuyNotice;
});
define("jdVideo", function(require, exports, e) {
    "use strict";
    var _cacheThisModule_;
    var i = require("ui")
      , t = require("zepto")
      , o = '<div class="play_btn" #show#></div>'
      , n = '<div class="video_loading" style="display: none"><i></i></div>'
      , r = '<div class="loading_info" style="display: none;"><img #src#/></div>'
      , a = "<img #src#/>"
      , l = '<div class=controlBar><div class=playBtn #nologo#><div class="play pBack" data-type=1></div><div class="pause pBack" data-type=2 style="display:none;"></div></div><div class="pBack playScroll" #nologoScroll# data-type=3><div class="barIco pBack" data-type=4></div><div class="playBar pBack playBack"></div><div class="bufferBar pBack playBack"></div><div class=time></div><div class=duration></div></div>#fullScreen#<div class=logo #nologLogo#><a href="#logoUrl#" style="display: block; "><img #src#></a></div></div>'
      , s = g()
      , c = S()
      , d = JD.device.scene == "weixin" ? 1 : 0
      , f = navigator.userAgent
      , u = f.indexOf("Android") > -1 || f.indexOf("Adr") > -1
      , v = "";
    var p = "//img11.360buyimg.com/jdphoto/";
    var m = setTimeout;
    var h = {
        alertWifi: true,
        logoUrl: "//wqs.jd.com/",
        controlLogo: p + "s120x120_jfs/t5926/19/9735735212/19898/552afed6/5996c3f7N6a35210d.png",
        loadIngImg: p + "s300x225_jfs/t7750/306/693226527/33971/c53483cc/5996497fNe2c48721.png",
        autoplay: 0,
        controlHeight: "-40",
        videoLogo: p + "s28x20_jfs/t9289/125/380510113/18261/1f420488/59a6af86Ne5ef1841.png"
    };
    exports.init = function(e) {
        for (var i in e) {
            h[i] = e[i]
        }
        if (JD.url.getUrlParam("ignore"))
            h.alertWifi = false;
        var o = t(".jdvideo_div");
        if (o.length == 0)
            return;
        y(o)
    }
    ;
    function g() {
        return /ip(?:hone|ad|od)/.test(navigator.userAgent.toLowerCase())
    }
    function y(e) {
        e.forEach(function(e) {
            if (t(e).find("video").length == 0 && !t(e).attr("src") || t(e).data("evented"))
                return;
            t(e).css("position", "relative !important");
            var i = (!u || !d) && h.autoplay == 1;
            if (t(e).find("video").length > 0) {
                b(t(e), 1, i)
            } else {
                b(t(e), 0, i)
            }
            if (i) {
                k(1, t(e));
                if (d) {
                    if (window.WeixinJSBridge) {
                        setTimeout(function() {
                            _(t(e), 1)
                        }, 100)
                    } else {
                        document.addEventListener("WeixinJSBridgeReady", function() {
                            _(t(e), 1)
                        })
                    }
                } else {
                    _(t(e), 1)
                }
                return
            }
            _(t(e))
        })
    }
    function w(e, i, t, o) {
        JD.report.umpBiz({
            bizid: o ? o : "427",
            operation: e,
            result: i,
            source: "0",
            message: t || ""
        })
    }
    function B(e, i) {
        JD.events.trigger(e, i)
    }
    function T(e) {
        return JD.img.getScaleImg(e)
    }
    function b(e, i) {
        var d = "";
        var f = "";
        var u = ""
          , v = "";
        var p = t(e).find("video");
        h.videoLogo && (u = a.replace("#src#", "src='" + T(h.videoLogo) + "' class='video_logo'"));
        if (!i) {
            d = '<video #contr# style="display: none;" preload="none" style="margin: auto;" webkit-playsinline="true" playsinline >暂时不支持播放该视频</video>';
            h.loadIngImg && (v = r.replace("#src#", 'src="' + T(h.loadIngImg) + '"'))
        }
        if (e.attr("controls") || s || i && p.attr("controls")) {
            var m = o;
            if (i) {
                p.attr("controls", "controls");
                m = o.replace("#show#", "style='display:none;'")
            } else {
                d = d.replace("#contr#", "controls='controls'")
            }
            f = d + n + m + v + u
        } else {
            var g = l;
            if (h.controlLogo) {
                g = g.replace("#logoUrl#", T(h.logoUrl)).replace("#src#", "src='" + T(h.controlLogo) + "'")
            } else {
                g = g.replace("#nologLogo#", "style='display:none'").replace("#nologo#", "style='margin-left:-30px;'").replace("#nologoScroll#", "style='margin-left:-30px;'")
            }
            if (c) {
                g = g.replace("#fullScreen#", '<div class="full" data-type="5"><div class="fullScreen pBack"></div></div>')
            } else {
                g = g.replace("#fullScreen#", "")
            }
            f = d + g + n + o + v + u
        }
        e.append(f)
    }
    function S() {
        var e = document.documentElement;
        return "requestFullscreen"in e || "webkitRequestFullScreen"in e
    }
    JD.events.listen("pageshow", function() {
        var e = document.querySelectorAll(".jdvideo_div video")
          , i = e.length;
        if (i == 0)
            return;
        for (var t = 0; t < i; t++) {
            e[t].pause()
        }
    });
    function P(e) {
        this._init(e)
    }
    P.fn = P.prototype;
    P.fn._init = function(e) {
        var i = this;
        i.opt = e;
        i.item = e.item;
        var o = t(e.item).find("video");
        i.loadTimes = 0;
        i.timer = 0;
        i.controlTime = 0;
        i.video = o;
        i.ld = o.siblings(".video_loading");
        i.pB = o.siblings(".play_btn");
        i.ldi = o.siblings(".loading_info");
        i.ow = 0;
        i.errored = 0;
        i.c = o.siblings(".controlBar");
        i.vpuB = i.c.find(".pause");
        i.vpB = i.c.find(".play");
        i.duration = o.data("duration") || 0;
        i.isCd = false;
        i.lp = 0;
        i.cS = 0;
        i.loopTimes = 1;
        i.isSelf = typeof o.attr("controls") == "undefined" ? 0 : 1;
        if (e.play) {
            i.firstPlay()
        }
        i.bindEvent()
    }
    ;
    P.fn.firstPlay = function() {
        var e = this;
        var i = e.item.offset() || {
            height: 200
        };
        e.ldi.css("line-height", i.height + "px");
        e.detectWifi(function() {
            e.pB.hide();
            e.item.find(".poster").hide();
            e.ldi.show();
            e.detectNetwork();
            e.tapPlay()
        })
    }
    ;
    P.fn.detectWifi = function(e) {
        if (h.alertWifi) {
            JD.device.getNetwork(function(t) {
                if (t.toLowerCase() != "wifi") {
                    var o = {
                        msg: "非wifi条件下播放视频，可能需要耗费您的移动数据网络,是否继续？",
                        icon: "info",
                        okText: "确定",
                        cancelText: "取消",
                        onConfirm: function() {
                            e()
                        }
                    };
                    i.confirm(o)
                } else {
                    e()
                }
            })
        } else {
            e()
        }
    }
    ;
    P.fn.detectNetwork = function() {
        var e = this;
        m(function() {
            if (!e.started) {
                var t = {
                    msg: "网络有点慢哦",
                    icon: "info"
                };
                i.info(t);
                m(function() {
                    if (!e.started) {
                        var t = {
                            msg: "视频获取异常，请重试~",
                            icon: "info",
                            okText: "取消",
                            cancelText: "确定",
                            onConfirm: function() {},
                            onCancel: function() {
                                e.tapPlay()
                            }
                        };
                        i.confirm(t)
                    }
                }, 3e3)
            }
        }, 8e3)
    }
    ;
    P.fn.bindEvent = function() {
        var e = this;
        e.opt.eventArray && e.opt.eventArray.forEach(function(i) {
            e.video.on(i, function() {
                e[i].apply(e)
            })
        });
        e.pB.on("click", function(i) {
            i.stopPropagation();
            if (!e.started) {
                e.firstPlay()
            } else {
                e.tapPlay.apply(e)
            }
        });
        e.item.on("click", "video", function(i) {
            i.stopPropagation();
            e.cS = !e.cS;
            e.detectControl()
        });
        e.item.on("touchstart", ".barIco", function(i) {
            e.movePos = 1
        });
        e.item.on("touchmove", ".barIco", function(i) {
            if (!e.movePos)
                return;
            e.moveBarIcon(i)
        });
        e.item.on("touchend", ".barIco", function(i) {
            e.video[0].currentTime = e.movePos;
            e.movePos = 0;
            e.detectControl()
        });
        e.c.on("click", "div", function(i) {
            i.stopPropagation();
            e.handleControl(t(i.currentTarget), i)
        })
    }
    ;
    P.fn.handleControl = function(e, i) {
        var t = e.data("type");
        if (!t) {
            e = e.parent();
            t = e.data("type");
            if (!t) {
                return
            }
        }
        var o = this;
        var n = o.item;
        var r = o.video;
        if (!r || r.length == 0)
            return;
        o.detectControl();
        if (t == 1) {
            r[0].play();
            o.vpB.hide();
            o.vpuB.show();
            return
        }
        if (t == 2) {
            r[0].pause();
            o.vpuB.hide();
            o.vpB.show();
            return
        }
        if (t == 3) {
            var a = n.find(".playScroll").offset();
            var l = (i.pageX - a.left) / a.width;
            var s = l * o.duration;
            r[0].currentTime = s;
            var c = l * a.width;
            n.find(".barIco").css("left", c);
            n.find(".playBar").css("width", c);
            o.vpB.hide();
            o.vpuB.show();
            r[0].play();
            return
        }
        if (t == 4) {
            return
        }
        if (t == 5) {
            var d = r.get(0);
            if (d.requestFullscreen) {
                d.requestFullscreen()
            } else if (d.webkitRequestFullScreen) {
                d.webkitRequestFullScreen()
            }
            return
        }
    }
    ;
    P.fn.moveBarIcon = function(e) {
        var i = this;
        var t = e.touches[0].pageX;
        if (t < i.ol)
            t = i.ol;
        else if (t > i.or)
            t = i.or;
        var o = t - i.ol;
        var n = o / i.ow * i.duration;
        i.movePos = n;
        i.moveProcess(o, n)
    }
    ;
    P.fn.moveProcess = function(e, i) {
        var t = this;
        t.c.find(".barIco").css("left", e);
        t.c.find(".playBar").css("width", e);
        t.coputeUpdateTime(i)
    }
    ;
    P.fn.detectControl = function() {
        var e = "5"
          , i = this;
        clearTimeout(i.controlTime);
        if (i.cS) {
            e = h.controlHeight;
            i.c.show();
            i.controlTime = m(function() {
                if (i.movePos)
                    return;
                e = "5";
                i.cS = false;
                if (i.timer == 0) {
                    i.c.show();
                    e = h.controlHeight;
                    i.cS = true
                } else {
                    t()
                }
                m(function() {
                    i.c.css("marginTop", e + "px")
                }, 50)
            }, 5e3)
        } else {
            t()
        }
        m(function() {
            i.c.css("marginTop", e + "px")
        }, 50);
        function t() {
            m(function() {
                i.c.hide()
            }, 1e3)
        }
    }
    ;
    P.fn.playing = function() {
        var e = this;
        e.lp = 0;
        if (e.timer)
            return;
        e.ldi.hide();
        e.video.show();
        !e.started && (e.item.css({
            height: e.item.height() + 2 + "px",
            position: "relative !important"
        }),
        k(0, e.item));
        e.started = 1;
        e.computeDuration();
        B("video_play", {
            code: 0
        });
        w(4, 0);
        e.ld.hide();
        e.pB.hide();
        e.vpB.hide();
        e.vpuB.show();
        e.loadTimes = 0;
        m(function() {
            e.c.show();
            m(function() {
                e.cS = 1;
                e.detectControl()
            }, 500)
        }, 1500);
        e.timer = setInterval(function() {
            e.loadTimes++;
            if (e.loadTimes >= 2) {
                e.ld.show()
            } else {
                e.ld.hide()
            }
            if (e.video[0].ended) {
                e.clearTimer()
            }
            k(++e.loopTimes, e.item)
        }, 3e3)
    }
    ;
    P.fn.timeupdate = function() {
        var e = this;
        e.ld.hide();
        e.pB.hide();
        e.loadTimes = 0;
        var i = e.video[0].currentTime;
        if (!e.ow) {
            if (e.c.find(".playScroll").length > 0) {
                var t = e.c.find(".playScroll").offset();
                e.ow = t.width;
                e.ol = t.left;
                e.or = t.left + t.width
            }
        }
        var o = i / e.duration * e.ow;
        !e.movePos && e.moveProcess(o, i)
    }
    ;
    P.fn.abort = function() {
        this.errors("abort:" + this.video[0].error)
    }
    ;
    P.fn.errors = function(e) {
        var i = this;
        i.ld.hide();
        i.pB.show();
        i.clearTimer();
        i.errored++;
        if (i.errored < 3) {
            i.tapPlay()
        } else {
            w(4, 1, e);
            B("video_play", {
                code: 1,
                msg: i.video[0].error
            })
        }
    }
    ;
    P.fn.error = function() {
        this.errors("error:" + this.video[0].error)
    }
    ;
    P.fn.ended = function() {
        var e = this;
        e.ld.hide();
        e.pB.show();
        e.cS = 0;
        e.detectControl();
        e.clearTimer();
        t(e.item).find(".time").html(t(e.item).find(".duration").html())
    }
    ;
    P.fn.pause = function() {
        var e = this;
        e.ld.hide();
        !e.isSelf && e.pB.show();
        e.vpuB.hide();
        e.vpB.show();
        e.clearTimer()
    }
    ;
    P.fn.clearTimer = function() {
        var e = this;
        clearInterval(e.timer);
        e.ld.hide();
        e.timer = 0
    }
    ;
    P.fn.durationchange = function() {
        this.computeDuration()
    }
    ;
    P.fn.loadedmetadata = function() {
        this.computeDuration()
    }
    ;
    P.fn.computeDuration = function() {
        var e = this;
        if (e.isCd)
            return;
        var i = e.video[0].duration;
        if (i > 0) {
            e.isCd = true;
            e.video.data("duration", i);
            e.duration = i;
            t(e.item).find(".duration").html(I(i));
            t(e.item).find(".time").html("00:00")
        }
    }
    ;
    P.fn.coputeUpdateTime = function(e) {
        e = parseInt(e);
        if (Math.abs(e - this.lp) >= 1) {
            t(this.item).find(".time").html(I(e));
            this.lp = e
        }
    }
    ;
    P.fn.tapPlay = function() {
        var e = this;
        var i = function() {
            if (e.errored)
                e.video[0].load();
            e.pB.hide();
            e.vpB.hide();
            e.vpuB.show();
            e.video[0].play();
            e.errored = 0
        };
        if (!e.video.attr("src")) {
            e.video.attr("src", e.item.attr("src"));
            setTimeout(function() {
                i()
            }, 300)
        } else {
            i()
        }
    }
    ;
    function k(e, i) {
        if (!h.rpt_t)
            return;
        if (!v && typeof getFingerPrint == "function") {
            var t = getFingerPrint();
            v = t[2]
        }
        var o = i.attr("rpt_type");
        JD.sendJs("//wq.jd.com/ubanalysis?d=" + e + "&t=" + h.rpt_t + "&f=" + v + "&tp=" + ((typeof o == "undefined" ? h.rpt_type : o) || ""))
    }
    function I(e) {
        if (isNaN(e))
            return "";
        var i = "";
        var t = parseInt(e / 3600);
        if (t > 0) {
            if (t < 10) {
                i = "0" + t
            } else {
                i = t
            }
            i += ":"
        }
        var o = e % 3600;
        var n = parseInt(o / 60);
        if (n < 10) {
            i += "0" + n
        } else {
            i += n
        }
        i += ":";
        var r = Math.floor(o % 60);
        if (r < 10) {
            i += "0" + r
        } else {
            i += r
        }
        return i
    }
    function _(e, i) {
        var o = t(e).find("video");
        t(e).data("evented", 1);
        new P({
            item: e,
            eventArray: ["playing", "timeupdate", "abort", "error", "ended", "pause", "durationchange", "loadedmetadata"],
            play: i || 0
        })
    }
});

define('wfdata', function(require, exports, module) {
    var _cacheThisModule_, ls = require('loadJs'), useDebug = JD.url.getUrlParam("mdebug") ? true : false, storage = require("mqqStorage"), md5 = require("md5"), _DataType = {
        PPMS: 5,
        Spematerial: 7,
        Mportal: 8,
        Brandspecial: 9,
        Keywordsearch: 10,
        CPC_NEW: 11,
        SECKILL: 12,
        RANKLIST: 13,
        Keywordsearch_MUTI: 14,
        CATEGORYENTRY: 15,
        MARTV3: 16,
        PINGOU: 17,
        SecondSECKILL: 18,
        MART: 0,
        CPT: 1,
        CPC: 2,
        CPT_WX: 3,
        MART_MUTI: 4,
        MaterialQuery: 6,
    };
    var TYPE_MAP = {};
    TYPE_MAP[_DataType.PPMS] = {
        cgi: '//wq.360buyimg.com/data/ppms/js/ppms.page{#key#}.jsonp'
    };
    TYPE_MAP[_DataType.Spematerial] = {
        cgi: '//wqcoss.jd.com/mcoss/spematerial/spematerialshow'
    };
    TYPE_MAP[_DataType.Mportal] = {
        cgi: '//wqcoss.jd.com/mcoss/mportal/show'
    };
    TYPE_MAP[_DataType.Brandspecial] = {
        cgi: '//wqcoss.jd.com/mcoss/brandspecial/show'
    };
    TYPE_MAP[_DataType.Keywordsearch] = {
        cgi: '//wqcoss1.jd.com/mcoss/keyword/keywordsearch'
    };
    TYPE_MAP[_DataType.CPC_NEW] = {
        cgi: '//wqcoss1.jd.com/mcoss/focusbi/show_new'
    };
    TYPE_MAP[_DataType.SECKILL] = {
        cgi: '//wqcoss.jd.com/mcoss/seckill/show'
    };
    TYPE_MAP[_DataType.SecondSECKILL] = {
        cgi: '//wqcoss.jd.com/mcoss/secondkill/show'
    };
    TYPE_MAP[_DataType.RANKLIST] = {
        cgi: '//wqcoss.jd.com/mcoss/ranklist/bshow'
    };
    TYPE_MAP[_DataType.Keywordsearch_MUTI] = {
        cgi: '//wqcoss.jd.com/mcoss/keyword/batchkeywordsearch'
    };
    TYPE_MAP[_DataType.CATEGORYENTRY] = {
        cgi: '//wqcoss.jd.com/mcoss/categoryentry/getentryv2'
    };
    TYPE_MAP[_DataType.MARTV3] = {
        cgi: '//wqcoss.jd.com/mcoss/martv3/show'
    };
    TYPE_MAP[_DataType.PINGOU] = {
        cgi: '//wqcoss.jd.com/mcoss/seckill/pingou'
    };
    TYPE_MAP[_DataType.MART] = {
        cgi: '//wqcoss.jd.com/mcoss/mmart/show'
    };
    TYPE_MAP[_DataType.CPT] = {
        cgi: '//wqcoss.jd.com/mcoss/focuscpt/qqshow'
    };
    TYPE_MAP[_DataType.CPC] = {
        cgi: '//wqcoss.jd.com/mcoss/focusbi/show'
    };
    TYPE_MAP[_DataType.CPT_WX] = {
        cgi: '//wqcoss.jd.com/mcoss/focuscpt/wxshow'
    };
    TYPE_MAP[_DataType.MART_MUTI] = {
        cgi: '//wqcoss.jd.com/mcoss/mmart/mshow'
    };
    TYPE_MAP[_DataType.MaterialQuery] = {
        cgi: '//wqcoss.jd.com/mcoss/material/query'
    };
    function getParamStr(param, isGetCacheKey) {
        var arr = [];
        for (var key in param) {
            var v = param[key] + "";
            if (v) {
                arr.push(isGetCacheKey ? key + '_' + v : key + '=' + v);
            }
        }
        if (isGetCacheKey) {
            return arr.sort().join('_');
        } else {
            arr.push('t=' + Math.round(new Date() / (1000 * 300)));
            return arr.join('&');
        }
    }
    function getCGI(opt) {
        var nowtype = opt.dataType;
        var tplUrl = TYPE_MAP[opt.dataType].cgi;
        return opt.dataType == _DataType.PPMS ? tplUrl.replace("{#key#}", opt.param.key) : tplUrl;
    }
    function getStaticUrl(opt) {
        var params = opt.param;
        var cgi = getCGI(opt);
        var url = cgi + (cgi.indexOf('?') > -1 ? '&' : '?') + getParamStr(params);
        return url;
    }
    function fetchData(opt, cacheKey) {
        var func = arguments.callee
          , args = arguments
          , context = this;
        var params = JSON.parse(JSON.stringify(opt.param));
        var cbName = opt.dataType == _DataType.PPMS ? opt.param.callback : JD.cgi.getCallback(TYPE_MAP[opt.dataType].cgi, params);
        params.callback = cbName;
        var cgi = getCGI(opt);
        var url = cgi + (cgi.indexOf('?') > -1 ? '&' : '?') + getParamStr(params);
        window[cbName] = function(obj) {
            try {
                if (obj.pageId && !obj.errCode) {
                    storage.writeH5Data(cacheKey, obj, null, 5);
                    opt.cb && opt.cb(obj);
                } else if (obj.errCode == "0" || obj.errcode == "0" || obj.retcode == "0") {
                    if (!useDebug) {
                        storage.writeH5Data(cacheKey, obj, null, 5);
                    }
                    opt.cb && opt.cb(obj);
                } else {
                    opt.handleError && opt.handleError(func, args, context, obj);
                }
            } catch (exp) {
                if (useDebug) {
                    console.log('wf-data-error-begin.............');
                    console.log(exp.message);
                    console.log(exp.stack);
                    console.log('..............wf-data-error-end');
                }
                opt.handleError && opt.handleError(func, args, context, exp);
            }
        }
        ;
        ls.loadScript({
            url: url,
            charset: 'utf-8',
            onError: function(msg, url, line, col, error) {
                var errorObj = {
                    msg: msg,
                    url: url,
                    line: line,
                    col: col,
                    error: error
                };
                opt.handleError && opt.handleError(func, args, context, errorObj);
            },
            timeout: opt.timeout || 8000,
            onTimeout: function() {
                opt.handleTimeout && opt.handleTimeout();
            }
        });
    }
    function getData(opt) {
        var cacheKey, notLoadFromCache = false;
        if (opt.dataType == _DataType.CPC_NEW && JD.url.getUrlParam('debugTime')) {
            opt.param.pretime = parseInt(+new Date(JD.GLOBAL_CONFIG.NOW) / 1000)
        }
        if (!useDebug && !notLoadFromCache) {
            cacheKey = opt.param.cacheKey || getParamStr(opt.param, true);
            storage.readH5Data(cacheKey, function(res, success) {
                if (!success || !res) {
                    fetchData(opt, cacheKey);
                    return;
                }
                window.setTimeout(function() {
                    opt.cb && opt.cb(res, true);
                }, 0);
            });
        } else {
            fetchData(opt, cacheKey);
        }
    }
    exports.getData = function(opt) {
        getData(opt);
    }
    exports.getStaticUrl = function(opt) {
        return getStaticUrl(opt);
    }
    exports.DataType = _DataType;
});

define("jd.item.detail", function(require, exports, module) {
    var _cacheThisModule_, $ = require('zepto'), util = require('util'), loopScroll = require('loopScroll'), commDet = require('wq.item.detail'), itemComm = require('wq.item.common'), mWfdata = require('wfdata'), mLs = require('loadJs'), jdVideo = require('jdVideo'), urlParam = require('url'), itemUtil = require('jd.item.util'), popUp = itemUtil.popUp, imageViewer = itemUtil.imageViewer, $jsonToTpl = itemUtil.$jsonToTpl, isWX = util.isWX(), pageWidth = $(window).width();
    var Detail = function() {
        var opt = {
            isMScene: false,
            isJDChoice: false,
            isPlus: false,
            skuId: '',
            addBrandAct: false,
            addAd: false,
            isZiying: false,
            isFCS: false,
            venderId: '',
            skuType: '',
            descriptionId: '',
            specificationId: '',
            itemInfo: {},
            spAttr: {},
            expandAttrDesc: {},
            isOverseaPurchase: false,
            jdCategory: [],
            taxInfo: {},
            videoId: '',
            isLoadDet: [1, 0, 1, 0],
            detIndex: 0,
            detLowH: 0,
            detailH: 0,
            jdSkuInfo: {},
            showMobileDet: true
        };
        $.extend(this, opt);
    };
    Detail.prototype.init = function(config) {
        config = config || {};
        var obj = this;
        $.extend(obj, config);
        obj.detLowH = $(window).height() - $('#detailTab').height() + 20;
        obj.setDetTab();
        obj.detailAdvertise();
        obj.videoDetail();
        obj.globalBuyNotice();
        obj.reminder();
        obj.adjust();
        obj.bindEvent();
    }
    ;
    Detail.prototype.refresh = function(config) {
        config = config || {};
        var obj = this;
        $.extend(obj, config);
        $('#videoMain').hide();
        $('#reminder').hide();
        obj.showMobileDet = true;
        obj.getTabData();
        obj.videoDetail();
        obj.globalBuyNotice();
        obj.reminder();
        obj.adjust();
    }
    ;
    Detail.prototype.adjust = function() {
        var obj = this;
        if (obj.isZiying && obj.jdCategory[0] == '12218') {
            $('#detServer,#serverPromise').hide();
            $('#freshServerPromise').show();
        }
        if (!obj.isZiying && !obj.isFCS) {
            $('#serverPromise').hide();
        }
        if (obj.spAttr.sfkc === '1') {
            $('#skusfkc').show();
        } else {
            $('#skusfkc').hide();
        }
    }
    ;
    Detail.prototype.setDetTab = function() {
        var obj = this
          , wb = document.body.clientWidth;
        loopScroll.init({
            moveDom: $('#detailCont'),
            moveChild: $('#detailCont > div'),
            tab: $('#detailTab div.item'),
            viewDom: $('#detailCont'),
            index: 1,
            lockScrY: true,
            min: pageWidth,
            step: Math.min(pageWidth, wb || 540),
            fun: function(index) {
                obj.showDetTab(index);
            }
        });
    }
    ;
    Detail.prototype.showDetTab = function(index) {
        var obj = this
          , isChange = obj.detIndex != index;
        if (!isChange)
            return;
        obj.detTabH = $('#detailBaseLine').offset().top;
        $.publish('item.detail.changeTab', [index, isChange]);
        obj.detIndex = index;
        if (index == 1)
            obj.loadCommDet();
        if (index == 2) {
            obj.loadCommParam();
            obj.loadPackgeSer();
        }
        if (index == 3) {
            obj.loadPackgeSer();
            if (!(obj.isOverseaPurchase > 0) && ~' 798 870 878 880 12392 13690 13298 1300 757 758 753 751 672 1105 673 12798 688 717 718 720 719 722 1649 '.indexOf(' ' + obj.jdCategory[2] + ' ')) {
                $('#ecoTip').show();
            } else {
                $('#ecoTip').hide();
            }
            $('#detail3Normal').show();
        }
        obj.setDetHeight();
    }
    ;
    Detail.prototype.getTabData = function() {
        if (this.detIndex == 3) {
            this.loadPackgeSer();
        } else if (this.detIndex == 2) {
            this.loadCommParam();
            this.loadPackgeSer();
        } else if (this.detIndex == 1) {
            this.loadCommDet();
        }
    }
    ;
    Detail.prototype.loadCommParam = function() {
        $('#package').hide();
        if (this.isLoadDet[this.detIndex] == this.skuId)
            return;
        var obj = this;
        if (!obj.jdSkuInfo['param'])
            obj.jdSkuInfo['param'] = {};
        commDet.loadCommParam({
            isZiying: obj.isZiying,
            packId: 'detParam',
            json: obj.jdSkuInfo['param'][obj.skuId],
            skuType: obj.skuType,
            infoItem: obj.itemInfo,
            expandAttrDesc: obj.expandAttrDesc,
            specificationId: obj.specificationId,
            skuId: obj.skuId,
            callback: function(json) {
                obj.jdSkuInfo['param'][obj.skuId] = json;
                obj.isLoadDet[obj.detIndex] = obj.skuId;
            }
        });
    }
    ;
    Detail.prototype.loadCommDet = function() {
        if (this.isLoadDet[this.detIndex] == this.skuId)
            return;
        var obj = this
          , key = obj.skuId
          , skuType = obj.skuType;
        if (obj.addBrandAct)
            obj.brandActInfo();
        if (obj.addAd)
            obj.adPosition();
        if (!obj.jdSkuInfo['det'])
            obj.jdSkuInfo['det'] = {};
        if (skuType != 2 && skuType != 3 && !obj.isZiying && obj.venderId * 1) {
            key = obj.venderId;
            if (obj.jdSkuInfo['det'][key])
                return;
        }
        if (obj.jdSkuInfo['det'][key + 'pcdet']) {
            obj.showMobileDet = false;
            key += 'pcdet';
        }
        if (skuType == 2 || skuType == 3) {
            $('#commDesc').addClass('strong_link');
        } else {
            commDet.setDetPadding({
                containerId: 'detail1',
                padding: 0
            });
        }
        commDet.loadCommDet({
            commId: 'commDesc',
            showMobileDet: obj.showMobileDet,
            pcLinkId: 'pcItemLink',
            json: obj.jdSkuInfo['det'][key],
            skuType: skuType,
            descriptionId: obj.descriptionId,
            skuId: obj.skuId,
            isPlus: obj.isPlus,
            callback: function(json) {
                if (json.showMobileDet == '1' && key.indexOf('pcdet') == -1)
                    key += 'pcdet';
                obj.jdSkuInfo['det'][key] = json;
                obj.isLoadDet[obj.detIndex] = obj.skuId;
                setTimeout(function() {
                    var em = $('#commDesc img').eq(0)
                      , init_src = em.attr('init_src');
                    if (init_src)
                        em.attr('src', init_src);
                }, 2000);
                obj.setDetHeight();
            }
        });
    }
    ;
    Detail.prototype.brandActInfo = function() {
        var obj = this
          , brandId = obj.itemInfo.brandId
          , category = obj.jdCategory;
        if (!brandId || !category || obj.jdSkuInfo['brand_' + brandId + '_' + category[2]])
            return;
        var url = '//wq.jd.com/commodity/itembranch/getbrandactivity?callback=brandactivityCb&brandid=' + brandId + '&cat=' + category[2] + (obj.isMScene ? '&sceneval=2' : '');
        window.brandactivityCb = function(json) {
            if (json.errcode == 0 && json.data && json.data.success && json.data.objs && json.data.objs.length > 0) {
                json.data.objs = json.data.objs.filter(function(s) {
                    return s && s.platform && (isWX ? s.platform & 4 == 4 : s.platform & 8 == 8);
                });
                if (json.data.objs.length <= 0) {
                    return;
                }
                json.data.objs = json.data.objs.sort(function(a, b) {
                    return parseInt(a.type) - parseInt(b.type);
                });
                var $dom = $('#brandAct')
                  , nowTime = (new Date()).getTime()
                  , linkReg = /<a([^>]+)href\s*=\s*"([^"]+)"(.*?\/a>[，？。！：,\?\.!:]*)/ig
                  , content = '';
                var linkAddPtag = function(html, ptag) {
                    html = html.replace(linkReg, function($0, $1, $2, $3) {
                        return (html ? ('<a' + $1 + 'href="' + JD.url.addRd($2, ptag) + '" ' + $3).replace('_blank', '_self') : '');
                    });
                    return html;
                };
                var insertHtml = function(id, dom, item, idx) {
                    if (parseInt(item.begintime) < nowTime && nowTime < parseInt(item.endtime)) {
                        content = linkAddPtag(itemComm.tavlHTML(item.content), '37287.7.2');
                        if (content) {
                            dom.append('<div><div id="' + id + '_' + idx + '" class="detail_pc">' + content + '</div></div>');
                            itemComm.initLoadImg({
                                commId: id + '_' + idx
                            });
                        }
                    }
                };
                json.data.objs.forEach(function(val, idx) {
                    insertHtml('brandAct', $dom, val, idx);
                    $dom.show();
                });
            }
        }
        ;
        mLs.loadScript({
            url: url
        });
        obj.jdSkuInfo['brand_' + brandId + '_' + category[2]] = true;
    }
    ;
    Detail.prototype.adPosition = function() {
        var obj = this
          , category = obj.jdCategory;
        if (!window.showPageData31886) {
            window.showPageData31886 = function(json) {
                obj.jdSkuInfo.adPosition = json;
                var dataItem, data = json.data, adId = '', adIdArr = [];
                $.each(data, function(index, el) {
                    dataItem = el.list.filter(function(s) {
                        return s && s.categoryId && s.category && category[(s.category - 1)] && ~s.categoryId.indexOf('|' + category[(s.category - 1)] + '|');
                    })[0];
                    if (dataItem)
                        return false;
                });
                if (dataItem) {
                    adId = dataItem.adId || '';
                    adIdArr = adId.split('|');
                    if (adIdArr[0] == '') {
                        adIdArr = adIdArr.slice(1, adIdArr.length);
                    }
                    if (adIdArr[adIdArr.length - 1] == '') {
                        adIdArr = adIdArr.slice(0, (adIdArr.length - 1));
                    }
                    if (adIdArr.length > 0) {
                        var index = 0;
                        var nextUrl = function() {
                            index++;
                            if (index < adIdArr.length) {
                                mLs.loadScript('//nfa.jd.com/cpd_comm?aid=' + adIdArr[index] + '&t=' + Math.random());
                            }
                        };
                        window.cpdCommCB = function(ad) {
                            ad = ad || [];
                            if (ad.length > 0) {
                                var divDom = '<div><div class="detail_pc" id="adPosition' + index + '"></div></div>'
                                  , tpl = '<a href="{#href#}"><img item_init_src="{#src#}" src="//wq.360buyimg.com/fd/h5/base/detail/images/transparent_a38f0a03.png" alt="{#alt#}"></a>'
                                  , $rootDom = $('#adPosition')
                                  , html = [];
                                $rootDom.append(divDom).show();
                                var $dom = $('#adPosition' + index);
                                for (var i = 0, leni = ad.length; i < leni; i++) {
                                    ad[i].href = decodeURI(urlParam.getUrlParam('url', ad[i].href));
                                    ad[i].href = JD.url.addRd(ad[i].href, '37287.7.1');
                                    ad[i].src = JD.img.getImgUrl(ad[i].src);
                                    html.push($jsonToTpl(ad[i], tpl));
                                }
                                $dom.html(itemComm.tavlHTML(html.join('')));
                                itemComm.initLoadImg({
                                    commId: 'adPosition' + index
                                });
                            }
                            nextUrl();
                        }
                        ;
                        mLs.loadScript('//nfa.jd.com/cpd_comm?aid=' + adIdArr[0] + '&t=' + Math.random());
                    }
                }
            }
            ;
        }
        if (obj.jdSkuInfo.adPosition) {
            window.showPageData31886(obj.jdSkuInfo.adPosition);
            return;
        }
        mWfdata.getData({
            dataType: mWfdata.DataType.PPMS,
            param: {
                key: 'v31886'
            }
        });
    }
    ;
    Detail.prototype.detailAdvertise = function() {
        var obj = this;
        if (obj.isJDChoice || !obj.venderId || obj.isZiying)
            return;
        var $detailAdvertise = $('#detailAdvertise');
        window.detailAdvertisePostCB = function(json) {
            if (json.errcode === 0 && json.data && json.data.appContent) {
                json.data.appContent = $.trim(json.data.appContent);
                if (json.data.appContent) {
                    if (!$('#detailAdvertisePost').length) {
                        json.data.appContent = '<div><div class="detail_pc" id="detailAdvertisePost">' + json.data.appContent + '</div></div>';
                        $detailAdvertise.append(itemComm.tavlHTML(json.data.appContent)).show();
                        itemComm.initLoadImg({
                            commId: 'detailAdvertisePost'
                        });
                    }
                    $('#detailAdvertisePost').show();
                }
            }
        }
        ;
        mLs.loadScript('//wq.jd.com/commodity/introduction/getposter?callback=detailAdvertisePostCB&venderId=' + obj.venderId + (obj.isMScene ? '&sceneval=2' : ''));
        var wareId = (obj.descriptionId || '').replace(/^d/, '');
        if (wareId) {
            window.detailAdvertiseStyleCB = function(json) {
                if (json.errcode === 0 && json.data) {
                    var result = json.data;
                    result.mobileHeadContent = $.trim(result.mobileHeadContent);
                    result.mobileBottomContent = $.trim(result.mobileBottomContent);
                    if (result.mobileHeadContent) {
                        result.mobileHeadContent = '<div><div class="detail_pc" id="detailAdvertiseStyle">' + result.mobileHeadContent + '</div></div>';
                        if (!$('#detailAdvertiseStyle').length) {
                            $detailAdvertise.append(itemComm.tavlHTML(result.mobileHeadContent)).show();
                            itemComm.initLoadImg({
                                commId: 'detailAdvertiseStyle'
                            });
                        }
                        $('#detailAdvertiseStyle').show();
                    }
                    if (result.mobileBottomContent) {
                        $('#detailAdvertise1').html(itemComm.tavlHTML(result.mobileBottomContent)).show();
                        itemComm.initLoadImg({
                            commId: 'detailAdvertise1'
                        });
                    }
                }
            }
            ;
            mLs.loadScript('//wq.jd.com/commodity/introduction/gettemplate?callback=detailAdvertiseStyleCB&venderId=' + obj.venderId + '&wareId=' + wareId + (obj.isMScene ? '&sceneval=2' : ''));
        }
    }
    ;
    Detail.prototype.videoDetail = function() {
        var obj = this
          , videoId = obj.videoId;
        if (obj.isJDChoice || !videoId || !obj.isZiying)
            return;
        window.videoDetailCB = function(json) {
            if (json.errcode == 0 && json.result && json.result.data && json.result.data.length > 0) {
                obj.jdSkuInfo['video2' + obj.skuId] = json;
                var definitionObj = {
                    'low': 1,
                    'high': 2,
                    'yuanhua': 3
                }
                  , urlObj = json.result.data.filter(function(s) {
                    return s && s.main_url;
                }).sort(function(a, b) {
                    return definitionObj[a.sharpness] - definitionObj[b.sharpness];
                })[0];
                if (!urlObj)
                    return;
                var imageUrls = json.result.imageUrls;
                if (imageUrls && imageUrls.length > 0) {
                    $('#videoMain').attr('src', urlObj.main_url);
                    $('#videoMain').html('<img class="poster" src="' + imageUrls[0] + '">');
                } else {
                    $('#videoMain').html('<video preload="metadata" webkit-playsinline="true" playsinline><source id="videoDetail" src="' + urlObj.main_url + '" type="video/mp4">暂时不支持播放该视频</video>');
                }
                jdVideo.init({
                    autoplay: 0,
                    alertWifi: false,
                    logoUrl: 'javascript:void(0);',
                    controlLogo: ''
                });
                $('#videoMain').css('margin-bottom', '10px').show();
                itemUtil.reporter.reportExposure({
                    ptag: '7001.1.175'
                });
            }
        }
        ;
        if (obj.jdSkuInfo['video2' + obj.skuId]) {
            window.videoDetailCB(obj.jdSkuInfo['video2' + obj.skuId]);
        } else {
            mLs.loadScript('//wq.jd.com/commodity/extension/getplayurl?callback=videoDetailCB&type=1&vid=' + videoId + (obj.isMScene ? '&sceneval=2' : ''));
        }
    }
    ;
    Detail.prototype.globalBuyNotice = function() {
        var obj = this;
        if (!obj.isOverseaPurchase)
            return;
        obj.setOverseaTip();
        if (!obj.jdSkuInfo.globalNotice)
            obj.jdSkuInfo.globalNotice = {};
        var category1 = obj.jdCategory[0];
        if (!obj.isJDChoice) {
            commDet.globalBuyNotice({
                json: obj.jdSkuInfo.globalNotice[category1],
                commId: 'globalNoticeArea',
                category: category1,
                type: obj.isOverseaPurchase,
                callback: function(json) {
                    obj.jdSkuInfo.globalNotice[category1] = json;
                    $('#globalNotice,#globalComm')[$('#globalNoticeArea').attr('hasdata') == '1' ? 'show' : 'hide']();
                }
            });
        }
    }
    ;
    Detail.prototype.reminder = function() {
        var obj = this;
        var category3 = obj.jdCategory[2];
        var $reminder = $('#reminder');
        if (~' 13690 13691 18578 18577 '.indexOf(' ' + category3 + ' ')) {
            $reminder.text('安装提醒：热水器安装环境不符或安装方式不当，可能造成重大安全隐患，务必由厂商授权的专业机构进行安装，切勿自行安装。').show();
        }
    }
    ;
    Detail.prototype.setOverseaTip = function() {
        var obj = this
          , isOverseaPurchase = obj.isOverseaPurchase
          , spAttr = obj.spAttr;
        if (isOverseaPurchase > 0 && !obj.isInitDetail) {
            obj.isInitDetail = true;
            $('#detail3Normal').addClass('de_serve_info_page').html('<div class="de_serve_info_panel"> <div class="hd"> <div class="tit">海囤全球商品服务说明</div> </div> <div class="bd"> <div class="section"> <div class="tit">购买流程</div> <div class="row"></div> <div class="step step_point col_6"> <div class="step_item"><i class="icon_1_1"></i><span>下单</span></div> <div class="step_item"><i class="icon_1_2"></i><span>提交身份证信息</span></div> <div class="step_item"><i class="icon_1_3"></i><span>支付</span></div> <div class="step_item"><i class="icon_1_4"></i><span>卖家境外发货</span></div> <div class="step_item"><i class="icon_1_5"></i><span>海关清关保税区通关</span></div> <div class="step_item"><i class="icon_1_6"></i><span>收到包裹</span></div>   </div> </div> <div class="section"> <div class="tit">购买须知</div> <ul class="list"> <li> <span class="num">01.</span>本店商品均在海外销售，我们承诺正规渠道，100%正品保证。 </li> <li> <span class="num">02.</span>海外直邮商品均从海外或保税仓发至客户手中，配送物流稳定可靠。国际物流周期较长，请耐心等待。如遇航班延误、天气影响等不可抗力的情况，订单可能送达延误，请在下单前考虑此配送周期。 <div class="step step_add"> <div class="step_item"><i class="icon_2_1"></i><span>天气影响</span></div> <div class="step_item"><i class="icon_2_2"></i><span>航班延误</span></div> <div class="step_item"><i class="icon_2_3"></i><span>包裹延迟送达</span></div> <div class="step_item"><i class="icon_2_4"></i><span>下单前考虑配送周期</span></div> </div> </li> <li> <span class="num">03.</span>海囤全球商品需清关后入境，根据海关要求，请您填写真实的收货人姓名，并配合商家提供海关清关所需身份证信息进行个人物品入境申报。我们严格为信息保密，绝不对外泄露。 <div class="step step_add"> <div class="step_item"><i class="icon_3_1"></i><span>过关</span></div> <div class="step_item"><i class="icon_3_2"></i><span>填写信息</span></div> <div class="step_item"><i class="icon_3_3"></i><span>资料保密</span></div> </div> </li> <li> <span class="num">04.</span>购买海外商品需依法向中国海关申报及纳税。海囤全球自营单笔订单金额不可超过2000元 <span class="tip">（件数限制：除特殊商品，一般不限件数）</span>超过2000元订单建议分别购买。</li> <li> <span class="num">05.</span>下单支付后，订单一旦提交至海关申报及纳税，客户将不能修改订单信息 <span class="tip">（收货地址、电话等）</span>，也不能申请退款，请知晓并谅解。 </li> <li> <span class="num">06.</span>收到商品后，如有质量问题或不满意，与商家协商一致后，可退货到商家指定的境内地址。 海囤全球商品不支持7天无理由退货。 <div class="step step_add"> <div class="step_item"><i class="icon_4_1"></i><span>不支持7天无理由退 货</span></div> </div> </li> </ul> ' + ((isOverseaPurchase == 1 || isOverseaPurchase == 3) ? '<div class="row"> 此店铺为海囤全球自营店铺。由京东发货，并提供售后服务</div>' : '') + '<div class="row tip">*注：<dl><dd>1.海囤全球网站注册地为香港，网站域名为' + (obj.isMScene ? 'mitem.jd.hk' : 'wqitem.jd.hk') + ';</dd></dl><dl><dd>2.您在海囤全球网站上购买的境外商品等同于在海外市场直接购买;</dd></dl><dl><dd>3.您购买的海囤全球商品品名、牌名、规格、型号、成份、含量、等级等均受海关监管；</dd></dl><dl><dd>4.由于您所购买的商品从中国大陆（不包括港澳台）以外的地区或保税区发出，故可能无中文标签及说明书；</dd></dl><dl><dd>5.因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</dd></dl></div><div class="row" id="eBayTip">购买eBay商品需要同意<a href="//wqs.jd.com/help/ebay.html" style="color:#4e91fe">《购买eBay商品特殊条款》</a></div></div></div></div>');
            $('#priceDescDetail').hide();
            $('#ecoTip').hide();
        }
        if (spAttr.isEbay == '1' || spAttr.isEbay == '2') {
            $('#eBayTip').show();
        } else {
            $('#eBayTip').hide();
        }
        if (obj.taxInfo && obj.taxInfo.taxTitle && obj.taxInfo.taxContent && obj.taxInfo.taxDetail) {
            var popTip = '<dl><dd>' + obj.taxInfo.taxDetail.split('\r\n').join('</dd></dl><dl><dd>') + '</dd></dl>'
              , wTip = '';
            if (obj.taxInfo.nationName && obj.taxInfo.nationImgMap && obj.taxInfo.nationImgMap.m) {
                wTip += '<span class="tax_tips_flag"><img src="' + obj.taxInfo.nationImgMap.m + '"></span>' + '<span class="country">' + obj.taxInfo.nationName + '品牌</span>';
            }
            wTip += '<span class="tax_tips_text">' + obj.taxInfo.taxTitle + obj.taxInfo.taxContent + '</span><i class="ques"></i>';
            $('#taxTip').show().html(wTip).off().on('click', 'i.ques', function() {
                popUp.createPopup({
                    flag: 3,
                    msg: '<h3 class="title">税费详情</h3><div class="inner" style="    text-align: left;">' + popTip + '</div>'
                });
            });
        }
    }
    ;
    Detail.prototype.loadPackgeSer = function() {
        var obj = this;
        if (!obj.jdSkuInfo['p_s'])
            obj.jdSkuInfo['p_s'] = {};
        commDet.loadPackgeSer({
            detServer: 'detServer',
            detPackage: 'detPackage',
            json: obj.jdSkuInfo['p_s'][obj.skuId],
            skuId: obj.skuId,
            callback: function(json) {
                obj.jdSkuInfo['p_s'][obj.skuId] = json;
                $('#package')[json.packList ? 'show' : 'hide']();
            }
        });
    }
    ;
    Detail.prototype.setDetHeight = function() {
        var h = 0;
        $('#detail' + this.detIndex).children().each(function(i, n) {
            h += $(n).height();
        });
        this.detailH = Math.max(h, this.detLowH);
        $('#detail').css('height', this.detailH + 50);
    }
    ;
    Detail.prototype.bindEvent = function() {
        var obj = this;
        $(window).on('scroll', function() {
            obj.setDetHeight();
            if (obj.detIndex == 1)
                itemComm.loadImg();
        });
        $('#detParam').on('click', 'i[tips]', function(e) {
            var tar = $(this)
              , tips = tar.attr('tips');
            popUp.createPopup({
                flag: 3,
                msg: '<div class="inner"><dl><dd>' + tips + '</dd></dl></div>'
            });
        });
        $('#commDesc,#globalNotice,#detailAdvertise,#detailAdvertise1').on('click', 'img', function(e) {
            var $this = $(this)
              , src = $this.attr('prview') || $this.attr('src').replace(/\s+/g, '')
              , aurl = $this.parents('a').attr('href');
            if (/^(https*:){0,1}\/\//.test(aurl))
                return;
            imageViewer.previewImage(src);
        });
    }
    ;
    exports.init = function(config) {
        var detail = new Detail();
        detail.init(config);
        return detail;
    }
    ;
});