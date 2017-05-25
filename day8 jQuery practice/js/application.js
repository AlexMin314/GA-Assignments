$(document).ready(function () {

// Create Item //
  var createItem = function () {

    var itemName = $('#addItemNameValue').val();
    //var itemName = $("input[name='name']").val();
    var itemPrice = $('#addItemPriceValue').val();
    itemPrice = Number(itemPrice).toFixed(2);

    // valide input name check
    if (itemName === '') {
      return alert('Please enter item name.')
    }

    // html code of item
    var emptyList = '<div class="row listedItem">\
                      <div class="itemName col-xs-3 col-md-4">' + itemName + '</div>\
                      <div class="unitPrice col-xs-2 col-md-3">$' + itemPrice + '</div>\
                      <div class="itemQty col-xs-3 col-md-3">\
                        <div class="input-group">\
                        <span class="input-group-addon">QTY</span>\
                          <input type="number" min="0" class="qty form-control" value="0"/>\
                        </div>\
                      </div>\
                      <div class="subTotal col-xs-2 col-md-1">$0.00\
                      </div>\
                      <i class="removeItem fa fa-trash fa-2x col-xs-2 col-md-1" aria-hidden="true"></i>\
                    </div>';

    // reset current input
    $('#addItemNameValue').val('');
    $('#addItemPriceValue').val('');

    // append the item
    $(emptyList).prependTo($('#itemList')).hide().slideDown(200);
    //$('#itemList').prepend(emptyList).hide().slideDown(400);

    // attach eventlistener to the new item
    init();
  };

// update sub total of each item.
  var updatingSubSum = function (e) {
    var $target = $(e.target || e.srcElement);
    var $item = $target.parents('.listedItem');
    var $subTotal = $item.find('.subTotal');

    var quantity = Number($target.val());

    // positive quantity checker
    if (quantity < 0) {
      $target.val(0);
      return alert('Not a positive number.');
    }

    // trim/clean the zero of init value
    $target.val(Math.floor(quantity));

    // display the result
    var unitPrice = Number($item.find('.unitPrice').text().trim().substr(1));
    $subTotal.text('$' + (quantity * unitPrice).toFixed(2));

    updatingTotalSum();
  };

  var updatingTotalSum = function () {
    var totalSum = 0;
    $('.subTotal').each(function (i, el) {
      totalSum += Number($(el).text().trim().substr(1));
    });
    // display the result
    $('#totalSum').text('$' + totalSum.toFixed(2));
  };

  var removeItem = function (e) {
    $(e.target).parents('.listedItem').delay(300).queue(function () {
      //remove the item with 500ms delay
      $(this).remove();
      updatingTotalSum();
    });
  };

  //event listeners
  var init = function () {
    $('.qty').on('keyup', updatingSubSum);
    $('.removeItem').on('click',removeItem);
    $('.removeItem').hover(function () {
      $(this).css('color', 'rgb(232, 78, 78)')
    }, function () {
      $(this).css('color', 'black')
    });
  };

  // attach event listeners.
  (function () {
    init();
    $('#createItemBtn').on('click', createItem);
    $('#calButton').on('click', updatingTotalSum);
  }());



/* delegation pattern

  $('#cart').on('keyup', '*', function(event){
    var productRow = $(event.target).parents('.product')[0];
    updateSubTotal(productRow);
  });

  $('#cart').on('keyup', '.delete', function(event){
    var productRow = $(event.target).parents('.product')[0];
    deleteProduct(productRow);
  });

  $('.create').on('click','.createProduct', function(event){
    createProduct();
  });
*/

});
