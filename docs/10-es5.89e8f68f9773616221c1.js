function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    (a.enumerable = a.enumerable || !1),
      (a.configurable = !0),
      'value' in a && (a.writable = !0),
      Object.defineProperty(e, a.key, a);
  }
}
function _createClass(e, t, n) {
  return (
    t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
  );
}
(window.webpackJsonp = window.webpackJsonp || []).push([
  [10],
  {
    Vl0R: function(e, t, n) {
      'use strict';
      n.r(t);
      var a = n('2kYt'),
        c = n('PCNd'),
        i = n('sEIs'),
        o = n('sN6X'),
        l = n('pKmL'),
        s = n('BnVf'),
        b = n('EMFo'),
        r = n('EM62'),
        g = n('bFHC'),
        m = n('Pq5H'),
        h = n('29Wa'),
        u = n('R7+U'),
        d = n('nIj0'),
        f = n('k8N0'),
        p = n('mFH5'),
        v = n('Y2X+'),
        T = n('s2Ay');
      function S(e, t) {
        if (
          (1 & e &&
            (r.Tb(0, 'mat-option', 19), r.Bc(1), r.gc(2, 'translate'), r.Sb()),
          2 & e)
        ) {
          var n = t.$implicit;
          r.lc('value', n.value),
            r.Bb(1),
            r.Dc(
              ' ',
              r.hc(2, 2, 'anms.settings.general.language.' + n.label),
              ' '
            );
        }
      }
      function k(e, t) {
        if (
          (1 & e &&
            (r.Tb(0, 'mat-option', 19), r.Bc(1), r.gc(2, 'translate'), r.Sb()),
          2 & e)
        ) {
          var n = t.$implicit;
          r.lc('value', n.value),
            r.Bb(1),
            r.Dc(' ', r.hc(2, 2, 'anms.settings.themes.' + n.label), ' ');
        }
      }
      function C(e, t) {
        1 & e && r.Pb(0, 'mat-slide-toggle', 20);
      }
      function B(e, t) {
        if (1 & e) {
          var n = r.Ub();
          r.Tb(0, 'mat-slide-toggle', 11),
            r.bc('change', function(e) {
              return r.sc(n), r.fc(2).onPageAnimationsToggle(e);
            }),
            r.Sb();
        }
        if (2 & e) {
          var a = r.fc().ngIf;
          r.lc('checked', a.pageAnimations);
        }
      }
      function P(e, t) {
        if (1 & e) {
          var n = r.Ub();
          r.Rb(0),
            r.Tb(1, 'div', 1),
            r.Tb(2, 'div', 4),
            r.Tb(3, 'h2'),
            r.Bc(4),
            r.gc(5, 'translate'),
            r.Sb(),
            r.Tb(6, 'div', 5),
            r.Tb(7, 'mat-icon', 6),
            r.Pb(8, 'fa-icon', 7),
            r.Sb(),
            r.Tb(9, 'mat-form-field'),
            r.Tb(10, 'mat-select', 8),
            r.bc('selectionChange', function(e) {
              return r.sc(n), r.fc().onLanguageSelect(e);
            }),
            r.gc(11, 'translate'),
            r.zc(12, S, 3, 4, 'mat-option', 9),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Tb(13, 'div', 5),
            r.Tb(14, 'mat-icon', 6),
            r.Pb(15, 'fa-icon', 10),
            r.Sb(),
            r.Tb(16, 'mat-placeholder'),
            r.Bc(17),
            r.gc(18, 'translate'),
            r.Sb(),
            r.Tb(19, 'mat-slide-toggle', 11),
            r.bc('change', function(e) {
              return r.sc(n), r.fc().onStickyHeaderToggle(e);
            }),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Tb(20, 'div', 1),
            r.Tb(21, 'div', 4),
            r.Tb(22, 'h2'),
            r.Bc(23),
            r.gc(24, 'translate'),
            r.Sb(),
            r.Tb(25, 'div', 5),
            r.Tb(26, 'mat-icon', 6),
            r.Pb(27, 'fa-icon', 12),
            r.Sb(),
            r.Tb(28, 'mat-form-field'),
            r.Tb(29, 'mat-select', 13),
            r.bc('selectionChange', function(e) {
              return r.sc(n), r.fc().onThemeSelect(e);
            }),
            r.gc(30, 'translate'),
            r.zc(31, k, 3, 4, 'mat-option', 9),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Tb(32, 'div', 5),
            r.Tb(33, 'mat-icon', 6),
            r.Pb(34, 'fa-icon', 14),
            r.Sb(),
            r.Tb(35, 'mat-placeholder'),
            r.Bc(36),
            r.gc(37, 'translate'),
            r.Sb(),
            r.Tb(38, 'mat-slide-toggle', 11),
            r.bc('change', function(e) {
              return r.sc(n), r.fc().onAutoNightModeToggle(e);
            }),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Tb(39, 'div', 4),
            r.Tb(40, 'h2'),
            r.Bc(41),
            r.gc(42, 'translate'),
            r.Sb(),
            r.Tb(43, 'div', 5),
            r.Tb(44, 'mat-icon', 6),
            r.Tb(45, 'mat-icon', 6),
            r.Pb(46, 'fa-icon', 15),
            r.Sb(),
            r.Sb(),
            r.Tb(47, 'mat-placeholder'),
            r.Bc(48),
            r.gc(49, 'translate'),
            r.Sb(),
            r.zc(50, C, 1, 0, 'mat-slide-toggle', 16),
            r.zc(51, B, 1, 1, 'mat-slide-toggle', 17),
            r.Sb(),
            r.Tb(52, 'div', 5),
            r.Tb(53, 'mat-icon', 6),
            r.Pb(54, 'fa-icon', 18),
            r.Sb(),
            r.Tb(55, 'mat-placeholder'),
            r.Bc(56),
            r.gc(57, 'translate'),
            r.Sb(),
            r.Tb(58, 'mat-slide-toggle', 11),
            r.bc('change', function(e) {
              return r.sc(n), r.fc().onElementsAnimationsToggle(e);
            }),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Sb(),
            r.Qb();
        }
        if (2 & e) {
          var a = t.ngIf,
            c = r.fc();
          r.Bb(2),
            r.lc('ngClass', c.routeAnimationsElements),
            r.Bb(2),
            r.Cc(r.hc(5, 21, 'anms.settings.general.title')),
            r.Bb(6),
            r.lc(
              'placeholder',
              r.hc(11, 23, 'anms.settings.general.placeholder')
            )('ngModel', a.language),
            r.Bb(2),
            r.lc('ngForOf', c.languages),
            r.Bb(5),
            r.Dc('', r.hc(18, 25, 'anms.settings.themes.sticky-header'), ' '),
            r.Bb(2),
            r.lc('checked', a.stickyHeader),
            r.Bb(2),
            r.lc('ngClass', c.routeAnimationsElements),
            r.Bb(2),
            r.Cc(r.hc(24, 27, 'anms.settings.themes.title')),
            r.Bb(6),
            r.lc(
              'placeholder',
              r.hc(30, 29, 'anms.settings.themes.placeholder')
            )('ngModel', a.theme),
            r.Bb(2),
            r.lc('ngForOf', c.themes),
            r.Bb(5),
            r.Dc('', r.hc(37, 31, 'anms.settings.themes.night-mode'), ' '),
            r.Bb(2),
            r.lc('checked', a.autoNightMode),
            r.Bb(1),
            r.lc('ngClass', c.routeAnimationsElements),
            r.Bb(2),
            r.Cc(r.hc(42, 33, 'anms.settings.animations.title')),
            r.Bb(7),
            r.Dc('', r.hc(49, 35, 'anms.settings.animations.page'), ' '),
            r.Bb(2),
            r.lc('ngIf', a.pageAnimationsDisabled),
            r.Bb(1),
            r.lc('ngIf', !a.pageAnimationsDisabled),
            r.Bb(5),
            r.Dc('', r.hc(57, 37, 'anms.settings.animations.elements'), ' '),
            r.Bb(2),
            r.lc('checked', a.elementsAnimations);
        }
      }
      var y,
        M,
        E = [
          {
            path: '',
            component:
              ((y = (function() {
                function e(t) {
                  _classCallCheck(this, e),
                    (this.store = t),
                    (this.routeAnimationsElements = l.d),
                    (this.themes = [
                      { value: 'DEFAULT-THEME', label: 'blue' },
                      { value: 'LIGHT-THEME', label: 'light' },
                      { value: 'NATURE-THEME', label: 'nature' },
                      { value: 'BLACK-THEME', label: 'dark' }
                    ]),
                    (this.languages = [
                      { value: 'en', label: 'en' },
                      { value: 'de', label: 'de' },
                      { value: 'sk', label: 'sk' },
                      { value: 'fr', label: 'fr' },
                      { value: 'es', label: 'es' },
                      { value: 'pt-br', label: 'pt-br' },
                      { value: 'zh-cn', label: 'zh-cn' },
                      { value: 'he', label: 'he' }
                    ]);
                }
                return (
                  _createClass(e, [
                    {
                      key: 'ngOnInit',
                      value: function() {
                        this.settings$ = this.store.pipe(Object(o.t)(b.d));
                      }
                    },
                    {
                      key: 'onLanguageSelect',
                      value: function(e) {
                        var t = e.value;
                        this.store.dispatch(Object(s.f)({ language: t }));
                      }
                    },
                    {
                      key: 'onThemeSelect',
                      value: function(e) {
                        var t = e.value;
                        this.store.dispatch(Object(s.h)({ theme: t }));
                      }
                    },
                    {
                      key: 'onAutoNightModeToggle',
                      value: function(e) {
                        var t = e.checked;
                        this.store.dispatch(Object(s.d)({ autoNightMode: t }));
                      }
                    },
                    {
                      key: 'onStickyHeaderToggle',
                      value: function(e) {
                        var t = e.checked;
                        this.store.dispatch(Object(s.g)({ stickyHeader: t }));
                      }
                    },
                    {
                      key: 'onPageAnimationsToggle',
                      value: function(e) {
                        var t = e.checked;
                        this.store.dispatch(Object(s.b)({ pageAnimations: t }));
                      }
                    },
                    {
                      key: 'onElementsAnimationsToggle',
                      value: function(e) {
                        var t = e.checked;
                        this.store.dispatch(
                          Object(s.a)({ elementsAnimations: t })
                        );
                      }
                    }
                  ]),
                  e
                );
              })()),
              (y.ɵfac = function(e) {
                return new (e || y)(r.Ob(o.h));
              }),
              (y.ɵcmp = r.Ib({
                type: y,
                selectors: [['anms-settings']],
                decls: 9,
                vars: 6,
                consts: [
                  [1, 'container'],
                  [1, 'row'],
                  [1, 'col-sm-12'],
                  [4, 'ngIf'],
                  [1, 'col-md-6', 'group', 3, 'ngClass'],
                  [1, 'icon-form-field'],
                  ['color', 'accent'],
                  ['icon', 'language', 'color', 'accent'],
                  [
                    'name',
                    'language',
                    3,
                    'placeholder',
                    'ngModel',
                    'selectionChange'
                  ],
                  [3, 'value', 4, 'ngFor', 'ngForOf'],
                  ['icon', 'bars', 'color', 'accent'],
                  [3, 'checked', 'change'],
                  ['icon', 'paint-brush', 'color', 'accent'],
                  [
                    'name',
                    'themes',
                    3,
                    'placeholder',
                    'ngModel',
                    'selectionChange'
                  ],
                  ['icon', 'lightbulb', 'color', 'accent'],
                  ['icon', 'window-maximize'],
                  [
                    'matTooltip',
                    'Sorry, this feature is disabled in IE, EDGE and Safari',
                    'matTooltipPosition',
                    'before',
                    'disabled',
                    '',
                    4,
                    'ngIf'
                  ],
                  [3, 'checked', 'change', 4, 'ngIf'],
                  ['icon', 'stream', 'color', 'accent'],
                  [3, 'value'],
                  [
                    'matTooltip',
                    'Sorry, this feature is disabled in IE, EDGE and Safari',
                    'matTooltipPosition',
                    'before',
                    'disabled',
                    ''
                  ]
                ],
                template: function(e, t) {
                  1 & e &&
                    (r.Tb(0, 'div', 0),
                    r.Tb(1, 'div', 1),
                    r.Tb(2, 'div', 2),
                    r.Tb(3, 'h1'),
                    r.Bc(4),
                    r.gc(5, 'translate'),
                    r.Sb(),
                    r.Sb(),
                    r.Sb(),
                    r.Pb(6, 'br'),
                    r.zc(7, P, 59, 39, 'ng-container', 3),
                    r.gc(8, 'async'),
                    r.Sb()),
                    2 & e &&
                      (r.Bb(4),
                      r.Cc(r.hc(5, 2, 'anms.settings.title')),
                      r.Bb(3),
                      r.lc('ngIf', r.hc(8, 4, t.settings$)));
                },
                directives: [
                  a.k,
                  a.i,
                  g.a,
                  m.a,
                  h.a,
                  u.a,
                  d.l,
                  d.o,
                  a.j,
                  h.e,
                  f.a,
                  p.l,
                  v.a
                ],
                pipes: [T.c, a.b],
                styles: [
                  '.container[_ngcontent-%COMP%]{margin-top:20px}h1[_ngcontent-%COMP%]{margin:0 0 20px}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-transform:uppercase}h2[_ngcontent-%COMP%]{margin:0 0 10px}.group[_ngcontent-%COMP%]{margin:0 0 40px}.icon-form-field[_ngcontent-%COMP%]{position:relative;display:-webkit-box;display:flex;height:65.5px;-webkit-box-align:center;align-items:center}.icon-form-field[_ngcontent-%COMP%]   mat-placeholder[_ngcontent-%COMP%]{-webkit-box-flex:2;flex:2 1 auto}mat-icon[_ngcontent-%COMP%]{margin:0 6px 6px 0;font-size:20px}mat-form-field[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1 0 auto}'
                ],
                changeDetection: 0
              })),
              y),
            data: { title: 'anms.menu.settings' }
          }
        ],
        O =
          (((M = function e() {
            _classCallCheck(this, e);
          }).ɵmod = r.Mb({ type: M })),
          (M.ɵinj = r.Lb({
            factory: function(e) {
              return new (e || M)();
            },
            imports: [[i.l.forChild(E)], i.l]
          })),
          M);
      n.d(t, 'SettingsModule', function() {
        return _;
      });
      var A,
        _ =
          (((A = function e() {
            _classCallCheck(this, e);
          }).ɵmod = r.Mb({ type: A })),
          (A.ɵinj = r.Lb({
            factory: function(e) {
              return new (e || A)();
            },
            imports: [[a.c, c.a, O]]
          })),
          A);
    }
  }
]);
