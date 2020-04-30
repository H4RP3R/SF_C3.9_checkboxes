let cookieList = []

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkboxSetStatus() {
    $("input[type='checkbox']").each(function() {
        const status = getCookie($(this).attr('id'));
        if (status !== undefined) {
            $(this).prop('checked', JSON.parse(status));
        }
    });
}

$(document).ready(function() {
    // if "disable" cookie exists disable all checkboxes
    if (getCookie('disable')) {
        $("input[type='checkbox']").each(function() {
            $(this).attr("disabled", true);
        });
    }

    checkboxSetStatus();

    $("input[type='checkbox']").each(function() {
        $(this).on('click', function() {
            // create or update cookie status on every click
            document.cookie = `${$(this).attr('id')}=${$(this).prop('checked')}; max-age=36000`;
        });
    });

    $('#save').click(function() {
        // check if at least one is checked
        let checked = []
        $("input[type='checkbox']").each(function() {
            if ($(this).prop("checked") === true) {
                checked.push(this)
            }
        });
        if (checked.length > 0) {
            // save cookies from the list
            cookieList.forEach(element => document.cookie = element);
            // disable checkboxes after saving
            $("input[type='checkbox']").each(function() {
                $(this).attr("disabled", true);
            });
            document.cookie = 'disable=true';
            $('.alert-success').fadeIn(600).delay(2000).fadeOut(1000);
        } else {
            $('.alert-primary').fadeIn(600).delay(2000).fadeOut(1000);
        }
    })
});
