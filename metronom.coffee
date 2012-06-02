min = 60000

class Metronom
	constructor: ->
		@bpm = 140
		@tempo = "4/4"
		@delay = -> min / @bpm * 1.3
		@tin = $("#tin").get(0)
		@clap = $("#clap").get(0)
		@status = "paused"
		@bind_buttons()
		@watch_inputs()
		@tin_count = 0
		
	bind_buttons: ->
	  $("#playpause, #bpm, #tempo").off "click"
	  $("#playpause").on "click", => 
	    if @status == "paused"
	      @start() 
	      $("#playpause").html("||")
	    else  
	      @stop()	    	    	
	      $("#playpause").html(">")
	  
	watch_inputs: ->  
    $("#bpm").on "change", =>
      @bpm = $("#bpm").val()
      @reset()
      clearTimeout(@timeout)
      @play_tin()
	  
	start: ->
		@play_loop = @play_tin()
		
	reset: ->
    @tin.pause()
    @tin.currenTime = 0
    @clap.pause()
    @clap.currenTime = 0
    
  play: ->
  	@tin_count += 1
  	if @tin_count >= 4
  	  @tin.play()
  	  @tin_count = 0
  	else
  	  @clap.play()
		
	play_tin: ->
    @status = "playing"
    @play()
    @timeout = setTimeout =>
      @reset()
      return if @status == "paused"
      @play_tin()
      console.log @delay()
    , @delay()
		
	stop: ->
  	@status = "paused"
	
	

class Templater
  constructor: ->
    @mustaches = /\{\{(.+)\}\}/
    
  apply: ->
    $("*").each (idx, elem) =>
      val = $(elem).val()
      if val && match = val.match(/\{\{(.+)\}\}/)
        $(elem).val eval(match[1])
        

$ ->
  metronom = new Metronom() 	 
  window.metronom = metronom

  templater = new Templater()
  templater.apply()

  console.log "loaded"