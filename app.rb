require 'sinatra'
require 'net/http'
require 'json'

get '/' do
  haml :index 
end

get '/pipeline_info' do
  uri = URI("http://#{ENV["HOST"]}/go/api/config/pipeline_groups")
  request = Net::HTTP::Get.new(uri)
  request.basic_auth ENV["USER"], ENV["PASS"]
  response = Net::HTTP.start(uri.hostname, uri.port) {|http|
    http.request(request)
  }
  content_type :json
  pipeline_groups = JSON.parse response.body
  display_info = pipeline_groups.map{|group| {name: group["name"], pipelines: group["pipelines"].map{|pipeline| pipeline["name"]}}}
  display_info.to_json
end
