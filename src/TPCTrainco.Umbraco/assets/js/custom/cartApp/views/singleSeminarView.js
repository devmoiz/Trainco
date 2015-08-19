'use strict';

window.app = window.app || {};

app.SingleSeminarView = Backbone.View.extend({
    tagName: 'li',
    className: 'seminar-item col-xs-12',

    events: {
        'click .view-opts': 'showClassOptions'
    },

    template: _.template($('#classTemplate').html()),

    initialize: function() {

    },

    render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },

    showClassOptions: function(e) {
        e.preventDefault();
        console.log(this.model)
        var _this = this;
        var open = this.model.get('open');
        var schedulesLoaded = this.model.get('schedulesLoaded');
        var $schedItemWrap = this.$('.schedule-item-wrap');

        var viewText = $(e.target);

        if(open) {
            // if it's open, close it
            $schedItemWrap.slideUp(400, function() {
                viewText.removeClass('red').html('<span class="plus">+</span>View Upcoming Seminars');
            });
            this.model.set('open', false);
            this.$el.css('padding-bottom', 25 + 'px');
        } else {
            // open it
            $schedItemWrap.slideDown(400, function() {
                viewText.addClass('red').html('<span class="plus turn">+</span>View Less');
            });
            this.model.set('open', true);   
            this.$el.css('padding-bottom', 0);
        }

        // styling
        $schedItemWrap.css({
            "margin-top": 30 + 'px',
            "border-top": '1px solid #D7D7D7'
        });
        console.log(schedulesLoaded, 'one')
        if(!schedulesLoaded) {
            var seminarIdToGet = this.model.get('seminarId');
            var searchIdToGet = this.model.get('searchId');
            var elemToRender = $($(e.currentTarget).parent().parent().parent().next('.schedule-item-wrap'));
            console.log(schedulesLoaded, 'two')
            app.locationCollection = new app.LocationCollection;
            app.locationCollection.fetch({
                data: JSON.stringify({
                    "courseId": seminarIdToGet,
                    "searchId": searchIdToGet
                }),
                type: "POST",
                contentType: "application/json",

                success: function(data) {
                    $('.location-loader').css('display', 'none');
                    app.locationView = new app.LocationView({
                        collection: app.locationCollection,
                        el: elemToRender
                    });
                    _this.model.set('open', true);
                    _this.model.set('schedulesLoaded', true);
                }
            });
        }
    }
});

app.singleSeminarView = new app.SingleSeminarView();