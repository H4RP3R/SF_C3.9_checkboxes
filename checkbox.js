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
    // if cookies exist disable all checkboxes
    if (document.cookie.length > 0) {
        $("input[type='checkbox']").each(function() {
            $(this).attr("disabled", true);
        });
    }

    checkboxSetStatus();

    $("input[type='checkbox']").each(function() {
        $(this).on('click', function() {
            // create or update cookie status on every click
            document.cookie = `${$(this).attr('id')}=${$(this).prop('checked')}; max-age=3600`;
        });
    });
});
