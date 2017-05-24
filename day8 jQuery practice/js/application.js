$(document).ready(function () {

  var createItem = function () {
    var itemName = $('#addItemNameValue').val();
    var itemPrice = $('#addItemPriceValue').val();
    itemPrice = Number(itemPrice).toFixed(2);

    if (itemName === '') {
      return alert('Please enter item name.')
    }
    if (Number.isNaN(Number(itemPrice)) === true) {
      $('#addItemNameValue').val('');
      $('#addItemPriceValue').val('');
      return alert('Please enter number.');
    } else if (Number.isNaN(Number(itemPrice)) !== true) {

      var emptyList = '<div class="row listedItem">\
                      <div class="itemName col-xs-4">' +
        itemName + '</div>\
                      <div class="unitPrice col-xs-3">' +
        '$' + itemPrice + '</div>\
                      <div class="itemQty col-xs-3">\
                        <label for="qty">QTY</label>\
                          <input type="text" class="qty" value="0">\
                        <button type="button" class="removeItem">Cancel</button>\
                      </div>\
                      <div class="subTotal col-xs-2">' + '$0.00' + '</div>\
                    </div>';

      $('#addItemNameValue').val('');
      $('#addItemPriceValue').val('');

      $('#itemList').prepend(emptyList);
    }
    
    $('.removeItem').on('click', removeItem);
    $('.qty').on('keyup', updatingSubSum);
    $('.removeItem').on('click', removeItem);
  };

  var updatingSubSum = function (e) {
    var $target = $(e.target || e.srcElement);
    var $item = $target.parents('.listedItem');
    var $subTotal = $item.find('.subTotal');

    var quantity = Number($target.val());
    var unitPrice = Number($item.find('.unitPrice').text().trim().substr(1));
    $subTotal.text('$' + (quantity * unitPrice).toFixed(2));

    updatingTotalSum();
  };


  var updatingTotalSum = function () {
    var totalSum = 0;
    $('.subTotal').each(function (i, el) {
      totalSum += Number($(el).text().trim().substr(1));
    });
    $('#totalSum').text('$' + totalSum.toFixed(2));
  };

  var removeItem = function (e) {
    var itemRow = $(e.target || e.srcElement).parents('.listedItem').remove()

    /*
    var message = '<div class="blue">Are you sure for removing the item?\
                   </div>';
    itemRow.append(message).delay(1500)
    //.queue(function() { $(this).remove(); });
    */
    updatingTotalSum();
  };

  (function () {
    $('#createItemBtn').on('click', createItem);
    $('.qty').on('keyup', updatingSubSum);
    $('#calButton').on('click', updatingTotalSum);
    $('.removeItem').on('click', removeItem);
  }());

});
