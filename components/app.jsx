var foo;
window.onload = function () {
    var foo;
    var realJson = $.getJSON("/pipeline_info", function(json) {
        console.log(json);
        ReactDOM.render(<Dashboard data={json}/>, document.getElementById('react-root'));
    });
    console.log(realJson);
    //console.log(foo);
    //var myJson = [{name: "hello", pipelines: ["world", "!"]}, {name: "foo", pipelines: ["bar", "baz"]}];
    //ReactDOM.render(<Dashboard data={myJson}/>, document.getElementById('react-root'));
}
