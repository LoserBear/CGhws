import {camera,scene,renderer,candles,pickables,raycaster,mouseLoc} from "./main.js";

function doPointerDown (event) {
	event.preventDefault();
	
	mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouseLoc.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera (mouseLoc, camera);
	var intersects = raycaster.intersectObjects (pickables);
	
	if (intersects.length > 0) {
	  if(intersects[0].object.name == "fire"){
	    switch(intersects[0].object.parent.num){
		  case 0:
			if(intersects[0].object.parent.children[1].visible)
			  candles[0].convertToPudding();
			break;		  
		  case 1:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[1].convertToPudding();
			break;		  
		  case 2:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[2].convertToPudding();
			break;		  
	      case 3:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[3].convertToPudding();
			break;		  
	      case 4:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[4].convertToPudding();
			break;		  
	      case 5:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[5].convertToPudding();
			break;		  
	      case 6:
		    if(intersects[0].object.parent.children[1].visible)
			  candles[6].convertToPudding();
			break;
		  case 7:
		    if(intersects[0].object.parent.children[1].visible)
			  candles[7].convertToPudding();
			break;
		  case 8:
		    if(intersects[0].object.parent.children[1].visible)
		      candles[8].convertToPudding();
			break;
		}		
	  }
	} else {
		console.log ('nothing picked...');
	  }  
	
}
export{doPointerDown};