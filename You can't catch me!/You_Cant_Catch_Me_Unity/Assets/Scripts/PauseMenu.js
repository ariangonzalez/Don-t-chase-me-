//Written by Arian J. Gonzalez
#pragma strict


var canvas:Transform;


function Update () {

	//When user enter key ESC or ENTER games pauses
	if(Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.Return) ){
		Paused();
		}
}

function Paused(){
		
	if(canvas.gameObject.activeInHierarchy == false){
	//Display Pause canvas
	canvas.gameObject.SetActive(true);
	//Stop Time
	Time.timeScale=0;

	}else{
	//Hide Pause canvas
	canvas.gameObject.SetActive(false);
	//Continue Time
	Time.timeScale=1;
	}
}