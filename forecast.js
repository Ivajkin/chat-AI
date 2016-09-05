var fs = require('fs');
const readline = require('readline');

fs.readFile('./wisdom', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }

    //console.log(data
	//compute2(data);
	//compute3(data);
	//compute4(data);
	compute(data);
	interactiveLoop();
});

var predicator = {};

function compute(wisdom) {
	compute2(wisdom);
	compute3(wisdom);
	compute4(wisdom);
	computeN(wisdom, 5);
	computeN(wisdom, 6);
}

function compute2(wisdom) {
	for(var i = 2; i < wisdom.length; ++i) {
		var A = wisdom[i];
		var x = wisdom[i-1];
		var y = wisdom[i-2];
		if(!predicator[[y, x]]) {
			predicator[[y, x]] = [A];
		} else {
			predicator[[y, x]].push(A);
		}
	}
}
function compute3(wisdom) {	
	for(var i = 3; i < wisdom.length; ++i) {
		var A = wisdom[i];
		var x = wisdom[i-1];
		var y = wisdom[i-2];
		var z = wisdom[i-3];
		if(!predicator[[z, y, x]]) {
			predicator[[z, y, x]] = [A];
		} else {
			predicator[[z, y, x]].push(A);
		}
	}
}
function compute4(wisdom) {	
	for(var i = 4; i < wisdom.length; ++i) {
		var A = wisdom[i];
		var x = wisdom[i-1];
		var y = wisdom[i-2];
		var z = wisdom[i-3];
		var z2 = wisdom[i-4];
		if(!predicator[[z2, z, y, x]]) {
			predicator[[z2, z, y, x]] = [A];
		} else {
			predicator[[z2, z, y, x]].push(A);
		}
	}
}
function tuple(data, i, N) {
	//console.log('data=' + data);
	var x = [];
	for(var di = 1; di <= N; ++di) {
		x = [data[i-di]].concat(x);
		//console.log('x=' + x);
	}
	return x;
}
if(JSON.stringify(tuple("wisdom", "wisdom".length, 6)) != JSON.stringify(['w', 'i', 's', 'd', 'o', 'm'])) {
	throw "tuple() is not working: " + JSON.stringify(tuple("wisdom", "wisdom".length, 6))
				+ JSON.stringify(['w', 'i', 's', 'd', 'o', 'm']);
}

function computeN(wisdom, N) {	
	for(var i = N; i < wisdom.length; ++i) {
		var A = wisdom[i];
		var x = tuple(wisdom, i, N)
		
		if(!predicator[x]) {
			predicator[x] = [A];
		} else {
			predicator[x].push(A);
		}
	}
}
/*
Deprecated:
*/
function whatSymbolIsNext2(text, i) {
	var x = text[i-1];
	var y = text[i-2];
	var possible = predicator[[y, x]];
	
	if(possible) {
		var randomIndex = Math.round(Math.random() * (possible.length-1));
	
		return possible[randomIndex];
	} else {
		return '';
	}
}
/*
Deprecated:
*/
function whatSymbolIsNext3(text, i) {
	var x = text[i-1];
	var y = text[i-2];
	var z = text[i-3];
	var possible = predicator[[z, y, x]];
	
	if(possible) {
		var randomIndex = Math.round(Math.random() * (possible.length-1));
	
		return possible[randomIndex];
	} else {
		return '';
	}
}
/*
Deprecated:
*/
function whatSymbolIsNext4(text, i) {
	var x = text[i-1];
	var y = text[i-2];
	var z = text[i-3];
	var z2 = text[i-4];
	var possible = predicator[[z2, z, y, x]];
	
	var result;
	if(possible) {
		var randomIndex = Math.round(Math.random() * (possible.length-1));
		result = possible[randomIndex];
	} else {
		result = '';
	}
	return result;
}

function whatSymbolIsNextN(text, i, N) {
	var possible = predicator[tuple(text, i, N)];
	
	if(possible) {
		var randomIndex = Math.round(Math.random() * (possible.length-1));
		return possible[randomIndex];
	} else {
		return '';
	}
}

function whatSymbolIsNext(text, i) {
	var x = text[i-1];
	var y = text[i-2];
	var z = text[i-3];
	var z2 = text[i-4];
	var z3 = text[i-5];
	var z4 = text[i-6];
	var possible2 = predicator[[y, x]];
	var possible3 = predicator[[z, y, x]];
	var possible4 = predicator[[z2, z, y, x]];
	var possible5 = predicator[[z3, z2, z, y, x]];
	var possible6 = predicator[[z4, z3, z2, z, y, x]];
	
	var possible = possible2;
	if(!possible) possible = [];
		
	if(possible3) {
		possible = possible.concat(possible3);
	}
	
	if(possible4) {
		possible = possible.concat(possible4);
	}
	
	if(possible5) {
		possible = possible.concat(possible5);
	}
	
	if(possible6) {
		possible = possible.concat(possible6);
	}
	
	var randomIndex = Math.round(Math.random() * (possible.length-1));
	return (possible[randomIndex] ? possible[randomIndex] : '');
}

function whatSymbolIsNextSmart(text, i) {
	var x = text[i-1];
	var y = text[i-2];
	var z = text[i-3];
	var z2 = text[i-4];
	var z3 = text[i-5];
	var z4 = text[i-6];
	var possible2 = predicator[[y, x]];
	var possible3 = predicator[[z, y, x]];
	var possible4 = predicator[[z2, z, y, x]];
	var possible5 = predicator[[z3, z2, z, y, x]];
	var possible6 = predicator[[z4, z3, z2, z, y, x]];
	
	var possible = possible2;
	if(!possible) possible = [''];
		
	if(possible3) {
		possible = possible.concat(possible3);
	}
	
	if(possible4) {
		possible = possible.concat(possible4);
	}
	
	if(possible5) {
		possible = possible.concat(possible5);
	}
	
	if(possible6) {
		possible = possible.concat(possible6);
	}
	
	var randomIndex = Math.round(Math.random() * (possible.length-1));
	var randomIndex2 = Math.round(Math.random() * (possible.length-1));
	var result;
	// To make more chance
	if(possible[randomIndex] == possible[randomIndex2]) {
		result = possible[randomIndex]
	} else {
		var randomIndex3 = Math.round(Math.random() * (possible.length-1));
		result = possible[randomIndex3];
	}
	return result;
}

function interactiveLoop() {
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.question('What line will you start with? ', (answer) => {

	  rl.close();
	  
	  var result = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNext2(result, result.length);
		  result += a;
	  }
	  console.log('result 2 is:', result);
	  
	  var result3 = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNext3(result3, result3.length);
		  result3 += a;
	  }
	  console.log('result 3 is:', result3);
	  	  
	  var result4 = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNext4(result4, result4.length);
		  result4 += a;
	  }
	  console.log('result 4 is:', result4);
	  	  
	  var result5 = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNextN(result5, result5.length, 5);
		  result5 += a;
	  }
	  console.log('result 5 is:', result5);
	  
	  var result6 = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNextN(result6, result6.length, 6);
		  result6 += a;
	  }
	  console.log('result 6 is:', result6);
	  
	  var result_full = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNext(result_full, result_full.length);
		  result_full += a;
	  }
	  console.log('result full is:', result_full);
	  
	  var result_full = answer;
	  for(var i = 0; i < 200; ++i) {
		  var a = whatSymbolIsNextSmart(result_full, result_full.length);
		  result_full += a;
	  }
	  console.log('result full smart is:', result_full);
	  
	  // Write to file
	  var result6 = answer;
	  for(var i = 0; i < 2000000; ++i) {
		  var a = whatSymbolIsNextN(result6, result6.length, 6);
		  result6 += a;
	  }
	  result6 += '<ul><li><a href="AIBOOKOFWISDOM.result.html">1</a></li></ul>';
	  var analythics = '<script></script>';
	  result6 += analythics;
	  fs.writeFile("./AIBOOKOFWISDOM.result.html", result6, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
	  }); 

	});
}
