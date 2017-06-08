$(function () {

  var onLoad = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      data.forEach(function (e) {
        createItem(e)
      });
      initSubTotal();
    });
  };

  var initSubTotal = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      data.forEach(function (e) {
        var $target = $('#' + e.id).find('.subTotal');
        var price = isNaN(e.price) ? e.price.substr(1) : e.price;
        $target.text('$' + (price * e.quantity).toFixed(2));
      });
    });
  };

  var getCandies = function () {
    $.ajax({
      method: 'GET',
      url: '/api'
    }).done(function (data) {
      console.log(data);
    });
  }

  var createCandies = function () {
    var dataObj = {};
    dataObj.name = $('#addItemNameValue').val();
    dataObj.price = $('#addItemPriceValue').val();
    dataObj.quantity = 0;

    if (dataObj.name === '') {
      return alert('Please enter item name.')
    }

    $.ajax({
      method: 'POST',
      url: '/api',
      data: dataObj
    }).done(function (data) {
      createItem(data);
    });
    getCandies();
  }

  var removeCandies = function (e) {
    var $target = $(e.target);
    $target.parents('.listedItem').delay(300).queue(function () {

      var candyId = $target.parents('.listedItem').attr('id');

      $.ajax({
        method: 'DELETE',
        url: '/api/' + candyId
      })

      $(this).remove();
      
      getCandies();
      updatingTotalSum();
    });
  };

  // Create Item in front-end
  var createItem = function (data) {

    var priceNum = isNaN(priceNum) ? data.price.substr(1) : data.price;

    // html code of item
    var emptyList = '<div class="row listedItem" id="' + data.id + '"">\
                      <div class="itemName col-xs-3 col-md-4">\
                        <input type="text" class="candyName" value="' + data.name + '">\
                      </div>\
                      <div class="unitPrice col-xs-2 col-md-3">\
                        <input type="text" class="candyPrice" value="$' + priceNum + '">\
                      </div>\
                      <div class="itemQty col-xs-3 col-md-3">\
                        <div class="input-group">\
                          <span class="input-group-addon">QTY</span>\
                          <input type="number" min="0" class="qty form-control" value="' + data.quantity + '" />\
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
      var dataObj = {};
      dataObj.name = $(el).val();
      dataObj.price = $(el).parents('.listedItem').find('.candyPrice').val();
      dataObj.id = $(el).parents('.listedItem').attr('id');
      dataObj.quantity = $(el).parents('.listedItem').find('.qty').val();

      updateCandiesHelper(dataObj);
    });

    initSubTotal();
    getCandies();
  };

  var updateCandiesHelper = function (data) {
    $.ajax({
      method: 'PUT',
      url: '/api',
      data: data
    });
  };

  // event listeners
  var init = function () {
    $('.qty').on('keyup', updatingSubSum);
    $('.removeItem').on('click', removeCandies);
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
