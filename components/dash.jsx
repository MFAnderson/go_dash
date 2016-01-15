var Dashboard = React.createClass({
    render: function() {
        console.log(this.props);
        if (!this.props.data.groups.map) {
            return (
                <div className="row">
                    <ErrorMessage />
                </div>
            );
        } else {
            var goHost = this.props.data.go_host;
            var groups = this.props.data.groups.map(function(group) {

                return (
                    <Group name={group.name} pipelines={group.pipelines}
                           totalPipelines={group.total_pipelines}
                           pipelinesRemaining={group.pipelines_remaining} goHost={goHost}>
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
