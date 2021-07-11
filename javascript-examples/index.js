function myArrayFilter(arr, callback) {
	var len=arr.length;
	var newArray=[];
	for(var i=0;i<len;i++){
		if(callback(arr[i],i,arr)){
			newArray.push(arr[i]);
		}
	}
	return newArray;
}

function myArrayReduce(arr, callback, acc) {
	var ans=acc||0;
	var len=arr.length;
	for(var i=0;i<len;i++){
		ans=callback(ans,arr[i],i,arr);
	}
	return ans;
}

function myTreeReduce(inFunc, endFunc) {
	function calculate(tree){
		if(tree.type=="end"){
			return endFunc(tree.value);
		}
		if(tree.type=="in"){
			//alert(tree.value);
			//a=tree.value
			//b=calculate(tree.right)
			//c=calculate(tree.left)
			return inFunc(tree.value,calculate(tree.right),calculate(tree.left))
		}
	}
	return calculate;
}

function myTreeSize(tree) {
	const add = (a, b, c) => 1 + b + c;
	function count(x){
		return 1;
	}

	treeReduce = myTreeReduce(add,count);
	return treeReduce(tree);
}

function myTreeTraversal(type) {
	if(type=="in"){
		var arr=[];
		function inorder(tree){
			if(tree.type=="end"){
				arr.push(tree.value)
					//	console.log(tree.value);
					return;
			}
			inorder(tree.left);
			arr.push(tree.value)
				//console.log(tree.value)
				inorder(tree.right);
			return arr;
		}
		return inorder;
	}
	if(type=="post"){
		var arr=[];
		function postorder(tree){
			if(tree.type=="end"){
				arr.push(tree.value)
					//      console.log(tree.value);
					return;
			}
			postorder(tree.left);
			//arr.push(tree.value)
			//console.log(tree.value)
			postorder(tree.right);
			arr.push(tree.value)
				return arr;
		}
		return postorder;
	}
	if(type=="pre"){
		var arr=[];
		function preorder(tree){
			if(tree.type=="end"){
				arr.push(tree.value)
					//      console.log(tree.value);
					return;
			}
			arr.push(tree.value)
				preorder(tree.left);
			//arr.push(tree.value)
			//console.log(tree.value)
			preorder(tree.right);
			return arr;
		}
		return preorder;
	}
}

function hangman(phrase) {

	const gameOver = "Game over!!!";
	const won = "You\'ve got it!!! Final phrase: "+phrase;
	const wrong = "Incorrect guess!!!";
	const lost = "You\'ve lost!!! Correct phrase: "+phrase;
	var count=0,lost2=-1;
	var found=[];
	for(var i=0;i<phrase.length;i++){found.push(-1)}
	// var found = new Array(phrase.length).fill(-1);
	function game(input){
		//var found = Array(phrase.length).fill(-1);
		var i,lost1=-1,count1=0;
		for(i=0;i<found.length;i++){
			if(input==phrase[i] && found[i]==-1){
				found[i]=1;
				lost1=0
					break;
			}
		}
		if(lost1==-1 && count<3 && lost2==-1){
			count++;
			if(count!=3){ return wrong};
			if(count==3) {return lost};
		}
	for(i=0;i<found.length;i++){if(found[i]==1){count1++;}}
		if(count==3 || lost2==1) return gameOver;
		//for(i=0;i<found.length;i++){if(found[i]==1){count1++;}}
		if(count1==found.length) {lost2=1;return won;}
		if(count1<found.length){
			var str=""
			for(var i=0;i<found.length;i++){
			if(found[i]==1){str=str+phrase[i]+" "};
			if(found[i]==-1){str=str+"_"+" "};
			}
		return str.trim();
		}
	}
return game;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
  }

  function Student(name, age, roll) {
  Person.call(this, name, age);
  this.roll= roll;
  }
  Person.prototype.about=
	function(){str="My name is "+this.name+" and I'm "+this.age+" yrs old.";return str;}
  Student.prototype.id=function(){return "Student Id: "+this.roll}
  Student.prototype.__proto__ = Person.prototype;
const numberList = {
numbers:[],
	count:0,
	set add(x){
		this.numbers[this.count++]=x;
	},
	get sum(){
		var ans=0;
		for(var i=0;i<this.numbers.length;i++){
			ans=ans+this.numbers[i];
		}
		return ans
	},
	get average(){
		return this.sum/this.numbers.length;
	}
}

function carRace(cars, finish) {
	Promise.race(cars).then(
			result=>{
			finish(result.name+" won in "+result.time+" seconds!!!");
			}
			);
}

module.exports = {
	myArrayFilter,
	myArrayReduce,
	myTreeReduce,
	myTreeSize,
	myTreeTraversal,
	hangman,
	Person,
	Student,
	numberList,
	carRace
};
