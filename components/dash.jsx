var Dashboard = React.createClass({
    render: function() {
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
});
