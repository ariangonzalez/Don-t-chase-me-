//Written by Arian J. Gonzalez

#pragma strict

//Variable declarations
var Score:float = 0.0f;
var Timer:float = 0.0f;
var Money:float = 0.0f;
var TotalMoney:float = 0.0f;
var DisplayScore:UnityEngine.UI.Text;
var DisplayMoney:UnityEngine.UI.Text;
var difficultLevel:int = 1;
var maxDif:int = 8;
var timeNextLevel = 25;


function Update () {

	//When timer is greater than or equal next level time increase difficulty.
	if(Timer >= timeNextLevel){

		nextLevel();
	}

	//Timer equal runninf time
	Timer =  Timer +Time.deltaTime;
	//Score increases as time increases and multiply by the level of difficulty.
	Score = Score + Time.deltaTime * difficultLevel;
	//Display current score and money to player as he plays/
	DisplayScore.text = "Score: "+ parseInt(Score).ToString();
	DisplayMoney.text = "Money: $"+ parseInt(Money).ToString();

}

function OnTriggerEnter (e : Collider) {

	//When a player triggers with score add to money and to score
	if(e.gameObject.tag == "Score"){
		Destroy(e.gameObject);
		Money = Money + 1;
		Score = Score + 5;
			}
	//When a player triggers with ScoreX2 add 100 to money.
	if(e.gameObject.tag == "ScoreX2"){
		Destroy(e.gameObject);
		Money = Money + 100;
			}
}

function nextLevel(){
	//Increase difficulty when called
	if(difficultLevel == maxDif)
	return;
	timeNextLevel *=2;
	difficultLevel++;
	//Increase player's speed
	GetComponent(PlayerControl).SetSpeed(difficultLevel);

}

function SaveScore(){
	//Store score, timer, money, highschore and total money.
	PlayerPrefs.SetFloat("Score", Score);
	PlayerPrefs.SetFloat("Timer", Timer);
	PlayerPrefs.SetFloat("Money", Money);

	if(PlayerPrefs.GetFloat("HighScore") < Score){
	PlayerPrefs.SetFloat("HighScore", Score);
	}

	TotalMoney = PlayerPrefs.GetFloat("Money") + PlayerPrefs.GetFloat("TotalMoney");
	PlayerPrefs.SetFloat("TotalMoney", TotalMoney);
}
