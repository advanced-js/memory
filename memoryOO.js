$(function() {
    var board = {
      prevCell: null,
      check: function(newCell) {
        if (!board.prevCell) {
          board.prevCell = newCell;
          return;
        }

        if (board.prevCell != newCell &&
          $(newCell).text() == $(board.prevCell).text()) {
          board.remove(board.prevCell, newCell);
        } else {
          board.prevCell = newCell;
        }
      },
      remove: function(prev, newCell) {
        $(prev).addClass('is-removed');
        $(newCell).addClass('is-removed');
      },
      reset: function() {
        $('td').removeClass('is-removed');
      }
    };

    $('.board td').click(function() {
      board.check(this);
    });

    $('button').click( function() {
      board.reset();
    });

});