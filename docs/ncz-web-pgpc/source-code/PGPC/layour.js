function layout81014(e, t, n) {
  'use strict'
  var a = n(69870),
    i = n(17654),
    o = (n(50517), n(82733), n(87902), n(28704), n(85471)),
    AppVuePropsRender =
      (n(74423),
      function () {
        var e = this,
          t = e._self._c
        return t(
          'div',
          {
            attrs: {
              id: 'app'
            }
          },
          [
            ['/agent', '/agentHome'].includes(e.$route.path)
              ? t('router-view', {
                  staticClass: 'agent-main',
                  attrs: {
                    name: 'agent'
                  }
                })
              : [
                  t(
                    'div',
                    {
                      staticClass: 'view-wrapper'
                    },
                    [
                      t('router-view', {
                        attrs: {
                          name: 'sideMenu'
                        }
                      }),
                      t(
                        'div',
                        {
                          staticClass: 'view-container'
                        },
                        [
                          t('router-view', {
                            attrs: {
                              name: 'header'
                            }
                          }),
                          t('router-view', {
                            key: e.mainRouterKey,
                            staticClass: 'main-content'
                          }),
                          t('router-view', {
                            attrs: {
                              name: 'footer'
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  t('CommonLogic')
                ]
          ],
          2
        )
      }),
    r = [],
    //   CommonLogic
    //
    //
    // NOTE:
    AppVueProps = {
      name: 'App',
      components: {
        CommonLogic: CommonLogic
      },
      computed: {
        mainRouterKey: function () {
          return ['/', '/index', '/login', '/register'].includes(this.$route.path) ? 'index' : this.$route.fullPath
        }
      }
    },
    AppVueProps = AppVueProps,
    $e = (0, _.A)(AppVueProps, AppVuePropsRender, [], !1, null, null, null),
    AppVueComponent = $e.exports,
    //
    //
    // NOTE:
    mn = function () {
      var e = this,
        t = e._self._c
      return t(
        'div',
        {
          staticClass: 'agent-center-container'
        },
        [
          t(
            'div',
            {
              staticClass: 'agent-center-header'
            },
            [
              t(
                'div',
                {
                  staticClass: 'innner width_1200'
                },
                [
                  t(
                    'div',
                    {
                      staticClass: 'agent_logo'
                    },
                    [
                      t('CommonLogo', {
                        attrs: {
                          src: n(65549)
                        }
                      })
                    ],
                    1
                  ),
                  t(
                    'div',
                    {
                      staticClass: 'agent_info'
                    },
                    [
                      t(
                        'div',
                        {
                          staticClass: 'time'
                        },
                        [
                          t(
                            'span',
                            {
                              staticClass: 'time-zone'
                            },
                            [e._v('GMT' + e._s(e.timeZone))]
                          ),
                          t(
                            'span',
                            {
                              staticClass: 'now-time'
                            },
                            [e._v(e._s(e.nowTime))]
                          )
                        ]
                      ),
                      t(
                        'span',
                        {
                          staticClass: 'name'
                        },
                        [e._v(e._s(e.nickname))]
                      ),
                      t(
                        'span',
                        {
                          staticClass: 'logout',
                          on: {
                            click: e.logout
                          }
                        },
                        [e._v(e._s(e.$t('in_sign_out')))]
                      )
                    ]
                  )
                ]
              )
            ]
          ),
          t(
            'div',
            {
              staticClass: 'user-center-bg'
            },
            [
              e.loaded
                ? t(
                    'div',
                    {
                      staticClass: 'user-center-content'
                    },
                    [
                      t(
                        'div',
                        {
                          staticClass: 'content-left'
                        },
                        [
                          t(
                            'ul',
                            {
                              staticClass: 'user-center-nav'
                            },
                            [
                              t(
                                'li',
                                {
                                  class: {
                                    active: 'depositv2' === e.activeAcPage
                                  },
                                  on: {
                                    click: function (t) {
                                      return e.selectMcPage('depositv2')
                                    }
                                  }
                                },
                                [
                                  t('i', {
                                    staticClass: 'acmc_icon depositv2'
                                  }),
                                  e._v(' ' + e._s(e.$t('in_increase_deposit')) + ' ')
                                ]
                              ),
                              t(
                                'li',
                                {
                                  class: {
                                    active: 'withdraw' === e.activeAcPage
                                  },
                                  on: {
                                    click: function (t) {
                                      return e.selectMcPage('withdraw')
                                    }
                                  }
                                },
                                [
                                  t('i', {
                                    staticClass: 'acmc_icon withdraw'
                                  }),
                                  e._v(' ' + e._s(e.$t('in_increase_withdrawal')) + ' ')
                                ]
                              ),
                              e._l(e.acMenu, function (n, a) {
                                return [
                                  t(
                                    'li',
                                    {
                                      key: a,
                                      class: {
                                        active: e.activeAcPage === n.page
                                      },
                                      attrs: {
                                        'data-pagemodal': n.data
                                      },
                                      on: {
                                        click: function (t) {
                                          return e.selectAcPage(n.page)
                                        }
                                      }
                                    },
                                    [
                                      t('i', {
                                        staticClass: 'acmc_icon',
                                        class: n.page
                                      }),
                                      t('span', [e._v(e._s(e.$t(n.name)))])
                                    ]
                                  )
                                ]
                              }),
                              t(
                                'li',
                                {
                                  class: {
                                    active: 'messageV2' === e.activeAcPage
                                  },
                                  on: {
                                    click: function (t) {
                                      return e.selectMcPage('messageV2')
                                    }
                                  }
                                },
                                [
                                  t('i', {
                                    staticClass: 'acmc_icon messageV2'
                                  }),
                                  e._v(' ' + e._s(e.$t('in_platform_information')) + ' ')
                                ]
                              ),
                              t(
                                'li',
                                {
                                  on: {
                                    click: e.getService
                                  }
                                },
                                [
                                  t('i', {
                                    staticClass: 'acmc_icon service'
                                  }),
                                  e._v(' ' + e._s(e.$t('in_customer_services')) + ' ')
                                ]
                              )
                            ],
                            2
                          )
                        ]
                      ),
                      t('div', {
                        staticClass: 'active-content',
                        attrs: {
                          id: 'br_proxy_right'
                        }
                      })
                    ]
                  )
                : e._e()
            ]
          )
        ]
      )
    },
    pn = [],
    gn = [
      {
        name: 'in_increase_announcement',
        page: 'agentAnnouncement',
        data: 'agentCenter/agentAnnouncement'
      },
      {
        name: 'in_increase_overview',
        page: 'agentTeamOverview',
        data: 'agentCenter/agentTeamOverview'
      },
      {
        name: 'in_increase_account',
        page: 'registerCenter',
        data: 'agentCenter/registerCenter'
      },
      {
        name: 'in_team_management',
        page: 'downlineManagmentView',
        data: 'agentCenter/downlineManagmentView'
      },
      {
        name: 'in_team_betting',
        page: 'personalHistoryCopy',
        data: 'agentCenter/personalHistoryCopy'
      },
      {
        name: 'in_user_loss',
        page: 'palStatementsAgentCopy',
        data: 'agentCenter/palStatementsAgentCopy'
      },
      {
        name: 'in_my_income',
        page: 'agentRevenueReport',
        data: 'agentCenter/agentRevenueReport'
      },
      {
        name: 'in_account_details',
        page: 'agentDownlineTransactionDetailsCopy',
        data: 'agentCenter/agentDownlineTransactionDetailsCopy'
      },
      {
        name: 'in_bonus_bmwmuf',
        page: 'agentDividendRecordCopy2',
        data: 'agentCenter/agentDividendRecord2'
      },
      {
        name: 'in_daily_hdtmkj',
        page: 'agentDailyWages2',
        data: 'agentCenter/agentDailyWages2'
      },
      {
        name: 'in_hourly_salary',
        page: 'agentHourSalary',
        data: 'agentCenter/agentHourSalary'
      },
      {
        name: 'real_time_salary_menu',
        page: 'agentRealtimeSalary',
        data: 'agentCenter/agentRealtimeSalary'
      }
    ],
    fn = {
      mixins: [I],
      components: {
        CommonLogo: u.fA
      },
      setup: function (e) {
        var t = (0, o.KR)(''),
          n = (0, o.KR)(''),
          s = (0, o.KR)(null),
          r = (0, h.ME)(gn),
          c = r.acMenu,
          l = r.loaded,
          u = r.selectAcPage,
          d = r.activeAcPage,
          m = (0, h.Pj)(),
          p = m.store,
          g = m.dispatch,
          v = (0, h.rd)(),
          w = (0, h.As)(),
          C = w.isAgent,
          b = (0, o.EW)(function () {
            return p.Login.memberInfo.nickname || p.Login.memberInfo.account
          }),
          _ = function () {
            s.value = setInterval(function () {
              t.value = f()(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }, 1e3)
          },
          A = function () {
            var e = -new Date().getTimezoneOffset() / 60
            n.value = e >= 0 ? '+'.concat(e) : e
          },
          y = function (e) {
            ;(d.value = e), l.value && window.tcg.mc[e] && window.tcg.mc[e]('#br_proxy_right')
          },
          P = (function () {
            var e = (0, i.A)(
              (0, a.A)().mark(function e() {
                return (0, a.A)().wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return window.cover.loader(!0), (e.next = 3), g('logout')
                      case 3:
                        window.cover.loader(!1), v.replace('/agent').catch(function () {})
                      case 5:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function () {
              return e.apply(this, arguments)
            }
          })(),
          k = function () {
            C.value ||
              v
                .replace('/agent')
                .then(function () {
                  window.cover.loader(!1)
                })
                .catch(function () {})
          }
        return (
          (0, o.KC)(function () {
            k()
          }),
          (0, o.sV)(function () {
            _(),
              A(),
              (0, o.hi)(function () {
                clearInterval(s.value)
              })
          }),
          {
            logout: P,
            acMenu: c,
            loaded: l,
            selectAcPage: u,
            selectMcPage: y,
            activeAcPage: d,
            nickname: b,
            nowTime: t,
            timeZone: n
          }
        )
      }
    },
    vn = fn,
    hn = (0, _.A)(vn, mn, pn, !1, null, null, null),
    wn = hn.exports,
    //
    //
    // NOTE:
    Cn = function () {
      var e = this,
        t = e._self._c
      return t('div', [
        t(
          'div',
          {
            staticClass: 'header-container'
          },
          [
            t(
              'div',
              {
                staticClass: 'header-content page-center'
              },
              [
                t(
                  'div',
                  {
                    staticClass: 'header-left'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'header-menu-list'
                      },
                      e._l(e.headerMenu, function (n, a) {
                        return t(
                          'div',
                          {
                            key: a,
                            staticClass: 'header-menu-item',
                            class: {
                              on: n.path === e.path
                            },
                            on: {
                              click: function (t) {
                                return e.handleMenuClick(n)
                              }
                            }
                          },
                          [e._v(' ' + e._s(e.$t(''.concat(n.name))) + ' ')]
                        )
                      }),
                      0
                    )
                  ]
                ),
                t(
                  'div',
                  {
                    staticClass: 'header-right'
                  },
                  [
                    e._e(),
                    t(
                      'div',
                      {
                        staticClass: 'right-content'
                      },
                      [
                        e.isLogin
                          ? t('MemberInfo')
                          : t(
                              'div',
                              {
                                staticClass: 'login-register'
                              },
                              [
                                t(
                                  'span',
                                  {
                                    staticClass: 'btn-login',
                                    on: {
                                      click: e.goLogin
                                    }
                                  },
                                  [e._v(e._s(e.$t('hd_login_button')))]
                                ),
                                t(
                                  'span',
                                  {
                                    staticClass: 'btn-register',
                                    on: {
                                      click: e.goRegister
                                    }
                                  },
                                  [e._v(e._s(e.$t('hd_sign_button')))]
                                )
                              ]
                            ),
                        t(
                          'div',
                          {
                            staticClass: 'notice',
                            on: {
                              click: function (t) {
                                return e.$modal.show('noticeModal')
                              }
                            }
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'notice'
                              }
                            })
                          ],
                          1
                        ),
                        t(
                          'div',
                          {
                            staticClass: 'service',
                            on: {
                              click: e.getService
                            }
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'service'
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            ),
            t('DropMenu', {
              attrs: {
                show: e.showDropMenu,
                activeIndex: e.activeIndex
              },
              on: {
                showMenu: e.showMenu,
                hideMenu: e.hideMenu
              }
            })
          ],
          1
        ),
        t('div', {
          staticClass: 'header-holder'
        })
      ])
    },
    bn = [],
    _n = function () {
      var e = this,
        t = e._self._c
      return t(
        'div',
        {
          staticClass: 'header-nav'
        },
        e._l(e.menus, function (n, a) {
          return t(
            'div',
            {
              key: 'nav_'.concat(a),
              staticClass: 'nav-item',
              on: {
                click: function (t) {
                  return e.navClick(n)
                }
              }
            },
            [
              t('i', {
                staticClass: 'nav-icon',
                style: {
                  backgroundImage: 'url('.concat(n.icon, ')')
                }
              }),
              t(
                'span',
                {
                  staticClass: 'nav-name'
                },
                [e._v(e._s(e.$t(n.name)))]
              )
            ]
          )
        }),
        0
      )
    },
    An = [],
    yn = {
      setup: function () {
        var e = [
            {
              name: 'in_increase_deposit',
              page: 'depositv2',
              icon: n(68164)
            },
            {
              name: 'in_increase_withdrawal',
              page: 'withdraw',
              icon: n(854)
            },
            {
              name: 'hd_agent',
              path: '/agent',
              icon: n(38929)
            }
          ],
          t = (0, h.As)(),
          a = t.setMcPage,
          i = (0, h.rd)(),
          o = function (e) {
            var t = e.page,
              n = e.path
            return n ? i.push(n) : a(t)
          }
        return {
          menus: e,
          navClick: o
        }
      }
    },
    Pn = yn,
    kn = (0, _.A)(Pn, _n, An, !1, null, null, null),
    Mn = kn.exports,
    //
    //
    // NOTE: side-wrapper
    na = function () {
      var e = this,
        t = e._self._c
      return t(
        'div',
        {
          staticClass: 'side-wrapper'
        },
        [
          t(
            'div',
            {
              staticClass: 'side-top'
            },
            [
              t(
                'div',
                {
                  staticClass: 'switch-icon',
                  class: {
                    off: !e.showSideMenu
                  },
                  on: {
                    click: function (t) {
                      return t.stopPropagation(), e.setShowSideMenu('reverse')
                    }
                  }
                },
                [
                  t('svg-icon', {
                    attrs: {
                      iconClass: 'icon-menu'
                    }
                  })
                ],
                1
              ),
              t('CommonLogo', {
                staticClass: 'logo',
                attrs: {
                  src: n(65549)
                },
                on: {
                  logoClick: function (t) {
                    return e.setGameType('HOME')
                  }
                }
              })
            ],
            1
          ),
          t(
            'div',
            {
              staticClass: 'side-menu',
              class: {
                off: !e.showSideMenu,
                show: e.showDownload
              }
            },
            [
              t(
                'div',
                {
                  staticClass: 'side-menu-bg'
                },
                [
                  t(
                    'div',
                    {
                      staticClass: 'nav-wrapper'
                    },
                    e._l(e.menu, function (n, a) {
                      return t(
                        'div',
                        {
                          key: a,
                          staticClass: 'nav-item',
                          class: {
                            style1: 'depositv2' === n.page || 'withdraw' === n.page
                          },
                          on: {
                            click: function (t) {
                              return e.handleItemClick(n.page)
                            }
                          }
                        },
                        [
                          t('svg-icon', {
                            staticClass: 'nav-item-icon',
                            attrs: {
                              iconClass: n.icon
                            }
                          }),
                          t(
                            'div',
                            {
                              staticClass: 'label-text'
                            },
                            [e._v(e._s(e.$t(n.name)))]
                          )
                        ],
                        1
                      )
                    }),
                    0
                  ),
                  t(
                    'div',
                    {
                      staticClass: 'nav-wrapper'
                    },
                    [
                      t(
                        'div',
                        {
                          staticClass: 'nav-item style1',
                          on: {
                            click: function (t) {
                              return e.toggleShow('showMemberList')
                            }
                          }
                        },
                        [
                          t('svg-icon', {
                            staticClass: 'nav-item-icon',
                            attrs: {
                              iconClass: 'member'
                            }
                          }),
                          t(
                            'div',
                            {
                              staticClass: 'label-text'
                            },
                            [e._v(e._s(e.$t('hd_member_center')))]
                          )
                        ],
                        1
                      ),
                      t(
                        'div',
                        {
                          staticClass: 'member-list',
                          class: {
                            show: e.showMemberList
                          }
                        },
                        e._l(e.memberNav, function (n, a) {
                          return t(
                            'div',
                            {
                              key: a,
                              staticClass: 'nav-item member',
                              on: {
                                click: function (t) {
                                  return e.handleItemClick(n.page)
                                }
                              }
                            },
                            [
                              t(
                                'div',
                                {
                                  staticClass: 'label-text'
                                },
                                [e._v(e._s(e.$t(n.name)))]
                              ),
                              t('svg-icon', {
                                staticClass: 'nav-item-icon',
                                attrs: {
                                  iconClass: 'side-arrow'
                                }
                              })
                            ],
                            1
                          )
                        }),
                        0
                      )
                    ]
                  ),
                  t(
                    'div',
                    {
                      staticClass: 'nav-wrapper'
                    },
                    [
                      t(
                        'div',
                        {
                          staticClass: 'nav-item style1',
                          on: {
                            click: function (t) {
                              return e.toggleShow('showGameList')
                            }
                          }
                        },
                        [
                          t('svg-icon', {
                            staticClass: 'nav-item-icon',
                            attrs: {
                              iconClass: 'game-center'
                            }
                          }),
                          t(
                            'div',
                            {
                              staticClass: 'label-text'
                            },
                            [e._v(e._s(e.$t('in_game_center')))]
                          )
                        ],
                        1
                      ),
                      t(
                        'div',
                        {
                          staticClass: 'game-list',
                          class: {
                            show: e.showGameList
                          }
                        },
                        e._l(e.menuList, function (n, a) {
                          return t(
                            'div',
                            {
                              key: a,
                              staticClass: 'game-list-wrap'
                            },
                            [
                              t(
                                'div',
                                {
                                  staticClass: 'nav-item',
                                  on: {
                                    click: function (t) {
                                      return e.setGameType(n.gameCategory)
                                    }
                                  }
                                },
                                [
                                  t(
                                    'div',
                                    {
                                      staticClass: 'label-text'
                                    },
                                    [e._v(e._s(e.$t(''.concat(e.gameTypeName[n.gameCategory]))))]
                                  ),
                                  t('svg-icon', {
                                    attrs: {
                                      iconClass: 'side-arrow'
                                    }
                                  })
                                ],
                                1
                              )
                            ]
                          )
                        }),
                        0
                      )
                    ]
                  ),
                  t(
                    'div',
                    {
                      staticClass: 'download-group',
                      on: {
                        mouseenter: function (t) {
                          return e.handleShowDownload(!0)
                        },
                        mouseleave: function (t) {
                          return e.handleShowDownload(!1)
                        }
                      }
                    },
                    [
                      t('svg-icon', {
                        attrs: {
                          iconClass: 'icon-download'
                        }
                      }),
                      t(
                        'span',
                        {
                          staticClass: 'download-text'
                        },
                        [e._v(e._s(e.$t('download_promo')))]
                      ),
                      t(
                        'div',
                        {
                          staticClass: 'download-content-wrapper'
                        },
                        [
                          t(
                            'div',
                            {
                              staticClass: 'download-content'
                            },
                            [
                              t(
                                'div',
                                {
                                  staticClass: 'qrcode-ios'
                                },
                                [
                                  t(
                                    'div',
                                    {
                                      staticClass: 'qrcode_box'
                                    },
                                    [
                                      t('VueQr', {
                                        attrs: {
                                          logoMargin: 2,
                                          text: e.iosUrl,
                                          size: 120,
                                          margin: 5
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  t(
                                    'div',
                                    {
                                      staticClass: 'qrcode-info'
                                    },
                                    [
                                      t('svg-icon', {
                                        attrs: {
                                          iconClass: 'icon-apple'
                                        }
                                      }),
                                      t('p', [e._v('IOS')])
                                    ],
                                    1
                                  )
                                ]
                              ),
                              t(
                                'div',
                                {
                                  staticClass: 'qrcode-android'
                                },
                                [
                                  e.resources.Android
                                    ? t(
                                        'div',
                                        {
                                          staticClass: 'qrcode_box'
                                        },
                                        [
                                          t('VueQr', {
                                            attrs: {
                                              logoMargin: 2,
                                              text: (e.resources.Android && e.resources.Android.url) || '',
                                              size: 120,
                                              margin: 5
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : e._e(),
                                  t(
                                    'div',
                                    {
                                      staticClass: 'qrcode-info'
                                    },
                                    [
                                      t('svg-icon', {
                                        attrs: {
                                          iconClass: 'icon-android'
                                        }
                                      }),
                                      t('p', [e._v('Android')])
                                    ],
                                    1
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  e.activeMediaList.length > 1
                    ? t(
                        'div',
                        {
                          staticClass: 'channel-group'
                        },
                        e._l(e.activeMediaList, function (n) {
                          return t(
                            'div',
                            {
                              key: n.type,
                              staticClass: 'channel-list'
                            },
                            [
                              t(
                                'div',
                                {
                                  staticClass: 'channel-item',
                                  on: {
                                    click: function (t) {
                                      return e.openResource(n.type)
                                    }
                                  }
                                },
                                [
                                  t('img', {
                                    staticClass: 'channel-img',
                                    attrs: {
                                      src: n.icon
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        }),
                        0
                      )
                    : e._e(),
                  t('LanguageSelect')
                ],
                1
              )
            ]
          )
        ]
      )
    },
    aa = [],
    // language-select
    ia = function () {
      var e = this,
        t = e._self._c
      return t(
        'div',
        {
          staticClass: 'language-select'
        },
        [
          t(
            'SimpleSelect',
            {
              attrs: {
                dropAnimationName: 'zoom-in-bottom'
              }
            },
            [
              t(
                'template',
                {
                  slot: 'selected'
                },
                [
                  t(
                    'div',
                    {
                      staticClass: 'language-selected'
                    },
                    [
                      t('NationFlag', {
                        attrs: {
                          type: '2',
                          lang: e.currentLanguage
                        }
                      }),
                      t(
                        'span',
                        {
                          staticClass: 'selected-name'
                        },
                        [e._v(e._s(e.$t(e.currentLanguage)))]
                      )
                    ],
                    1
                  )
                ]
              ),
              t(
                'template',
                {
                  slot: 'arrow'
                },
                [
                  t('svg-icon', {
                    attrs: {
                      iconClass: 'common-arrow'
                    }
                  })
                ],
                1
              ),
              e._l(e.languages, function (n, a) {
                return [
                  t(
                    'SimpleOption',
                    {
                      key: 'lang_'.concat(a),
                      attrs: {
                        className: n === e.currentLanguage ? 'selected' : '',
                        option: n
                      },
                      on: {
                        'option-selected': e.selectLanguage
                      }
                    },
                    [
                      t('NationFlag', {
                        attrs: {
                          type: '2',
                          lang: n
                        }
                      }),
                      t('span', [e._v(e._s(e.$t(n)))])
                    ],
                    1
                  )
                ]
              })
            ],
            2
          )
        ],
        1
      )
    },
    oa = [],
    // simple-select
    sa = function () {
      var e = this,
        t = e._self._c
      return t(
        'div',
        {
          staticClass: 'simple-select'
        },
        [
          t(
            'div',
            {
              ref: 'selectInput',
              staticClass: 'select-input',
              on: {
                click: e.toggleOptions
              }
            },
            [
              t(
                'div',
                {
                  staticClass: 'selected-option'
                },
                [e._t('selected')],
                2
              ),
              t(
                'i',
                {
                  staticClass: 'arrow-icon',
                  class: {
                    up: e.showOptions,
                    down: !e.showOptions
                  }
                },
                [
                  e._t('arrow', function () {
                    return [
                      t('svg-icon', {
                        attrs: {
                          className: 'arrow-down',
                          iconClass: 'arrow-down'
                        }
                      })
                    ]
                  })
                ],
                2
              )
            ]
          ),
          t(
            'transition',
            {
              attrs: {
                name: e.dropAnimationName
              }
            },
            [
              t(
                'div',
                {
                  directives: [
                    {
                      name: 'show',
                      rawName: 'v-show',
                      value: e.showOptions,
                      expression: 'showOptions'
                    }
                  ],
                  staticClass: 'select-options'
                },
                [e._t('default')],
                2
              )
            ]
          )
        ],
        1
      )
    },
    ra = [],
    // simpleSelect
    ca = {
      name: 'simpleSelect',
      props: {
        dropAnimationName: {
          type: String,
          default: 'zoom-in-top'
        }
      },
      data: function () {
        return {
          showOptions: !1
        }
      },
      methods: {
        toggleOptions: function () {
          ;(this.showOptions = !this.showOptions),
            this.showOptions
              ? document.addEventListener('click', this.closeOptions)
              : document.removeEventListener('click', this.closeOptions)
        },
        closeOptions: function (e) {
          this.$refs.selectInput.contains(e.target) ||
            ((this.showOptions = !1), document.removeEventListener('click', this.closeOptions))
        }
      }
    },
    la = ca,
    ua = (0, _.A)(la, sa, ra, !1, null, null, null),
    SimpleSelect = ua.exports,
    //
    //
    // NOTE:
    wa = {
      components: {
        NationFlag: u.io,
        SimpleSelect: SimpleSelect,
        SimpleOption: SimpleOption
      },
      setup: function () {
        var e = U.A.supportLanguages,
          t = (0, h.ok)(),
          n = t.currentLanguage,
          a = t.changeLanguageTo,
          i = function (e) {
            a(e)
          }
        return {
          languages: e,
          currentLanguage: n,
          selectLanguage: i
        }
      }
    },
    Ca = wa,
    ba = (0, _.A)(Ca, ia, oa, !1, null, null, null),
    _a = ba.exports,
    //
    //
    // NOTE:
    za = {
      mixins: [u.vE.openLinkage, kt.z],
      components: {
        LanguageSelect: _a,
        VueQr: VueQr,
        CommonLogo: u.fA,
        SvgIcon: SvgIcon
      },
      setup: function () {
        var e = (0, o.Kh)({ showDownload: !1, showMemberList: !1, showGameList: !1 }),
          t = (0, o.nI)(),
          a = t.proxy,
          i = (0, h.OW)(),
          s = i.mappingVendor,
          r = i.sortingVendor,
          c = i.openResource,
          l = (0, h.rd)(),
          u = (0, h.s9)(),
          d = (u.t, (0, h.As)()),
          m = d.setMcPage,
          g = d.isGamePage,
          f = (0, h.Pj)(),
          v = f.store,
          w = f.commit,
          C = (0, h.so)(),
          b = C.getServiceByType,
          _ = C.getService,
          A = C.hasService,
          y = (0, h.yP)(),
          P = y.showSideMenu,
          k = y.setShowSideMenu,
          M = (0, o.EW)(function () {
            return v.Login.isLogin
          }),
          x = (0, o.EW)(function () {
            return v.Public.banners.find(function (e) {
              return 'w_leftmenu' === e.groupName
            })
          }),
          L = (0, o.EW)(function () {
            return !!v.Public.hasVip
          }),
          S = (0, o.EW)(function () {
            return v.eGameStore.currentGameType
          }),
          N = (0, o.EW)(function () {
            return v.eGameStore.currentVassalage
          }),
          T = (0, o.EW)(function () {
            return v.home.resources
          }),
          R = (0, o.EW)(function () {
            var e
            return null === (e = v.Public.availablePromo) || void 0 === e || null === (e = e.REFERRAL) || void 0 === e
              ? void 0
              : e.enabled
          }),
          O = (0, o.EW)(function () {
            var e = window.sessionStorage.getItem('token') || ''
            return ''.concat(window.location.origin, '/m/appDownload?language=').concat(Aa.A.locale, '&tokens=').concat(e)
          }),
          E = [
            {
              name: 'in_increase_deposit',
              page: 'depositv2',
              icon: 'deposit'
            },
            {
              name: 'in_increase_withdrawal',
              page: 'withdraw',
              icon: 'withdraw'
            },
            {
              name: 'activity_up',
              page: 'promotions',
              icon: 'promo-2'
            }
          ].concat(
            (0, pt.A)(
              R.value || !M
                ? [
                    {
                      name: 'invite_friends',
                      page: 'referral',
                      icon: 'share'
                    }
                  ]
                : []
            ),
            [
              {
                name: 'in_reward_center',
                page: 'rewardCenter',
                icon: 'reward'
              },
              {
                name: 'rebate_promo',
                page: 'manualRebate',
                icon: 'cashback'
              }
            ]
          ),
          I = [
            {
              name: 'in_betting_record',
              page: 'personalHistoryCopy',
              icon: 'bet-record'
            },
            {
              name: 'in_my_account',
              page: 'securityCenter',
              icon: 'security-center'
            },
            {
              name: 'in_increase_deposit',
              page: 'depositv2',
              icon: 'deposit_record'
            },
            {
              name: 'in_personal_loss',
              page: 'personalProfit',
              icon: 'profit-loss'
            },
            {
              name: 'in_platform_information',
              page: 'messageV2',
              icon: 'mailcen'
            }
          ],
          B = [
            { type: 'WHATSAPP', icon: n(62357) },
            { type: 'FACEBOOK', icon: n(16295) },
            { type: 'INSTAGRAM', icon: n(74635) },
            { type: 'TELEGRAM', icon: n(79060) }
          ],
          V = (0, o.EW)(function () {
            return B.filter(function (e) {
              return !!T.value[e.type]
            })
          }),
          G = (0, o.EW)(function () {
            return (0, pt.A)(r.value)
          }),
          H = function (e) {
            var t = e.gameType,
              n = e.hasVendors
            return !g.value && ((!P.value && S.value === t) || (S.value === t && !n))
          },
          D = function (e) {
            l.push('/'), w('setCurrentGameType', e)
          },
          z = function (e, t) {
            if ('RNG' === e)
              w('setCurrentVassalage', t),
                l.push({
                  path: '/'.concat(e.toLowerCase()),
                  query: {
                    vassalage: t
                  }
                })
            else {
              var n,
                i = (null === (n = s.value) || void 0 === n || null === (n = n[e]) || void 0 === n ? void 0 : n.cards) || {},
                o = i[t]
              o && a.startGameV2(o)
            }
          },
          U = function (t) {
            e.showDownload = t
          },
          q = function (t) {
            e[t] = !e[t]
          },
          F = function (e) {
            if ('promotions' === e) return l.push('/promotions')
            m(e)
          },
          j = function (e) {
            var t, n
            return 'RNG' === e
              ? [].concat(
                  (0, pt.A)(
                    null === (t = s.value) || void 0 === t || null === (t = t[e]) || void 0 === t ? void 0 : t.gameClassify
                  ),
                  [
                    {
                      gameCount: null,
                      displayName: 'FISH',
                      key: 'FISH'
                    }
                  ]
                )
              : null === (n = s.value) || void 0 === n || null === (n = n[e]) || void 0 === n
              ? void 0
              : n.gameClassify
          }
        return (0, p.A)(
          (0, p.A)({}, (0, o.QW)(e)),
          {},
          {
            banner: x,
            currentGameType: S,
            currentVassalage: N,
            setGameType: D,
            setVassalage: z,
            setShowSideMenu: k,
            showSideMenu: P,
            judgeMenuActive: H,
            setMcPage: m,
            iosUrl: O,
            resources: T,
            handleShowDownload: U,
            hasVip: L,
            getServiceByType: b,
            hasService: A,
            getService: _,
            menu: E,
            memberNav: I,
            menuList: G,
            gameTypeName: Pt.IJ,
            handleItemClick: F,
            getGameClassifyMenu: j,
            toggleShow: q,
            activeMediaList: V,
            openResource: c
          }
        )
      }
    },
    Ua = za,
    qa = (0, _.A)(Ua, na, aa, !1, null, null, null),
    sideMenu = qa.exports,
    //
    //
    // NOTE:
    ja = function () {
      return n.e(990).then(n.bind(n, 33357))
    },
    Za = function () {
      return n.e(846).then(n.bind(n, 66736))
    },
    Qa = function () {
      return n.e(73).then(n.bind(n, 99029))
    },
    Ya = function () {
      return n.e(282).then(n.bind(n, 67291))
    },
    Ja = function () {
      return n.e(429).then(n.bind(n, 3702))
    },
    Wa = function () {
      return n.e(93).then(n.bind(n, 74279))
    },
    Ka = function () {
      return n.e(242).then(n.bind(n, 38702))
    },
    Xa = function () {
      return n.e(474).then(n.bind(n, 87466))
    },
    routes = [
      {
        path: '/:path(index|index.html|home|)',
        name: 'index',
        components: {
          default: home_view,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/login',
        name: 'login',
        components: {
          default: home_view,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/register',
        name: 'register',
        components: {
          default: home_view,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/agent',
        name: 'Agent',
        components: {
          agent: agent_components
        }
      },
      {
        path: '/agentHome',
        name: 'AgentHome',
        components: {
          agent: wn
        }
      },
      {
        path: '/member',
        name: 'member',
        components: {
          default: Ya,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/help',
        name: 'Help',
        components: {
          default: home_view,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/:gameType(\\b|sports|esports|lott|elott\\b)',
        name: 'GameCenter',
        components: {
          default: ja,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/:gameType(\\b|live|fish|rng|pvp\\b)',
        name: 'GameListCenter',
        components: {
          default: Za,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/:type(\\b|favorite|recent\\b)',
        name: 'accountGame',
        components: {
          default: Xa,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/lottery',
        name: 'lottery',
        components: {
          default: Ka,
          header: Jn,
          sideMenu: sideMenu
        },
        meta: {
          requireAuth: !0
        }
      },
      {
        path: '/seaLottery',
        name: 'seaLottery',
        components: {
          default: Ka,
          header: Jn,
          sideMenu: sideMenu
        },
        meta: {
          requireAuth: !0
        }
      },
      {
        path: '/vnLottery',
        name: 'vnLottery',
        components: {
          default: Ka,
          header: Jn,
          sideMenu: sideMenu
        },
        meta: {
          requireAuth: !0
        }
      },
      {
        path: '/promotions',
        name: 'Promotions',
        components: {
          default: Qa,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/pointMall',
        name: 'pointMall',
        components: {
          default: Ja,
          header: Jn,
          footer: ta,
          sideMenu: sideMenu
        }
      },
      {
        path: '/seamless',
        name: 'Seamless',
        components: {
          default: Wa,
          header: Jn,
          sideMenu: sideMenu
        }
      }
    ],
    ei = document.querySelector('body')
  o.Ay.use(tt.Ay)
  let VueRouter = new tt.Ay({
      mode: 'history',
      routes: routes,
      scrollBehavior: function (e, t, n) {
        return e.hash
          ? {
              selector: e.hash
            }
          : {
              x: 0,
              y: 0
            }
      }
    }),
    ni = function () {
      VueRouter.beforeEach(function (e, t, n) {
        var a = window.sessionStorage.getItem('token')
        a ? n() : e.meta.requireAuth ? n('/login') : n()
      })
    }
    VueRouter.afterEach((function(e, t) {
    e.name !== t.name && (ei.scrollTop = 0), window.cover.loader(!1)
  }),
    ni()
    var aiVueRouter = VueRouter

    // NOTE:STORE
    ii = n(95353),
    oi = n(75374),
    // api
    si = (n(84864), n(57465), n(87745), n(21699), n(62615)),
    ri = n(37374),
    ci = {
      login: function (e) {
        return si.A.post(ri.A.login.login, e)
      },
      logout: function () {
        return si.A.del(ri.A.logout)
      },
      getLoginCode: function (e) {
        return si.A.post(ri.A.login.loginCode, e)
      },
      getInfo: function () {
        return si.A.get(ri.A.login.mbInfo)
      },
      menu: function (e) {
        return si.A.get(ri.A.login.menu, e)
      },
      game: function (e) {
        return si.A.get(ri.A.login.game, e)
      },
      register: function (e) {
        return si.A.put(ri.A.login.register, e)
      },
      registerMobile: function (e) {
        return si.A.put(ri.A.login.registerMobile, e)
      },
      changePassword: function (e) {
        return si.A.post(ri.A.login.changePwd, e)
      },
      affiliate: function (e) {
        return si.A.get(ri.A.login.affiliate, e)
      },
      setRegister: function (e) {
        return si.A.get(ri.A.login.setRegister, e)
      },
      forgetPassword: function (e) {
        return si.A.formPost(ri.A.login.forgetPwd, e)
      },
      freePlay: function (e) {
        return si.A.post(ri.A.login.freePlay, e)
      },
      captcha: function () {
        return si.A.get(ri.A.login.captcha)
      },
      regValidatas: function () {
        return si.A.get(ri.A.login.regValidata, {})
      },
      icon: function () {
        return si.A.get(ri.A.login.icon)
      },
      permission: function () {
        return si.A.get(ri.A.login.permission)
      },
      setPasswordByPhone: function (e) {
        return si.A.post(ri.A.login.setPasswordByPhone, e)
      }
    },
    li = ci,
    ui = {
      getNotice: function (e) {
        return si.A.get(ri.A.home.notice, e)
      },
      getPopular: function (e) {
        return si.A.get(ri.A.home.popular, e)
      },
      getDomainRoute: function () {
        return si.A.get(ri.A.common.routers)
      },
      getConsolidated: function (e) {
        return si.A.get(ri.A.home.consolidated, e)
      },
      getProcess: function (e) {
        return si.A.get(ri.A.home.processDividendReq, e)
      },
      getSalary: function (e) {
        return si.A.get(ri.A.home.processDailySalary, e)
      },
      getVnNumero: function (e) {
        return si.A.get(ri.A.home.vnNumero, e)
      },
      getOpNumero: function (e) {
        return si.A.get(ri.A.home.openedNumero, e)
      },
      getUsernameRegSMS: function (e) {
        return si.A.post(ri.A.common.usernameRegSMS, e)
      },
      getMobileRegSMS: function (e) {
        return si.A.post(ri.A.common.mobileRegSMS, e)
      },
      walletTransfer: function (e) {
        return si.A.post(ri.A.walletTransfer, e)
      },
      feedback: function (e) {
        return si.A.put(ri.A.common.feedback, e)
      },
      getMerchantWallet: function (e) {
        return si.A.get(ri.A.home.merchantWallet, e)
      },
      getHourSalary: function (e) {
        return si.A.post(ri.A.home.processContractHourSalary, e)
      },
      processRealTimeSalaryContract: function (e) {
        return si.A.post(ri.A.home.processRealTimeSalaryContract, e)
      },
      getRafflePromotion: function (e) {
        return si.A.post(ri.A.common.rafflePromotion, e)
      },
      getWinnerBoard: function (e) {
        return si.A.get(ri.A.common.getWinnerBoard, {
          data: e
        })
      }
    },
    di = ui
  function mi() {
    var e = tcg.lib.rndString(),
      t = tcg.lib.RSAEncrypt(e.split('').reverse().join(''))
    return t
  }
  var pi = {
      userInfo: {},
      setReg: {},
      lottGames: [],
      validate: {},
      isLogin: !1,
      isAgent: !1,
      isTrial: !1,
      isChangePaw: !1,
      icon: null,
      hasFreePlay: !1,
      pwdEnabled: !1,
      showPhoneLogin: !1,
      showVerCodeLogin: !1,
      smsEnabled: !1,
      mobileReg: !1,
      mobileRegPass: !1,
      hasMerchantWallet: 1,
      imgUrl: 'https://images.b298100.com:42666',
      startGameUrl: 'https://www2.854819.com:42666',
      whitelabelVal: {},
      location: {},
      memberInfo: {},
      systemStatus: 0
    },
    gi = {
      login: function (e, t) {
        return li.login(t)
      },
      getLoginCode: function (e, t) {
        return new Promise(function (e, n) {
          e(li.getLoginCode(t))
        })
      },
      merchantWallet: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function e() {
            var n, i
            return (0, a.A)().wrap(function (e) {
              while (1)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (((n = JSON.parse(window.sessionStorage.getItem('merchantWallet'))), n)) {
                      e.next = 10
                      break
                    }
                    return (e.next = 4), di.getMerchantWallet(t)
                  case 4:
                    return (
                      (i = e.sent),
                      window.sessionStorage.setItem('merchantWallet', JSON.stringify(i)),
                      (pi.hasMerchantWallet = i.value.isSingle),
                      e.abrupt('return', i)
                    )
                  case 10:
                    return (pi.hasMerchantWallet = n.value.isSingle), e.abrupt('return', n)
                  case 12:
                  case 'end':
                    return e.stop()
                }
            }, e)
          })
        )()
      },
      loginInfo: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i, o
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (i = e.commit), window.sessionStorage.setItem('token', t.token), (n.next = 4), li.getInfo()
                  case 4:
                    return (o = n.sent), i('setMemberInfo', o), i('storeInfo', o), n.abrupt('return', o)
                  case 8:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getMemberInfo: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (n = e.commit), (t.next = 3), li.getInfo()
                  case 3:
                    return (i = t.sent), i.success && (n('storeInfo', i), n('setLoginState', !0)), t.abrupt('return', i)
                  case 6:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      affiliate: function (e, t) {
        return li.affiliate(t)
      },
      setRegister: function () {
        li.setRegister().then(function (e) {
          pi.setReg = e
        })
      },
      register: function (e, t) {
        var n = u.h.getCode(),
          a = {
            data: (0, p.A)({}, t.data)
          }
        return (
          (a.data.registerUrl = u.h.getRegUrl()),
          (a.data.affiliateCode = a.data.affiliateCode || n.code),
          (a.data.referralCode = a.data.referralCode || n.referralCode),
          (a.data.domain = n.domain || ''),
          (a.data.registerMethod = 'WEB'),
          li.register(a)
        )
      },
      registerMobile: function (e, t) {
        var n = u.h.getCode(),
          a = {
            data: (0, p.A)({}, t.data)
          }
        return (
          (a.data.registerUrl = u.h.getRegUrl()),
          (a.data.affiliateCode = a.data.affiliateCode || n.code),
          (a.data.referralCode = a.data.referralCode || n.referralCode),
          (a.data.domain = n.domain || ''),
          (a.data.registerMethod = 'WEB'),
          li.registerMobile(t)
        )
      },
      changePassword: function (e, t) {
        return li.changePassword(t)
      },
      getLottGames: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i, o, s
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (n = e.commit),
                      (i = {
                        data: {
                          prizeMode: U.A.brand.lotteryType
                        }
                      }),
                      (t.next = 4),
                      li.game(i)
                    )
                  case 4:
                    if (((t.t0 = t.sent), t.t0)) {
                      t.next = 7
                      break
                    }
                    t.t0 = {}
                  case 7:
                    return (
                      (o = t.t0),
                      (s = Object.values(o).map(function (e) {
                        return (0, p.A)(
                          (0, p.A)({}, e),
                          {},
                          {
                            tag: e.gameGroupCode
                          }
                        )
                      })),
                      n('setLottGames', s),
                      t.abrupt('return', s)
                    )
                  case 11:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      forgetPassword: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function e() {
            var n
            return (0, a.A)().wrap(function (e) {
              while (1)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), li.forgetPassword(t)
                  case 2:
                    return (n = e.sent), e.abrupt('return', n)
                  case 4:
                  case 'end':
                    return e.stop()
                }
            }, e)
          })
        )()
      },
      loginFreePlay: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      e.commit,
                      (n = {
                        os: tcg.lib.os,
                        platform: 'W',
                        Encryption: mi(),
                        'X-Gateway-Version': 3
                      }),
                      (t.next = 4),
                      li.freePlay(n)
                    )
                  case 4:
                    return (i = t.sent), t.abrupt('return', i)
                  case 6:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      captcha: function () {
        return (0, i.A)(
          (0, a.A)().mark(function e() {
            var t
            return (0, a.A)().wrap(function (e) {
              while (1)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), li.captcha()
                  case 2:
                    return (t = e.sent), e.abrupt('return', t)
                  case 4:
                  case 'end':
                    return e.stop()
                }
            }, e)
          })
        )()
      },
      regValidatas: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i, o
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (((n = e.commit), (i = JSON.parse(sessionStorage.getItem('validate'))), i)) {
                      t.next = 8
                      break
                    }
                    return (t.next = 5), li.regValidatas()
                  case 5:
                    ;(o = t.sent), (i = o.value), sessionStorage.setItem('validate', JSON.stringify(o.value))
                  case 8:
                    return n('setRegValidate', i), t.abrupt('return', i)
                  case 10:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      getPermission: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i, o, s, r, c, l, u, d, m, p, g, f, v
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (n = e.commit), (i = e.rootState), (t.next = 3), li.permission()
                  case 3:
                    return (
                      (o = t.sent),
                      (s = o.value),
                      (r = s.info),
                      (c = r.customerService),
                      (l = r.domainRoute),
                      (u = r.resources),
                      (d = r.whitelabel),
                      (m = r.register),
                      (p = r.mainDomain),
                      (g = r.analytics),
                      (f = gi.getRegister(m)),
                      (v = gi.getWhitelabelVal(d)),
                      n('setStatus', s),
                      n('setSystemStatus', o.value),
                      n('setWhitelabelVal', v),
                      n('setBasicModule', v),
                      n('setCDN', s.info),
                      n('setRegValidate', f),
                      n('setResources', u),
                      n('setDomainList', l),
                      n('setMainDomain', p),
                      n('setCustomerService', c),
                      n('setLocation', s.location),
                      n('setAnalytics', g.gtagId),
                      gi.applyValidator(f, i),
                      t.abrupt('return', s)
                    )
                  case 22:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      logout: function (e) {
        var t = e.commit
        li.logout(),
          window.sessionStorage.clear(),
          window.sessionStorage.setItem('merchant', U.A.brand.merchant),
          window.sessionStorage.setItem('merchantCode', U.A.brand.merchant),
          t('setLoginState', !1),
          t('setAgent', !1)
      },
      getRegister: function (e) {
        return Object.keys(e).reduce(function (t, n) {
          var a = e[n]
          return '*' === a.acceptedPattern && (a.acceptedPattern = '.*'), (t[n] = a), t
        }, {})
      },
      applyValidator: function (e, t) {
        var n = function (e) {
            return Aa.A.t('reg_pattern_'.concat(e.patternId))
              .replace('(min)', e.minLength)
              .replace('(max)', e.maxLength)
              .replace(''.concat(e.minLength, ' - ').concat(e.minLength), e.minLength)
          },
          a = U.A.supportLanguages.reduce(function (e, t) {
            return (0, p.A)((0, p.A)({}, e), {}, (0, oi.A)({}, t, {}))
          }, {})
        Object.keys(a).forEach(function (t) {
          ;(a[t].messages = {
            required: function (e) {
              return n(e)
            },
            checkPass: function () {
              return Aa.A.t('inconsistent_twice')
            }
          }),
            (a[t].attributes = {
              checkPass: Aa.A.t('in_increase_verifyPwd')
            }),
            Object.keys(e).forEach(function (i) {
              ;(a[t].messages[i] = function () {
                return n(e[i])
              }),
                (a[t].attributes[i] = e[i])
            })
        }),
          Object.keys(e).forEach(function (t) {
            ne.Dr.extend(t, {
              validate: function (n) {
                return new RegExp(e[t].acceptedPattern).test(n) && n.length >= e[t].minLength && n.length <= e[t].maxLength
              }
            })
          }),
          ne.Dr.localize(a),
          ne.Dr.localize(t.home.language)
      },
      getWhitelabelVal: function (e) {
        function t(e) {
          var n = {}
          return (
            (n[e.modId] = '1' === e.enabled),
            e.childrenNodes.forEach(function (e) {
              Object.assign(n, t(e))
            }),
            n
          )
        }
        return t(e)
      },
      getPasswordByPhone: function (e, t) {
        e.commit
        return li.setPasswordByPhone(t)
      }
    },
    fi = {
      storeInfo: function (e, t) {
        window.sessionStorage.setItem('nickname', t.value.nickname),
          window.sessionStorage.setItem('account', t.value.account),
          window.sessionStorage.setItem('username', t.value.account),
          window.sessionStorage.setItem('customerId', t.value.id),
          window.sessionStorage.setItem('isAgent', t.value.type)
        var n = 1 * t.value.type
        U.A.agentType.includes(n) && (e.isAgent = !0),
          U.A.trialType.includes(n) && (e.isTrial = !0),
          (e.memberInfo = t.value),
          (e.isLogin = !0)
      },
      setUserInfo: function (e, t) {
        e.userInfo = t
      },
      setLottGames: function (e, t) {
        e.lottGames = t
      },
      setLoginState: function (e, t) {
        e.isLogin = t
      },
      setAgent: function (e, t) {
        e.isAgent = t
      },
      setRegValidate: function (e, t) {
        e.validate = t
      },
      setMemberInfo: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        e.memberInfo = t.value || {}
      },
      setWhitelabelVal: function (e, t) {
        e.whitelabelVal = t
      },
      setBasicModule: function (e, t) {
        ;(e.mobileReg = t.MOBILENUMREG3),
          (e.smsEnabled = t.REGMOBVERF3),
          (e.mobileRegPass = t.MOBILENUMPASSREG3),
          (e.hasFreePlay = t.FREEPLAY3),
          (e.pwdEnabled = t.PWDEXPFORCECHANGE3),
          (e.showVerCodeLogin = t.MOBILEVERCODELOGIN3)
      },
      setCDN: function (e, t) {
        t.imageCDNs && t.imageCDNs.length > 0 && (e.imgUrl = t.imageCDNs[Math.floor(Math.random() * t.imageCDNs.length)]),
          t.launchGameCDNs &&
            t.launchGameCDNs.length > 0 &&
            (e.startGameUrl = t.launchGameCDNs[Math.floor(Math.random() * t.launchGameCDNs.length)])
      },
      setLocation: function (e, t) {
        e.location = t
      },
      setAnalytics: function (e, t) {
        e.gtagId = t
      },
      setSystemStatus: function (e, t) {
        var n = t.maintenance,
          a = t.regionRestriction
        e.systemStatus = n ? 1 : a ? 2 : 0
      }
    },
    vi = {
      state: pi,
      actions: gi,
      mutations: fi
    },
    hi = {
      getModelList: function (e) {
        return si.A.get(ri.A.live.getModelList, e)
      },
      launchChat: function (e) {
        return si.A.get(ri.A.live.launchChat, e)
      }
    },
    wi = hi,
    Ci = {
      modelList: []
    },
    bi = {
      getModelList: function (e, t) {
        e.commit
        return wi.getModelList(t).then(function (e) {
          console.log(e)
        })
      },
      getLaunchChat: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (
                      (i = e.commit),
                      e.state,
                      n.abrupt(
                        'return',
                        wi.getLaunchChat(t).then(function (e) {
                          e.value.chatUrl && i('setLiveSrc', ''.concat(e.value.chatUrl))
                        })
                      )
                    )
                  case 2:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      }
    },
    _i = {
      setModelList: function (e, t) {
        e.modelList = t
      }
    },
    Ai = {
      state: Ci,
      actions: bi,
      mutations: _i
    },
    yi = {
      navIndex: -1,
      showLoginPopup: !1,
      showChangePopup: !1,
      hiddenHeader: !1,
      showForgotPopup: !1,
      showEgameMenu: !1
    },
    Pi = {},
    ki = {
      setNavIndex: function (e, t) {
        e.navIndex = t
      },
      setShowLoginPopup: function (e, t) {
        e.showLoginPopup = t
      },
      setShowChangePopup: function (e, t) {
        e.showChangePopup = t
      },
      setShowForgotPopup: function (e, t) {
        e.showForgotPopup = t
      },
      setHiddenHeader: function (e, t) {
        e.hiddenHeader = t
      },
      setShowEgameMenu: function (e, t) {
        e.showEgameMenu = t
      }
    },
    Mi = {
      state: yi,
      actions: Pi,
      mutations: ki
    },
    xi =
      (n(48980),
      n(54554),
      {
        getGames: function (e) {
          return si.A.get(ri.A.eGame.games, {
            data: e
          })
        },
        getGamesAnoucements: function (e) {
          return si.A.get(ri.A.eGame.announcements, {
            data: e
          })
        },
        getVassGameType: function (e) {
          return si.A.get(ri.A.eGame.vassGameType, {
            data: e
          })
        },
        getGameVendor: function (e) {
          return si.A.get(ri.A.eGame.gameVendor, {
            data: (0, p.A)(
              {
                platform: 'html5-desktop'
              },
              e
            )
          })
        },
        getFavGames: function (e) {
          return si.A.get(ri.A.eGame.favGames, {
            data: e
          })
        },
        getFavGameList: function (e) {
          return si.A.get(ri.A.eGame.favGameList, {
            data: e
          })
        },
        getRecentGameList: function (e) {
          return si.A.get(ri.A.eGame.recentGameList, {
            data: e
          })
        },
        getHotGameList: function (e) {
          return si.A.get(ri.A.eGame.gameHot, {
            data: e
          })
        },
        addFavGame: function (e) {
          return si.A.post(ri.A.eGame.addFavGame, {
            data: e
          })
        },
        removeFavGame: function (e) {
          return si.A.del(ri.A.eGame.removeFavGame, {
            data: e
          })
        },
        gameLaunchFB: function (e) {
          return si.A.get(ri.A.eGame.gameLaunchFB, {
            data: e
          })
        }
      }),
    Li = xi,
    Si = 'HOT_GAMES',
    Ni = {
      sortingVendor: [],
      gameVendor: {},
      mappingVendor: {},
      hotGames: [],
      lottFavIds: [],
      favGameIds: [],
      favGameList: {
        content: [],
        pageNum: 1,
        totalPages: 0
      },
      prizeMode: '',
      currentGameType: 'HOME',
      currentVassalage: ''
    },
    Ti = {
      getGameList: function (e, t) {
        e.dispatch, e.commit
        return Li.getGames(t).then(function (e) {
          return e.value
        })
      },
      getFavGames: function (e, t) {
        e.dispatch
        var n = e.commit
        return Li.getFavGames(t).then(function (e) {
          return n('setFavGameIds', e.value), e.value
        })
      },
      getFavGameList: function (e, t) {
        e.dispatch
        var n = e.commit,
          a = (e.state, t.query),
          i = t.loadMore
        return Li.getFavGameList(a).then(function (e) {
          let t = {
            data: e.value,
            loadMore: i
          }
          return n('setFavGameList', t), e.value
        })
      },
      getRecentGameList: function (e, t) {
        e.dispatch, e.commit
        return Li.getRecentGameList(t).then(function (e) {
          return e.value
        })
      },
      getHotGameList: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i, o, s, r, c, l
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (e.dispatch,
                      (i = e.commit),
                      (o = t.query),
                      (s = t.refresh),
                      s && sessionStorage.removeItem(Si),
                      (c = sessionStorage.getItem(Si)),
                      !c)
                    ) {
                      n.next = 8
                      break
                    }
                    ;(r = JSON.parse(c)), (n.next = 13)
                    break
                  case 8:
                    return (n.next = 10), Li.getHotGameList(o)
                  case 10:
                    ;(l = n.sent), (r = l.value.list), sessionStorage.setItem(Si, JSON.stringify(r))
                  case 13:
                    return i('setHotGames', r), n.abrupt('return', r)
                  case 15:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getGameVendor: function (e) {
        var t = e.commit,
          n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : {
                  flush: !0
            }
            return new Promise((function(e, a) {
          var i = JSON.parse(sessionStorage.getItem('gameVendor'))
          !n.flush && i
            ? (t('SET_GAMEVENDOR', i), e(i))
            : Li.getGameVendor(n)
                .then(function (n) {
                  var a = n.value.data.lanes
                  sessionStorage.setItem('gameVendor', JSON.stringify(a)), t('SET_GAMEVENDOR', a), e(a)
                })
                .catch(function (e) {
                  a(e)
                })
        })
      },
      addFavGame: function (e, t) {
        e.dispatch
        var n = e.commit,
          a = e.state,
          i = ''.concat(t.nodeId)
        return a.favGameIds.includes(i) ? null : (n('setFavGameIds', [].concat((0, pt.A)(a.favGameIds), [i])), Li.addFavGame(t))
      },
      removeFavGame: function (e, t) {
        e.dispatch, e.commit
        var n = e.state
        return (
          (n.favGameIds = n.favGameIds.filter(function (e) {
            return +e !== +t.nodeId
          })),
          (n.favGameList = (0, p.A)(
            (0, p.A)({}, n.favGameList),
            {},
            {
              content: n.favGameList.content.filter(function (e) {
                return +e.nodeId !== +t.nodeId
              })
            }
          )),
          Li.removeFavGame(t)
        )
      }
    },
    Ri = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        t = [],
        n = [],
        a = []
      e.forEach(function (e) {
        'SPORTS' === e.title &&
          e.cards.length &&
          ((t = e.cards.filter(function (e) {
            return U.A.esportGames.includes(e.vassalage)
          })),
          (n = e.cards.filter(function (e) {
            return U.A.cockfightGames.includes(e.vassalage)
          })),
          t.length &&
            (e.cards = e.cards.filter(function (e) {
              return !U.A.esportGames.includes(e.vassalage)
            })),
          n.length &&
            (e.cards = e.cards.filter(function (e) {
              return !U.A.cockfightGames.includes(e.vassalage)
            }))),
          'RNG' === e.title &&
            e.cards.length &&
            (a = e.cards.filter(function (e) {
              return U.A.SPBGames.includes(e.vassalage)
            }))
      })
      var i =
        let i = e.findIndex((function(e) {
            return 'SPORTS' === e.title
          }) || 0,
        o =
          e.findIndex(function (e) {
            return 'RNG' === e.title
          }) || 0
      return (
        n.length &&
          e.splice(i + 1, 0, {
            title: 'COCKFIGHT',
            cards: n
          }),
        t.length &&
          e.splice(i + 1, 0, {
            title: 'ESPORTS',
            cards: t
          }),
        a.length &&
          e.splice(o + 1, 0, {
            title: 'SPB',
            cards: a
          }),
        (0, pt.A)(e)
      )
    },
    Oi = {
      setHotGames: function (e, t) {
        e.hotGames = t
      },
      setPrizeMode: function (e, t) {
        var n = 'LOTT'
        ;['TCG_LOTTO_VN', 'LOTT'].some(function (e) {
          var n
          return !(
            null === t ||
            void 0 === t ||
            null === (n = t.ELOTT) ||
            void 0 === n ||
            null === (n = n.cards) ||
            void 0 === n ||
            !n[e]
          )
        }) && (n = 'ELOTT')
        let a = {
          LOTT: U.A.prizeModes.ModeLott,
          ELOTT: U.A.prizeModes.ModeElott
        }
        e.prizeMode = a[n]
      },
      SET_GAMEVENDOR: function (e, t) {
        var n = {},
          a = Ri(t),
          i = a.map(function (e) {
            var t = {}
            n[e.title] = e.cards
            var a = e.cards.map(function (e) {
              var n = e.vassalage
              return (t[n] = e), e
            })
            return {
              gameCategory: e.title,
              vendors: a,
              cards: t,
              gameClassify: e.gameClassify
            }
          }),
          o = i.reduce(function (e, t) {
            return (0, p.A)((0, p.A)({}, e), {}, (0, oi.A)({}, t.gameCategory, t))
          }, {})
        this.commit('setPrizeMode', o), (e.sortingVendor = i), (e.mappingVendor = o), (e.gameVendor = n)
      },
      setFavGameList: function (e, t) {
        var n = t.data,
          a = t.loadMore
        if (a) {
          var i = {
            content: e.favGameList.content.concat(n.content),
            pageNum: n.pageNum,
            totalPages: n.totalPages
          }
          e.favGameList = i
        } else e.favGameList = n
      },
      setFavGameIds: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
        e.favGameIds = t
      },
      setCurrentGameType: function (e, t) {
        e.currentGameType = t
      },
      setCurrentVassalage: function (e, t) {
        e.currentVassalage = t
      }
    },
    Ei = {
      state: Ni,
      actions: Ti,
      mutations: Oi
    },
    Ii = n(88296),
    Bi = U.A.device,
    Vi = U.A.defaultLang,
    Gi = {
      prizeMode: '',
      vnLotteryMenus: []
    },
    Hi = {
      changePrizeMode: function (e, t) {
        e.prizeMode = t
      },
      setvnLotteryMenus: function (e, t) {
        e.vnLotteryMenus = t
      }
    },
    Di = {
      getLabby: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i, o, s, r
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (
                      e.commit,
                      (i = e.rootState),
                      (o = t.gameCode),
                      (s = {
                        lottoArea: 'VN',
                        launchMode: 'LOTT',
                        lottoPrizeMode: i.eGameStore.prizeMode,
                        lottoGameCode: o,
                        lottoView: o ? 'betting' : 'lobby',
                        device: Bi,
                        backUrl: window.location.href,
                        language: localStorage.getItem('hisLang') || Vi
                      }),
                      (n.next = 5),
                      Ii.A.getLabby(s)
                    )
                  case 5:
                    return (r = n.sent), n.abrupt('return', r)
                  case 7:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getVnLotteryMenu: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i, o, s, r
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (n = e.commit),
                      (i = e.rootState),
                      (o = {
                        data: {
                          prizeMode: i.eGameStore.prizeMode,
                          device: 'WEB'
                        }
                      }),
                      (t.next = 4),
                      Ii.A.getVnlottMenus(o)
                    )
                  case 4:
                    return (
                      (s = t.sent),
                      (r = Object.values(s).map(function (e) {
                        return (0, p.A)(
                          (0, p.A)({}, e),
                          {},
                          {
                            gameMenus: e.gameMenus.map(function (e) {
                              return (0, p.A)(
                                (0, p.A)({}, e),
                                {},
                                {
                                  accountTypeName: 'TCG_LOTTO_VN'
                                }
                              )
                            })
                          }
                        )
                      })),
                      n('setvnLotteryMenus', r),
                      t.abrupt('return', r)
                    )
                  case 8:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      getMissionSummary: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return e.commit, (n.next = 3), Ii.A.getMissionSummary(t)
                  case 3:
                    return (i = n.sent), n.abrupt('return', i)
                  case 5:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getMissionLeaderboard: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return e.commit, (n.next = 3), Ii.A.getMissionLeaderboard(t)
                  case 3:
                    return (i = n.sent), n.abrupt('return', i)
                  case 5:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      }
    },
    zi = {
      state: Gi,
      actions: Di,
      mutations: Hi
    },
    Ui = {
      notice: [],
      announcementContent: null,
      banners: [],
      popular: [],
      popup: [],
      promotion: [],
      routers: [],
      consolidated: {},
      showConsolidated: !1,
      beforeLoginModal: !0,
      afterLoginModal: !0,
      noticeIndex: 0,
      type: {},
      resources: {},
      domainList: [],
      customerService: [],
      language: Aa.A.locale,
      winnerBoard: [],
      mainDomain: '',
      showSideMenu: !0
    },
    qi = {
      getAnnouncementContent: function (e) {
        var t = arguments
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i, o, s, r
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      ((i = e.commit), (o = e.state), (s = t.length > 1 && void 0 !== t[1] && t[1]), o.announcementContent && !s)
                    ) {
                      n.next = 8
                      break
                    }
                    return (
                      (n.next = 5),
                      di.getNotice({
                        data: {
                          types: 'B,PL,PU,PR',
                          platform: 'W',
                          execution: 'B'
                        }
                      })
                    )
                  case 5:
                    ;(r = n.sent), (o.announcementContent = r.success), i('setAnnouncementAndPromo', r.value)
                  case 8:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getPopular: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (
                      e.commit,
                      (n.next = 3),
                      di.getPopular(t).then(function (e) {
                        var t = []
                        for (var n in e) t.push(e[n])
                        ;(Ui.popular = t), (i = t)
                      })
                    )
                  case 3:
                    return n.abrupt('return', i)
                  case 4:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getConsolidated: function (e) {
        return (0, i.A)(
          (0, a.A)().mark(function t() {
            var n, i, o
            return (0, a.A)().wrap(function (t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), di.getConsolidated()
                  case 2:
                    ;(n = t.sent),
                      window.sessionStorage.setItem('consolidated', JSON.stringify(n)),
                      (i = n.value),
                      (o = {
                        dailysalreq: i.dailysalreqtype,
                        divtypereq: i.divtypereq,
                        contracthoursalreq: i.contracthoursalreq,
                        realtimesalreqtype: i.realtimesalreqtype
                      }),
                      (Ui.consolidated = o),
                      (Ui.showConsolidated = u.Uu.hasContract(i)),
                      e.commit('updateType', i),
                      e.commit('setContract', i)
                  case 10:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
      closeConsolidated: function () {
        Ui.showConsolidated = !1
      },
      participation: function (e, t) {
        e.commit
        return new Promise(function (e, n) {
          e(di.getProcess(t))
        })
      },
      wage: function (e, t) {
        e.commit
        return new Promise(function (e, n) {
          e(di.getSalary(t))
        })
      },
      hourSalary: function (e, t) {
        e.commit
        return new Promise(function (e, n) {
          e(di.getHourSalary(t))
        })
      },
      getOpened: function (e, t) {
        e.commit
        return new Promise(function (e, n) {
          e(di.getOpNumero(t))
        })
      },
      walletTransfer: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return e.commit, e.state, (n.next = 3), di.walletTransfer(t)
                  case 3:
                    return (i = n.sent), n.abrupt('return', i)
                  case 5:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      getWinnerBoard: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i, o
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (i = e.commit), (n.next = 3), di.getWinnerBoard(t)
                  case 3:
                    return (o = n.sent), i('setWinnerBoard', o.value.list), n.abrupt('return', o)
                  case 6:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      sendfeedback: function (e, t) {
        return (0, i.A)(
          (0, a.A)().mark(function n() {
            var i
            return (0, a.A)().wrap(function (n) {
              while (1)
                switch ((n.prev = n.next)) {
                  case 0:
                    return e.commit, (n.next = 3), di.feedback(t)
                  case 3:
                    return (i = n.sent), n.abrupt('return', i)
                  case 5:
                  case 'end':
                    return n.stop()
                }
            }, n)
          })
        )()
      },
      sendRegPhoneCode: function (e, t) {
        var n = t.data,
          a = t.regType
        return 'registerMobile' === a
          ? di.getMobileRegSMS({
              data: n
            })
          : di.getUsernameRegSMS({
              data: n
            })
      }
    },
    Fi = {
      setConsolidated: function (e, t) {
        e.showConsolidated = t
      },
      setNoticeIndex: function (e, t) {
        Ui.noticeIndex = t || 0
      },
      setBeforeLoginModal: function (e, t) {
        e.beforeLoginModal = t
      },
      setAfterLoginModal: function (e, t) {
        e.afterLoginModal = t
      },
      setLanguage: function (e, t) {
        e.language = t
      },
      setResources: function (e, t) {
        var n = t.reduce(function (e, t) {
          return (0, p.A)((0, p.A)({}, e), {}, (0, oi.A)({}, t.resourceType, t))
        }, {})
        e.resources = n
      },
      setDomainList: function (e, t) {
        e.domainList = t
      },
      setMainDomain: function (e, t) {
        e.mainDomain = t || ''
      },
      setCustomerService: function (e, t) {
        var n = t.map(function (e) {
          var t = e.path.substr(e.path.length - 8),
            n = e.path.slice(0, e.path.length - 8),
            a = window.desDecrypt(n, t)
          return (0, p.A)(
            (0, p.A)({}, e),
            {},
            {
              path: a
            }
          )
        })
        e.customerService = n
      },
      setWinnerBoard: function (e, t) {
        e.winnerBoard = t
          .map(function (e) {
            var t,
              n = e.vo,
              a = void 0 === n ? {} : n
            return (0, p.A)(
              (0, p.A)({}, a),
              {},
              {
                winAmount: Sn((null !== (t = a.winAmount) && void 0 !== t ? t : 0 === a.winAmount) ? +a.winAmount : 0)
              }
            )
          })
          .sort(function (e, t) {
            return +t.winAmount - +e.winAmount
          })
      },
      setShowSideMenu: function (e, t) {
        e.showSideMenu = 'reverse' === t ? !e.showSideMenu : t
      },
      setAnnouncementAndPromo: function (e, t) {
        ;(e.banners = t.banners), (e.notice = t.player), (e.popup = t.popup), (e.promotion = t.promotion)
      },
      updateType: function (e, t) {
        var n = (0, p.A)({}, e.type)
        ;(n.dailySalary = u.Uu.checkConsolidated(t, 'contractmrdailysalinfotype')),
          (n.hourSalary = u.Uu.checkConsolidated(t, 'contracthoursalinfo')),
          (n.salary = u.Uu.checkConsolidated(t, 'dailysalinfotype')),
          window.sessionStorage.setItem('enableSalary', n.salary),
          (n.enableCt = u.Uu.checkConsolidated(t, 'divtypeinfo')),
          window.sessionStorage.setItem('enableContract', n.enableCt),
          (e.type = n)
      }
    },
    ji = {
      state: Ui,
      actions: qi,
      mutations: Fi
    },
    Zi = {
      acLoaded: !1,
      mcLoaded: !1,
      acShow: !1,
      mcShow: !1,
      mcPage: 'securityCenter',
      acPage: 'agentTeamOverview',
      rewardMcPageData: null,
      prizeDetail: null
    },
    Qi = {
      acLoaded: function (e) {
        e.acLoaded = !0
      },
      mcLoaded: function (e) {
        e.mcLoaded = !0
      },
      setAcShow: function (e, t) {
        e.acShow = t
      },
      setMcShow: function (e, t) {
        t || (window['pointMall'] = null), (e.mcShow = t)
      },
      setMcPage: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'securityCenter'
        e.mcPage = t
      },
      setAcPage: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'agentTeamOverview'
        e.acPage = t
      },
      setRewardMcDate: function (e, t) {
        e.rewardMcPageData = t
      },
      setPrizeDetail: function (e, t) {
        e.prizeDetail = t
      }
    },
    Yi = {
      state: Zi,
      mutations: Qi
    }
    o.Ay.use(ii.Ay)
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
    }),
    Store = Ji,
    Ki = {
      loader: function (e, t) {
        var n = document.getElementById('br_loader'),
          a = n
        if (!n) {
          var i = document.createDocumentFragment(),
            o = document.createElement('div')
          o.id = 'br_loader'
          var s = document.getElementById('app')
          a = o
          var r =
            "<div class='br_loader_main'><div class='br_loader_bg'></div><div class='br_loader_content'><div class='br_spinner'><div class='spinner_inner'><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_line'></div><div class='spinner_circle'>&#9679;</div></div></div></div></div>"
          ;(a.innerHTML = r),
            i.appendChild(o),
            t
              ? ((o.className = 'br_loader_child'), t.appendChild(i))
              : ((o.className = 'br_loader_root'), document.body.insertBefore(i, s))
        }
        this.close(a, e)
      },
      init: function (e, t) {
        var n,
          a = this,
          i = e || {},
          o = document.getElementById('pp_model_dialog'),
          s = this.sortObj(i)
        if (o) {
          var r = this.getByClass(o, 'pp_model_dmain'),
            c = this.getByClass(o, 'pp_model_dbody')
          r.removeChild(c)
          var l = document.createDocumentFragment()
          ;(n = o),
            l.appendChild(
              this.createDom(s, i, n, function (e) {
                t && t(e)
              })
            ),
            o.classList.add('active'),
            r.appendChild(l)
        } else {
          var u = document.createDocumentFragment(),
            d = 0,
            m = []
          while (d < 2) (m[d] = document.createElement('div')), d > 0 && m[d - 1].appendChild(m[d]), d++
          ;(m[0].id = 'pp_model_dialog'),
            (m[0].className = i.class ? 'pp_model_dialog active '.concat(i.class) : 'pp_model_dialog active'),
            (m[1].className = 'pp_model_dmain'),
            (n = m[0]),
            m[1].appendChild(
              this.createDom(s, i, n, function (e) {
                t && t(e)
              })
            )
          var p = document.createElement('div')
          ;(p.className = 'pp_model_dcover'),
            (p.id = 'pp_model_dcover'),
            m[1].appendChild(p),
            u.appendChild(m[0]),
            document.getElementsByTagName('body')[0].appendChild(u)
        }
        var g = document.getElementById('pp_model_dcover')
        ;(g.onclick = null),
          (g.onclick = function () {
            ;('boolean' !== typeof i.cover || i.cover) && (a.close(n), t && t('cover'))
          }),
          i.timeOut && this.close(n, i.timeOut)
      },
      sortObj: function (e) {
        var t = {}
        return (
          e.icon && (t.icon = e.icon), e.title && (t.title = e.title), e.html && (t.html = e.html), e.btn && (t.btn = e.btn), t
        )
      },
      getByClass: function (e, t) {
        for (var n = e.getElementsByTagName('*'), a = [], i = 0; i < n.length; i++) n[i].className === t && a.push(n[i])
        return a[0]
      },
      createDom: function (e, t, n, a) {
        var i = this,
          o = document.createElement('div')
        ;(o.className = 'pp_model_dbody'), (o.style = t.style || '')
        var s = {}
        for (let r in e)
          if ('btn' === r) {
            var c = e.btn || {},
              l = document.createElement('div')
            l.className = 'pp_model_db'.concat(r)
            var u = function (e) {
              var t = document.createElement('div')
              ;(t.className = e),
                t.addEventListener('click', function (t) {
                  i.close(n), a(e)
                }),
                (t.innerHTML = '<span>'.concat(c[e], '</span>')),
                l.appendChild(t)
            }
            for (var d in c) u(d)
            o.appendChild(l)
          } else if ('icon' === r) {
            var m = document.createElement('div')
            ;(m.className = 'pp_model_db'.concat(r, ' ').concat(e[r])),
              (m.innerHTML = '<span class=br_dialog_d'.concat(e[r], '></span>')),
              o.appendChild(m)
          } else
            'class' !== r &&
              ((s[r] = document.createElement('div')),
              (s[r].className = 'pp_model_db'.concat(r)),
              (s[r].innerHTML = e[r]),
              o.appendChild(s[r]))
        return o
      },
      close: function (e, t) {
        'number' === typeof t
          ? (e.classList.add('active'),
            setTimeout(function () {
              e.classList.remove('active')
            }, t))
          : t
          ? e.classList.add('active')
          : e.classList.remove('active')
      }
    }
    window.cover = Ki,
    o.Ay.prototype.cover = Ki
    var Xi = {}
    function $i() {
    var e = Fe().parse(window.location.search, {
        ignoreQueryPrefix: !0
      }),
      t = (null === e || void 0 === e ? void 0 : e.token) || window.sessionStorage.getItem('token')
    t &&
      Store.dispatch('loginInfo', {
        token: t
      })
  }
  var eo = n(17318),
    to = n(72662),
    no = n.n(to),
    ao = n(27567),
    io = n.n(ao),
    oo = n(95681),
    so = n.n(oo),
    ro = n(24276),
    co = n.n(ro),
    lo = n(96375),
    uo = n.n(lo)

  // maintain
  // regiona
  //
  //
  // NOTE: ;
  o.Ay.component('svg-icon', SvgIcon)
  var Po = function (e) {
      return e.keys().map(e)
    },
    ko = n(30279)
  Po(ko)
  var Mo = n.p + 'img/img-loading.cf8e36f5.gif'
  u.wG.loadACMC(Store),
    (o.Ay.config.productionTip = !1),
    (window.$i18n = Aa.A),
    o.Ay.component('paginate', uo()),
    o.Ay.use(no(), {
      dynamic: !0
    }),
    o.Ay.use(ne.Ay),
    o.Ay.use(io()),
    o.Ay.use(so()),
    o.Ay.use(co()),
    o.Ay.use(u.ZR, {
      router: aiVueRouter,
      store: Store,
      i18n: Aa.A
    })
    var xo = function() {
    o.Ay.use(eo.Ay, {
      error: ''.concat(Store.state.Public.imgUrl, '/TCG_GAME_ICONS/default.png'),
      loading: Mo,
      attempt: 1,
      lazyComponent: !0,
      observer: !0,
      listenEvents: ['scroll'],
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    })
  }

  function Lo() {
    return So.apply(this, arguments)
  }
  function So() {
    return (
      (So = (0, i.A)(
        (0, a.A)().mark(function e() {
          var t
          return (0, a.A)().wrap(function (e) {
            while (1)
              switch ((e.prev = e.next)) {
                case 0:
                  return (e.next = 2), Store.dispatch('getPermission')
                case 2:
                  return (
                    (t = e.sent),
                    u.ga.loadAnalytics(t.info.analytics),
                    xo(),
                    e.abrupt(
                      'return',
                      new o.Ay({
                        el: '#app',
                        router: aiVueRouter,
                        store: Store,
                        popup: Xi,
                        i18n: Aa.A,
                        render: function (e) {
                          var t = Store.state.Login.systemStatus
                          return 0 === t ? ($i(), e(AppVueComponent)) : 1 === t ? e(maintain) : 2 === t ? e(regiona) : null
                        }
                      })
                    )
                  )
                case 6:
                case 'end':
                  return e.stop()
              }
          }, e)
        })
      )),
      So.apply(this, arguments)
    )
  }
  Lo(), (window.shellAPI.helpCenterUrl = '/helpmc')
}
