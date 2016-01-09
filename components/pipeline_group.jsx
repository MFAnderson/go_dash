var Group = React.createClass({
    render: function() {
        var pipelines = this.props.pipelines.map(function(pipeline) {
            return (
                <Pipeline name={pipeline}>
                </Pipeline>
            );
        });
        return (
            <div className="group">
              <h1>{this.props.name}</h1>
              {pipelines}
            </div>
        );
    }
});
