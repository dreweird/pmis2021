function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var a = 0; a < t.length; a++) {
    var n = t[a];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, a) {
  return (
    t && _defineProperties(e.prototype, t), a && _defineProperties(e, a), e
  );
}
(window.webpackJsonp = window.webpackJsonp || []).push([
  [8],
  {
    IAk5: function(e, t, a) {
      'use strict';
      a.r(t);
      var n,
        r,
        o = a('2kYt'),
        c = a('PCNd'),
        i = a('sEIs'),
        s = a('EM62'),
        l = a('Xeeh'),
        d =
          (((n = (function() {
            function e(t) {
              _classCallCheck(this, e),
                (this.route = t),
                (this.pid = 0),
                (this.name = ''),
                (this.pid = Number(this.route.snapshot.paramMap.get('pid'))),
                (this.name = this.route.snapshot.paramMap.get('name'));
            }
            return (
              _createClass(e, [{ key: 'ngOnInit', value: function() {} }]), e
            );
          })()).ɵfac = function(e) {
            return new (e || n)(s.Ob(i.a));
          }),
          (n.ɵcmp = s.Ib({
            type: n,
            selectors: [['anms-chart']],
            decls: 2,
            vars: 2,
            consts: [[3, 'pid', 'name']],
            template: function(e, t) {
              1 & e && (s.Pb(0, 'br'), s.Pb(1, 'anms-graph', 0)),
                2 & e && (s.Bb(1), s.lc('pid', t.pid)('name', t.name));
            },
            directives: [l.a],
            styles: [''],
            changeDetection: 0
          })),
          n),
        u = a('jQNw'),
        m = a('pKmL'),
        b = a('cHbk'),
        h =
          (((r = (function() {
            function e(t) {
              _classCallCheck(this, e), (this.router = t);
            }
            return (
              _createClass(e, [
                {
                  key: 'agInit',
                  value: function(e) {
                    this.params = e;
                  }
                },
                {
                  key: 'refresh',
                  value: function() {
                    return !1;
                  }
                },
                {
                  key: 'navigate',
                  value: function() {
                    this.router.navigate([
                      '/dashboard/chart',
                      this.params.data.program_id,
                      this.params.data.name
                    ]);
                  }
                }
              ]),
              e
            );
          })()).ɵfac = function(e) {
            return new (e || r)(s.Ob(i.h));
          }),
          (r.ɵcmp = s.Ib({
            type: r,
            selectors: [['ng-component']],
            decls: 2,
            vars: 0,
            consts: [['target', '_blank', 'rel', 'noopener', 3, 'click']],
            template: function(e, t) {
              1 & e &&
                (s.Tb(0, 'a', 0),
                s.bc('click', function(e) {
                  return t.navigate();
                }),
                s.Bc(1, ' See Chart '),
                s.Sb());
            },
            encapsulation: 2,
            changeDetection: 0
          })),
          r),
        p = a('Meci'),
        f = a('W6oE'),
        g = a('DDFo');
      function v(e, t) {
        1 & e && (s.Tb(0, 'span', 14), s.Bc(1, ' Closed '), s.Sb());
      }
      function C(e, t) {
        1 & e && (s.Tb(0, 'span', 15), s.Bc(1, ' Opened '), s.Sb());
      }
      function y(e, t) {
        if (
          (1 & e &&
            (s.Tb(0, 'tr'),
            s.Tb(1, 'td'),
            s.Bc(2),
            s.Sb(),
            s.Tb(3, 'td'),
            s.zc(4, v, 2, 0, 'span', 12),
            s.zc(5, C, 2, 0, 'span', 13),
            s.Sb(),
            s.Sb()),
          2 & e)
        ) {
          var a = t.$implicit;
          s.Bb(2),
            s.Dc('', a.month, ' '),
            s.Bb(2),
            s.lc('ngIf', 0 == a.checked),
            s.Bb(1),
            s.lc('ngIf', 1 == a.checked);
        }
      }
      var S = function(e) {
        return { closed: e };
      };
      function T(e, t) {
        if (
          (1 & e &&
            (s.Tb(0, 'tr'),
            s.Tb(1, 'td'),
            s.Bc(2),
            s.gc(3, 'uppercase'),
            s.Sb(),
            s.Tb(4, 'td', 16),
            s.Bc(5),
            s.gc(6, 'amTimeAgo'),
            s.Sb(),
            s.Tb(7, 'td', 16),
            s.Bc(8),
            s.gc(9, 'amTimeAgo'),
            s.Sb(),
            s.Tb(10, 'td', 16),
            s.Bc(11),
            s.gc(12, 'amTimeAgo'),
            s.Sb(),
            s.Sb()),
          2 & e)
        ) {
          var a = t.$implicit;
          s.Bb(2),
            s.Cc(s.hc(3, 7, a.username)),
            s.Bb(2),
            s.lc('ngClass', s.nc(15, S, null == a.bed1.date_updated)),
            s.Bb(1),
            s.Dc(' ', s.hc(6, 9, a.bed1.date_updated), ''),
            s.Bb(2),
            s.lc('ngClass', s.nc(17, S, null == a.bed2.date_updated)),
            s.Bb(1),
            s.Dc(' ', s.hc(9, 11, a.bed2.date_updated), ''),
            s.Bb(2),
            s.lc('ngClass', s.nc(19, S, null == a.bed3.date_updated)),
            s.Bb(1),
            s.Dc(' ', s.hc(12, 13, a.bed3.date_updated), '');
        }
      }
      var k,
        w,
        B = [
          {
            path: '',
            component:
              ((k = (function() {
                function e(t, a) {
                  _classCallCheck(this, e),
                    (this.pmisService = t),
                    (this.cd = a),
                    (this.routeAnimationsElements = m.d),
                    (this.modules = b.a),
                    (this.columnDefs = [
                      {
                        headerName: 'Banner/Ous',
                        field: 'name',
                        pinned: 'left'
                      },
                      {
                        headerName: 'Physical',
                        children: [
                          {
                            headerName: 'MidYear',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t)
                                return (
                                  ((t.jana +
                                    t.feba +
                                    t.mara +
                                    t.apra +
                                    +t.maya +
                                    t.juna) /
                                    (t.jant +
                                      t.febt +
                                      t.mart +
                                      t.aprt +
                                      +t.mayt +
                                      t.junt)) *
                                  100
                                );
                            }
                          },
                          {
                            headerName: 'YearEnd',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t) return (t.pa / t.pt) * 100;
                            }
                          }
                        ]
                      },
                      {
                        headerName: 'Obligation',
                        children: [
                          {
                            headerName: 'MidYear',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t)
                                return (
                                  ((t.janfa +
                                    t.febfa +
                                    t.marfa +
                                    t.aprfa +
                                    +t.mayfa +
                                    t.junfa) /
                                    (t.janft +
                                      t.febft +
                                      t.marft +
                                      t.aprft +
                                      +t.mayft +
                                      t.junft)) *
                                  100
                                );
                            }
                          },
                          {
                            headerName: 'YearEnd',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t) return (t.fa / t.ft) * 100;
                            }
                          }
                        ]
                      },
                      {
                        headerName: 'Disbursement',
                        children: [
                          {
                            headerName: 'MidYear',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t)
                                return (
                                  ((t.janda +
                                    t.febda +
                                    t.marda +
                                    t.aprda +
                                    +t.mayda +
                                    t.junda) /
                                    (t.jandt +
                                      t.febdt +
                                      t.mardt +
                                      t.aprdt +
                                      +t.maydt +
                                      t.jundt)) *
                                  100
                                );
                            }
                          },
                          {
                            headerName: 'YearEnd',
                            type: 'numericColumn',
                            valueFormatter: this.currencyFormatter,
                            width: 120,
                            valueGetter: function(e) {
                              var t = e.data;
                              if (t) return (t.da / t.dt) * 100;
                            }
                          }
                        ]
                      },
                      { headerName: 'Graph', cellRenderer: 'graphCellRenderer' }
                    ]),
                    (this.defaultColDef = {
                      sortable: !0,
                      resizable: !0,
                      filter: !0
                    }),
                    (this.frameworkComponents = { graphCellRenderer: h });
                }
                return (
                  _createClass(e, [
                    {
                      key: 'onGridReady',
                      value: function(e) {
                        (this.gridApi = e.api),
                          (this.gridColumnApi = e.columnApi);
                      }
                    },
                    {
                      key: 'getLocked',
                      value: function() {
                        var e = this;
                        this.pmisService.month_locked().subscribe(function(t) {
                          (e.locked = t), e.cd.markForCheck();
                        });
                      }
                    },
                    {
                      key: 'getLogsReport',
                      value: function() {
                        var e = this;
                        this.pmisService.logsReport().subscribe(function(t) {
                          (e.logs = t), e.cd.markForCheck();
                        });
                      }
                    },
                    {
                      key: 'getSummary',
                      value: function() {
                        var e = this;
                        this.pmisService.summary_all().subscribe(function(t) {
                          (e.summary = t),
                            (e.rowData = t),
                            console.log(e.summary),
                            e.cd.markForCheck();
                        });
                      }
                    },
                    {
                      key: 'currencyFormatter',
                      value: function(e) {
                        var t = parseFloat(e.value);
                        return null == e.value
                          ? null
                          : t.toLocaleString('en-us', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }) + ' %';
                      }
                    },
                    {
                      key: 'graph',
                      value: function() {
                        alert('hello');
                      }
                    },
                    {
                      key: 'ngOnInit',
                      value: function() {
                        this.getSummary(),
                          this.getLocked(),
                          this.getLogsReport();
                      }
                    }
                  ]),
                  e
                );
              })()),
              (k.ɵfac = function(e) {
                return new (e || k)(s.Ob(u.a), s.Ob(s.h));
              }),
              (k.ɵcmp = s.Ib({
                type: k,
                selectors: [['anms-dashboard']],
                decls: 44,
                vars: 16,
                consts: [
                  [1, 'container'],
                  [1, 'row'],
                  [1, 'col-md-12', 3, 'ngClass'],
                  [1, 'main-heading'],
                  [
                    'id',
                    'myGrid',
                    1,
                    'ag-theme-alpine',
                    2,
                    'width',
                    '100%',
                    'height',
                    '400px',
                    'margin-bottom',
                    '20px',
                    3,
                    'columnDefs',
                    'columnTypes',
                    'defaultColDef',
                    'context',
                    'autoGroupColumnDef',
                    'rowSelection',
                    'frameworkComponents',
                    'components',
                    'modules',
                    'rowData',
                    'gridReady'
                  ],
                  ['agGrid', ''],
                  [1, 'col-md-4', 3, 'ngClass'],
                  [2, 'height', '500px', 'overflow', 'auto'],
                  [1, 'table', 'tableFixHead'],
                  ['scope', 'col'],
                  [4, 'ngFor', 'ngForOf'],
                  [1, 'col-md-8', 3, 'ngClass'],
                  ['class', 'closed', 4, 'ngIf'],
                  ['class', 'opened', 4, 'ngIf'],
                  [1, 'closed'],
                  [1, 'opened'],
                  [3, 'ngClass']
                ],
                template: function(e, t) {
                  1 & e &&
                    (s.Tb(0, 'div', 0),
                    s.Tb(1, 'div', 1),
                    s.Tb(2, 'div', 2),
                    s.Pb(3, 'br'),
                    s.Tb(4, 'h1', 3),
                    s.Bc(5, 'PMIS Dashboard'),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Tb(6, 'div', 1),
                    s.Tb(7, 'div', 2),
                    s.Tb(8, 'mat-card'),
                    s.Tb(9, 'h3'),
                    s.Bc(10, 'Percentage Summary'),
                    s.Sb(),
                    s.Tb(11, 'ag-grid-angular', 4, 5),
                    s.bc('gridReady', function(e) {
                      return t.onGridReady(e);
                    }),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Tb(13, 'div', 1),
                    s.Tb(14, 'div', 6),
                    s.Tb(15, 'mat-card', 7),
                    s.Tb(16, 'h3'),
                    s.Bc(17, 'Physical Inputting Status'),
                    s.Sb(),
                    s.Tb(18, 'table', 8),
                    s.Tb(19, 'thead'),
                    s.Tb(20, 'tr'),
                    s.Tb(21, 'th', 9),
                    s.Bc(22, 'Month '),
                    s.Sb(),
                    s.Tb(23, 'th', 9),
                    s.Bc(24, 'Status'),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Tb(25, 'tbody'),
                    s.zc(26, y, 6, 3, 'tr', 10),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Tb(27, 'div', 11),
                    s.Tb(28, 'mat-card', 7),
                    s.Tb(29, 'h3'),
                    s.Bc(30, 'Logs Report - last updated'),
                    s.Sb(),
                    s.Tb(31, 'table', 8),
                    s.Tb(32, 'thead'),
                    s.Tb(33, 'tr'),
                    s.Tb(34, 'th', 9),
                    s.Bc(35, 'Banner/OUs'),
                    s.Sb(),
                    s.Tb(36, 'th', 9),
                    s.Bc(37, 'Obligation'),
                    s.Sb(),
                    s.Tb(38, 'th', 9),
                    s.Bc(39, 'Physical'),
                    s.Sb(),
                    s.Tb(40, 'th', 9),
                    s.Bc(41, 'Disbursement'),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Tb(42, 'tbody'),
                    s.zc(43, T, 13, 21, 'tr', 10),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Sb(),
                    s.Sb()),
                    2 & e &&
                      (s.Bb(2),
                      s.lc('ngClass', t.routeAnimationsElements),
                      s.Bb(5),
                      s.lc('ngClass', t.routeAnimationsElements),
                      s.Bb(4),
                      s.lc('columnDefs', t.columnDefs)(
                        'columnTypes',
                        t.columnTypes
                      )('defaultColDef', t.defaultColDef)('context', t.context)(
                        'autoGroupColumnDef',
                        t.autoGroupColumnDef
                      )('rowSelection', t.rowSelection)(
                        'frameworkComponents',
                        t.frameworkComponents
                      )('components', t.components)('modules', t.modules)(
                        'rowData',
                        t.rowData
                      ),
                      s.Bb(3),
                      s.lc('ngClass', t.routeAnimationsElements),
                      s.Bb(12),
                      s.lc('ngForOf', t.locked),
                      s.Bb(1),
                      s.lc('ngClass', t.routeAnimationsElements),
                      s.Bb(16),
                      s.lc('ngForOf', t.logs));
                },
                directives: [o.i, p.a, f.a, o.j, o.k],
                pipes: [o.s, g.b],
                styles: [
                  '.image[_ngcontent-%COMP%]{width:50%;height:100%;-o-object-fit:cover;object-fit:cover}mat-card[_ngcontent-%COMP%]{margin-bottom:20px;margin-top:20px}.center[_ngcontent-%COMP%]{text-align:center;font-size:1.5vw}.opened[_ngcontent-%COMP%]{color:green}.closed[_ngcontent-%COMP%]{color:red}@media screen and (max-width:750px){.center[_ngcontent-%COMP%]{font-size:4vw}}table[_ngcontent-%COMP%]{border-collapse:collapse;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:8px 16px}th[_ngcontent-%COMP%]{background:#eee}h1[_ngcontent-%COMP%]{border-radius:25px;border:3px solid #73ad21;padding:10px;text-align:center}'
                ],
                changeDetection: 0
              })),
              k),
            data: { title: 'Dashboard' }
          },
          { path: 'chart/:pid/:name', component: d, data: { title: 'Chart' } }
        ],
        _ =
          (((w = function e() {
            _classCallCheck(this, e);
          }).ɵmod = s.Mb({ type: w })),
          (w.ɵinj = s.Lb({
            factory: function(e) {
              return new (e || w)();
            },
            imports: [[i.l.forChild(B)], i.l]
          })),
          w),
        D = a('xDfr');
      a.d(t, 'DashboardModule', function() {
        return F;
      });
      var O,
        F =
          (((O = function e() {
            _classCallCheck(this, e);
          }).ɵmod = s.Mb({ type: O })),
          (O.ɵinj = s.Lb({
            factory: function(e) {
              return new (e || O)();
            },
            imports: [
              [o.c, c.a, _, g.a, D.AdminModule, f.b.withComponents([h])]
            ]
          })),
          O);
    }
  }
]);
