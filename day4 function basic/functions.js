// (7/8) one-line answers

// Question 1 ////////////
function maxOfTwoNumbers(a, b) {
  return a > b ? a : b;
}

// Question 2 ////////////
function maxOfThree(a, b, c) {
  if (a > b) {
    return a > c ? a : c;
  } else {
    return b > c ? b : c;
  }
}

function maxOfThree1(a, b, c) {
  return Math.max(a, b, c);
}

// Question 3 ////////////
function isCharacterAVowel(c) {
  var check = ['a', 'e', 'i', 'o', 'u'];
  return check.indexOf(c) > -1;
}


function isCharacterAVowel1(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c) > -1;
}

// Question 4 ////////////
function sumArray(arr) {
  var i,
      leng = arr.length,
      sum = 0;

  for (i = 0; i < leng; i++) {
    sum += arr[i];
  }
  return sum;
}

function sumArray1(arr) {
  return arr.reduce(function(a, b) { return a + b; });
}

// Question 5 ////////////
function multiplyArray(arr) {
  var i,
      leng = arr.length,
      multi = 1;

  for (i = 0; i < leng; i++) {
    multi *= arr[i];
  }
  return multi;
}

function multiplyArray1(arr) {
  return arr.reduce(function(a, b) { return a * b; });
}

// Question 6 ////////////
var reverseString = function(s) {
  var i,
      leng = s.length,
      result = '';

  for (i = leng - 1; i >= 0; i--) {
    result += s[i];
  }
  return result;
};

var reverseString1 = function(s) {
  return s.split('').reverse().join('');
}


// Question 7
function findLongestWord(arr) {
  var longest = 0,
      i,
      leng = arr.length;

  for (i = 0; i < leng; i++) {
    if (arr[i].length > longest) {
      longest = arr[i];
    }
  }
  return longest;
}

// Question 8 ////////////
function filterLongWords(arr, i) {
  return arr.filter(function(e, idx) {return arr[idx].length > i; })
}

// Bonus 1
Object.prototype.reverseString = function() {
  return this.split('').reverse().join('');
};

"General Assembly".reverseString();

// Bonus 2
function charactersOccurencesCount(s) {
  var cache = {},
      check = s.split(''),
      leng = check.length;

  for (var i = 0; i < leng; i++) {
    if (!cache.hasOwnProperty(check[i])) {
      cache[check[i]] = 1;
    } else if (cache.hasOwnProperty(check[i])) {
      cache[check[i]] += 1;
    }
  }
  return cache;
}

// Bonus 3
var numberOfArguments = function() {
  return arguments.length;
}
