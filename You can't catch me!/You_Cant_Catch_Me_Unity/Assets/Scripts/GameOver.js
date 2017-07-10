//Written by Arian J. Gonzalez
#pragma strict

//Variable declaration
var TotalScore:float = 0.0f;
var TotalTimer:float = 0.0f;
var HighScore:float = 0.0f;
var Money:float = 0.0f;
var TotalMoney:float = 0.0f;


//Text UI
var DisplayHighScore:UnityEngine.UI.Text;
var DisplayTotalScore:UnityEngine.UI.Text;
var DisplayTotalTimer:UnityEngine.UI.Text;
var DisplayTotalMoney:UnityEngine.UI.Text;
var DisplayMoney:UnityEngine.UI.Text;

function Start(){
	//Get player's stats
	TotalScore = PlayerPrefs.GetFloat("Score");
	TotalTimer = PlayerPrefs.GetFloat("Timer");
	HighScore = PlayerPrefs.GetFloat("HighScore");
	Money = PlayerPrefs.GetFloat("Money");
	TotalMoney = PlayerPrefs.GetFloat("TotalMoney");

	//Display Stats
	DisplayTotalScore.text = "Score: "+parseInt(TotalScore).ToString();
	DisplayTotalMoney.text = "Bank: $"+ parseInt(TotalMoney).ToString();
	DisplayMoney.text = "Money: $"+ parseInt(Money).ToString();


	if(TotalTimer > 60){
		DisplayTotalTimer.text = "Total Time: " +(parseInt(TotalTimer)/60).ToString() + " Minute/s.";
	}
	if( TotalTimer < 60){
		DisplayTotalTimer.text = "Total Time: " +(parseInt(TotalTimer)).ToString() + " Seconds.";
	}

	HighScore = PlayerPrefs.GetFloat("HighScore");
	DisplayHighScore.text = "Highscore: "+parseInt(HighScore).ToString();


}



function LoadMenu(){
	//Load main menu
	SceneManager.LoadScene("MainMenu");


}

function QuitOn(){
	//Quit Gmae
	Application.Quit();

}

function PlayAgain(){
	//Load Game
	SceneManager.LoadScene("Dont_Chase_Me_01");

}
