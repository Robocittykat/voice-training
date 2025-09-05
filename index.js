const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Serve frontend from public/
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  res.send("Test successful!")
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})

app.get("/fsTest", (req, res) => {
	const usersPath = path.join(__dirname, 'users.json');
	const usersData = JSON.parse(fs.readFileSync(usersPath,"utf-8"))
	
	res.json(usersData)
})

app.get("/signIn", (req,res) => {
	const Username = req.query.u
	const Password = req.query.p
	const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),"utf-8"))
	if(Username in userData){
		if(userData[Username].password == Password){
			res.json(userData[Username])
			return
		}
	}
	res.json({"error":"invalid username or password"})
})

app.get("/signUp", (req,res) => {
	const Username = req.query.u
	const Password = req.query.p
	const Direction = req.query.d
	const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),"utf-8"))
	
	if(!(Username in userData)){
		const jsonData = require('./users.json')
		jsonData[Username] = {
			"password":Password,
			"direction":Direction,
			"accountCreated":{"year":new Date().getFullYear(), "month":new Date().getMonth() + 1, "day":new Date().getDate()},
			"streak":0,
			"daysActive":0, //this is days since starting minus days missed
			"lastPracticed":{"year":new Date().getFullYear(), "month":new Date().getMonth() + 1, "day":new Date().getDate()},
			"level":0
		}
		fs.writeFileSync('./users.json', JSON.stringify(jsonData,null,4))
		res.json(jsonData[Username])
		return
	}
	res.json({"error":"Username already exists"})
})


app.get("/practice", (req,res) => {
	const Username = req.query.u
	const userData = require("./users.json")[Username]
	
	switch(userData.direction){
		case "feminizing":
			
			switch(userData.level){
				case 0:
					res.json({
						"exercises":[
							{
								"name":"Big dog, little dog",
								"desc":"The goal is for shallow and short breaths, akin to that of a large dog panting. You will then make your way to breaths akin to that of a smaller dog. Then go back. Try to keep your tounge on the bottom of your mouth. You should be able to feel with your fingers your adam's apple raise when moving to the \"little dog\" pant.",
								"reps":6,
							},
							{
								"name":"Puh",
								"desc":"The goal is to whisper a \"puh\" sound in a low resonance (this may sound like a lower pitch), and then slowly repeat that in increasing resonance (this may sound like increasing in pitch). Then go back down.",
								"reps":6,
							}
						],
						"tip":"The goal with these exercises is to increase your resonance, which is, besides pitch, what makes a voice sound masculine or feminine. Once you have mastered these exersises, you should be able to vocalize with a higher resonance. However, at the start, only work on voiceless.",
						"time":[10,8,5]
					})
					break
				
					
			}break
		
		case "masculinizing":
			
			switch(userData.level){
				case 0:
					res.json({
						"exercises":[
							{
								"name":"Little dog, big dog",
								"desc":"The goal is for shallow and short breaths, akin to that of a small dog panting. You will then make your way to breaths akin to that of a large  dog. Then go back. Try to keep your tounge on the bottom of your mouth. You should be able to feel with your fingers your adam's apple raise when moving to the \"little dog\" pant.",
								"reps":6,
							},
							{
								"name":"Eh",
								"desc":"The goal is to whisper an \"eh\" sound in a high resonance (this may sound like a higher pitch), and then slowly repeat that in decreasing resonance (this may sound like lowering in pitch). Then go back up.",
								"reps":6,
							}
						],
						"tip":"The goal with these exercises is to decrease your resonance, which is, besides pitch, what makes a voice sound masculine or feminine. Once you have mastered these exersises, you should be able to vocalize with a lower resonance. However, at the start, only work on voiceless.",
						"time":[10,8,5]
					})
					break
				
					
			}break
	}
	
	
	
	
})

app.get("/finishPractice", (req, res) => {
	const Username = req.query.u
	const userData = require("./users.json")
	
	userData[Username].streak += 1
	userData[Username].lastPracticed = {"year":new Date().getFullYear(), "month":new Date().getMonth() + 1, "day":new Date().getDate()}
	
	fs.writeFileSync('./users.json', JSON.stringify(userData,null,4))
	
	res.send("")
})