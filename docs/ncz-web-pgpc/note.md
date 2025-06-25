
;[
  { categoryName: '热门游戏', categoryCode: 'Popular' },
  { categoryName: '小游戏', categoryCode: 'Flash' },
  { categoryName: '捕鱼游戏', categoryCode: 'Fish' },
  { categoryName: '棋牌游戏', categoryCode: 'Chess' },
  { categoryName: '视讯游戏', categoryCode: 'Video' },
  { categoryName: '体育游戏', categoryCode: 'Sport' },
  { categoryName: '彩票', categoryCode: 'Lottery' },
  { categoryName: '电子游戏', categoryCode: 'Slot' },
  { categoryName: '电子大奖', categoryCode: 'BigAward' }
]



https://www.pgpc.com/js/index.0a3e8d78.js
```js
var Ji = new ii.Ay.Store({
    modules: {
        Login: vi,
        Header: Mi,
        eGameStore: Ei,
        lottery: zi,
        home: ji,
        acmc: Yi,
        Integral: u.H5,
        Help: u._V,
        Public: u.w3,
        Live: Ai
    }
})
  , Wi = Ji
  , Ki = {
    loader: function(e, t) {
        var n = document.getElementById("br_loader")
          , a = n;
        if (!n) {
            var i = document.createDocumentFragment()
              , o = document.createElement("div");
            o.id = "br_loader";
            var s = document.getElementById("app");
            a = o;
            var r = "<div class='br_loader_main'><div class='br_loader_bg'></div><div class='br_loader_content'><div class='br_spinner'><div class='spinner_inner'><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_circle'>&#9679;</div></div></div></div></div>";
            a.innerHTML = r,
            i.appendChild(o),
            t ? (o.className = "br_loader_child",
            t.appendChild(i)) : (o.className = "br_loader_root",
            document.body.insertBefore(i, s))
        }
        this.close(a, e)
    },
    init: function(e, t) {
        var n, a = this, i = e || {}, o = document.getElementById("pp_model_dialog"), s = this.sortObj(i);
        if (o) {
            var r = this.getByClass(o, "pp_model_dmain")
              , c = this.getByClass(o, "pp_model_dbody");
            r.removeChild(c);
            var l = document.createDocumentFragment();
            n = o,
            l.appendChild(this.createDom(s, i, n, (function(e) {
                t && t(e)
            }
            ))),
            o.classList.add("active"),
            r.appendChild(l)
        } else {
            var u = document.createDocumentFragment()
              , d = 0
              , m = [];
            while (d < 2)
                m[d] = document.createElement("div"),
                d > 0 && m[d - 1].appendChild(m[d]),
                d++;
            m[0].id = "pp_model_dialog",
            m[0].className = i.class ? "pp_model_dialog active ".concat(i.class) : "pp_model_dialog active",
            m[1].className = "pp_model_dmain",
            n = m[0],
            m[1].appendChild(this.createDom(s, i, n, (function(e) {
                t && t(e)
            }
            )));
            var p = document.createElement("div");
            p.className = "pp_model_dcover",
            p.id = "pp_model_dcover",
            m[1].appendChild(p),
            u.appendChild(m[0]),
            document.getElementsByTagName("body")[0].appendChild(u)
        }
        var g = document.getElementById("pp_model_dcover");
        g.onclick = null,
        g.onclick = function() {
            ("boolean" !== typeof i.cover || i.cover) && (a.close(n),
            t && t("cover"))
        }
        ,
        i.timeOut && this.close(n, i.timeOut)
    },
    sortObj: function(e) {
        var t = {};
        return e.icon && (t.icon = e.icon),
        e.title && (t.title = e.title),
        e.html && (t.html = e.html),
        e.btn && (t.btn = e.btn),
        t
    },
    getByClass: function(e, t) {
        for (var n = e.getElementsByTagName("*"), a = [], i = 0; i < n.length; i++)
            n[i].className === t && a.push(n[i]);
        return a[0]
    },
    createDom: function(e, t, n, a) {
        var i = this
          , o = document.createElement("div");
        o.className = "pp_model_dbody",
        o.style = t.style || "";
        var s = {};
        for (var r in e)
            if ("btn" === r) {
                var c = e.btn || {}
                  , l = document.createElement("div");
                l.className = "pp_model_db".concat(r);
                var u = function(e) {
                    var t = document.createElement("div");
                    t.className = e,
                    t.addEventListener("click", (function(t) {
                        i.close(n),
                        a(e)
                    }
                    )),
                    t.innerHTML = "<span>".concat(c[e], "</span>"),
                    l.appendChild(t)
                };
                for (var d in c)
                    u(d);
                o.appendChild(l)
            } else if ("icon" === r) {
                var m = document.createElement("div");
                m.className = "pp_model_db".concat(r, " ").concat(e[r]),
                m.innerHTML = "<span class=br_dialog_d".concat(e[r], "></span>"),
                o.appendChild(m)
            } else
                "class" !== r && (s[r] = document.createElement("div"),
                s[r].className = "pp_model_db".concat(r),
                s[r].innerHTML = e[r],
                o.appendChild(s[r]));
        return o
    },
    close: function(e, t) {
        "number" === typeof t ? (e.classList.add("active"),
        setTimeout((function() {
            e.classList.remove("active")
        }
        ), t)) : t ? e.classList.add("active") : e.classList.remove("active")
    }
};
window.cover = Ki,
o.Ay.prototype.cover = Ki;
```