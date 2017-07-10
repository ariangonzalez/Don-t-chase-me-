//Written by Arian J. Gonzalez

#pragma strict

//Variable declaration
var controller:Rigidbody;
var speed:float = 5.6f;
var animator:Animator; 
var capsule:CapsuleCollider;
var laneNum:int = 2;
var jumpSpeed : float = 8.0f;
var oneTime:boolean = true;
var animationTime:float = 2.0f;
var IsGrounded = false;
var dead = false;


function Start () {
	//Getting components that will be controlled by the script. 
	controller = GetComponent(Rigidbody);
	animator = GetComponent(Animator);
	capsule = GetComponent(CapsuleCollider);
	dead = false;

}

function Update () {

	//Prevent the player from moving the character when game starts.
	if(Time.time < animationTime){

	controller.velocity = new Vector3(0.0f, 0.0f, speed);
	return;

	}


	//Player will keep running straight depending on the speed. 
	controller.velocity = new Vector3(0.0f, controller.velocity.y, speed);

	//if left arrow is pressed character will turn left and will animate to turn left. 
	//LaneNum will keep character into 3 lanes only. 
	if (Input.GetKeyDown(KeyCode.LeftArrow) && (laneNum > 1)){

	controller.velocity.x = Input.GetAxisRaw("Horizontal") * speed;
	animator.SetBool("left", true);
	StartCoroutine(AnimationCoroutine(0.1f));
	laneNum -=1;

	}
	//if left arrow is pressed character will turn left and will animate to turn left. 
	//LaneNum will keep character into 3 lanes only. 
	if (Input.GetKeyDown(KeyCode.RightArrow) && (laneNum < 3)){

	controller.velocity.x = Input.GetAxisRaw("Horizontal") * speed;
	animator.SetBool("right", true);
	StartCoroutine(AnimationCoroutine(0.1f));
	laneNum +=1;
	}
	//if Space or up arrow is pressed character will jump and animate. 
	//Will only work if player is on the ground.

	//will not allow character to fly off when jumping
	if(transform.position.y >= 1.0f)
      transform.position.y = 0.79f;

      //if up arrow is pressed character will jump.
	if (Input.GetKeyDown(KeyCode.UpArrow) && IsGrounded) { 
	IsGrounded = false;
	//Adjust capsule when jumping so it will not collide with obstacles
	adjustCapsule();
	animator.SetBool("Jump", true);
	controller.AddForce( jumpSpeed * gameObject.transform.forward * controller.mass, ForceMode.Impulse);
	//turn off animation right away
	StartCoroutine(AnimationCoroutine(0.01f));
	//Adjust capsule when jump is finished
	StartCoroutine(CapsuleCoroutine(0.28f));

    }
           
}


function AnimationCoroutine (waitTime : float) {

    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
    CheckPosition();
  	animator.SetBool("Jump", false);
  	animator.SetBool("left", false);
  	animator.SetBool("right", false);
  	animator.SetBool("dead", false);
}

function CapsuleCoroutine (waitTime : float) {

    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
  	capsule.height = 1.6f;
 	capsule.center.y = 0.85f;

}

function adjustCapsule(){

 	if(!IsGrounded){
 	capsule.height = 1f;
 	capsule.center.y = 1.5f;
 	IsGrounded = true;
 	} 
 }

function CheckPosition(){
	//will keep character in 3 lanes only.
	if(laneNum == 1){

	transform.position.x = -1;
	}
	if(laneNum == 2){

	transform.position.x = 0;

	}

	if(laneNum == 3){
	transform.position.x = 1;

	}

}

function OnCollisionEnter (e : Collision) {
	//Check collisions if enemy is dead
	if(e.gameObject.tag == "Enemy"){
	controller.GetComponent(Score).SaveScore();
	dead = true;
	Death();
	}
}

function SetSpeed(input:float){
	//Increase speed when called.
	speed = speed + 1;
}

function GetSpeed(){

	return speed;
}

function OnTriggerExit(other: Collider) {
	//Destroy building after player exits
	var index = 0;
	print(other.transform.tag);
	if(other.gameObject.tag == "Building")
	Destroy(other.gameObject, 5.0f);
	other.transform.parent.gameObject.GetComponent(TileControl).newBuilding();
	index++;
}


function OnCollisionStay (collisionInfo :Collision)
 {
 	//while collision player is grounded.
     IsGrounded = true; 

     print("ON THE FLOOR");
 }

 function Death(){
 	//when function is call character is dead.
  	 animator.SetBool("dead", true);
     //turn off anumation after 0.1 second to avoid repetition
     StartCoroutine(AnimationCoroutine(0.01f));


 }
