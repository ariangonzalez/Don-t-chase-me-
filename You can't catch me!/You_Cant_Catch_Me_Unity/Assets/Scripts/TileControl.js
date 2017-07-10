//Written by Arian J. Gonzalez

#pragma strict
import System.Collections.Generic;

//Variable declarations
var Tiles:GameObject[];
var Buildings:GameObject[];
var Apartment:GameObject;
var spawnBuilding:float = -15.0f;
var BuildingLegth:float = 16f;
var Player:Transform;
var spawn:float = -15.0f;
var TileLegth:float = 5f;
var TilesOnScreen:int = 5;
var BuildingOnScreen:int = 5;
var lastIndex:int = 0;
var CurrentTiles : List.<GameObject> ;
var CurrentBuilding : List.<GameObject> ;
var CurrentApartment : List.<GameObject> ;
var ApartmentEvery:float = 36.0f;
var tiles:int = 0;
var five:int = 5;
var count1:int = 0;

function Start () {

	//Obtain Player 
	Player = GameObject.FindGameObjectWithTag("Player").transform;
	CurrentBuilding = new List.<GameObject>();
	CurrentTiles = new List.<GameObject>();
	CurrentApartment = new List.<GameObject>();

	//When game starts create 6 sidewalk and building
	for (var i:int = 0; i < TilesOnScreen; i++){

	if(i < 6){
		newTiles(0);
		newBuilding();
		newBuilding();
	}
	else{
		newTiles(-1);
		}
	}
}

function Update () {

	//When total number of tiles equals 36 create spawn and apartment
	if (tiles == ApartmentEvery ) {
		//Reset counter
        tiles=0.0f;
        newApartment();
        //Disactive the current building in the apartment
        CurrentBuilding[five].SetActive(false);
	    five += 7;
	    count1++;
	    //Every 3 apartment destroy one 
	    if(count1 == 3){
	     Destroy(CurrentApartment[0]);
  		CurrentApartment.RemoveAt(0);
  		count1 = 0;
  		newBuilding();

	    }
	    //does not allow the rest of code to execute when apartment is spawn.
        return;
    }

    //spawn new tiles when player advances more the 15 seconds
    //Delete old tiles as well
	if(Player.position.z - 15.0f> (spawn - TilesOnScreen * TileLegth))
	{
	  newTiles(-1);
	  DeleteTiles();
	}
}

function newTiles(index :int){
	//Creates new tiles
	var newTile: GameObject;
	//When index = -1 spawn random tiles.
	if(index == -1)
	newTile = Instantiate(Tiles[RandomIndex()]) as GameObject;
	else
	//Else only spawn tile in index 0 in the array of tiles.
	newTile = Instantiate(Tiles[0]) as GameObject;
	//Set parent to script holder gameobject
	newTile.transform.SetParent(transform);
	//Creates new tile at the next spawn location
	newTile.transform.position = Vector3.forward * spawn;
	//Increases spawn by the length of the tiles
	spawn += TileLegth;
	//Add to a list 
	//List makes it easy to remove from index 0.
	CurrentTiles.Add(newTile);
	//Tiles counter increases
	tiles++;


}

function newBuilding(){
	//Creates new building
	var newBuilding:GameObject;

	newBuilding = Instantiate(Buildings[0]) as GameObject;
	//Set parent to script holder gameobject
	newBuilding.transform.SetParent(transform);
	//Creates new Building at the next spawn location
	newBuilding.transform.position = Vector3.forward * spawnBuilding;
	//Increases spawn by the length of the buildings
	spawnBuilding += BuildingLegth;
	//Add to List
	CurrentBuilding.Add(newBuilding);


}

function newApartment(){
	//Cretes new apartment
	var newApartment:GameObject;
	newApartment = Instantiate(Apartment) as GameObject;
	//Set parent to script holder gameobject
	newApartment.transform.SetParent(transform);
	//Increase tile spawn by size of tile in apartment
	spawn +=7.5f;
	//Creates new Apartment at the next spawn location
	newApartment.transform.position = Vector3.forward * spawn;
	//Increases spawn by the length of the apartmenet
	spawn +=22.5f;
	CurrentApartment.Add(newApartment);

}

function DeleteTiles(){
	//Destroy Current tile in position 0
	//Remove from List
	Destroy(CurrentTiles[0]);
	CurrentTiles.RemoveAt(0);


}

function RandomIndex():int {

	//Generate a random index
	if (Tiles.Length <= 1) return 0;

	var random:int = lastIndex;

	while(random == lastIndex){

	random = Random.Range(0,Tiles.Length);

	}

	lastIndex = random;
	return random;

}
