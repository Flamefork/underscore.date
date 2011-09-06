Signal.trap("INT"){abort("\n")}

def run_all_tests
  print `clear`
  puts "Tests run #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
  puts `npm test`
end

run_all_tests
watch("(test|lib)(/.*)+.js") {run_all_tests}
