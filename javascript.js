
var game = window.game || {};

game.memory = (function() {
    
    var self= {};
    var first;
    var second;
    var icons =    ['fa-spinner', 'fa-spinner', 'fa-circle-o-notch', 'fa-circle-o-notch', 'fa-refresh', 'fa-refresh', 'fa-cog', 'fa-cog',
                    'fa-camera-retro','fa-camera-retro','fa-home','fa-home','fa-book','fa-book','fa-pencil','fa-pencil',
                    'fa-btc','fa-btc','fa-save','fa-save','fa-file','fa-file','fa-dollar','fa-dollar',
                    'fa-star','fa-star','fa-reply','fa-reply','fa-retweet','fa-retweet','fa-plane','fa-plane',
                    'fa-umbrella','fa-umbrella','fa-user','fa-user','fa-wrench','fa-wrench','fa-ticket','fa-ticket',
                    'fa-bold','fa-bold','fa-road','fa-road','fa-question','fa-question','fa-money','fa-money',
                    'fa-eject','fa-eject','fa-trophy','fa-trophy','fa-mobile-phone','fa-mobile-phone','fa-music','fa-music',
                    'fa-glass','fa-glass','fa-male','fa-male','fa-laptop','fa-laptop','fa-gift','fa-gift'
                ];

    self.init = function() {
        createBoard();
        attachListeners();
    };

    var createBoard = function() {
        var sampleCell = $('.sampleCell').clone()[0];
        $(sampleCell).removeClass('sampleCell');
        var container = $('#container');
        var clear = '<div class="grid_clear"></div>';

        for(var i=0; i<8; i++) { //rows
            for(var j=0; j<8; j++) { //cols
                var cell = $(sampleCell).clone();
                var icon = getIcon();
                cell.find('i').addClass(icon);
                cell.find('.cell').attr('data-icon',icon);
                container.append(cell);
            }
            container.append(clear);
        }
    };

    var getIcon = function() {
        var iconCount = icons.length;
        var num = game.memory.helper.getRandomArbitrary(iconCount);
        return icons.splice(num, 1)[0];
    };

    var storeVal = function(val) {
        if(!first) {  
            first = val;
        } else if(!second) {
            second = val;
        } else {
            first = second;
            second = val;
        }
    };

    var isMatch = function(){
        if(first && second){
            if (first === second) {
                return true;
            }
        }
        return false;
    };

    var resetGrid = function(){
        $('.clicked').removeClass('clicked');
        first = null;
        second = null;
    };

    var attachListeners = function() {
        $(".cell").click(function(e){
            var $obj = $(this);
            if(!$obj.hasClass('clicked')){
                var val = $obj.attr('data-icon');
                $obj.addClass('clicked');
                storeVal(val);
                if(second && first) {
                    var match = isMatch();
                    if (match){
                        $('.cell[data-icon="'+val+'"]')
                        .addClass('match')
                        .removeClass('clicked');
                    } else {
                        setTimeout(resetGrid, 1000);
                    }
                }
            }
        });
    };

    return self;

})();


game.memory.helper = (function(){
    var self = {};
    self.getRandomArbitrary = function(max) {
        var min = 0;
        return Math.floor(Math.random() * (max - min) + min);
    };
    return self;
})();


