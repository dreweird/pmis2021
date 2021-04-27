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
        g = n('EM62'),
        r = n('bFHC'),
        m = n('Pq5H'),
        h = n('29Wa'),
        d = n('R7+U'),
        u = n('nIj0'),
        f = n('k8N0'),
        p = n('mFH5'),
        T = n('Y2X+'),
        S = n('s2Ay');
      function v(e, t) {
        if (
          (1 & e &&
            (g.Tb(0, 'mat-option', 19), g.Bc(1), g.gc(2, 'translate'), g.Sb()),
          2 & e)
        ) {
          const e = t.$implicit;
          g.lc('value', e.value),
            g.Bb(1),
            g.Dc(
              ' ',
              g.hc(2, 2, 'anms.settings.general.language.' + e.label),
              ' '
            );
        }
      }
      function B(e, t) {
        if (
          (1 & e &&
            (g.Tb(0, 'mat-option', 19), g.Bc(1), g.gc(2, 'translate'), g.Sb()),
          2 & e)
        ) {
          const e = t.$implicit;
          g.lc('value', e.value),
            g.Bb(1),
            g.Dc(' ', g.hc(2, 2, 'anms.settings.themes.' + e.label), ' ');
        }
      }
      function M(e, t) {
        1 & e && g.Pb(0, 'mat-slide-toggle', 20);
      }
      function k(e, t) {
        if (1 & e) {
          const e = g.Ub();
          g.Tb(0, 'mat-slide-toggle', 11),
            g.bc('change', function(t) {
              return g.sc(e), g.fc(2).onPageAnimationsToggle(t);
            }),
            g.Sb();
        }
        if (2 & e) {
          const e = g.fc().ngIf;
          g.lc('checked', e.pageAnimations);
        }
      }
      function C(e, t) {
        if (1 & e) {
          const e = g.Ub();
          g.Rb(0),
            g.Tb(1, 'div', 1),
            g.Tb(2, 'div', 4),
            g.Tb(3, 'h2'),
            g.Bc(4),
            g.gc(5, 'translate'),
            g.Sb(),
            g.Tb(6, 'div', 5),
            g.Tb(7, 'mat-icon', 6),
            g.Pb(8, 'fa-icon', 7),
            g.Sb(),
            g.Tb(9, 'mat-form-field'),
            g.Tb(10, 'mat-select', 8),
            g.bc('selectionChange', function(t) {
              return g.sc(e), g.fc().onLanguageSelect(t);
            }),
            g.gc(11, 'translate'),
            g.zc(12, v, 3, 4, 'mat-option', 9),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Tb(13, 'div', 5),
            g.Tb(14, 'mat-icon', 6),
            g.Pb(15, 'fa-icon', 10),
            g.Sb(),
            g.Tb(16, 'mat-placeholder'),
            g.Bc(17),
            g.gc(18, 'translate'),
            g.Sb(),
            g.Tb(19, 'mat-slide-toggle', 11),
            g.bc('change', function(t) {
              return g.sc(e), g.fc().onStickyHeaderToggle(t);
            }),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Tb(20, 'div', 1),
            g.Tb(21, 'div', 4),
            g.Tb(22, 'h2'),
            g.Bc(23),
            g.gc(24, 'translate'),
            g.Sb(),
            g.Tb(25, 'div', 5),
            g.Tb(26, 'mat-icon', 6),
            g.Pb(27, 'fa-icon', 12),
            g.Sb(),
            g.Tb(28, 'mat-form-field'),
            g.Tb(29, 'mat-select', 13),
            g.bc('selectionChange', function(t) {
              return g.sc(e), g.fc().onThemeSelect(t);
            }),
            g.gc(30, 'translate'),
            g.zc(31, B, 3, 4, 'mat-option', 9),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Tb(32, 'div', 5),
            g.Tb(33, 'mat-icon', 6),
            g.Pb(34, 'fa-icon', 14),
            g.Sb(),
            g.Tb(35, 'mat-placeholder'),
            g.Bc(36),
            g.gc(37, 'translate'),
            g.Sb(),
            g.Tb(38, 'mat-slide-toggle', 11),
            g.bc('change', function(t) {
              return g.sc(e), g.fc().onAutoNightModeToggle(t);
            }),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Tb(39, 'div', 4),
            g.Tb(40, 'h2'),
            g.Bc(41),
            g.gc(42, 'translate'),
            g.Sb(),
            g.Tb(43, 'div', 5),
            g.Tb(44, 'mat-icon', 6),
            g.Tb(45, 'mat-icon', 6),
            g.Pb(46, 'fa-icon', 15),
            g.Sb(),
            g.Sb(),
            g.Tb(47, 'mat-placeholder'),
            g.Bc(48),
            g.gc(49, 'translate'),
            g.Sb(),
            g.zc(50, M, 1, 0, 'mat-slide-toggle', 16),
            g.zc(51, k, 1, 1, 'mat-slide-toggle', 17),
            g.Sb(),
            g.Tb(52, 'div', 5),
            g.Tb(53, 'mat-icon', 6),
            g.Pb(54, 'fa-icon', 18),
            g.Sb(),
            g.Tb(55, 'mat-placeholder'),
            g.Bc(56),
            g.gc(57, 'translate'),
            g.Sb(),
            g.Tb(58, 'mat-slide-toggle', 11),
            g.bc('change', function(t) {
              return g.sc(e), g.fc().onElementsAnimationsToggle(t);
            }),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Sb(),
            g.Qb();
        }
        if (2 & e) {
          const e = t.ngIf,
            n = g.fc();
          g.Bb(2),
            g.lc('ngClass', n.routeAnimationsElements),
            g.Bb(2),
            g.Cc(g.hc(5, 21, 'anms.settings.general.title')),
            g.Bb(6),
            g.lc(
              'placeholder',
              g.hc(11, 23, 'anms.settings.general.placeholder')
            )('ngModel', e.language),
            g.Bb(2),
            g.lc('ngForOf', n.languages),
            g.Bb(5),
            g.Dc('', g.hc(18, 25, 'anms.settings.themes.sticky-header'), ' '),
            g.Bb(2),
            g.lc('checked', e.stickyHeader),
            g.Bb(2),
            g.lc('ngClass', n.routeAnimationsElements),
            g.Bb(2),
            g.Cc(g.hc(24, 27, 'anms.settings.themes.title')),
            g.Bb(6),
            g.lc(
              'placeholder',
              g.hc(30, 29, 'anms.settings.themes.placeholder')
            )('ngModel', e.theme),
            g.Bb(2),
            g.lc('ngForOf', n.themes),
            g.Bb(5),
            g.Dc('', g.hc(37, 31, 'anms.settings.themes.night-mode'), ' '),
            g.Bb(2),
            g.lc('checked', e.autoNightMode),
            g.Bb(1),
            g.lc('ngClass', n.routeAnimationsElements),
            g.Bb(2),
            g.Cc(g.hc(42, 33, 'anms.settings.animations.title')),
            g.Bb(7),
            g.Dc('', g.hc(49, 35, 'anms.settings.animations.page'), ' '),
            g.Bb(2),
            g.lc('ngIf', e.pageAnimationsDisabled),
            g.Bb(1),
            g.lc('ngIf', !e.pageAnimationsDisabled),
            g.Bb(5),
            g.Dc('', g.hc(57, 37, 'anms.settings.animations.elements'), ' '),
            g.Bb(2),
            g.lc('checked', e.elementsAnimations);
        }
      }
      const E = [
        {
          path: '',
          component: (() => {
            class e {
              constructor(e) {
                (this.store = e),
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
              ngOnInit() {
                this.settings$ = this.store.pipe(Object(o.t)(b.d));
              }
              onLanguageSelect({ value: e }) {
                this.store.dispatch(Object(s.f)({ language: e }));
              }
              onThemeSelect({ value: e }) {
                this.store.dispatch(Object(s.h)({ theme: e }));
              }
              onAutoNightModeToggle({ checked: e }) {
                this.store.dispatch(Object(s.d)({ autoNightMode: e }));
              }
              onStickyHeaderToggle({ checked: e }) {
                this.store.dispatch(Object(s.g)({ stickyHeader: e }));
              }
              onPageAnimationsToggle({ checked: e }) {
                this.store.dispatch(Object(s.b)({ pageAnimations: e }));
              }
              onElementsAnimationsToggle({ checked: e }) {
                this.store.dispatch(Object(s.a)({ elementsAnimations: e }));
              }
            }
            return (
              (e.ɵfac = function(t) {
                return new (t || e)(g.Ob(o.h));
              }),
              (e.ɵcmp = g.Ib({
                type: e,
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
                    (g.Tb(0, 'div', 0),
                    g.Tb(1, 'div', 1),
                    g.Tb(2, 'div', 2),
                    g.Tb(3, 'h1'),
                    g.Bc(4),
                    g.gc(5, 'translate'),
                    g.Sb(),
                    g.Sb(),
                    g.Sb(),
                    g.Pb(6, 'br'),
                    g.zc(7, C, 59, 39, 'ng-container', 3),
                    g.gc(8, 'async'),
                    g.Sb()),
                    2 & e &&
                      (g.Bb(4),
                      g.Cc(g.hc(5, 2, 'anms.settings.title')),
                      g.Bb(3),
                      g.lc('ngIf', g.hc(8, 4, t.settings$)));
                },
                directives: [
                  a.k,
                  a.i,
                  r.a,
                  m.a,
                  h.a,
                  d.a,
                  u.l,
                  u.o,
                  a.j,
                  h.e,
                  f.a,
                  p.l,
                  T.a
                ],
                pipes: [S.c, a.b],
                styles: [
                  '.container[_ngcontent-%COMP%]{margin-top:20px}h1[_ngcontent-%COMP%]{margin:0 0 20px}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-transform:uppercase}h2[_ngcontent-%COMP%]{margin:0 0 10px}.group[_ngcontent-%COMP%]{margin:0 0 40px}.icon-form-field[_ngcontent-%COMP%]{position:relative;display:-webkit-box;display:flex;height:65.5px;-webkit-box-align:center;align-items:center}.icon-form-field[_ngcontent-%COMP%]   mat-placeholder[_ngcontent-%COMP%]{-webkit-box-flex:2;flex:2 1 auto}mat-icon[_ngcontent-%COMP%]{margin:0 6px 6px 0;font-size:20px}mat-form-field[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1 0 auto}'
                ],
                changeDetection: 0
              })),
              e
            );
          })(),
          data: { title: 'anms.menu.settings' }
        }
      ];
      let P = (() => {
        class e {}
        return (
          (e.ɵmod = g.Mb({ type: e })),
          (e.ɵinj = g.Lb({
            factory: function(t) {
              return new (t || e)();
            },
            imports: [[i.l.forChild(E)], i.l]
          })),
          e
        );
      })();
      n.d(t, 'SettingsModule', function() {
        return O;
      });
      let O = (() => {
        class e {}
        return (
          (e.ɵmod = g.Mb({ type: e })),
          (e.ɵinj = g.Lb({
            factory: function(t) {
              return new (t || e)();
            },
            imports: [[a.c, c.a, P]]
          })),
          e
        );
      })();
    }
  }
]);
