window.onload = function () {
    var myJson = [{name: "hello", pipelines: [{name: "world"}, {name: "!"}]}, {name: "foo", pipelines: [{name: "bar"}, {name: "baz"}]}]
    ReactDOM.render(<Dashboard data={myJson}/>, document.getElementById('react-root'));
}
