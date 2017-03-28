import home from './home'
console.log(home)
const fn = () => {
	console.log(456);
}

fn();

class Student {
	hello(){
		console.log("hello")
	}
}

const s = new Student;

s.hello();

class leo extends Student{

}

const l = new leo;

l.hello();

