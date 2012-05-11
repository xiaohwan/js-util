/*jslint browser:true*/
(function(ns) {
  window[ns] = {};
  var util = window[ns],
  _intervalCheck = function(obr) {
    if (obr.max === null || (++obr.cnt) < obr.max) {
      var rst = typeof(obr.cdt) == 'function' ? obr.cdt.call(obr) : obr.cdt;
      if (rst) {
        try {
          obr.fct.call(obr);
        } catch(ex) {
          /**
           * Continue on exception?
           */
          /*
          setTimeout(function() {
            _intervalCheck(obr);
          },
          0);
          */
          console.log(ex);
        }
      } else {
        setTimeout(function() {
          _intervalCheck(obr);
        },
        50);
      }
    } else if (obr.or) {
      obr.or.call(obr);
    }
  };
  util.wait = function(cdt) {
    return {
      then: function(fct) {
        var obr = {
          cdt: cdt,
          fct: fct,
          max: null,
          start: new Date(),
          expire: null,
          cnt: 0
        };
        _intervalCheck(obr);
        return {
          max: function(num) {
            obr.max = num;
            return {
              or: function(fct) {
                obr.or = fct;
              }
            };
          }
        };
      }
    };
  };
} ('util'));

