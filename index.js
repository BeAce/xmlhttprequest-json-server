/**
 * Created by beace on 16/10/28.
 */
const submit = document.getElementById('submit');
submit.addEventListener('click', function () {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value;
    const data = {title: title, author: author};
    postJSON("http://localhost:3000/get", data);
});

//添加
function postJSON(url, data) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            alert("添加成功");
            getJSON('http://localhost:3000/get', function (response) {
                var html = "<li><a><strong>title</strong></a><span>author</span></li>";
                for (var i = 0; i < response.length; i++) {
                    html += "<li><a href='http://localhost:3000/get/'" + response[i].id + ">" + response[i].title + "</a><span>" + response[i].author + "</span><button onclick='deleteJSON(" + response[i].id + ")'>删除</button></li>";
                }
                const ul = document.createElement('ul');
                document.body.appendChild(ul);
                document.querySelector('ul').innerHTML = html;
            });
        }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data))
}

function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
        if (callback) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(null);
}

// 删除
function deleteJSON(id) {
    var request = new XMLHttpRequest();
    request.open('DELETE', "http://localhost:3000/get/" + id);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            alert('删除成功');
            getJSON('http://localhost:3000/get', function (response) {
                var html = "<li><a><strong>title</strong></a><span>author</span></li>";
                for (var i = 0; i < response.length; i++) {
                    html += "<li><a href='http://localhost:3000/get/'" + response[i].id + ">" + response[i].title + "</a><span>" + response[i].author + "</span><button onclick='deleteJSON(" + response[i].id + ")'>删除</button></li>";
                }
                const ul = document.createElement('ul');
                document.body.appendChild(ul);
                document.querySelector('ul').innerHTML = html;
            });
        }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(null)
}


//列表
getJSON('http://localhost:3000/get', function (response) {
    var html = "<li><a><strong>title</strong></a><span>author</span></li>";
    for (var i = 0; i < response.length; i++) {
        html += "<li><a href='http://localhost:3000/get/'" + response[i].id + ">" + response[i].title + "</a><span>" + response[i].author + "</span><button onclick='deleteJSON(" + response[i].id + ")'>删除</button></li>";
    }
    const ul = document.createElement('ul');
    document.body.appendChild(ul);
    document.querySelector('ul').innerHTML = html;
});

//查询
const button = document.getElementById('button');
button.addEventListener('click', function (event) {
    const title = document.getElementById('title').value;
    event.preventDefault();
    getJSON('http://localhost:3000/get?title=' + title, function (response) {
        var html = "<li><a><strong>title</strong></a><span>author</span></li>";
        for (var i = 0; i < response.length; i++) {
            html += "<li><a href='http://localhost:3000/get/" + response[i].id + "'>" + response[i].title + "</a><span>" + response[i].author + "</span></li>";
        }
        const ul = document.createElement('ul');
        document.body.appendChild(ul);
        document.querySelector('ul').innerHTML = html;
    });
});
