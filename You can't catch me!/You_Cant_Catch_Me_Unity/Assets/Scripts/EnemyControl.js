//written by Arian J. Gonzalez

#pragma strict
//Variables Declaration
var target: Rigidbody;
var MainCamera:Camera;
var distance:float = 3.5; 
var speed:float;
var oneTime:boolean = true;
var animator:Animator; 


function Start(){
	//Getting Animator component
	animator = GetComponent(Animator);
 }


function Update(){

	//will only allow the enemy character to move forward the first 2 seconds of the game.
	if(Time.time < 2.0f){

	transform.position.z = target.transform.position.z - 2 ;
	return;
	}

	//Continously check if target is dead if is dead then attack.
	if(target.gameObject.GetComponent(PlayerControl).dead){
	Attack();
	return;
	}
	//follow target z and x axis.
	//follow camera Y axis only.
	transform.position.z = target.transform.position.z - distance;
	transform.position.x = target.transform.position.x;
	transform.position.y = MainCamera.transform.position.y-3;

 }

function WaitAndEnd(waitTime : float) {

    // suspend execution for waitTime seconds
   yield WaitForSeconds (waitTime);
   SceneManager.LoadScene("CompleteLevel");

}

function AnimationCoroutine (waitTime : float) {

    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
  	animator.SetBool("Attack", false);

}

function Attack(){

	 //move closer to target when attacking.
     transform.position.z = target.transform.position.z - 0.5f;
     animator.SetBool("Attack", true);
     //turn off anumation after 0.1 second to avoid repetition
     StartCoroutine(AnimationCoroutine(0.01f));
     //End game after 2 seconds so player can see attack animation
     StartCoroutine(WaitAndEnd(2.0f));


}
   