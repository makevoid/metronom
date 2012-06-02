(function() {
  var Metronom, Templater, min;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  min = 60000;
  Metronom = (function() {
    function Metronom() {
      this.bpm = 140;
      this.tempo = 4 / 4;
      this.timer;
    }
    Metronom.prototype.start = function() {
      this.bpm;
      return this.tempo;
    };
    Metronom.prototype.stop = function() {};
    return Metronom;
  })();
  Templater = (function() {
    function Templater() {
      this.mustaches = /\{\{(.+)\}\}/;
    }
    Templater.prototype.apply = function() {
      return $("*").each(__bind(function(idx, elem) {
        var match, val;
        val = $(elem).val();
        if (val && (match = val.match(/\{\{(.+)\}\}/))) {
          return $(elem).val(eval(match[1]));
        }
      }, this));
    };
    return Templater;
  })();
  $(function() {
    var metronom, templater;
    metronom = new Metronom();
    window.metronom = metronom;
    templater = new Templater();
    templater.apply();
    return console.log("loaded");
  });
}).call(this);
