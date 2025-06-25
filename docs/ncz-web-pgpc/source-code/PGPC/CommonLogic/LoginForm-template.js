function login() {
  let e = this,
    t = e._self._c
  return t(
    'div',
    {
      staticClass: 'form_container'
    },
    [
      t(
        'form',
        {
          key: e.loginType,
          staticClass: 'login-form',
          attrs: {
            autocomplete: 'off',
            'data-vv-scope': 'login-form'
          },
          on: {
            submit: function (t) {
              return t.preventDefault(), e.handleLogin.apply(null, arguments)
            }
          }
        },
        [
          'username' === e.loginType
            ? [
                t(
                  'div',
                  {
                    staticClass: 'form_item'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'label-box'
                      },
                      [
                        t(
                          'p',
                          {
                            staticClass: 'label-text'
                          },
                          [e._v(e._s(e.$t('in_increase_username')))]
                        ),
                        t(
                          'p',
                          {
                            staticClass: 'errorMsg'
                          },
                          [e._v(e._s(e.errors.first('login-form.username')))]
                        )
                      ]
                    ),
                    t(
                      'div',
                      {
                        staticClass: 'item_box user hasIcon'
                      },
                      [
                        t(
                          'span',
                          {
                            staticClass: 'input_icon'
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'form-icon-name'
                              }
                            })
                          ],
                          1
                        ),
                        t('input', {
                          directives: [
                            {
                              name: 'model',
                              rawName: 'v-model.trim',
                              value: e.username,
                              expression: 'username',
                              modifiers: {
                                trim: !0
                              }
                            },
                            {
                              name: 'validate',
                              rawName: 'v-validate',
                              value: {
                                required: !0
                              },
                              expression: '{ required: true }'
                            }
                          ],
                          staticClass: 'username_input',
                          class: [
                            {
                              err: e.errors.first('login-form.username')
                            }
                          ],
                          attrs: {
                            placeholder: e.$t('in_increase_username'),
                            type: 'text',
                            name: 'username'
                          },
                          domProps: {
                            value: e.username
                          },
                          on: {
                            input: function (t) {
                              t.target.composing || (e.username = t.target.value.trim())
                            },
                            blur: function (t) {
                              return e.$forceUpdate()
                            }
                          }
                        })
                      ]
                    ),
                    t(
                      'p',
                      {
                        staticClass: 'errorMsg',
                        class: {
                          showIcon: e.errors.first('login-form.username')
                        }
                      },
                      [e._v(' ' + e._s(e.errors.first('login-form.username')) + ' ')]
                    )
                  ]
                ),
                t(
                  'div',
                  {
                    staticClass: 'form_item password'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'label-box'
                      },
                      [
                        t(
                          'p',
                          {
                            staticClass: 'label-text'
                          },
                          [e._v(e._s(e.$t('in_increase_password')))]
                        ),
                        t(
                          'p',
                          {
                            staticClass: 'errorMsg'
                          },
                          [e._v(e._s(e.errors.first('login-form.password')))]
                        )
                      ]
                    ),
                    t(
                      'div',
                      {
                        staticClass: 'item_box pass hasIcon'
                      },
                      [
                        t(
                          'span',
                          {
                            staticClass: 'input_icon'
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'form-icon-password'
                              }
                            })
                          ],
                          1
                        ),
                        t('input', {
                          directives: [
                            {
                              name: 'model',
                              rawName: 'v-model.trim',
                              value: e.password,
                              expression: 'password',
                              modifiers: {
                                trim: !0
                              }
                            },
                            {
                              name: 'validate',
                              rawName: 'v-validate',
                              value: {
                                required: !0
                              },
                              expression: '{ required: true }'
                            }
                          ],
                          staticClass: 'password_input',
                          class: [
                            {
                              err: e.errors.first('login-form.password')
                            }
                          ],
                          attrs: {
                            placeholder: e.$t('in_increase_password'),
                            type: e.showPassword ? 'text' : 'password',
                            name: 'password'
                          },
                          domProps: {
                            value: e.password
                          },
                          on: {
                            input: function (t) {
                              t.target.composing || (e.password = t.target.value.trim())
                            },
                            blur: function (t) {
                              return e.$forceUpdate()
                            }
                          }
                        }),
                        e.isHeaderLogin
                          ? t(
                              'span',
                              {
                                staticClass: 'forget header-forget',
                                on: {
                                  click: e.forgetPassword
                                }
                              },
                              [
                                t('svg-icon', {
                                  attrs: {
                                    iconClass: 'header-forget'
                                  }
                                })
                              ],
                              1
                            )
                          : t(
                              'span',
                              {
                                staticClass: 'password-eyes',
                                on: {
                                  click: function (t) {
                                    e.showPassword = !e.showPassword
                                  }
                                }
                              },
                              [
                                t('svg-icon', {
                                  attrs: {
                                    iconClass: e.showPassword ? 'show-eyes-default' : 'hide-eyes-default'
                                  }
                                })
                              ],
                              1
                            )
                      ]
                    ),
                    t(
                      'p',
                      {
                        staticClass: 'errorMsg',
                        class: {
                          showIcon: e.errors.first('login-form.password')
                        }
                      },
                      [e._v(' ' + e._s(e.errors.first('login-form.password')) + ' ')]
                    )
                  ]
                ),
                e.showCaptcha
                  ? t(
                      'div',
                      {
                        staticClass: 'form_item'
                      },
                      [
                        t(
                          'div',
                          {
                            staticClass: 'label-box'
                          },
                          [
                            t(
                              'p',
                              {
                                staticClass: 'label-text'
                              },
                              [e._v(e._s(e.$t('in_increase_captcha')))]
                            ),
                            t(
                              'p',
                              {
                                staticClass: 'errorMsg'
                              },
                              [e._v(e._s(e.errors.first('login-form.captcha')))]
                            )
                          ]
                        ),
                        t(
                          'div',
                          {
                            staticClass: 'item_box capt hasIcon'
                          },
                          [
                            t(
                              'span',
                              {
                                staticClass: 'input_icon'
                              },
                              [
                                t('svg-icon', {
                                  attrs: {
                                    iconClass: 'login-modal-capt'
                                  }
                                })
                              ],
                              1
                            ),
                            t('input', {
                              directives: [
                                {
                                  name: 'model',
                                  rawName: 'v-model.trim',
                                  value: e.captcha,
                                  expression: 'captcha',
                                  modifiers: {
                                    trim: !0
                                  }
                                },
                                {
                                  name: 'validate',
                                  rawName: 'v-validate',
                                  value: {
                                    required: !0
                                  },
                                  expression: '{ required: true }'
                                }
                              ],
                              staticClass: 'captcha_input',
                              class: [
                                {
                                  err: e.errors.first('login-form.captcha')
                                }
                              ],
                              attrs: {
                                placeholder: e.$t('in_increase_captcha'),
                                type: 'text',
                                name: 'captcha'
                              },
                              domProps: {
                                value: e.captcha
                              },
                              on: {
                                input: function (t) {
                                  t.target.composing || (e.captcha = t.target.value.trim())
                                },
                                blur: function (t) {
                                  return e.$forceUpdate()
                                }
                              }
                            }),
                            t(
                              'div',
                              {
                                staticClass: 'captcha_box',
                                on: {
                                  click: e.changeCaptcha
                                }
                              },
                              [
                                t('img', {
                                  attrs: {
                                    src: e.captchaSrc,
                                    alt: ''
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        t(
                          'p',
                          {
                            staticClass: 'errorMsg',
                            class: {
                              showIcon: e.errors.first('login-form.captcha')
                            }
                          },
                          [e._v(' ' + e._s(e.errors.first('login-form.captcha')) + ' ')]
                        )
                      ]
                    )
                  : e._e()
              ]
            : e._e(),
          'sms' === e.loginType
            ? [
                t(
                  'div',
                  {
                    staticClass: 'form_item'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'label-box'
                      },
                      [
                        t(
                          'p',
                          {
                            staticClass: 'label-text'
                          },
                          [e._v(e._s(e.$t('in_increase_mobileNum')))]
                        ),
                        t(
                          'p',
                          {
                            staticClass: 'errorMsg'
                          },
                          [e._v(e._s(e.errors.first('login-form.mobileNum')))]
                        )
                      ]
                    ),
                    t(
                      'div',
                      {
                        staticClass: 'item_box country',
                        class: {
                          hasCountry: e.showLoginCountryCode
                        }
                      },
                      [
                        e.showLoginCountryCode
                          ? t('country-code', {
                              attrs: {
                                initDialingCode: e.initDialingCode
                              },
                              on: {
                                setCountryCode: e.setCountryCode
                              }
                            })
                          : e._e(),
                        t(
                          'span',
                          {
                            staticClass: 'input_icon'
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'form-icon-phone'
                              }
                            })
                          ],
                          1
                        ),
                        t('input', {
                          directives: [
                            {
                              name: 'model',
                              rawName: 'v-model.trim',
                              value: e.mobileNum,
                              expression: 'mobileNum',
                              modifiers: {
                                trim: !0
                              }
                            },
                            {
                              name: 'validate',
                              rawName: 'v-validate',
                              value: {
                                required: !0,
                                mobileNum: !0
                              },
                              expression: '{ required: true, mobileNum: true }'
                            }
                          ],
                          staticClass: 'password_input',
                          class: [
                            {
                              err: e.errors.first('login-form.mobileNum')
                            }
                          ],
                          attrs: {
                            autocomplete: 'off',
                            placeholder: e.$t('in_increase_mobileNum'),
                            type: 'text',
                            name: 'mobileNum'
                          },
                          domProps: {
                            value: e.mobileNum
                          },
                          on: {
                            input: function (t) {
                              t.target.composing || (e.mobileNum = t.target.value.trim())
                            },
                            blur: function (t) {
                              return e.$forceUpdate()
                            }
                          }
                        })
                      ],
                      1
                    ),
                    t(
                      'p',
                      {
                        staticClass: 'errorMsg',
                        class: {
                          showIcon: e.errors.first('login-form.mobileNum')
                        }
                      },
                      [e._v(' ' + e._s(e.errors.first('login-form.mobileNum')) + ' ')]
                    )
                  ]
                ),
                t(
                  'div',
                  {
                    staticClass: 'form_item'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'label-box'
                      },
                      [
                        t(
                          'p',
                          {
                            staticClass: 'label-text'
                          },
                          [e._v(e._s(e.$t('in_increase_verificationCode')))]
                        ),
                        t(
                          'p',
                          {
                            staticClass: 'errorMsg'
                          },
                          [e._v(e._s(e.errors.first('login-form.sms')))]
                        )
                      ]
                    ),
                    t(
                      'div',
                      {
                        staticClass: 'item_box capt hasIcon'
                      },
                      [
                        t(
                          'span',
                          {
                            staticClass: 'input_icon'
                          },
                          [
                            t('svg-icon', {
                              attrs: {
                                iconClass: 'form-icon-sms'
                              }
                            })
                          ],
                          1
                        ),
                        t('input', {
                          directives: [
                            {
                              name: 'model',
                              rawName: 'v-model',
                              value: e.verificationCode,
                              expression: 'verificationCode'
                            },
                            {
                              name: 'validate',
                              rawName: 'v-validate',
                              value: {
                                required: !0
                              },
                              expression: '{ required: true }'
                            }
                          ],
                          staticClass: 'captcha_input',
                          class: [
                            {
                              err: e.errors.first('login-form.sms')
                            }
                          ],
                          attrs: {
                            type: 'text',
                            name: 'sms',
                            autocomplete: 'off',
                            placeholder: e.$t('in_increase_verificationCode')
                          },
                          domProps: {
                            value: e.verificationCode
                          },
                          on: {
                            input: function (t) {
                              t.target.composing || (e.verificationCode = t.target.value)
                            }
                          }
                        }),
                        e.canSendSms
                          ? t(
                              'div',
                              {
                                staticClass: 'sms-btn',
                                on: {
                                  click: e.getSms
                                }
                              },
                              [e._v(' ' + e._s(e.$t('in_get_verificationCode')) + ' ')]
                            )
                          : t(
                              'div',
                              {
                                staticClass: 'sms-btn disabled'
                              },
                              [e._v(e._s(''.concat(e.countdown, 's')))]
                            )
                      ]
                    ),
                    t(
                      'p',
                      {
                        staticClass: 'errorMsg',
                        class: {
                          showIcon: e.errors.first('login-form.sms')
                        }
                      },
                      [e._v(' ' + e._s(e.errors.first('login-form.sms')) + ' ')]
                    )
                  ]
                )
              ]
            : e._e(),
          e.agentPage
            ? e._e()
            : t(
                'div',
                {
                  staticClass: 'form_item rem-wrap'
                },
                [
                  t(
                    'div',
                    {
                      staticClass: 'remember-item'
                    },
                    [
                      t(
                        'div',
                        {
                          staticClass: 'remPass_box',
                          class: {
                            checked: e.rememberUserPass
                          }
                        },
                        [
                          t('input', {
                            directives: [
                              {
                                name: 'model',
                                rawName: 'v-model',
                                value: e.rememberUserPass,
                                expression: 'rememberUserPass'
                              }
                            ],
                            staticClass: 'remPass_checkbox',
                            attrs: {
                              type: 'checkbox'
                            },
                            domProps: {
                              checked: Array.isArray(e.rememberUserPass)
                                ? e._i(e.rememberUserPass, null) > -1
                                : e.rememberUserPass
                            },
                            on: {
                              change: function (t) {
                                let n = e.rememberUserPass,
                                  a = t.target,
                                  i = !!a.checked
                                if (Array.isArray(n)) {
                                  let o = null,
                                    s = e._i(n, o)
                                  a.checked
                                    ? s < 0 && (e.rememberUserPass = n.concat([o]))
                                    : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
                                } else e.rememberUserPass = i
                              }
                            }
                          }),
                          t('span', {
                            staticClass: 'cheched-bg'
                          }),
                          t('span', {
                            staticClass: 'gougou'
                          })
                        ]
                      ),
                      t(
                        'span',
                        {
                          staticClass: 'jzmm'
                        },
                        [e._v(e._s(e.$t('in_remember_password')))]
                      )
                    ]
                  ),
                  t(
                    'span',
                    {
                      staticClass: 'forget',
                      on: {
                        click: e.forgetPassword
                      }
                    },
                    [e._v(e._s(e.$t('in_forget_password')))]
                  )
                ]
              ),
          e.isHeaderLogin
            ? [
                t(
                  'div',
                  {
                    staticClass: 'form_item btn-wrap'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'submit_btn',
                        class: {
                          firebase: e.firebase
                        }
                      },
                      [
                        t(
                          'button',
                          {
                            staticClass: 'form-btn',
                            attrs: {
                              type: 'submit'
                            }
                          },
                          [e._v(e._s(e.$t('hd_login_button')))]
                        ),
                        e.firebase
                          ? t(
                              'div',
                              {
                                staticClass: 'fire-arrow'
                              },
                              [
                                t(
                                  'div',
                                  {
                                    staticClass: 'fire-drop'
                                  },
                                  [
                                    t(
                                      'span',
                                      {
                                        staticClass: 'or-connect'
                                      },
                                      [e._v(e._s(e.$t('local_login_way')))]
                                    ),
                                    t(
                                      'div',
                                      {
                                        staticClass: 'firebase-group'
                                      },
                                      [
                                        e.firebaseFacebook
                                          ? t(
                                              'span',
                                              {
                                                staticClass: 'item facebook',
                                                on: {
                                                  click: function (t) {
                                                    return e.loginByFirebaseDelegate('facebook')
                                                  }
                                                }
                                              },
                                              [
                                                t('svg-icon', {
                                                  attrs: {
                                                    iconClass: 'facebook-m'
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : e._e(),
                                        e.firebaseGoogle
                                          ? t(
                                              'span',
                                              {
                                                staticClass: 'item google',
                                                on: {
                                                  click: function (t) {
                                                    return e.loginByFirebaseDelegate('google')
                                                  }
                                                }
                                              },
                                              [
                                                t('svg-icon', {
                                                  attrs: {
                                                    iconClass: 'google-m'
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : e._e()
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          : e._e(),
                        e.firebase
                          ? t(
                              'div',
                              {
                                staticClass: 'fire-drop'
                              },
                              [
                                t(
                                  'span',
                                  {
                                    staticClass: 'or-connect'
                                  },
                                  [e._v(e._s(e.$t('local_login_way')))]
                                ),
                                t(
                                  'div',
                                  {
                                    staticClass: 'firebase-group'
                                  },
                                  [
                                    e.firebaseFacebook
                                      ? t(
                                          'span',
                                          {
                                            staticClass: 'item facebook',
                                            on: {
                                              click: function (t) {
                                                return e.loginByFirebaseDelegate('facebook')
                                              }
                                            }
                                          },
                                          [
                                            t('svg-icon', {
                                              attrs: {
                                                iconClass: 'facebook-m'
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      : e._e(),
                                    e.firebaseGoogle
                                      ? t(
                                          'span',
                                          {
                                            staticClass: 'item google',
                                            on: {
                                              click: function (t) {
                                                return e.loginByFirebaseDelegate('google')
                                              }
                                            }
                                          },
                                          [
                                            t('svg-icon', {
                                              attrs: {
                                                iconClass: 'google-m'
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      : e._e()
                                  ]
                                )
                              ]
                            )
                          : e._e()
                      ]
                    )
                  ]
                )
              ]
            : [
                t(
                  'div',
                  {
                    staticClass: 'form_item btn-wrap'
                  },
                  [
                    t(
                      'button',
                      {
                        staticClass: 'submit_btn hover',
                        attrs: {
                          type: 'submit'
                        }
                      },
                      [e._v(e._s(e.$t('hd_login_button')))]
                    )
                  ]
                ),
                !e.agentPage && e.firebase
                  ? t(
                      'div',
                      {
                        staticClass: 'firebase-login'
                      },
                      [
                        t(
                          'div',
                          {
                            staticClass: 'tips'
                          },
                          [
                            t(
                              'span',
                              {
                                staticClass: 'or-connect'
                              },
                              [e._v(e._s(e.$t('local_login_way')))]
                            )
                          ]
                        ),
                        t(
                          'div',
                          {
                            staticClass: 'firebase-group'
                          },
                          [
                            e.firebaseFacebook
                              ? t(
                                  'span',
                                  {
                                    staticClass: 'item facebook',
                                    on: {
                                      click: function (t) {
                                        return e.loginByFirebaseDelegate('facebook')
                                      }
                                    }
                                  },
                                  [
                                    t('svg-icon', {
                                      attrs: {
                                        iconClass: 'facebook-m'
                                      }
                                    })
                                  ],
                                  1
                                )
                              : e._e(),
                            e.firebaseGoogle
                              ? t(
                                  'span',
                                  {
                                    staticClass: 'item google',
                                    on: {
                                      click: function (t) {
                                        return e.loginByFirebaseDelegate('google')
                                      }
                                    }
                                  },
                                  [
                                    t('svg-icon', {
                                      attrs: {
                                        iconClass: 'google-m'
                                      }
                                    })
                                  ],
                                  1
                                )
                              : e._e()
                          ]
                        )
                      ]
                    )
                  : e._e(),
                t(
                  'div',
                  {
                    staticClass: 'form_item terms'
                  },
                  [
                    t(
                      'div',
                      {
                        staticClass: 'terms_box login'
                      },
                      [
                        t('input', {
                          directives: [
                            {
                              name: 'model',
                              rawName: 'v-model',
                              value: e.rememberUserPass,
                              expression: 'rememberUserPass'
                            }
                          ],
                          staticClass: 'terms_checkbox',
                          attrs: {
                            type: 'checkbox'
                          },
                          domProps: {
                            checked: Array.isArray(e.rememberUserPass) ? e._i(e.rememberUserPass, null) > -1 : e.rememberUserPass
                          },
                          on: {
                            change: function (t) {
                              let n = e.rememberUserPass
                              ;(a = t.target), (i = !!a.checked)
                              if (Array.isArray(n)) {
                                let o = null,
                                  s = e._i(n, o)
                                a.checked
                                  ? s < 0 && (e.rememberUserPass = n.concat([o]))
                                  : s > -1 && (e.rememberUserPass = n.slice(0, s).concat(n.slice(s + 1)))
                              } else e.rememberUserPass = i
                            }
                          }
                        }),
                        t('span', {
                          staticClass: 'cheched-bg'
                        }),
                        t('span', {
                          staticClass: 'gougou'
                        })
                      ]
                    ),
                    t('span', [
                      e._v(' ' + e._s(e.$t('local_terms_content')) + ' '),
                      t(
                        'span',
                        {
                          staticClass: 'link',
                          on: {
                            click: e.handleTermClick
                          }
                        },
                        [e._v(e._s(e.$t('local_terms_link')))]
                      )
                    ])
                  ]
                )
              ]
        ],
        2
      )
    ]
  )
}
