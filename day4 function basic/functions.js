// (7/8) one-line answers

// Question 1 V
function maxOfTwoNumbers(a, b) {
  return a > b ? a : b;
}

// Question 2 V
function maxOfThree(a, b, c) {
  if (a > b) {
    return a > c ? a : c;
  }
  if (b > a) {
    return b > c ? b : c;
  }
}

function maxOfThree1(a, b, c) {
  return Math.max(a, b, c);
}

// Question 3 V
function isCharacterAVowel(c) {
  var checker = ['a', 'e', 'i', 'o', 'u'];
  return checker.indexOf(c) > -1;
}

// Question 4 V
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
  return arr.reduce(function(a, b) {
    return a + b;
  });
}

// Question 5 V
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
  return arr.reduce(function(a, b) {
    return a * b;
  });
}

// Question 6 V
var reverseString = function(s) {
  var i,
    leng = s.length;
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
    i
  leng = arr.length;
  for (i = 0; i < leng; i++) {
    if (arr[i].length > longest) {
      longest = arr[i].length;
    }
  }
  return longest;
}

// Question 8 V
function filterLongWords(arr, i) {
  return arr.filter(function(e, index) {
    return arr[index].length > i;
  })
}

// Bonus 1
Object.prototype.reverseString = function() {
  return this.split('').reverse().join('');
};

"General Assembly".reverseString();

// Bonus 2
function charactersOccurencesCount(s) {
  var cache = {}
  checker = s.split(''),
    leng = checker.length;

  for (var i = 0; i < leng; i++) {
    if (!cache.hasOwnProperty(checker[i])) {
      cache[checker[i]] = 1;
    } else if (cache.hasOwnProperty(checker[i])) {
      cache[checker[i]] += 1;
    }
  }
  return cache;
}

// Bonus 3
var numberOfArguments = function() {
  return arguments.length;
}
