, aa = []


, SimpleSelectRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "simple-select"
  }, [t("div", {
      ref: "selectInput",
      staticClass: "select-input",
      on: {
          click: e.toggleOptions
      }
  }, [t("div", {
      staticClass: "selected-option"
  }, [e._t("selected")], 2), t("i", {
      staticClass: "arrow-icon",
      class: {
          up: e.showOptions,
          down: !e.showOptions
      }
  }, [e._t("arrow", (function() {
      return [t("svg-icon", {
          attrs: {
              className: "arrow-down",
              iconClass: "arrow-down"
          }
      })]
  }
  ))], 2)]), t("transition", {
      attrs: {
          name: e.dropAnimationName
      }
  }, [t("div", {
      directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showOptions,
          expression: "showOptions"
      }],
      staticClass: "select-options"
  }, [e._t("default")], 2)])], 1)
}
, SimpleSelectProps = {
  name: "simpleSelect",
  props: {
      dropAnimationName: {
          type: String,
          default: "zoom-in-top"
      }
  },
  data: function() {
      return {
          showOptions: !1
      }
  },
  methods: {
      toggleOptions: function() {
          this.showOptions = !this.showOptions,
          this.showOptions ? document.addEventListener("click", this.closeOptions) : document.removeEventListener("click", this.closeOptions)
      },
      closeOptions: function(e) {
          this.$refs.selectInput.contains(e.target) || (this.showOptions = !1,
          document.removeEventListener("click", this.closeOptions))
      }
  }
}
, SimpleSelect = (0, _.A)(SimpleSelectProps, SimpleSelectRender, [], !1, null, null, null)


, SimpleOptionRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      class: ["select-option", e.className],
      on: {
          click: e.selectOption
      }
  }, [e._t("default")], 2)
}
, SimpleOptionProps = {
  name: "simpleOption",
  props: {
      option: {
          type: [String, Number, Object],
          required: !0
      },
      className: {
          type: String,
          default: ""
      }
  },
  methods: {
      selectOption: function() {
          this.$emit("option-selected", this.option)
      }
  }
}
, SimpleOption = (0, _.A)(SimpleOptionProps, SimpleOptionRender, [], !1, null, null, null)




, LanguageSelectRender = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "language-select"
  }, [t("SimpleSelect", {
      attrs: {
          dropAnimationName: "zoom-in-bottom"
      }
  }, [t("template", {
      slot: "selected"
  }, [t("div", {
      staticClass: "language-selected"
  }, [t("NationFlag", {
      attrs: {
          type: "2",
          lang: e.currentLanguage
      }
  }), t("span", {
      staticClass: "selected-name"
  }, [e._v(e._s(e.$t(e.currentLanguage)))])], 1)]), t("template", {
      slot: "arrow"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "common-arrow"
      }
  })], 1), e._l(e.languages, (function(n, a) {
      return [t("SimpleOption", {
          key: "lang_".concat(a),
          attrs: {
              className: n === e.currentLanguage ? "selected" : "",
              option: n
          },
          on: {
              "option-selected": e.selectLanguage
          }
      }, [t("NationFlag", {
          attrs: {
              type: "2",
              lang: n
          }
      }), t("span", [e._v(e._s(e.$t(n)))])], 1)]
  }
  ))], 2)], 1)
}
, LanguageSelectProps = {
  components: {
      NationFlag: u.io,
      SimpleSelect: da,
      SimpleOption: ha
  },
  setup: function() {
      var e = U.A.supportLanguages
        , t = (0,
      h.ok)()
        , n = t.currentLanguage
        , a = t.changeLanguageTo
        , i = function(e) {
          a(e)
      };
      return {
          languages: e,
          currentLanguage: n,
          selectLanguage: i
      }
  }
}
, LanguageSelect = (0, _.A)(LanguageSelectProps, LanguageSelectRender, [], !1, null, null, null)