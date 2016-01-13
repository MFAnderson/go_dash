require 'sinatra'
require 'net/http'
require 'json'

get '/' do
  haml :index 
end

get '/pipeline_info' do
  content_type :json
  uri = URI("http://#{ENV["HOST"]}/go/api/config/pipeline_groups")
  request = Net::HTTP::Get.new(uri)
  request.basic_auth ENV["USER"], ENV["PASS"]
  begin
    response = Net::HTTP.start(uri.hostname, uri.port, read_timeout: 5, open_timeout: 1) {|http|
      http.request(request)
    }
  rescue Net::OpenTimeout
    return "{}"
  end
  pipeline_groups = JSON.parse response.body
  display_info = pipeline_groups.map{|group| {name: group["name"], pipelines: group["pipelines"].map{|pipeline| pipeline["name"]}}}
  display_info.to_json
end
