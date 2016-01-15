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

  expected_pipelines = {"Payments & Checkout" => 49,
                            "Shopping Experience" => 53,
                            "Content & Publishing" => 0,
                            "Delivery & Business Operations" => 0,
                            "Digital Marketing & Enhancements" => 0,
                            "Platform & Infrastructure" => 3 }

  pipeline_groups = JSON.parse response.body
  display_info = pipeline_groups.map{|group| {name: group["name"],
                                              pipelines: group["pipelines"].map{|pipeline| pipeline["name"]},
                                              total_pipelines: expected_pipelines[group["name"]],
                                              exisiting_pipelines: group["pipelines"].length,
                                              pipelines_remaining: calculate_pipelines_remaining( expected_pipelines[group["name"]], group["pipelines"].length)}
  }
  display_info.to_json
end

def calculate_pipelines_remaining(total_pipelines, existing_pipelines)
  total_pipelines - existing_pipelines
end
