const ROOT = "http://localhost:3000/"

/*
document.getElementById("fetchBtn").onclick = async () => {
	const res = await fetch("http://localhost:3000/api/hello");
	const data = await res.json();
	document.getElementById("output").textContent = data.message;
};
*/

let currentMenu = signInMenu

function menu(newMenu){
	currentMenu.hidden = true
	newMenu.hidden = false
	currentMenu = newMenu
}

let username = null
let account = null

async function fsTest(){
	const res = await fetch("http://localhost:3000/fsTest");
	let data = await res.json()
	console.log(data)
}

async function signIn(){
	let Username = usernameBox.value
	let Password = passwordBox.value //password is a keyword, so I am using capital P
	
	const res = await fetch(ROOT + "signIn?u=" + Username + "&p=" + Password)
	const data = await res.json()
	
	if(data.error != null){
		inInvalid.hidden = false
		return
	}
	
	username = Username
	account = data
	
	menu(mainMenu)
	streakLength.innerHTML = account.streak
}

async function signUp(){
	let Username = upUsernameBox.value
	let Password = upPasswordBox.value
	let Direction = upDirection.value
	
	const res = await fetch(ROOT + "signUp?u=" + Username + "&p=" + Password + "&d=" + Direction)
	const data = await res.json()
	
	if(data.error != null){
		upInvalid.hidden = false
		return
	}
	
	username = Username
	account = data
	
	menu(mainMenu)
	streakLength.innerHTML = account.streak
}





async function startPrac(){
	const res = await fetch(ROOT + "practice?u=" + username)
	const data = await res.json()
	
	menu(practiceMenu)
	
	for(let i = 0; i<data.exercises.length; i++){
		let exercise = data.exercises[i]
		
		document.getElementById("exercise" + i).hidden = false
		document.getElementById("exercise" + i + "Name").innerHTML = exercise.name
		document.getElementById("exercise" + i + "Desc").innerHTML = exercise.desc
		document.getElementById("exercise" + i + "Reps").innerHTML = exercise.reps
	}
	pracTime.innerHTML = data.time[0]
	pracTip.innerHTML = data.tip
	
	
	
	
	const res2 = await fetch(ROOT + "finishPractice?u=" + username)
}

/*
let timerStart
let timerKey

function timerStart(){
	timerStart = new Date().getTime/60000
	startTimerButton.disabled = true
	practiceTimer.innerHTML = 
	timerKey = setInterval(updateTimer)
}*/