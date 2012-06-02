(function() {
  var Metronom, Templater, min;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  min = 60000;
  Metronom = (function() {
    function Metronom() {
      this.bpm = 140;
      this.tempo = "4/4";
      this.delay = function() {
        return min / this.bpm * 1.2;
      };
      this.tin = $("#tin").get(0);
      this.clap = $("#clap").get(0);
      this.status = "paused";
      this.bind_buttons();
      this.watch_inputs();
      this.tin_count = 0;
    }
    Metronom.prototype.bind_buttons = function() {
      $("#playpause, #bpm, #tempo").off("click");
      return $("#playpause").on("click", __bind(function() {
        if (this.status === "paused") {
          this.start();
          return $("#playpause").html("||");
        } else {
          this.stop();
          return $("#playpause").html(">");
        }
      }, this));
    };
    Metronom.prototype.watch_inputs = function() {
      return $("#bpm").on("change", __bind(function() {
        this.bpm = $("#bpm").val();
        this.reset();
        clearInterval(this.timeout);
        return this.play_tin();
      }, this));
    };
    Metronom.prototype.start = function() {
      return this.play_loop = this.play_tin();
    };
    Metronom.prototype.reset = function() {
      this.tin.pause();
      this.tin.currenTime = 0;
      this.clap.pause();
      return this.clap.currenTime = 0;
    };
    Metronom.prototype.play = function() {
      this.tin_count += 1;
      if (this.tin_count >= 4) {
        this.tin.play();
        return this.tin_count = 0;
      } else {
        return this.clap.play();
      }
    };
    Metronom.prototype.play_tin = function() {
      this.status = "playing";
      return this.timeout = setInterval(__bind(function() {
        if (this.status === "paused") {
          clearInterval(this.timeout);
        }
        this.play();
        return console.log(this.delay());
      }, this), this.delay());
    };
    Metronom.prototype.stop = function() {
      return this.status = "paused";
    };
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
