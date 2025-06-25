
, Zc = []
, NationFlagRender = function() {
var t = this
    , e = t._self._c;
return e("img", {
    staticClass: "flag-icon",
    attrs: {
        src: t.flagIcon,
        alt: t.lang
    }
})
}
, Jc = {
    CN: { code: "CN" },
    EN: { code: "US" },
    JA: { code: "JP" },
    TH: { code: "TH" },
    VI: { code: "VN" },
    MY: { code: "MM" },
    ES: { code: "MX" },
    HI: { code: "IN" },
    ID: { code: "ID" },
    KM: { code: "KH" },
    KO: { code: "KR" },
    KR: { code: "KR" },
    MS: { code: "MY" },
    PT: { code: "BR" },
    TA: { code: "IN" },
    TW: { code: "HK" },
    UR: { code: "PK" },
    TY: { code: "TLG" },
    PH: { code: "TLG" },
    TR: { code: "TR" },
    AR: { code: "CC" },
    "PT-BR": { code: "BR" },
    BN: { code: "BD" },
    UZ: { code: "UZ" },
    RU: { code: "RU" },
    FA: { code: "IR" },
    LO: { code: "LO" },
    NE: { code: "NP" },
    FR: { code: "FR" }
}
, NationFlagProps = {
props: {
    lang: {
        type: String,
        required: !0
    },
    countryCode: {
        type: String,
        required: !1
    },
    type: {
        type: String,
        required: !0,
        enum: ["1", "2"]
    }
},
computed: {
    flagIcon: function() {
        var t = "1" === this.type ? "RECT" : "CIRCLE";
        if (this.countryCode)
            return "".concat(this.$store.state.Public.imgUrl, "/TCG_PROD_IMAGES/COUNTRY_FLAG/").concat(t, "/").concat(this.countryCode, ".svg");
        var e = Jc[this.lang];
        return e ? "".concat(this.$store.state.Public.imgUrl, "/TCG_PROD_IMAGES/COUNTRY_FLAG/").concat(t, "/").concat(e.code, ".svg") : ""
    }
}
}
, NationFlag = (0, Ct.A)(NationFlagProps, NationFlagRender, [], !1, null, null, null)