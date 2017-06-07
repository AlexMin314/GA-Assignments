$(function () {

  var idIndexGlobal = 0;
  var initchk = true;

  var onLoad = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      var leng = data.length;
      idIndexGlobal = leng > 0 ? leng - 1 : 0;

      for (var i = 0; i < leng; i++) {
        createItem(data[i].name, data[i].price, i);
      }

      initchk = false;

    }).fail(function () {
      console.log('error');
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

  var createCandies = function (itemName, itemPrice, idIndex) {
    $.ajax({
      method: 'POST',
      url: '/api',
      data: { id: idIndex, name: itemName, price: itemPrice }
    }).done(function (data) {
      console.log('Posted')
    }).fail(function () {
      console.log('error');
    });
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
  var createItem = function (itemName, itemPrice) {

    var itemName = $('#addItemNameValue').val() || itemName;
    var itemPrice = $('#addItemPriceValue').val() || itemPrice;
    itemPrice = Number(itemPrice).toFixed(2);

    // valide input name check
    if (itemName === '') {
      return alert('Please enter item name.')
    }

    // html code of item
    var emptyList = '<div class="row listedItem" id="' + idIndexGlobal + '"">\
                      <div class="itemName col-xs-3 col-md-4">\
                        <input type="text" class="candyName" value="' + itemName + '">\
                      </div>\
                      <div class="unitPrice col-xs-2 col-md-3">\
                        <input type="text" class="candyPrice" value="$' + itemPrice + '">\
                      </div>\
                      <div class="itemQty col-xs-3 col-md-3">\
                        <div class="input-group">\
                          <span class="input-group-addon">QTY</span>\
                          <input type="number" min="0" class="qty form-control" value="0" />\
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

    if (!initchk) {
      createCandies(itemName, itemPrice, idIndexGlobal)
      idIndexGlobal++;
    }

    // attach eventlistener to the new item
    init();
    getCandies();
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
    var unitPrice = Number($item.find('.unitPrice').text().trim().substr(1))
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
      var params = { id: candyId, name: newName, price: newPrice };
      updateCandiesHelper(params);
    });
    console.log('updated');
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

  //event listeners
  var init = function () {
    $('.qty').on('keyup', updatingSubSum);
    //$('.candyName').on('keyup', updateCandies);
    //$('.candyPrice').on('keyup', updateCandies);
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
    $('#createItemBtn').on('click', createItem);
    $('#calButton').on('click', updateCandies);
  }());


});
