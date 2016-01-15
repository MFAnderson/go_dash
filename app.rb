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
    response = Net::HTTP.start(uri.hostname, uri.port, read_timeout: 5, open_timeout: 1) { |http| http.request(request) }
  rescue Net::OpenTimeout
    return "{}"
  end

  expected_pipelines = {"Payments_and_Checkout" => 49,
                        "Shopping_Experience" => 53,
                        "Content_and_Publishing" => 39,
                        "Delivery_and_Business_Operations" => 0,
                        "Digital_and_Marketing_and_Enhancements" => 1,
                        "Platform_and_Infrastructure" => 8 }

  pipeline_groups = JSON.parse response.body
  display_info = {}
  display_info["groups"] = pipeline_groups.map do |group|
    existing_pipelines = group["pipelines"].delete_if  { |x| x['name'] =~/Deploy/ }
    {
      name: group["name"],
      pipelines: group["pipelines"].map{ |pipeline| pipeline["name"] },
      total_pipelines: expected_pipelines[group["name"]],
      existing_pipelines: existing_pipelines.length,
      pipelines_remaining: pipelines_remaining(expected_pipelines[group["name"]], existing_pipelines.length)
    }
  end
  display_info["go_host"] = ENV["HOST"]
  display_info.to_json
end

def pipelines_remaining(total_pipelines, existing_pipelines)
  total_pipelines.nil? ? 0 : (total_pipelines - existing_pipelines)
end
