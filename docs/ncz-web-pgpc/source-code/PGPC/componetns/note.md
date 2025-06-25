


```js


  , Ro = No
  , Oo = (0, b.A)(Ro, To, Lo, !1, null, null, null)
  , Do = Oo.exports;
  o.Ay.component("svg-icon", Xi);
  var Io = function(e) {
    return e.keys().map(e)
  }
    , Uo = n(30279);
  Io(Uo);
  var Go = n.p + "img/img-loading.cf8e36f5.gif";

  // 載入 acmc, co 是 store
  u.wG.loadACMC(co), 
  o.Ay.config.productionTip = !1,
  window.$i18n = Oi.A,
  o.Ay.component("paginate", Po()),
  o.Ay.use(Ao(), {
    dynamic: !0
  }),
  o.Ay.use(ne.Ay),
  o.Ay.use(vo()),
  o.Ay.use(wo()),
  o.Ay.use(bo()),
  o.Ay.use(u.ZR, {
    router: Aa,
    store: co,
    i18n: Oi.A
  });
  var Vo = function() {
    o.Ay.use(po.Ay, {
      error: "".concat(co.state.Public.imgUrl, "/TCG_GAME_ICONS/default.png"),
      loading: Go,
      attempt: 1,
      lazyComponent: !0,
      observer: !0,
      listenEvents: ["scroll"],
      observerOptions: {
        rootMargin: "0px",
        threshold: .1
      }
    })
  };



n.d(i, {
  closeLing: function() { return lp },
  lingTime: function() { return cp },
  loadACMC: function() { return dp },
  loader: function() { return op }
});

function dp(t) {
  return mp.apply(this, arguments)
}
function mp() {
  return mp = (0,
  s.A)((0,
  r.A)().mark((function t(e) {
      var n;
      return (0,
      r.A)().wrap((function(t) {
          while (1)
              switch (t.prev = t.next) {
              case 0:
                  return n = {
                      checkResourceLoaded: function(t) {
                          var n = function() {
                              var n;
                              return !!(window.tcg[t] && Object.keys(window.tcg[t]).length > 20 && null !== (n = window.tcg[t]) && void 0 !== n && n.lang) && (e.commit("".concat(t, "Loaded"), !0),
                              !0)
                          };
                          return new Promise((function(t) {
                              if (n())
                                  t();
                              else
                                  var e = setInterval((function() {
                                      n() && (t(),
                                      clearInterval(e))
                                  }
                                  ), 1e3 / 60)
                          }
                          ))
                      },
                      loadExternalResources: function() {
                          var t = this
                            , e = "/common/v.1.0.1/lib.js?mc_t=shanshan&ac_t=shanshan&version=v.1.0.1&ac_v=1.0.1&mc_v=1.0.1"
                            , n = "/ac/v.1.0.1/index.js?_=".concat((new Date).getTime())
                            , i = "/mc/v.1.0.1/index.js?_=".concat((new Date).getTime());
                          return new Promise((function(a) {
                              up(e, (function() {
                                  window.tcg.lib.createJS = function() {
                                      var e = new Promise((function(e) {
                                          up(i, (function() {
                                              e(t.checkResourceLoaded("mc"))
                                          }
                                          ))
                                      }
                                      ))
                                        , r = new Promise((function(e) {
                                          up(n, (function() {
                                              e(t.checkResourceLoaded("ac"))
                                          }
                                          ))
                                      }
                                      ));
                                      a(Promise.all([e, r]))
                                  }
                              }
                              ))
                          }
                          ))
                      },
                      main: function() {
                          var t = this;
                          return (0,
                          s.A)((0,
                          r.A)().mark((function e() {
                              return (0,
                              r.A)().wrap((function(e) {
                                  while (1)
                                      switch (e.prev = e.next) {
                                      case 0:
                                          return e.next = 2,
                                          t.loadExternalResources();
                                      case 2:
                                      case "end":
                                          return e.stop()
                                      }
                              }
                              ), e)
                          }
                          )))()
                      }
                  },
                  t.abrupt("return", n.main());
              case 2:
              case "end":
                  return t.stop()
              }
      }
      ), t)
  }
  ))),
  mp.apply(this, arguments)
}



// gpt
async function mp(e) {
  const checkResourceLoaded = (key: string) => {
    const isLoaded = () => {
      const resource = window.tcg[key]
      return resource && Object.keys(resource).length > 20 && resource.lang
    }

    return new Promise<void>((resolve) => {
      if (isLoaded()) {
        e.commit(`${key}Loaded`, true)
        resolve()
      } else {
        const interval = setInterval(() => {
          if (isLoaded()) {
            e.commit(`${key}Loaded`, true)
            resolve()
            clearInterval(interval)
          }
        }, 1000 / 60)
      }
    })
  }

  const loadExternalResources = () => {
    const libUrl = "/common/v.1.0.1/lib.js?mc_t=shanshan&ac_t=shanshan&version=v.1.0.1&ac_v=1.0.1&mc_v=1.0.1"
    const acUrl = `/ac/v.1.0.1/index.js?_=${Date.now()}`
    const mcUrl = `/mc/v.1.0.1/index.js?_=${Date.now()}`

    return new Promise<void>((resolve) => {
      up(libUrl, () => {
        window.tcg.lib.createJS = () => {
          const loadMC = new Promise<void>((res) => up(mcUrl, () => res(checkResourceLoaded("mc"))))
          const loadAC = new Promise<void>((res) => up(acUrl, () => res(checkResourceLoaded("ac"))))
          resolve(Promise.all([loadMC, loadAC]))
        }
      })
    })
  }

  return await loadExternalResources()
}

```