//Written by Arian J. Gonzalez
#pragma strict

//Variables declaration
var MainCanvas:Canvas; 
var Instructions:Canvas;
var HighScore:float = 0.0f;
var DisplayHighScore:UnityEngine.UI.Text;

 function Awake(){
 	//Do not display Instructions
 	Instructions.enabled = false;

} 

function Start(){
	//Obtain data from previous game.
	HighScore = PlayerPrefs.GetFloat("HighScore");
	DisplayHighScore.text = "Highscore: "+parseInt(HighScore).ToString();

}


function InstructionsOn(){
	//view instructions only
	Instructions.enabled = true;
	MainCanvas.enabled = false;


}

function ReturnOn(){
	//Go back to main menu
 	Instructions.enabled = false;
 	MainCanvas.enabled = true;

}

function LoadOn(){
	//Load game
	SceneManager.LoadScene("Dont_Chase_Me_01");

}

function QuitOn(){
	//Quit Game
	Application.Quit();

}