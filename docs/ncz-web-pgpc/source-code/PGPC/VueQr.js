

// 
// 
// NOTE: 
, Aa = n(95167)
, ya = function() {
  var e = this
    , t = e._self._c;
  return e.bindElement ? t("div", {
      staticClass: "qr_img_wrap"
  }, [t("img", e._b({}, "img", {
      id: e.uuid
  }, !1))]) : e._e()
}
, Pa = [];
function ka(e) {
  return "" === e ? e : "true" === e || "1" == e
}
function Ma(e) {
  for (var t = "", n = "", a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], i = 0; i < e; i++)
      n = Math.round(Math.random() * (a.length - 1)),
      t += a[n];
  return t
}
var xa;
n(33771);
(function() {
  function e(e) {
      this.mode = n.MODE_8BIT_BYTE,
      this.data = e,
      this.parsedData = [];
      for (var t = 0, a = this.data.length; t < a; t++) {
          var i = []
            , o = this.data.charCodeAt(t);
          o > 65536 ? (i[0] = 240 | (1835008 & o) >>> 18,
          i[1] = 128 | (258048 & o) >>> 12,
          i[2] = 128 | (4032 & o) >>> 6,
          i[3] = 128 | 63 & o) : o > 2048 ? (i[0] = 224 | (61440 & o) >>> 12,
          i[1] = 128 | (4032 & o) >>> 6,
          i[2] = 128 | 63 & o) : o > 128 ? (i[0] = 192 | (1984 & o) >>> 6,
          i[1] = 128 | 63 & o) : i[0] = o,
          this.parsedData.push(i)
      }
      this.parsedData = Array.prototype.concat.apply([], this.parsedData),
      this.parsedData.length != this.data.length && (this.parsedData.unshift(191),
      this.parsedData.unshift(187),
      this.parsedData.unshift(239))
  }
  function t(e, t) {
      this.typeNumber = e,
      this.errorCorrectLevel = t,
      this.modules = null,
      this.moduleCount = 0,
      this.dataCache = null,
      this.dataList = []
  }
  e.prototype = {
      getLength: function(e) {
          return this.parsedData.length
      },
      write: function(e) {
          for (var t = 0, n = this.parsedData.length; t < n; t++)
              e.put(this.parsedData[t], 8)
      }
  },
  t.prototype = {
      addData: function(t) {
          var n = new e(t);
          this.dataList.push(n),
          this.dataCache = null
      },
      isDark: function(e, t) {
          if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t)
              throw new Error(e + "," + t);
          return this.modules[e][t]
      },
      getModuleCount: function() {
          return this.moduleCount
      },
      make: function() {
          if (this.typeNumber < 1) {
              var e = 1;
              for (e = 1; e < 40; e++) {
                  for (var t = l.getRSBlocks(e, this.errorCorrectLevel), n = new u, a = 0, i = 0; i < t.length; i++)
                      a += t[i].dataCount;
                  for (i = 0; i < this.dataList.length; i++) {
                      var s = this.dataList[i];
                      n.put(s.mode, 4),
                      n.put(s.getLength(), o.getLengthInBits(s.mode, e)),
                      s.write(n)
                  }
                  if (n.getLengthInBits() <= 8 * a)
                      break
              }
              this.typeNumber = e
          }
          this.makeImpl(!1, this.getBestMaskPattern())
      },
      makeImpl: function(e, n) {
          this.moduleCount = 4 * this.typeNumber + 17,
          this.modules = new Array(this.moduleCount);
          for (var a = 0; a < this.moduleCount; a++) {
              this.modules[a] = new Array(this.moduleCount);
              for (var i = 0; i < this.moduleCount; i++)
                  this.modules[a][i] = null
          }
          this.setupPositionProbePattern(0, 0),
          this.setupPositionProbePattern(this.moduleCount - 7, 0),
          this.setupPositionProbePattern(0, this.moduleCount - 7),
          this.setupPositionAdjustPattern(),
          this.setupTimingPattern(),
          this.setupTypeInfo(e, n),
          this.typeNumber >= 7 && this.setupTypeNumber(e),
          null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
          this.mapData(this.dataCache, n)
      },
      setupPositionProbePattern: function(e, t) {
          for (var n = -1; n <= 7; n++)
              if (!(e + n <= -1 || this.moduleCount <= e + n))
                  for (var a = -1; a <= 7; a++)
                      t + a <= -1 || this.moduleCount <= t + a || (this.modules[e + n][t + a] = 0 <= n && n <= 6 && (0 == a || 6 == a) || 0 <= a && a <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= a && a <= 4)
      },
      getBestMaskPattern: function() {
          for (var e = 0, t = 0, n = 0; n < 8; n++) {
              this.makeImpl(!0, n);
              var a = o.getLostPoint(this);
              (0 == n || e > a) && (e = a,
              t = n)
          }
          return t
      },
      createMovieClip: function(e, t, n) {
          var a = e.createEmptyMovieClip(t, n)
            , i = 1;
          this.make();
          for (var o = 0; o < this.modules.length; o++)
              for (var s = o * i, r = 0; r < this.modules[o].length; r++) {
                  var c = r * i
                    , l = this.modules[o][r];
                  l && (a.beginFill(0, 100),
                  a.moveTo(c, s),
                  a.lineTo(c + i, s),
                  a.lineTo(c + i, s + i),
                  a.lineTo(c, s + i),
                  a.endFill())
              }
          return a
      },
      setupTimingPattern: function() {
          for (var e = 8; e < this.moduleCount - 8; e++)
              null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
          for (var t = 8; t < this.moduleCount - 8; t++)
              null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0)
      },
      setupPositionAdjustPattern: function() {
          for (var e = o.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
              for (var n = 0; n < e.length; n++) {
                  var a = e[t]
                    , i = e[n];
                  if (null == this.modules[a][i])
                      for (var s = -2; s <= 2; s++)
                          for (var r = -2; r <= 2; r++)
                              this.modules[a + s][i + r] = -2 == s || 2 == s || -2 == r || 2 == r || 0 == s && 0 == r
              }
      },
      setupTypeNumber: function(e) {
          for (var t = o.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
              var a = !e && 1 == (t >> n & 1);
              this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = a
          }
          for (n = 0; n < 18; n++) {
              a = !e && 1 == (t >> n & 1);
              this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = a
          }
      },
      setupTypeInfo: function(e, t) {
          for (var n = this.errorCorrectLevel << 3 | t, a = o.getBCHTypeInfo(n), i = 0; i < 15; i++) {
              var s = !e && 1 == (a >> i & 1);
              i < 6 ? this.modules[i][8] = s : i < 8 ? this.modules[i + 1][8] = s : this.modules[this.moduleCount - 15 + i][8] = s
          }
          for (i = 0; i < 15; i++) {
              s = !e && 1 == (a >> i & 1);
              i < 8 ? this.modules[8][this.moduleCount - i - 1] = s : i < 9 ? this.modules[8][15 - i - 1 + 1] = s : this.modules[8][15 - i - 1] = s
          }
          this.modules[this.moduleCount - 8][8] = !e
      },
      mapData: function(e, t) {
          for (var n = -1, a = this.moduleCount - 1, i = 7, s = 0, r = this.moduleCount - 1; r > 0; r -= 2) {
              6 == r && r--;
              while (1) {
                  for (var c = 0; c < 2; c++)
                      if (null == this.modules[a][r - c]) {
                          var l = !1;
                          s < e.length && (l = 1 == (e[s] >>> i & 1));
                          var u = o.getMask(t, a, r - c);
                          u && (l = !l),
                          this.modules[a][r - c] = l,
                          i--,
                          -1 == i && (s++,
                          i = 7)
                      }
                  if (a += n,
                  a < 0 || this.moduleCount <= a) {
                      a -= n,
                      n = -n;
                      break
                  }
              }
          }
      }
  },
  t.PAD0 = 236,
  t.PAD1 = 17,
  t.createData = function(e, n, a) {
      for (var i = l.getRSBlocks(e, n), s = new u, r = 0; r < a.length; r++) {
          var c = a[r];
          s.put(c.mode, 4),
          s.put(c.getLength(), o.getLengthInBits(c.mode, e)),
          c.write(s)
      }
      var d = 0;
      for (r = 0; r < i.length; r++)
          d += i[r].dataCount;
      if (s.getLengthInBits() > 8 * d)
          throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * d + ")");
      s.getLengthInBits() + 4 <= 8 * d && s.put(0, 4);
      while (s.getLengthInBits() % 8 != 0)
          s.putBit(!1);
      while (1) {
          if (s.getLengthInBits() >= 8 * d)
              break;
          if (s.put(t.PAD0, 8),
          s.getLengthInBits() >= 8 * d)
              break;
          s.put(t.PAD1, 8)
      }
      return t.createBytes(s, i)
  }
  ,
  t.createBytes = function(e, t) {
      for (var n = 0, a = 0, i = 0, s = new Array(t.length), r = new Array(t.length), l = 0; l < t.length; l++) {
          var u = t[l].dataCount
            , d = t[l].totalCount - u;
          a = Math.max(a, u),
          i = Math.max(i, d),
          s[l] = new Array(u);
          for (var m = 0; m < s[l].length; m++)
              s[l][m] = 255 & e.buffer[m + n];
          n += u;
          var p = o.getErrorCorrectPolynomial(d)
            , g = new c(s[l],p.getLength() - 1)
            , f = g.mod(p);
          r[l] = new Array(p.getLength() - 1);
          for (m = 0; m < r[l].length; m++) {
              var v = m + f.getLength() - r[l].length;
              r[l][m] = v >= 0 ? f.get(v) : 0
          }
      }
      var h = 0;
      for (m = 0; m < t.length; m++)
          h += t[m].totalCount;
      var w = new Array(h)
        , C = 0;
      for (m = 0; m < a; m++)
          for (l = 0; l < t.length; l++)
              m < s[l].length && (w[C++] = s[l][m]);
      for (m = 0; m < i; m++)
          for (l = 0; l < t.length; l++)
              m < r[l].length && (w[C++] = r[l][m]);
      return w
  }
  ;
  for (var n = {
      MODE_NUMBER: 1,
      MODE_ALPHA_NUM: 2,
      MODE_8BIT_BYTE: 4,
      MODE_KANJI: 8
  }, a = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
  }, i = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
  }, o = {
      PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
      G15: 1335,
      G18: 7973,
      G15_MASK: 21522,
      getBCHTypeInfo: function(e) {
          var t = e << 10;
          while (o.getBCHDigit(t) - o.getBCHDigit(o.G15) >= 0)
              t ^= o.G15 << o.getBCHDigit(t) - o.getBCHDigit(o.G15);
          return (e << 10 | t) ^ o.G15_MASK
      },
      getBCHTypeNumber: function(e) {
          var t = e << 12;
          while (o.getBCHDigit(t) - o.getBCHDigit(o.G18) >= 0)
              t ^= o.G18 << o.getBCHDigit(t) - o.getBCHDigit(o.G18);
          return e << 12 | t
      },
      getBCHDigit: function(e) {
          var t = 0;
          while (0 != e)
              t++,
              e >>>= 1;
          return t
      },
      getPatternPosition: function(e) {
          return o.PATTERN_POSITION_TABLE[e - 1]
      },
      getMask: function(e, t, n) {
          switch (e) {
          case i.PATTERN000:
              return (t + n) % 2 == 0;
          case i.PATTERN001:
              return t % 2 == 0;
          case i.PATTERN010:
              return n % 3 == 0;
          case i.PATTERN011:
              return (t + n) % 3 == 0;
          case i.PATTERN100:
              return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
          case i.PATTERN101:
              return t * n % 2 + t * n % 3 == 0;
          case i.PATTERN110:
              return (t * n % 2 + t * n % 3) % 2 == 0;
          case i.PATTERN111:
              return (t * n % 3 + (t + n) % 2) % 2 == 0;
          default:
              throw new Error("bad maskPattern:" + e)
          }
      },
      getErrorCorrectPolynomial: function(e) {
          for (var t = new c([1],0), n = 0; n < e; n++)
              t = t.multiply(new c([1, s.gexp(n)],0));
          return t
      },
      getLengthInBits: function(e, t) {
          if (1 <= t && t < 10)
              switch (e) {
              case n.MODE_NUMBER:
                  return 10;
              case n.MODE_ALPHA_NUM:
                  return 9;
              case n.MODE_8BIT_BYTE:
                  return 8;
              case n.MODE_KANJI:
                  return 8;
              default:
                  throw new Error("mode:" + e)
              }
          else if (t < 27)
              switch (e) {
              case n.MODE_NUMBER:
                  return 12;
              case n.MODE_ALPHA_NUM:
                  return 11;
              case n.MODE_8BIT_BYTE:
                  return 16;
              case n.MODE_KANJI:
                  return 10;
              default:
                  throw new Error("mode:" + e)
              }
          else {
              if (!(t < 41))
                  throw new Error("type:" + t);
              switch (e) {
              case n.MODE_NUMBER:
                  return 14;
              case n.MODE_ALPHA_NUM:
                  return 13;
              case n.MODE_8BIT_BYTE:
                  return 16;
              case n.MODE_KANJI:
                  return 12;
              default:
                  throw new Error("mode:" + e)
              }
          }
      },
      getLostPoint: function(e) {
          for (var t = e.getModuleCount(), n = 0, a = 0; a < t; a++)
              for (var i = 0; i < t; i++) {
                  for (var o = 0, s = e.isDark(a, i), r = -1; r <= 1; r++)
                      if (!(a + r < 0 || t <= a + r))
                          for (var c = -1; c <= 1; c++)
                              i + c < 0 || t <= i + c || 0 == r && 0 == c || s == e.isDark(a + r, i + c) && o++;
                  o > 5 && (n += 3 + o - 5)
              }
          for (a = 0; a < t - 1; a++)
              for (i = 0; i < t - 1; i++) {
                  var l = 0;
                  e.isDark(a, i) && l++,
                  e.isDark(a + 1, i) && l++,
                  e.isDark(a, i + 1) && l++,
                  e.isDark(a + 1, i + 1) && l++,
                  0 != l && 4 != l || (n += 3)
              }
          for (a = 0; a < t; a++)
              for (i = 0; i < t - 6; i++)
                  e.isDark(a, i) && !e.isDark(a, i + 1) && e.isDark(a, i + 2) && e.isDark(a, i + 3) && e.isDark(a, i + 4) && !e.isDark(a, i + 5) && e.isDark(a, i + 6) && (n += 40);
          for (i = 0; i < t; i++)
              for (a = 0; a < t - 6; a++)
                  e.isDark(a, i) && !e.isDark(a + 1, i) && e.isDark(a + 2, i) && e.isDark(a + 3, i) && e.isDark(a + 4, i) && !e.isDark(a + 5, i) && e.isDark(a + 6, i) && (n += 40);
          var u = 0;
          for (i = 0; i < t; i++)
              for (a = 0; a < t; a++)
                  e.isDark(a, i) && u++;
          var d = Math.abs(100 * u / t / t - 50) / 5;
          return n += 10 * d,
          n
      }
  }, s = {
      glog: function(e) {
          if (e < 1)
              throw new Error("glog(" + e + ")");
          return s.LOG_TABLE[e]
      },
      gexp: function(e) {
          while (e < 0)
              e += 255;
          while (e >= 256)
              e -= 255;
          return s.EXP_TABLE[e]
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
  }, r = 0; r < 8; r++)
      s.EXP_TABLE[r] = 1 << r;
  for (r = 8; r < 256; r++)
      s.EXP_TABLE[r] = s.EXP_TABLE[r - 4] ^ s.EXP_TABLE[r - 5] ^ s.EXP_TABLE[r - 6] ^ s.EXP_TABLE[r - 8];
  for (r = 0; r < 255; r++)
      s.LOG_TABLE[s.EXP_TABLE[r]] = r;
  function c(e, t) {
      if (void 0 == e.length)
          throw new Error(e.length + "/" + t);
      var n = 0;
      while (n < e.length && 0 == e[n])
          n++;
      this.num = new Array(e.length - n + t);
      for (var a = 0; a < e.length - n; a++)
          this.num[a] = e[a + n]
  }
  function l(e, t) {
      this.totalCount = e,
      this.dataCount = t
  }
  function u() {
      this.buffer = [],
      this.length = 0
  }
  c.prototype = {
      get: function(e) {
          return this.num[e]
      },
      getLength: function() {
          return this.num.length
      },
      multiply: function(e) {
          for (var t = new Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++)
              for (var a = 0; a < e.getLength(); a++)
                  t[n + a] ^= s.gexp(s.glog(this.get(n)) + s.glog(e.get(a)));
          return new c(t,0)
      },
      mod: function(e) {
          if (this.getLength() - e.getLength() < 0)
              return this;
          for (var t = s.glog(this.get(0)) - s.glog(e.get(0)), n = new Array(this.getLength()), a = 0; a < this.getLength(); a++)
              n[a] = this.get(a);
          for (a = 0; a < e.getLength(); a++)
              n[a] ^= s.gexp(s.glog(e.get(a)) + t);
          return new c(n,0).mod(e)
      }
  },
  l.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
  l.getRSBlocks = function(e, t) {
      var n = l.getRsBlockTable(e, t);
      if (void 0 == n)
          throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
      for (var a = n.length / 3, i = [], o = 0; o < a; o++)
          for (var s = n[3 * o + 0], r = n[3 * o + 1], c = n[3 * o + 2], u = 0; u < s; u++)
              i.push(new l(r,c));
      return i
  }
  ,
  l.getRsBlockTable = function(e, t) {
      switch (t) {
      case a.L:
          return l.RS_BLOCK_TABLE[4 * (e - 1) + 0];
      case a.M:
          return l.RS_BLOCK_TABLE[4 * (e - 1) + 1];
      case a.Q:
          return l.RS_BLOCK_TABLE[4 * (e - 1) + 2];
      case a.H:
          return l.RS_BLOCK_TABLE[4 * (e - 1) + 3];
      default:
          return
      }
  }
  ,
  u.prototype = {
      get: function(e) {
          var t = Math.floor(e / 8);
          return 1 == (this.buffer[t] >>> 7 - e % 8 & 1)
      },
      put: function(e, t) {
          for (var n = 0; n < t; n++)
              this.putBit(1 == (e >>> t - n - 1 & 1))
      },
      getLengthInBits: function() {
          return this.length
      },
      putBit: function(e) {
          var t = Math.floor(this.length / 8);
          this.buffer.length <= t && this.buffer.push(0),
          e && (this.buffer[t] |= 128 >>> this.length % 8),
          this.length++
      }
  };
  function d() {
      return "undefined" != typeof CanvasRenderingContext2D
  }
  var m = d() ? function() {
      function e() {
          this._elImage.src = this._elCanvas.toDataURL("image/png"),
          this._elImage.style.display = "block",
          this._elCanvas.style.display = "none"
      }
      function t(e, t) {
          var n = this;
          if (n._fFail = t,
          n._fSuccess = e,
          null === n._bSupportDataURI) {
              var a = document.createElement("img")
                , i = function() {
                  n._bSupportDataURI = !1,
                  n._fFail && n._fFail.call(n)
              }
                , o = function() {
                  n._bSupportDataURI = !0,
                  n._fSuccess && n._fSuccess.call(n)
              };
              return a.onabort = i,
              a.onerror = i,
              a.onload = o,
              void (a.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
          }
          !0 === n._bSupportDataURI && n._fSuccess ? n._fSuccess.call(n) : !1 === n._bSupportDataURI && n._fFail && n._fFail.call(n)
      }
      var n = function(e) {
          this._bIsPainted = !1,
          this._htOption = e,
          this._elCanvas = document.createElement("canvas"),
          this._elCanvas.width = e.size,
          this._elCanvas.height = e.size,
          this._oContext = this._elCanvas.getContext("2d"),
          this._bIsPainted = !1,
          this._elImage = document.createElement("img"),
          this._elImage.alt = "Scan me!",
          this._elImage.style.display = "none",
          this._bSupportDataURI = null,
          this._callback = e.callback,
          this._bindElement = e.bindElement
      };
      return n.prototype.draw = function(e) {
          var t = this._elImage
            , n = document.createElement("canvas")
            , a = n.getContext("2d")
            , i = this._htOption
            , s = e.getModuleCount()
            , r = i.size
            , c = i.margin;
          (c < 0 || 2 * c >= r) && (c = 0);
          var l = Math.ceil(c)
            , u = r - 2 * c
            , d = i.whiteMargin
            , m = i.backgroundDimming
            , C = u / s
            , b = Math.ceil(C)
            , _ = b
            , A = b * s
            , y = A + 2 * l;
          n.width = y,
          n.height = y;
          var P = i.dotScale;
          t.style.display = "none",
          this.clear(),
          (P <= 0 || P > 1) && (P = .35),
          a.save(),
          a.translate(l, l);
          var k = document.createElement("canvas");
          k.width = y,
          k.height = y;
          var M = k.getContext("2d")
            , x = void 0
            , L = void 0;
          if (void 0 !== i.backgroundImage) {
              if (i.autoColor) {
                  var S = w(i.backgroundImage);
                  i.colorDark = "rgb(" + S.r + ", " + S.g + ", " + S.b + ")"
              }
              i.maskedDots ? (x = document.createElement("canvas"),
              x.width = y,
              x.height = y,
              L = x.getContext("2d"),
              L.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, y, y),
              M.rect(0, 0, y, y),
              M.fillStyle = "#ffffff",
              M.fill()) : (M.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, y, y),
              M.rect(0, 0, y, y),
              M.fillStyle = m,
              M.fill())
          } else
              M.rect(0, 0, y, y),
              M.fillStyle = "#ffffff",
              M.fill();
          i.binarize && (i.colorDark = "#000000",
          i.colorLight = "#FFFFFF");
          for (var N = o.getPatternPosition(e.typeNumber), T = .5 * (1 - P), R = 0; R < s; R++)
              for (var O = 0; O < s; O++) {
                  for (var E = e.isDark(R, O), I = O < 8 && (R < 8 || R >= s - 8) || O >= s - 8 && R < 8, B = 6 === R || 6 === O || I, V = 0; V < N.length - 1; V++)
                      B = B || R >= N[V] - 2 && R <= N[V] + 2 && O >= N[V] - 2 && O <= N[V] + 2;
                  var G = O * b + (B ? 0 : T * b)
                    , H = R * _ + (B ? 0 : T * _);
                  if (a.strokeStyle = E ? i.colorDark : i.colorLight,
                  a.lineWidth = .5,
                  a.fillStyle = E ? i.colorDark : "rgba(255, 255, 255, 0.6)",
                  0 === N.length)
                      B || f(a, G, H, (B ? 1 : P) * b, (B ? 1 : P) * _, x, E);
                  else {
                      var D = O < s - 4 && O >= s - 4 - 5 && R < s - 4 && R >= s - 4 - 5;
                      B || D || f(a, G, H, (B ? 1 : P) * b, (B ? 1 : P) * _, x, E)
                  }
              }
          var z = "rgba(255, 255, 255, 0.6)";
          a.fillStyle = z,
          a.fillRect(0, 0, 8 * b, 8 * _),
          a.fillRect(0, (s - 8) * _, 8 * b, 8 * _),
          a.fillRect((s - 8) * b, 0, 8 * b, 8 * _),
          a.fillRect(8 * b, 6 * _, (s - 8 - 8) * b, _),
          a.fillRect(6 * b, 8 * _, b, (s - 8 - 8) * _);
          var U = N[N.length - 1];
          for (V = 0; V < N.length; V++)
              for (var q = 0; q < N.length; q++) {
                  var F = N[q]
                    , j = N[V];
                  (6 !== F || 6 !== j && j !== U) && ((6 !== j || 6 !== F && F !== U) && v(a, F, j, b, _))
              }
          a.fillStyle = i.colorDark,
          a.fillRect(0, 0, 7 * b, _),
          a.fillRect((s - 7) * b, 0, 7 * b, _),
          a.fillRect(0, 6 * _, 7 * b, _),
          a.fillRect((s - 7) * b, 6 * _, 7 * b, _),
          a.fillRect(0, (s - 7) * _, 7 * b, _),
          a.fillRect(0, (s - 7 + 6) * _, 7 * b, _),
          a.fillRect(0, 0, b, 7 * _),
          a.fillRect(6 * b, 0, b, 7 * _),
          a.fillRect((s - 7) * b, 0, b, 7 * _),
          a.fillRect((s - 7 + 6) * b, 0, b, 7 * _),
          a.fillRect(0, (s - 7) * _, b, 7 * _),
          a.fillRect(6 * b, (s - 7) * _, b, 7 * _),
          a.fillRect(2 * b, 2 * _, 3 * b, 3 * _),
          a.fillRect((s - 7 + 2) * b, 2 * _, 3 * b, 3 * _),
          a.fillRect(2 * b, (s - 7 + 2) * _, 3 * b, 3 * _);
          for (V = 0; V < s - 8; V += 2)
              a.fillRect((8 + V) * b, 6 * _, b, _),
              a.fillRect(6 * b, (8 + V) * _, b, _);
          for (V = 0; V < N.length; V++)
              for (q = 0; q < N.length; q++) {
                  F = N[q],
                  j = N[V];
                  (6 !== F || 6 !== j && j !== U) && ((6 !== j || 6 !== F && F !== U) && (6 !== F && F !== U && 6 !== j && j !== U ? (a.fillStyle = "rgba(0, 0, 0, .2)",
                  h(a, F, j, b, _)) : (a.fillStyle = i.colorDark,
                  h(a, F, j, b, _))))
              }
          if (d && (a.fillStyle = "#FFFFFF",
          a.fillRect(-l, -l, y, l),
          a.fillRect(-l, A, y, l),
          a.fillRect(A, -l, l, y),
          a.fillRect(-l, -l, l, y)),
          void 0 !== i.logoImage) {
              var Z = i.logoScale
                , Q = i.logoMargin
                , Y = i.logoCornerRadius;
              (Z <= 0 || Z >= 1) && (Z = .2),
              Q < 0 && (Q = 0),
              Y < 0 && (Y = 0),
              a.restore();
              var J = A * Z
                , W = .5 * (y - J)
                , K = W;
              a.fillStyle = "#FFFFFF",
              a.save(),
              p(a, W - Q, K - Q, J + 2 * Q, J + 2 * Q, Y),
              a.clip(),
              a.fill(),
              a.restore(),
              a.save(),
              p(a, W, K, J, J, Y),
              a.clip(),
              a.drawImage(i.logoImage, W, K, J, J),
              a.restore()
          }
          if (M.drawImage(n, 0, 0, y, y),
          a.drawImage(k, -l, -l, y, y),
          i.binarize) {
              var X = a.getImageData(0, 0, y, y)
                , $ = 128;
              parseInt(i.binarizeThreshold) > 0 && parseInt(i.binarizeThreshold) < 255 && ($ = parseInt(i.binarizeThreshold));
              for (V = 0; V < X.data.length; V += 4) {
                  var ee = X.data[V]
                    , te = X.data[V + 1]
                    , ne = X.data[V + 2]
                    , ae = g(ee, te, ne);
                  ae > $ ? (X.data[V] = 255,
                  X.data[V + 1] = 255,
                  X.data[V + 2] = 255) : (X.data[V] = 0,
                  X.data[V + 1] = 0,
                  X.data[V + 2] = 0)
              }
              a.putImageData(X, 0, 0)
          }
          var ie = document.createElement("canvas")
            , oe = ie.getContext("2d");
          if (ie.width = r,
          ie.height = r,
          oe.drawImage(n, 0, 0, r, r),
          this._elCanvas = ie,
          this._bIsPainted = !0,
          void 0 !== this._callback && this._callback(this._elCanvas.toDataURL()),
          void 0 !== this._bindElement)
              try {
                  var se = document.getElementById(this._bindElement);
                  if ("IMG" === se.nodeName)
                      se.src = this._elCanvas.toDataURL();
                  else {
                      var re = se.style;
                      re["background-image"] = "url(" + this._elCanvas.toDataURL() + ")",
                      re["background-size"] = "contain",
                      re["background-repeat"] = "no-repeat"
                  }
              } catch (ce) {
                  console.error(ce)
              }
      }
      ,
      n.prototype.makeImage = function() {
          this._bIsPainted && t.call(this, e)
      }
      ,
      n.prototype.isPainted = function() {
          return this._bIsPainted
      }
      ,
      n.prototype.clear = function() {
          this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
          this._bIsPainted = !1
      }
      ,
      n.prototype.round = function(e) {
          return e ? Math.floor(1e3 * e) / 1e3 : e
      }
      ,
      n
  }() : function() {
      var e = function(e) {
          this._htOption = e
      };
      return e.prototype.draw = function(e) {
          for (var t = this._htOption, n = e.getModuleCount(), a = Math.floor(t.size / n), i = Math.floor(t.size / n), o = ['<table style="border:0;border-collapse:collapse;">'], s = 0; s < n; s++) {
              o.push("<tr>");
              for (var r = 0; r < n; r++)
                  o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + a + "px;height:" + i + "px;background-color:" + (e.isDark(s, r) ? t.colorDark : t.colorLight) + ';"></td>');
              o.push("</tr>")
          }
          o.push("</table>");
          var c = (t.size - elTable.offsetWidth) / 2
            , l = (t.size - elTable.offsetHeight) / 2;
          c > 0 && l > 0 && (elTable.style.margin = l + "px " + c + "px")
      }
      ,
      e.prototype.clear = function() {}
      ,
      e
  }();
  function p(e, t, n, a, i, o) {
      e.beginPath(),
      e.moveTo(t, n),
      e.arcTo(t + a, n, t + a, n + i, o),
      e.arcTo(t + a, n + i, t, n + i, o),
      e.arcTo(t, n + i, t, n, o),
      e.arcTo(t, n, t + a, n, o),
      e.closePath()
  }
  function g(e, t, n) {
      return .3 * e + .59 * n + .11 * n
  }
  function f(e, t, n, a, i, o) {
      void 0 === o ? e.fillRect(t, n, a, i) : e.drawImage(o, t, n, a, i, t, n, a, i)
  }
  function f(e, t, n, a, i, o, s) {
      if (void 0 === o)
          e.fillRect(t, n, a, i);
      else {
          e.drawImage(o, t, n, a, i, t, n, a, i);
          var r = e.fillStyle;
          e.fillStyle = s ? "rgba(0, 0, 0, .5)" : "rgba(255, 255, 255, .7)",
          e.fillRect(t, n, a, i),
          e.fillStyle = r
      }
  }
  function v(e, t, n, a, i) {
      e.clearRect((t - 2) * a, (n - 2) * i, 5 * a, 5 * i),
      e.fillRect((t - 2) * a, (n - 2) * i, 5 * a, 5 * i)
  }
  function h(e, t, n, a, i) {
      e.fillRect((t - 2) * a, (n - 2) * i, a, 4 * i),
      e.fillRect((t + 2) * a, (n - 2 + 1) * i, a, 4 * i),
      e.fillRect((t - 2 + 1) * a, (n - 2) * i, 4 * a, i),
      e.fillRect((t - 2) * a, (n + 2) * i, 4 * a, i),
      e.fillRect(t * a, n * i, a, i)
  }
  function w(e) {
      var t, n, a, i, o = 5, s = {
          r: 0,
          g: 0,
          b: 0
      }, r = document.createElement("canvas"), c = r.getContext && r.getContext("2d"), l = -4, u = {
          r: 0,
          g: 0,
          b: 0
      }, d = 0;
      if (!c)
          return s;
      a = r.height = e.naturalHeight || e.offsetHeight || e.height,
      n = r.width = e.naturalWidth || e.offsetWidth || e.width,
      c.drawImage(e, 0, 0);
      try {
          t = c.getImageData(0, 0, n, a)
      } catch (m) {
          return s
      }
      i = t.data.length;
      while ((l += 4 * o) < i)
          t.data[l] > 200 || t.data[l + 1] > 200 || t.data[l + 2] > 200 || (++d,
          u.r += t.data[l],
          u.g += t.data[l + 1],
          u.b += t.data[l + 2]);
      return u.r = ~~(u.r / d),
      u.g = ~~(u.g / d),
      u.b = ~~(u.b / d),
      u
  }
  xa = function() {}
  ,
  xa.prototype.create = function(e) {
      if (this._htOption = {
          size: 800,
          margin: 20,
          typeNumber: 4,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: a.M,
          backgroundImage: void 0,
          backgroundDimming: "rgba(0,0,0,0)",
          logoImage: void 0,
          logoScale: .2,
          logoMargin: 6,
          logoCornerRadius: 8,
          whiteMargin: !0,
          dotScale: .35,
          maskedDots: !1,
          autoColor: !0,
          binarize: !1,
          binarizeThreshold: 128,
          callback: void 0,
          bindElement: void 0
      },
      "string" === typeof e && (e = {
          text: e
      }),
      e)
          for (var t in e)
              this._htOption[t] = e[t];
      this._htOption.useSVG && (m = svgDrawer),
      this._oQRCode = null,
      this._oDrawing = new m(this._htOption),
      this._htOption.text && this.makeCode(this._htOption.text)
  }
  ,
  xa.prototype.makeCode = function(e) {
      this._oQRCode = new t(-1,this._htOption.correctLevel),
      this._oQRCode.addData(e),
      this._oQRCode.make(),
      this._oDrawing.draw(this._oQRCode),
      this.makeImage()
  }
  ,
  xa.prototype.makeImage = function() {
      "function" == typeof this._oDrawing.makeImage && this._oDrawing.makeImage()
  }
  ,
  xa.prototype.clear = function() {
      this._oDrawing.clear()
  }
  ,
  xa.CorrectLevel = a
}
)();
var La = xa;
n(3296),
n(27208),
n(48408),
n(14603),
n(47566),
n(98721);
function Sa(e) {
  return new Promise((function(t, n) {
      if ("data" == e.slice(0, 4)) {
          var a = new Image;
          return a.onload = function() {
              t(a)
          }
          ,
          a.onerror = function() {
              n("Image load error")
          }
          ,
          void (a.src = e)
      }
      var i = new XMLHttpRequest;
      i.onload = function() {
          var e = URL.createObjectURL(this.response)
            , a = new Image;
          a.onload = function() {
              t(a),
              URL.revokeObjectURL(e)
          }
          ,
          a.onerror = function() {
              n("Image load error")
          }
          ,
          a.src = e
      }
      ,
      i.open("GET", e, !0),
      i.responseType = "blob",
      i.send()
  }
  ))
}
var Na = Sa
, Ta = {
  props: {
      text: {
          type: String,
          required: !0
      },
      qid: {
          type: String
      },
      size: {
          type: Number,
          default: 200
      },
      margin: {
          type: Number,
          default: 20
      },
      colorDark: {
          type: String,
          default: "#000000"
      },
      colorLight: {
          type: String,
          default: "#FFFFFF"
      },
      bgSrc: {
          type: String,
          default: void 0
      },
      backgroundDimming: {
          type: String,
          default: "rgba(0,0,0,0)"
      },
      logoSrc: {
          type: String,
          default: void 0
      },
      logoScale: {
          type: Number,
          default: .2
      },
      logoMargin: {
          type: Number,
          default: 0
      },
      logoCornerRadius: {
          type: Number,
          default: 8
      },
      whiteMargin: {
          type: [Boolean, String],
          default: !0
      },
      dotScale: {
          type: Number,
          default: 1
      },
      autoColor: {
          type: [Boolean, String],
          default: !0
      },
      binarize: {
          type: [Boolean, String],
          default: !1
      },
      binarizeThreshold: {
          type: Number,
          default: 128
      },
      callback: {
          type: Function,
          default: function() {}
      },
      bindElement: {
          type: Boolean,
          default: !0
      }
  },
  name: "vue-qr",
  data: function() {
      return {
          uuid: ""
      }
  },
  watch: {
      $props: {
          deep: !0,
          handler: function() {
              this.main()
          }
      }
  },
  mounted: function() {
      this.uuid = Ma(32),
      this.main()
  },
  methods: {
      main: function() {
          var e = this;
          return (0,
          i.A)((0,
          a.A)().mark((function t() {
              var n, i, o, s, r;
              return (0,
              a.A)().wrap((function(t) {
                  while (1)
                      switch (t.prev = t.next) {
                      case 0:
                          if (n = e,
                          !e.bgSrc || !e.logoSrc) {
                              t.next = 10;
                              break
                          }
                          return t.next = 4,
                          Na(e.bgSrc);
                      case 4:
                          return i = t.sent,
                          t.next = 7,
                          Na(e.logoSrc);
                      case 7:
                          return o = t.sent,
                          e.render(i, o),
                          t.abrupt("return");
                      case 10:
                          if (!e.bgSrc) {
                              t.next = 16;
                              break
                          }
                          return t.next = 13,
                          Na(e.bgSrc);
                      case 13:
                          return s = t.sent,
                          e.render(s),
                          t.abrupt("return");
                      case 16:
                          if (!e.logoSrc) {
                              t.next = 22;
                              break
                          }
                          return t.next = 19,
                          Na(e.logoSrc);
                      case 19:
                          return r = t.sent,
                          e.render(void 0, r),
                          t.abrupt("return");
                      case 22:
                          setTimeout((function() {
                              n.render()
                          }
                          ), 0);
                      case 23:
                      case "end":
                          return t.stop()
                      }
              }
              ), t)
          }
          )))()
      },
      render: function(e, t) {
          var n = this;
          (new La).create({
              text: n.text,
              size: n.size,
              margin: n.margin,
              colorDark: n.colorDark,
              colorLight: n.colorLight,
              backgroundImage: e,
              backgroundDimming: n.backgroundDimming,
              logoImage: t,
              logoScale: n.logoScale,
              logoMargin: n.logoMargin,
              logoCornerRadius: n.logoCornerRadius,
              whiteMargin: ka(n.whiteMargin),
              dotScale: n.dotScale,
              autoColor: ka(n.autoColor),
              binarize: ka(n.binarize),
              binarizeThreshold: n.binarizeThreshold,
              callback: function(e) {
                  n.callback && n.callback(e, n.qid)
              },
              bindElement: n.bindElement ? n.uuid : void 0
          })
      }
  }
}
, Ra = Ta
, Oa = (0, _.A)(Ra, ya, Pa, !1, null, null, null)
, Ea = Oa.exports
