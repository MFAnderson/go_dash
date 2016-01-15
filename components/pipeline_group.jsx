var Group = React.createClass({
    render: function() {
        var pipelineCount = this.props.pipelines.length;
        var totalPipelines = this.props.totalPipelines;
        var pipelinesRemaining = this.props.pipelinesRemaining;

        return (
            <div className="col-sm-4">
              <div className="pipeline-group">
                <h3>{this.props.name}</h3>
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
