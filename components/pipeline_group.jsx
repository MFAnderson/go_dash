var Group = React.createClass({
    render: function() {
        var pipelineCount = this.props.pipelines.length;
        var totalPipelines = this.props.totalPipelines;
        var pipelinesRemaining = this.props.pipelinesRemaining;

        var pipelines = this.props.pipelines.map(function(pipeline) {
            return (
                <Pipeline name={pipeline}>
                </Pipeline>
            );
        });

        return (
            <div className="group">
                <fieldset>
              <legend className="group-name">{this.props.name}</legend>
                <div className="pipelineStats">
                    Number of services total: {totalPipelines}</div>
            <div>
                    Number of services on Go: {pipelineCount}
            </div>
            <div>
                    Number of services not on Go: {pipelinesRemaining}
            </div>


                </fieldset>
            </div>
        );
    }
});
