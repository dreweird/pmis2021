(window.webpackJsonp = window.webpackJsonp || []).push([
  [8],
  {
    IAk5: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a('2kYt'),
        r = a('PCNd'),
        o = a('sEIs'),
        c = a('EM62'),
        i = a('Xeeh');
      let s = (() => {
        class e {
          constructor(e) {
            (this.route = e),
              (this.pid = 0),
              (this.name = ''),
              (this.pid = Number(this.route.snapshot.paramMap.get('pid'))),
              (this.name = this.route.snapshot.paramMap.get('name'));
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function(t) {
            return new (t || e)(c.Ob(o.a));
          }),
          (e.ɵcmp = c.Ib({
            type: e,
            selectors: [['anms-chart']],
            decls: 2,
            vars: 2,
            consts: [[3, 'pid', 'name']],
            template: function(e, t) {
              1 & e && (c.Pb(0, 'br'), c.Pb(1, 'anms-graph', 0)),
                2 & e && (c.Bb(1), c.lc('pid', t.pid)('name', t.name));
            },
            directives: [i.a],
            styles: [''],
            changeDetection: 0
          })),
          e
        );
      })();
      var d = a('jQNw'),
        l = a('pKmL'),
        m = a('cHbk');
      let b = (() => {
        class e {
          constructor(e) {
            this.router = e;
          }
          agInit(e) {
            this.params = e;
          }
          refresh() {
            return !1;
          }
          navigate() {
            this.router.navigate([
              '/dashboard/chart',
              this.params.data.program_id,
              this.params.data.name
            ]);
          }
        }
        return (
          (e.ɵfac = function(t) {
            return new (t || e)(c.Ob(o.h));
          }),
          (e.ɵcmp = c.Ib({
            type: e,
            selectors: [['ng-component']],
            decls: 2,
            vars: 0,
            consts: [['target', '_blank', 'rel', 'noopener', 3, 'click']],
            template: function(e, t) {
              1 & e &&
                (c.Tb(0, 'a', 0),
                c.bc('click', function(e) {
                  return t.navigate();
                }),
                c.Bc(1, ' See Chart '),
                c.Sb());
            },
            encapsulation: 2,
            changeDetection: 0
          })),
          e
        );
      })();
      var u = a('Meci'),
        h = a('W6oE'),
        p = a('DDFo');
      function g(e, t) {
        1 & e && (c.Tb(0, 'span', 14), c.Bc(1, ' Closed '), c.Sb());
      }
      function f(e, t) {
        1 & e && (c.Tb(0, 'span', 15), c.Bc(1, ' Opened '), c.Sb());
      }
      function S(e, t) {
        if (
          (1 & e &&
            (c.Tb(0, 'tr'),
            c.Tb(1, 'td'),
            c.Bc(2),
            c.Sb(),
            c.Tb(3, 'td'),
            c.zc(4, g, 2, 0, 'span', 12),
            c.zc(5, f, 2, 0, 'span', 13),
            c.Sb(),
            c.Sb()),
          2 & e)
        ) {
          const e = t.$implicit;
          c.Bb(2),
            c.Dc('', e.month, ' '),
            c.Bb(2),
            c.lc('ngIf', 0 == e.checked),
            c.Bb(1),
            c.lc('ngIf', 1 == e.checked);
        }
      }
      const C = function(e) {
        return { closed: e };
      };
      function y(e, t) {
        if (
          (1 & e &&
            (c.Tb(0, 'tr'),
            c.Tb(1, 'td'),
            c.Bc(2),
            c.gc(3, 'uppercase'),
            c.Sb(),
            c.Tb(4, 'td', 16),
            c.Bc(5),
            c.gc(6, 'amTimeAgo'),
            c.Sb(),
            c.Tb(7, 'td', 16),
            c.Bc(8),
            c.gc(9, 'amTimeAgo'),
            c.Sb(),
            c.Tb(10, 'td', 16),
            c.Bc(11),
            c.gc(12, 'amTimeAgo'),
            c.Sb(),
            c.Sb()),
          2 & e)
        ) {
          const e = t.$implicit;
          c.Bb(2),
            c.Cc(c.hc(3, 7, e.username)),
            c.Bb(2),
            c.lc('ngClass', c.nc(15, C, null == e.bed1.date_updated)),
            c.Bb(1),
            c.Dc(' ', c.hc(6, 9, e.bed1.date_updated), ''),
            c.Bb(2),
            c.lc('ngClass', c.nc(17, C, null == e.bed2.date_updated)),
            c.Bb(1),
            c.Dc(' ', c.hc(9, 11, e.bed2.date_updated), ''),
            c.Bb(2),
            c.lc('ngClass', c.nc(19, C, null == e.bed3.date_updated)),
            c.Bb(1),
            c.Dc(' ', c.hc(12, 13, e.bed3.date_updated), '');
        }
      }
      const T = [
        {
          path: '',
          component: (() => {
            class e {
              constructor(e, t) {
                (this.pmisService = e),
                  (this.cd = t),
                  (this.routeAnimationsElements = l.d),
                  (this.modules = m.a),
                  (this.columnDefs = [
                    { headerName: 'Banner/Ous', field: 'name', pinned: 'left' },
                    {
                      headerName: 'Physical',
                      children: [
                        {
                          headerName: 'MidYear',
                          type: 'numericColumn',
                          valueFormatter: this.currencyFormatter,
                          width: 120,
                          valueGetter: function(e) {
                            let t = e.data;
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
                            let t = e.data;
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
                            let t = e.data;
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
                            let t = e.data;
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
                            let t = e.data;
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
                            let t = e.data;
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
                  (this.frameworkComponents = { graphCellRenderer: b });
              }
              onGridReady(e) {
                (this.gridApi = e.api), (this.gridColumnApi = e.columnApi);
              }
              getLocked() {
                this.pmisService.month_locked().subscribe(e => {
                  (this.locked = e), this.cd.markForCheck();
                });
              }
              getLogsReport() {
                this.pmisService.logsReport().subscribe(e => {
                  (this.logs = e), this.cd.markForCheck();
                });
              }
              getSummary() {
                this.pmisService.summary_all().subscribe(e => {
                  (this.summary = e),
                    (this.rowData = e),
                    console.log(this.summary),
                    this.cd.markForCheck();
                });
              }
              currencyFormatter(e) {
                const t = parseFloat(e.value);
                return null == e.value
                  ? null
                  : t.toLocaleString('en-us', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) + ' %';
              }
              graph() {
                alert('hello');
              }
              ngOnInit() {
                this.getSummary(), this.getLocked(), this.getLogsReport();
              }
            }
            return (
              (e.ɵfac = function(t) {
                return new (t || e)(c.Ob(d.a), c.Ob(c.h));
              }),
              (e.ɵcmp = c.Ib({
                type: e,
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
                    (c.Tb(0, 'div', 0),
                    c.Tb(1, 'div', 1),
                    c.Tb(2, 'div', 2),
                    c.Pb(3, 'br'),
                    c.Tb(4, 'h1', 3),
                    c.Bc(5, 'PMIS Dashboard'),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Tb(6, 'div', 1),
                    c.Tb(7, 'div', 2),
                    c.Tb(8, 'mat-card'),
                    c.Tb(9, 'h3'),
                    c.Bc(10, 'Percentage Summary'),
                    c.Sb(),
                    c.Tb(11, 'ag-grid-angular', 4, 5),
                    c.bc('gridReady', function(e) {
                      return t.onGridReady(e);
                    }),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Tb(13, 'div', 1),
                    c.Tb(14, 'div', 6),
                    c.Tb(15, 'mat-card', 7),
                    c.Tb(16, 'h3'),
                    c.Bc(17, 'Physical Inputting Status'),
                    c.Sb(),
                    c.Tb(18, 'table', 8),
                    c.Tb(19, 'thead'),
                    c.Tb(20, 'tr'),
                    c.Tb(21, 'th', 9),
                    c.Bc(22, 'Month '),
                    c.Sb(),
                    c.Tb(23, 'th', 9),
                    c.Bc(24, 'Status'),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Tb(25, 'tbody'),
                    c.zc(26, S, 6, 3, 'tr', 10),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Tb(27, 'div', 11),
                    c.Tb(28, 'mat-card', 7),
                    c.Tb(29, 'h3'),
                    c.Bc(30, 'Logs Report - last updated'),
                    c.Sb(),
                    c.Tb(31, 'table', 8),
                    c.Tb(32, 'thead'),
                    c.Tb(33, 'tr'),
                    c.Tb(34, 'th', 9),
                    c.Bc(35, 'Banner/OUs'),
                    c.Sb(),
                    c.Tb(36, 'th', 9),
                    c.Bc(37, 'Obligation'),
                    c.Sb(),
                    c.Tb(38, 'th', 9),
                    c.Bc(39, 'Physical'),
                    c.Sb(),
                    c.Tb(40, 'th', 9),
                    c.Bc(41, 'Disbursement'),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Tb(42, 'tbody'),
                    c.zc(43, y, 13, 21, 'tr', 10),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Sb(),
                    c.Sb()),
                    2 & e &&
                      (c.Bb(2),
                      c.lc('ngClass', t.routeAnimationsElements),
                      c.Bb(5),
                      c.lc('ngClass', t.routeAnimationsElements),
                      c.Bb(4),
                      c.lc('columnDefs', t.columnDefs)(
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
                      c.Bb(3),
                      c.lc('ngClass', t.routeAnimationsElements),
                      c.Bb(12),
                      c.lc('ngForOf', t.locked),
                      c.Bb(1),
                      c.lc('ngClass', t.routeAnimationsElements),
                      c.Bb(16),
                      c.lc('ngForOf', t.logs));
                },
                directives: [n.i, u.a, h.a, n.j, n.k],
                pipes: [n.s, p.b],
                styles: [
                  '.image[_ngcontent-%COMP%]{width:50%;height:100%;-o-object-fit:cover;object-fit:cover}mat-card[_ngcontent-%COMP%]{margin-bottom:20px;margin-top:20px}.center[_ngcontent-%COMP%]{text-align:center;font-size:1.5vw}.opened[_ngcontent-%COMP%]{color:green}.closed[_ngcontent-%COMP%]{color:red}@media screen and (max-width:750px){.center[_ngcontent-%COMP%]{font-size:4vw}}table[_ngcontent-%COMP%]{border-collapse:collapse;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:8px 16px}th[_ngcontent-%COMP%]{background:#eee}h1[_ngcontent-%COMP%]{border-radius:25px;border:3px solid #73ad21;padding:10px;text-align:center}'
                ],
                changeDetection: 0
              })),
              e
            );
          })(),
          data: { title: 'Dashboard' }
        },
        { path: 'chart/:pid/:name', component: s, data: { title: 'Chart' } }
      ];
      let v = (() => {
        class e {}
        return (
          (e.ɵmod = c.Mb({ type: e })),
          (e.ɵinj = c.Lb({
            factory: function(t) {
              return new (t || e)();
            },
            imports: [[o.l.forChild(T)], o.l]
          })),
          e
        );
      })();
      var w = a('xDfr');
      a.d(t, 'DashboardModule', function() {
        return B;
      });
      let B = (() => {
        class e {}
        return (
          (e.ɵmod = c.Mb({ type: e })),
          (e.ɵinj = c.Lb({
            factory: function(t) {
              return new (t || e)();
            },
            imports: [
              [n.c, r.a, v, p.a, w.AdminModule, h.b.withComponents([b])]
            ]
          })),
          e
        );
      })();
    }
  }
]);
