//written by Arian J. Gonzalez

import UnityEngine.SceneManagement;
#pragma strict

//Variable declaration
 var target: Transform;
 var VectorMove:Vector3;
 var distance:Vector3;


 //Camera Animation variables
 var waitTime:float = 0.0f;
 var animationTime:float = 2.0f;
 var animationDistace:Vector3 = new Vector3 (0,2.5,2.5);




function Start(){

	//Setting target to Player
 	target = GameObject.FindGameObjectWithTag("Player").transform;
 	distance = transform.position - target.position;

 }

 function Update(){



 //Check Character is not null if null GameOver!
 if (GameObject.Find("Character") != null){
 VectorMove = target.position + distance;

 //RayCast Camera to hit ground to mantain a set distance between camera and ground.
 	var hit: RaycastHit;
 	var ray =  new Ray(transform.position, transform.forward* 999999);
 	Debug.DrawRay(ray.origin, ray.direction, Color.blue);

 		if(Physics.Raycast(ray.origin,ray.direction, hit)){
 		 	if(hit.transform.tag == "Tile"){
 		  Debug.Log(hit.collider);
 		    }
 		 }
 		
		if(hit.transform.tag == "Tile"){
	    var positonY:float=hit.transform.position.y+3;
        transform.position.y = positonY;

	    }

	    //Will only run after waitTime is > 1 sec
	    if(waitTime > 1.0f){

	     transform.position.x = 0;
	     transform.position.z = target.position.z - 3;

	     transform.eulerAngles = Vector3(23,0,0);

	    }else{
	    //Will only run at the start of the game.
	    transform.position = Vector3.Lerp(VectorMove + animationDistace, VectorMove, waitTime);
	    //in order for waittime to be equal to 1 it will take 2 seconds.
	    waitTime += Time.deltaTime * 1/animationTime;
	    transform.LookAt(target.position, Vector3.zero);

	    }

		}else SceneManager.LoadScene("CompleteLevel");

 }
