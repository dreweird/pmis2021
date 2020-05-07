const express = require('express');
const compression = require('compression');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Body parser for fetch posted data
const async = require('async');
const path = require('path');
var staticRoot = __dirname + './dist_local';
const jwt = require('jsonwebtoken');
const CONTEXT = '/angular-ngrx-material-starter';
const PORT = 7231;

const app = express();
const middleware = require('./utils');

app.use(compression());
app.use(require('cors')());
app.use(CONTEXT, express.static(__dirname + '/dist_local'));
app.use('/', express.static(__dirname + '/dist_local'));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(PORT, 'localhost', () =>
  console.log(`App running on local network localhost:${PORT}/${CONTEXT}`)
);

var db_config = {
  // host: '172.16.130.10',
  // user: 'pmis',
  // password: 'pmis',
  // database: 'raw_dasystem2020',

  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'rafcdatabase',
  multipleStatements: true
};

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function(err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  var query = 'SELECT * FROM ?? WHERE ??=? and ??=?';
  var table = [
    'usertable',
    'username',
    req.body.username,
    'password',
    req.body.password
  ];
  query = mysql.format(query, table);
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (rows.length != 0) {
      var token = jwt.sign({ data: rows[0].username }, 'rafc2020', {
        expiresIn: '3 days'
      });
      res.status(200).json({
        user_id: rows[0].id,
        type: rows[0].type,
        // pid: rows[0].program_id,
        // b: rows[0].budget,
        username: rows[0].username,
        fname: rows[0].fname,
        lname: rows[0].lname,
        token: token
      });
    } else {
      res.status(400).json('Invalid Username or Password');
    }
  });
});

app.post('/mfos', middleware.checkToken, function(req, res) {
  var query = `
      SELECT *, tbl_mfo.mfo_id FROM tbl_mfo left JOIN tbl_allotment 
      on tbl_mfo.mfo_id = tbl_allotment.mfo_id 
      LEFT JOIN tbl_object 
      on tbl_allotment.object_id=tbl_object.object_id where program_id = ?
      order by tbl_mfo.sequence, tbl_mfo.mfo_id,  tbl_allotment.id ASC`; //tbl_allotment.object_id
  var data = [req.body.pid];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});
app.post('/syncPhysicalDistrict', middleware.checkToken, function(req, res) {
  //console.log(req);
  connection.query(
    `SELECT * FROM tbl_mfo where program_id = 5 and area = 1 `,
    req.body.pid,
    function(error, results) {
      if (error) throw error;
      async.each(
        results,
        function(row, callback) {
          connection.query(
            `
        SELECT sum(jan) as jan, sum(feb) as feb, sum(mar) as mar, sum(apr) as apr,
        sum(may) as may, sum(jun) as jun, sum(jul) as jul, sum(aug) as aug,
        sum(sep) as sep, sum(oct) as oct, sum(nov) as nov, sum(dece) as dece
         FROM tbl_district where mfo_id = ?`,
            row.mfo_id,
            function(error, results) {
              if (error) throw error;
              var res = results[0];
              var data = [
                res.jan,
                res.feb,
                res.mar,
                res.apr,
                res.may,
                res.jun,
                res.jul,
                res.aug,
                res.sep,
                res.oct,
                res.nov,
                res.dece,
                row.mfo_id
              ];
              connection.query(
                `Update tbl_mfo set jana = ?, feba = ?, mara=?, apra=?, maya=?,
          juna=?, jula=?, auga=?, sepa=?, octa=?, nova=?, deca=? where mfo_id=?`,
                data,
                function(err, results) {
                  if (error) throw error;
                  callback();
                }
              );
            }
          );
        },
        function(err) {
          if (err) throw err;
          res.status(200).json('Successfully Sync!');
        }
      );
    }
  );
});

app.post('/mfosPhysical', middleware.checkToken, function(req, res) {
  connection.query(
    `SELECT * FROM tbl_mfo, tbl_quarter where program_id =` +
      req.body.pid +
      ' order by sequence, mfo_id ASC',
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get('/getObjectCode', middleware.checkToken, function(req, res) {
  connection.query(
    `
    SELECT * FROM tbl_object order by object_id ASC`,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post('/getLogs', middleware.checkToken, function(req, res) {
  var query =
    'SELECT * FROM tbl_logs where pid = ? and beds = ? order by date DESC';
  var data = [req.body.pid, req.body.beds];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    res.json(rows);
  });
});

//get district accomplishment in BED2
app.post('/getDistrictAccomp', middleware.checkToken, function(req, res) {
  console.log(req.body);
  var query =
    'SELECT * FROM tbl_mfo INNER JOIN tbl_district on tbl_mfo.mfo_id = tbl_district.mfo_id, tbl_quarter WHERE tbl_district.mfo_id = ?';
  var data = [req.body.data.mfo_id];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    res.json(rows);
  });
});

app.get('/logsReport', function(req, res) {
  connection.query(
    'SELECT username, pid FROM tbl_logs left join users on tbl_logs.pid = users.program_id WHERE users.budget = 0  and users.program_id != 21 GROUP by tbl_logs.pid',
    function(error, rows) {
      if (error) throw error;
      async.each(
        rows,
        function(row, callback) {
          var query =
            'SELECT date, message FROM tbl_logs where beds = 1 and pid = ? ORDER BY id DESC LIMIT 1';
          connection.query(query, row.pid, function(err, beds) {
            if (err) throw err;
            if (beds[0] === undefined) {
              row.bed1 = { date: null, message: null };
            } else {
              row.bed1 = { date: beds[0].date, message: beds[0].message };
            }
          });
          var query =
            'SELECT date, message FROM tbl_logs where beds = 2 and pid = ? ORDER BY id DESC LIMIT 1';
          connection.query(query, row.pid, function(err, beds) {
            if (err) throw err;
            if (beds[0] === undefined) {
              row.bed2 = { date: null, message: null };
            } else {
              row.bed2 = { date: beds[0].date, message: beds[0].message };
            }
          });
          var query =
            'SELECT date, message FROM tbl_logs where beds = 3 and pid = ? ORDER BY id DESC LIMIT 1';
          connection.query(query, row.pid, function(err, beds) {
            if (err) throw err;
            if (beds[0] === undefined) {
              row.bed3 = { date: null, message: null };
            } else {
              row.bed3 = { date: beds[0].date, message: beds[0].message };
            }
            callback();
          });
        },
        function(err) {
          if (err) {
            console.log('A file failed to process');
          } else {
            res.send(rows);
          }
        }
      );
    }
  );
});

app.post('/getDistrict', middleware.checkToken, function(req, res) {
  var query =
    'SELECT * FROM tbl_mfo INNER JOIN tbl_district on tbl_mfo.mfo_id = tbl_district.mfo_id WHERE tbl_mfo.program_id = ? group by tbl_mfo.mfo_id';
  var data = [req.body.pid];
  var datares = {};
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    var province = [
      'Agusan del Norte',
      'Agusan del Sur',
      'Surigao del Norte',
      'Surigao del Sur',
      'Province of Dinagat Islands',
      'Butuan City'
    ];
    var itemsProcessed = 0;
    async.each(rows, function(row, callback) {
      var mfo_id = row.mfo_id;
      //console.log(mfo_id);
      var districtFunction = function(prov, callback) {
        var arr = [];
        async.parallel(
          {
            one: function(callback) {
              var sql = `SELECT SUM(accomp) as accomp, GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text,
                        GROUP_CONCAT(CASE WHEN accomp>0 THEN CONCAT(municipal, '(', accomp,')') ELSE NULL END  SEPARATOR ", " ) as text2, mfo_id,province,district,sum(target) as target ,cost
                        FROM (SELECT mfo_id,province,district,sum(target) as target ,cost,municipal,  (sum(jan) + sum(feb) + sum(mar) + sum(apr) + sum(may) + sum(jun) + sum(jul) + sum(aug) + sum(sep) + sum(oct) + sum(nov) + sum(dece) ) as accomp FROM  tbl_district 
                        where mfo_id = ? and province= ? and district=1 GROUP by municipal)  AS d GROUP BY mfo_id,province,district`;
              connection.query(String(sql), [mfo_id, prov], function(
                k_err,
                k_rows
              ) {
                if (k_err) console.error(k_err);
                if (k_rows[0] === undefined) {
                  callback(null, {
                    accomp: null,
                    cost: null,
                    target: null,
                    text: null,
                    text2: null
                  });
                } else {
                  callback(null, k_rows[0]);
                }
              });
            },
            two: function(callback) {
              var sql = `SELECT SUM(accomp) as accomp, GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text,
                        GROUP_CONCAT(CASE WHEN accomp>0 THEN CONCAT(municipal, '(', accomp,')') ELSE NULL END  SEPARATOR ", " ) as text2, mfo_id,province,district,sum(target) as target ,cost
                        FROM (SELECT mfo_id,province,district,sum(target) as target ,cost,municipal,  (sum(jan) + sum(feb) + sum(mar) + sum(apr) + sum(may) + sum(jun) + sum(jul) + sum(aug) + sum(sep) + sum(oct) + sum(nov) + sum(dece) ) as accomp FROM  tbl_district 
                        where mfo_id = ? and province= ? and district=2 GROUP by municipal)  AS d GROUP BY mfo_id,province,district`;
              console.log(sql);
              connection.query(String(sql), [mfo_id, prov], function(
                k_err,
                k_rows
              ) {
                if (k_err) console.error(k_err);
                if (k_rows[0] === undefined) {
                  callback(null, {
                    accomp: null,
                    cost: null,
                    target: null,
                    text: null
                  });
                } else {
                  callback(null, k_rows[0]);
                }
              });
            }
            // three: function(callback) {
            //     var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp ,
            //     GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text
            //     FROM tbl_district where mfo_id = ? and province=? and district=1 and accomp>0 GROUP BY mfo_id,province,district`;
            //     connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
            //         if(k_err) console.error(k_err);
            //          callback(null, k_rows[0]);
            //     });
            // },
            //  four: function(callback) {
            //     var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp ,
            //     GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text
            //     FROM tbl_district where mfo_id = ? and province=? and district=2 and accomp>0 GROUP BY mfo_id,province,district`;
            //     connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
            //         if(k_err) console.error(k_err);
            //          callback(null, k_rows[0]);
            //     });

            // }
          },
          function(err, results) {
            return callback(null, results);
          }
        );
      };

      async.map(province, districtFunction, function(err, result) {
        console.log(result);
        itemsProcessed++;
        row.dist = result;
        if (itemsProcessed === rows.length) {
          datares['data'] = rows;
          res.json(rows);
        }

        /*row.area=result;
                itemsProcessed++;
                if(itemsProcessed === rows.length) {
                    datares["data"] =  rows;
                    res.json(datares);                           
                }*/
      });
    });
    if (rows.length <= 0) res.json(rows);

    if (err) throw res.status(400).json(err);
    //res.json(rows);
  });
});

app.post('/getDistrictDetails', middleware.checkToken, function(req, res) {
  var query =
    'SELECT * FROM tbl_district left join tbl_mfo on tbl_district.mfo_id = tbl_mfo.mfo_id  WHERE province like(?) and district = ? and tbl_district.mfo_id = ?';
  var data = req.body.data;
  console.log(data);
  query = mysql.format(query, [data.province, data.district, data.mfo_id]);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.length > 0) {
      res.json(rows);
    }
  });
});

app.post('/updateDistrictDetails', middleware.checkToken, function(req, res) {
  var query = 'UPDATE tbl_district SET ?? = ? WHERE id = ?';
  var data = [req.body.col, req.body.value, req.body.id];

  //console.log(data);
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    console.log(rows);
    if (err) throw res.status(400).json(err);
    if (rows.affectedRows > 0) {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.post('/lastUpdated', middleware.checkToken, function(req, res) {
  var query =
    'SELECT date FROM tbl_logs where pid = ? and beds = ? ORDER BY date DESC LIMIT 1 ';
  var data = [req.body.pid, req.body.beds];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.length > 0) {
      res.json(rows[0].date);
    } else {
      res.json(null);
    }
  });
});

app.post('/addObject', middleware.checkToken, function(req, res) {
  var query =
    'INSERT INTO tbl_allotment (mfo_id, object_id, pid) VALUES (?,?,?)';
  var data = [req.body.mfo_id, req.body.object_id, req.body.pid];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.insertId) {
      res.status(200).json(rows.insertId);
    }
  });
});

app.post('/addLogs', middleware.checkToken, function(req, res) {
  var query =
    'INSERT INTO tbl_logs (pid, mfo_id, message, date, beds) VALUES (?, ?, ?, NOW(), ?)';
  var data = [req.body.pid, req.body.mfo_id, req.body.message, req.body.beds];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.insertId) {
      res.status(200).json('Successfully Logs Added!');
    }
  });
});

app.post('/updateAllotment', middleware.checkToken, function(req, res) {
  var query = 'UPDATE tbl_allotment SET ?? = ? WHERE id = ?';
  var data = [req.body.col, req.body.value, req.body.id];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.changedRows) {
      res.status(200).json('Successfully Updated!');
    }
  });
});

app.post('/updatePhysical', middleware.checkToken, function(req, res) {
  var query = 'UPDATE tbl_mfo SET ?? = ? WHERE mfo_id = ?';
  var data = [req.body.col, req.body.value, req.body.id];
  query = mysql.format(query, data);
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) throw res.status(400).json(err);
    if (rows.changedRows) {
      res.status(200).json('Successfully Updated!');
    }
  });
});

app.post('/summaryObject', middleware.checkToken, function(req, res) {
  connection.query(
    `  
      SELECT a.object_id, b.name, b.type, b.header, SUM(budget) as budget, SUM(adjustment) as adj, SUM(jan) as jan, SUM(feb) as feb, SUM(mar) as mar, SUM(apr) as apr, SUM(may) as may, SUM(jun) as jun, SUM(jul) as jul, SUM(aug) as aug, SUM(sep) as sep, SUM(oct) as oct, SUM(nov) as nov, SUM(decm) as decm, SUM(jan_da) as jan_da, SUM(feb_da) as feb_da, SUM(mar_da) as mar_da, SUM(apr_da) as apr_da, SUM(may_da) as may_da, SUM(jun_da) as jun_da, SUM(jul_da) as jul_da, SUM(aug_da) as aug_da, SUM(sep_da) as sep_da, SUM(oct_da) as oct_da, SUM(nov_da) as nov_da, SUM(dec_da) as dec_da FROM tbl_allotment a LEFT JOIN tbl_object b ON a.object_id = b.object_id 
       where pid =` +
      req.body.pid +
      ` GROUP BY a.object_id
      `,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post('/getFinPerformance', function(req, res) {
  connection.query(
    `
    SELECT b.pid, a.name, a.ft, a.janft, a.febft, a.marft, a.aprft, a.mayft, a.junft, a.julft, a.augft, a.sepft, a.octft, a.novft, a.decft, 
    a.dt, a.jandt, a.febdt, a.mardt, a.aprdt, a.maydt, a.jundt, a.juldt, a.augdt, a.sepdt, a.octdt, a.novdt, a.decdt, 
    a.pt, a.jant, a.febt, a.mart, a.aprt, a.mayt, a.junt, a.jult, a.augt, a.sept, a.octt, a.novt, a.dect, 
    a.pa, a.jana, a.feba, a.mara, a.apra, a.maya, a.juna, a.jula, a.auga, a.sepa, a.octa, a.nova, a.deca, 
    sum((b.jan + b.feb + b.mar + b.apr + b.may + b.jun + b.jul + b.aug + b.sep + b.oct + b.nov + b.decm)) AS fa ,
    sum(b.jan) as janfa,
    sum(b.feb) as febfa,
    sum(b.mar) as marfa,
    sum(b.apr) as aprfa,
    sum(b.may) as mayfa,
    sum(b.jun) as junfa,
    sum(b.jul) as julfa,
    sum(b.aug) as augfa,
    sum(b.sep) as sepfa,
    sum(b.oct) as octfa,
    sum(b.nov) as novfa,
    sum(b.decm) as decfa,
    sum((b.jan_da + b.feb_da + b.mar_da + b.apr_da + b.may_da + b.jun_da + b.jul_da + b.aug_da + b.sep_da + b.oct_da + b.nov_da + b.dec_da)) AS da,
    sum(b.jan_da) as janda,
    sum(b.feb_da) as febda,
    sum(b.mar_da) as marda,
    sum(b.apr_da) as aprda,
    sum(b.may_da) as mayda,
    sum(b.jun_da) as junda,
    sum(b.jul_da) as julda,
    sum(b.aug_da) as augda,
    sum(b.sep_da) as sepda,
    sum(b.oct_da) as octda,
    sum(b.nov_da) as novda,
    sum(b.dec_da) as decda
    FROM tbl_allotment as b left join 
    (   SELECT a.program_id, u.first_name as name, SUM((a.janft + a.febft + a.marft + a.aprft + a.mayft + a.junft + a.julft + a.augft + a.sepft + a.octft + a.novft + a.decft)) AS ft, 
            sum(a.janft) as janft,
            sum(a.febft) as febft, 
            sum(a.marft) as marft, 
            sum(a.aprft) as aprft, 
            sum(a.mayft) as mayft,
            sum(a.junft) as junft,
            sum(a.julft) as julft,
            sum(a.augft) as augft,
            sum(a.sepft) as sepft,
            sum(a.octft) as octft,
            sum(a.novft) as novft,
            sum(a.decft) as decft,
            SUM( (a.jandt + a.febdt + a.mardt + a.aprdt + a.maydt + a.jundt + a.juldt + a.augdt + a.sepdt + a.octdt + a.novdt + a.decdt) ) AS dt,
            sum(a.jandt) as jandt,
            sum(a.febdt) as febdt, 
            sum(a.mardt) as mardt, 
            sum(a.aprdt) as aprdt, 
            sum(a.maydt) as maydt,
            sum(a.jundt) as jundt,
            sum(a.juldt) as juldt,
            sum(a.augdt) as augdt,
            sum(a.sepdt) as sepdt,
            sum(a.octdt) as octdt,
            sum(a.novdt) as novdt,
            sum(a.decdt) as decdt,
            SUM( (a.jant + a.febt + a.mart + a.aprt + a.mayt + a.junt + a.jult + a.augt + a.sept + a.octt + a.novt + a.dect) ) AS pt,
            sum(a.jant) as jant,
            sum(a.febt) as febt, 
            sum(a.mart) as mart, 
            sum(a.aprt) as aprt, 
            sum(a.mayt) as mayt,
            sum(a.junt) as junt,
            sum(a.jult) as jult,
            sum(a.augt) as augt,
            sum(a.sept) as sept,
            sum(a.octt) as octt,
            sum(a.novt) as novt,
            sum(a.dect) as dect,
            SUM( (a.jana + a.feba + a.mara + a.apra + a.maya + a.juna + a.jula + a.auga + a.sepa + a.octa + a.nova + a.deca) ) AS pa,
            sum(a.jana) as jana,
            sum(a.feba) as feba, 
            sum(a.mara) as mara, 
            sum(a.apra) as apra, 
            sum(a.maya) as maya,
            sum(a.juna) as juna,
            sum(a.jula) as jula,
            sum(a.auga) as auga,
            sum(a.sepa) as sepa,
            sum(a.octa) as octa,
            sum(a.nova) as nova,
            sum(a.deca) as deca
            FROM  tbl_mfo AS a left join users as u on  a.program_id = u.program_id
			where u.budget = 0
            GROUP BY a.program_id) as a on a.program_id = b.pid
    where pid=` + req.body.pid,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get('/getFinPerformance', function(req, res) {
  connection.query(
    `
    SELECT b.pid, a.name, a.ft, a.janft, a.febft, a.marft, a.aprft, a.mayft, a.junft, a.julft, a.augft, a.sepft, a.octft, a.novft, a.decft, 
    a.dt, a.jandt, a.febdt, a.mardt, a.aprdt, a.maydt, a.jundt, a.juldt, a.augdt, a.sepdt, a.octdt, a.novdt, a.decdt, 
    a.pt, a.jant, a.febt, a.mart, a.aprt, a.mayt, a.junt, a.jult, a.augt, a.sept, a.octt, a.novt, a.dect, 
    a.pa, a.jana, a.feba, a.mara, a.apra, a.maya, a.juna, a.jula, a.auga, a.sepa, a.octa, a.nova, a.deca, 
    sum((b.jan + b.feb + b.mar + b.apr + b.may + b.jun + b.jul + b.aug + b.sep + b.oct + b.nov + b.decm)) AS fin ,
    sum(b.jan) as janfa,
    sum(b.feb) as febfa,
    sum(b.mar) as marfa,
    sum(b.apr) as aprfa,
    sum(b.may) as mayfa,
    sum(b.jun) as junfa,
    sum(b.jul) as julfa,
    sum(b.aug) as augfa,
    sum(b.sep) as sepfa,
    sum(b.oct) as octfa,
    sum(b.nov) as novfa,
    sum(b.decm) as decfa,
    sum((b.jan_da + b.feb_da + b.mar_da + b.apr_da + b.may_da + b.jun_da + b.jul_da + b.aug_da + b.sep_da + b.oct_da + b.nov_da + b.dec_da)) AS dis,
    sum(b.jan_da) as janda,
    sum(b.feb_da) as febda,
    sum(b.mar_da) as marda,
    sum(b.apr_da) as aprda,
    sum(b.may_da) as mayda,
    sum(b.jun_da) as junda,
    sum(b.jul_da) as julda,
    sum(b.aug_da) as augda,
    sum(b.sep_da) as sepda,
    sum(b.oct_da) as octda,
    sum(b.nov_da) as novda,
    sum(b.dec_da) as decda
    FROM tbl_allotment as b left join 
    (   SELECT a.program_id, u.first_name as name, SUM((a.janft + a.febft + a.marft + a.aprft + a.mayft + a.junft + a.julft + a.augft + a.sepft + a.octft + a.novft + a.decft)) AS ft, 
            sum(a.janft) as janft,
            sum(a.febft) as febft, 
            sum(a.marft) as marft, 
            sum(a.aprft) as aprft, 
            sum(a.mayft) as mayft,
            sum(a.junft) as junft,
            sum(a.julft) as julft,
            sum(a.augft) as augft,
            sum(a.sepft) as sepft,
            sum(a.octft) as octft,
            sum(a.novft) as novft,
            sum(a.decft) as decft,
            SUM( (a.jandt + a.febdt + a.mardt + a.aprdt + a.maydt + a.jundt + a.juldt + a.augdt + a.sepdt + a.octdt + a.novdt + a.decdt) ) AS dt,
            sum(a.jandt) as jandt,
            sum(a.febdt) as febdt, 
            sum(a.mardt) as mardt, 
            sum(a.aprdt) as aprdt, 
            sum(a.maydt) as maydt,
            sum(a.jundt) as jundt,
            sum(a.juldt) as juldt,
            sum(a.augdt) as augdt,
            sum(a.sepdt) as sepdt,
            sum(a.octdt) as octdt,
            sum(a.novdt) as novdt,
            sum(a.decdt) as decdt,
            SUM( (a.jant + a.febt + a.mart + a.aprt + a.mayt + a.junt + a.jult + a.augt + a.sept + a.octt + a.novt + a.dect) ) AS pt,
            sum(a.jant) as jant,
            sum(a.febt) as febt, 
            sum(a.mart) as mart, 
            sum(a.aprt) as aprt, 
            sum(a.mayt) as mayt,
            sum(a.junt) as junt,
            sum(a.jult) as jult,
            sum(a.augt) as augt,
            sum(a.sept) as sept,
            sum(a.octt) as octt,
            sum(a.novt) as novt,
            sum(a.dect) as dect,
            SUM( (a.jana + a.feba + a.mara + a.apra + a.maya + a.juna + a.jula + a.auga + a.sepa + a.octa + a.nova + a.deca) ) AS pa,
            sum(a.jana) as jana,
            sum(a.feba) as feba, 
            sum(a.mara) as mara, 
            sum(a.apra) as apra, 
            sum(a.maya) as maya,
            sum(a.juna) as juna,
            sum(a.jula) as jula,
            sum(a.auga) as auga,
            sum(a.sepa) as sepa,
            sum(a.octa) as octa,
            sum(a.nova) as nova,
            sum(a.deca) as deca
            FROM  tbl_mfo AS a left join users as u on  a.program_id = u.program_id
			where u.budget = 0
            GROUP BY a.program_id) as a on a.program_id = b.pid
    group by pid
    `,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get('/', function(req, res) {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

/*
que for summary financial by program

SELECT b.pid, a.ft, sum((b.jan + b.feb + b.mar + b.apr + b.may + b.jun + b.jul + b.aug + b.sep + b.oct + b.nov + b.decm)) AS fin , 
sum((b.jan_da + b.feb_da + b.mar_da + b.apr_da + b.may_da + b.jun_da + b.jul_da + b.aug_da + b.sep_da + b.oct_da + b.nov_da + b.dec_da)) AS dis FROM `tbl_allotment`as b left join 
(SELECT program_id, SUM( (
a.janft + a.febft + a.marft + a.aprft + a.mayft + a.junft + a.julft + a.augft + a.sepft + a.octft + a.novft + a.decft
) ) AS ft
FROM  `tbl_mfo` AS a
GROUP BY program_id) as a on a.program_id = b.pid
group by pid

*/
