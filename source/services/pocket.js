/**
 * Pocket service provider
 */

var pocket = {
    counterUrl: 'https://widgets.getpocket.com/v1/button?count=horizontal&url={url}',
    counter: function(url, factory) {

        var request = new XMLHttpRequest();
        request.open('GET', 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '" and xpath="*"') + '&format=json', true);

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.response);
                var count = data.query.results.html.body.div.a.span.em.content;
                factory(count);
            }
        };

        request.send();

    },
    popupUrl: 'https://getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};

module.exports = pocket;
