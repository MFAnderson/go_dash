var Group = React.createClass({
    render: function() {
        var pipelineCount = this.props.pipelines.length;
        var totalPipelines = this.props.totalPipelines;
        var pipelinesRemaining = this.props.pipelinesRemaining;
        var goHost = this.props.goHost;
        var name = this.props.name;
        var href = "http://" + goHost + "/go/pipelines#pipeline_group_" + name + "_panel";

        return (
            <div className="col-sm-4">
              <div className="pipeline-group">
                <h3>
                <a href={href}>{name}</a>
                </h3>
                <div className="info">
                  Number of components pipelined: {pipelineCount}
                </div>
                <div className="info">
                  Number of components not pipelined: {pipelinesRemaining}
                </div>
              </div>
            </div>
        );
    }
});
