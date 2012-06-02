def w(name, str = nil, &block)
  block ||= proc { |m| sys(str % m[0])}
  watch('^' << name.gsub('.', '\.').gsub('*', '.*')) do |m|
    puts "-"*80, "#{Time.now.strftime("%H:%M:%S")} - file changed: \033[1;34m#{m[0]}\033[0m"
    block[m]
  end
end

def sys(cmd)
   puts "\033[0;33m>>> \033[1;33m#{cmd}\033[0m"
   if system cmd
     puts "\033[1;32mSUCCESS\033[0m"
   else
     puts "\033[1;31mFAIL\033[0m"
   end
end


app_name = "metronom"

# w '*.coffee',     'coffee -j prezirb.js -c presentation.coffee prezirb.coffee'
w '*.coffee',       "coffee -j statics/#{app_name}.js -c #{app_name}.coffee"
w '*.(sass|scss)',  'compass compile --sass-dir . --css-dir statics --images-dir images --javascripts-dir statics'
w "#{app_name}.haml",     "haml --format html5 #{app_name}.haml #{app_name}.html"