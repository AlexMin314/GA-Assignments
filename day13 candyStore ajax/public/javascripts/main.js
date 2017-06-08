$(function () {


  var onLoad = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      var leng = data.length;
      for (var i = 0; i < leng; i++) {
        var priceNum = data[i].price;
        if (isNaN(priceNum) === true) priceNum = data[i].price.substr(1);
        createItem(data[i].id, data[i].name, priceNum, data[i].quantity);
      }
      if (leng > 0 ) initSubTotal();
    }).fail(function () {
      console.log('init error');
    });
  }

  function initSubTotal() {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function(data) {
      data.forEach(function(e, i) {
        var $target = $('#' + e.id).find('.subTotal')
        var price = isNaN(e.price) ? e.price.substr(1) : e.price;
        var newSubTotal = (price * e.quantity).toFixed(2);
        $target.text('$' + newSubTotal);
      });
    });
  }

  var getCandies = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      console.log(data);
    }).fail(function () {
      console.log('error');
    });
  }

  var createCandies = function () {
    var itemName = $('#addItemNameValue').val();
    var itemPrice = $('#addItemPriceValue').val();
    var itemQty = 0;
    $.ajax({
      method: 'POST',
      url: '/api',
      data: { name: itemName, price: itemPrice, quantity: itemQty }
    }).done(function (data) {
      console.log('POST')
      createItem(data.id, itemName, itemPrice, itemQty);
    }).fail(function () {
      console.log('error');
    });
    getCandies();
  }

  var removeItem = function (e) {
    var $target = $(e.target);

    $target.parents('.listedItem').delay(300).queue(function () {

      var candyId = $target.parents('.listedItem').attr('id');

      $.ajax({
        method: 'DELETE',
        url: '/api/' + candyId
      }).done(function (data) {
        console.log(data);
      }).fail(function () {
        console.log('error');
      });

      $(this).remove();
      getCandies();
      updatingTotalSum();
    });
  };

  // Create Item //
  var createItem = function (idIndex, itemName, itemPrice, qty) {

    //itemPrice = Number(itemPrice).toFixed(2);

    // valide input name check
    if (itemName === '') {
      return alert('Please enter item name.')
    }

    // html code of item
    var emptyList = '<div class="row listedItem" id="' + idIndex + '"">\
                      <div class="itemName col-xs-3 col-md-4">\
                        <input type="text" class="candyName" value="' + itemName + '">\
                      </div>\
                      <div class="unitPrice col-xs-2 col-md-3">\
                        <input type="text" class="candyPrice" value="$' + itemPrice + '">\
                      </div>\
                      <div class="itemQty col-xs-3 col-md-3">\
                        <div class="input-group">\
                          <span class="input-group-addon">QTY</span>\
                          <input type="number" min="0" class="qty form-control" value="' + qty + '" />\
                        </div>\
                      </div>\
                      <div class="subTotal col-xs-2 col-md-1">$0.00</div>\
                      <i class="removeItem fa fa-trash fa-2x col-xs-2 col-md-1" aria-hidden="true"></i>\
                    </div>';


    // reset current input
    $('#addItemNameValue').val('');
    $('#addItemPriceValue').val('');

    // append the item
    $(emptyList).prependTo($('#itemList')).hide().slideDown(200);

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
    var unitPrice = $item.find('.candyPrice').val();
    if (isNaN(unitPrice) === true) {
      unitPrice = $item.find('.candyPrice').val().substr(1);
    }
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

  var updateCandies = function (e) {
    $('.candyName').each(function (i, el) {
      var newName = $(el).val();
      var newPrice = $(el).parents('.listedItem').find('.candyPrice').val();
      var candyId = $(el).parents('.listedItem').attr('id');
      var newQty = $(el).parents('.listedItem').find('.qty').val();
      var params = { id: candyId, name: newName, price: newPrice, quantity: newQty };
      updateCandiesHelper(params);
    });
    console.log('updated');
    initSubTotal();
    getCandies();
  };

  var updateCandiesHelper = function (params) {
    $.ajax({
      method: 'PUT',
      url: '/api',
      data: params
    }).done(function (data) {
      console.log(data);
    }).fail(function () {
      console.log('error');
    });
  };

  // event listeners
  var init = function () {
    $('.qty').on('keyup', updatingSubSum);
    $('.removeItem').on('click', removeItem);
    $('.removeItem').hover(function () {
      $(this).css('color', 'rgb(232, 78, 78)')
    }, function () {
      $(this).css('color', 'black')
    });
  };

  // attach event listeners.
  (function () {
    init();
    onLoad();
    $('#createItemBtn').on('click', createCandies);
    $('#calButton').on('click', updateCandies);
  }());

});
