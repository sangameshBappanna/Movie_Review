$(window).on('load', function() {
    getMovies('topRated');
    localStorage['rememberType'] = 'all';
    localStorage['type'] = 'topRated';
});

function movieSearch(page = 1) {
    localStorage['rememberType'] = 'search';
    $('#moviesListing').DataTable().destroy();
    var searchText = $('#movieSearchID').val();
    $('.typeBtns').each(function() {
        $(this).removeClass('btn-primary');
    });
    $.ajax({
        /* the route pointing to the post function */
        url: 'api/getMovies.php',
        type: 'POST',
        async: false,
        /* send the csrf-token and the input to the controller */
        data: {
            'searchField': searchText,
            'page': page
        },
        dataType: 'JSON',
        /* remind that 'response' is the response of the AjaxController */
        success: function(response) {
            $('#moviesListing').DataTable().destroy();
            dataTableInit(response.results);
            pagination(response.total_pages, response.page);
        },
        error: function(result) {
            //console.log(result);
            console.log('Failed to connect!!!!!!');

        }
    });
}

function searchType(type) {
    localStorage['type'] = type;
    localStorage['rememberType'] = 'all';
    getMovies(type);
}

function getMovies(type, page = 1) {
    $('#movieSearchID').val('');
    $('.typeBtns').each(function() {
        $(this).removeClass('btn-primary');
    });
    $('#' + type).addClass('btn-primary');
    var is_valid = true;
    if (is_valid) {
        $.ajax({
            /* the route pointing to the post function */
            url: 'api/getMovies.php',
            type: 'POST',
            async: false,
            /* send the csrf-token and the input to the controller */
            data: {
                'type': type,
                'page': page,
            },
            dataType: 'JSON',
            /* remind that 'response' is the response of the AjaxController */
            success: function(response) {
                $('#moviesListing').DataTable().destroy();
                dataTableInit(response.results);
                pagination(response.total_pages, response.page);
            },
            error: function(result) {
                //console.log(result);
                console.log('Failed to connect!!!!!!');

            }
        });
    }
}

function dataTableInit(data) {
    $('#moviesListing').DataTable({
        data: data,
        searching: false,
        columns: [{
            data: 'title'
        }, {
            data: 'overview'
        }, {
            data: 'release_date'
        }, {
            data: 'vote_average'
        }],
        paging: false,
        ordering: false,
        info: false
    });
}

function pagination(numperofPages, selectedPage) {
    $('#paginationMovie').pagination('destroy');
    $('.paginationMovie').pagination({
        pages: numperofPages,
        cssStyle: 'light-theme',
        currentPage: selectedPage,
        onPageClick(pageNumber, event) {
            if (localStorage['rememberType'] == 'search') {
                movieSearch(pageNumber)
            } else {
                getMovies(localStorage['type'], pageNumber)
            }
        }
    });
}