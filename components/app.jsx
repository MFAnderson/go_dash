var dashboard;
window.onload = function () {
    $.getJSON("/pipeline_info", function(json) {
        dashboard = ReactDOM.render(<Dashboard data={json}/>, document.getElementById('react-root'));
    });
}

