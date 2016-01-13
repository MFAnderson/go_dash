var Dashboard = React.createClass({
    render: function() {
        if (!this.props.data.map) {
            return (
                <div className="section">
                    <ErrorMessage />
                </div>
            );
        } else {
            var groups = this.props.data.map(function(group) {
                return (
                    <Group name={group.name} pipelines={group.pipelines}>
                    </Group>
                );
                });
            return (
                <div className="section">
                  {groups}
                </div>
            );
        }
    }
});
