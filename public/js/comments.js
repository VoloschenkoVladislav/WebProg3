$(document).ready(function () {
    get_comment();
});

function get_comment() {
    fetch('getcomments').then(
        response => response.json()
    ).then(
        comments => {
            let construct_comment = function(json_comment) {
                
                let name = json_comment.name;
                let value = json_comment.value;

                return `<li><div class="comments__name">${name}</div><div class="comments__value">${value}</div></li>`;
            }
            
            if (comments != '[]') {
                let html_comments = JSON.parse(comments).map(construct_comment).join('');
                
                $('.comments').html(`<ul>${html_comments}</ul>`);
            }
            else
                $('.interactive .no-comment').html('Комментариев нет');
        }
    );
}

function send_comment(e) {
    e.preventDefault();

    
    let comment = {};
    comment.name = $('.interactive input[name="name"]').val();
    comment.value = $('.interactive input[name="value"]').val();

    fetch('newcomment', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(comment)
    }).then(
        response => {}
    ).then(
        get_comment()
    );

}

$('.interactive form').on('submit', send_comment);