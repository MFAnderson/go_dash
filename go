#!/bin/bash

set -e
cd $(dirname $0)

function helptext {
    echo "Usage: ./go <command>"
    echo ""
    echo "available commands are:"
    echo "  check       Ensure dependencies are installed"
    echo "  server      Compile JSX and run Sinatra server"
    echo "  help        Display this help message"c
}

function preflight {
    .go/prereqs
}

function compileReact {
    cat components/*.jsx | babel --plugins transform-react-jsx > public/app.js
}

function server {
    compileReact
    ruby app.rb
}

[[ $@ ]] || { preflight; exit; }

case "$1" in
    help) helptext
    ;;
    check) preflight
    ;;
    server) server
    ;;
    compile) compileReact
    ;;
    *) helptext
    ;;
esac
