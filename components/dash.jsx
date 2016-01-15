var Dashboard = React.createClass({
    render: function() {
        if (!this.props.data.map) {
            return (
                <div className="row">
                    <ErrorMessage />
                </div>
            );
        } else {
            var groups = this.props.data.map(function(group) {

                return (
                    <Group name={group.name} pipelines={group.pipelines}
                           totalPipelines={group.total_pipelines}
                           pipelinesRemaining={group.pipelines_remaining}>
                    </Group>
                );
                });
            return (
                <div className="row ">
                  {groups}
                </div>
            );
        }
    }
});
