window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
	canvasApp();
}

function canvasApp(){

	var n=6; //NÚMERO DE CANVAS
	var canvas=[];
	var context=[];
	for(var i=1;i<=n;i++){ //AGREGANDO CANVAS Y CONTEXT
		canvas.push(document.getElementById("miCanvas"+i));
		context.push(canvas[i-1].getContext("2d"));
	}

	var imagenes=[];
	imagenes.push(new Image(),new Image(),new Image(),new Image());
	imagenes[0].src="img/mario.png";
	imagenes[1].src="img/sonic.jpg";
	imagenes[2].src="img/pacman.jpg";
	imagenes[3].src="img/Fractals.png";

	var kirby=[];
	var mk=[];
	for(var i=1;i<=10;i++){
		kirby.push(new Image());
		kirby[i-1].src="sprites/Kirby/Absorver/Kirby_Absorver_"+i+".png";
		mk.push(new Image());
		mk[i-1].src="sprites/Metak Night/Remolino/MetakNight_Remolino_"+i+".png";
	}

	var mario=[];
	for(var i=1;i<=8;i++){
		mario.push(new Image());
		mario[i-1].src="sprites/Mario/Caminar/Mario_Caminar_"+i+".png";
	}

	//CARGAR CUADROS DE MAPA
	var tileSheet = new Image();
	//tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src = "tanks_sheet.png";
	var mapIndexOffset = -1;
	var mapRows = 10;
	var mapCols = 10;

	var tileMap = [
	[32,31,31,31,1,31,31,31,31,32]
	, [1,1,1,1,1,1,1,1,1,1]
	, [32,1,26,1,26,1,26,1,1,32]
	, [32,26,1,1,26,1,1,26,1,32]
	, [32,1,1,1,26,26,1,26,1,32]
	, [32,1,1,26,1,1,1,26,1,32]
	, [32,1,1,1,1,1,1,26,1,32]
	, [1,1,26,1,26,1,26,1,1,1]
	, [32,1,1,1,1,1,1,1,1,32]
	, [32,31,31,31,1,31,31,31,31,32]
	];

	//CARGAR CUADROS DE MAPA
	var snakeSheet = new Image();
	//tileSheet.addEventListener('load', eventSheetLoaded , false);
	snakeSheet.src = "snake-graphics.png";
	var mapRowsSn = 1;
	var mapColsSn = 4;
	
	var snakeMap = [
	  [15,2,2,5]
	];

	var bandera=0;
	var s1=1.0,s2=1.0,s3=1.0,g1=1;
	var index=0,j=0,tam=150,inc=5,incs=0.1,i2=0;
	var i2=0;

	var j3=0,b3=0, inc3=5;
	/*
	var mono = new Image();
	mono.addEventListener('load', iniciar , false);
	mono.src= "img/sonic.jpg";
	*/
	dibujarMapa();
	dibujarSerpiente();
	iniciar();
	
	function dibujarPantalla(){
		var z=0;
		context[z].clearRect(0,0,canvas[z].width,canvas[z].height);
		context[z].save();
		context[z].scale(s1,s1);
		//context[z].rotate(g1*Math.PI/180);
		context[z].drawImage(imagenes[3],0,0,70,46);
		context[z].restore();
		s1+=incs;
		if(s1>=7.0 || s1<=1.0){
			g1*=-1;
			incs*=-1;
		}
	}

	function dibujarPantalla2(){
		//CONTEXT 2
		var z=1;
		context[z].clearRect(0,0,canvas[z].width,canvas[z].height);
		context[z].save();
		context[z].drawImage(kirby[index],0,0,tam,200);
		
		context[z].restore();

		context[z].save();
		context[z].translate(300,0);
		context[z].drawImage(mk[index],0,0,tam,200);
		context[z].restore();

		if(j+tam==canvas[z].width || j==0){
			inc*=-1;
		}
		//index = (index+1)%imagenes.length;
		/*
		if(j==0){
			index = (index+1)%3;
		}
		*/
		index=(index+1)%kirby.length;
	}

	function dibujarPantalla3(){
		//CONTEXT 2
		var z=2;
		context[z].clearRect(0,0,canvas[z].width,canvas[z].height);
		context[z].save();
		//if(inc<0){
		//context.fill
		context[z].translate(j3,0);
		//context[z].fillRect(0,0,tam,200);
		context[z].drawImage(mario[i2],0,0,tam,200);

		//context[z].closePath();
		//context[z].fill();		
		context[z].restore();

		j3+=inc3;

		//if(j+tam==canvas[z].width || j==0){
		if(j3+tam==canvas[z].width || j3==0){
			inc3*=-1;
			b3^=1;
			//context[z].setTransform(-1, 0, 0, 1, 0, 0);
		}
		i2=(i2+1)%mario.length;
		//indexMario=(indexMario+1)%mario.length;
	}

	function dibujarPantalla4(){
		//CONTEXT 2
		var z=3;
		context[z].clearRect(0,0,canvas[z].width,canvas[z].height);
		context[z].save();
		
		context[z].translate(j3,0);
		
		if(inc3<0){
			context[z].translate(tam,0);//NO APLICA LA TRANSFORMACIÓN AUN NO SÉ POR QUE :C
			context[z].setTransform(-1, 0, 0, 1, 0, 0);

			context[z].translate(-j3,0);
		}
		context.fill
		
		context[z].fillRect(0,0,tam,200);
		context[z].drawImage(mario[i2],0,0,tam,200);

		context[z].closePath();
		context[z].fill();		
		context[z].restore();

		j3+=inc3;

		if(j3+tam>=canvas[z].width || j3==0){
			inc3*=-1;
		}
		i2=(i2+1)%mario.length;
	}

	function dibujarMapa() {
		var z=4;
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				var tileId = tileMap[rowCtr][colCtr]+mapIndexOffset;
				var sourceX = Math.floor(tileId % 8) *32;
				var sourceY = Math.floor(tileId / 8) *32;
				context[z].drawImage(tileSheet, sourceX,sourceY,
									 32,32,colCtr*64,rowCtr*64,64,64);
			}
		}
	}

	function dibujarSerpiente() {
		var z=5;
		for (var rowCtrSn=0;rowCtrSn<mapRowsSn;rowCtrSn++) {
			for (var colCtrSn=0;colCtrSn<mapCols;colCtrSn++){
				var snakeId = snakeMap[rowCtrSn][colCtrSn]+mapIndexOffset;
				var sourceXSn = Math.floor(snakeId % 5) *64;
				var sourceYSn = Math.floor(snakeId / 5) *64;
				context[z].drawImage(snakeSheet, sourceXSn,sourceYSn,
									 64,64,colCtrSn*64,rowCtrSn*64,64,64);
			}
		}
	}


	//drawImage(IMAGEN, XCANVAS,YCANVAS,ANCHO,ALTO,PIX,PIY,ANCHO_A_PARTIR_DE_PIX,
	//	ALTO_A_PARTIR_DE_PIY);

	function iniciar(){
		gameLoop();
	}

	function gameLoop() {
		window.setTimeout(gameLoop, 100);
		dibujarPantalla();
		dibujarPantalla2();
		dibujarPantalla3();
		dibujarPantalla4();
		//dibujarMapa();
	}

}
