function miniatura(img,nombre,desc){

	this.img=img;
	this.nombre=nombre;
	this.desc=desc;
	this.crearMiniatura=function (){

		var $miniatura=$("<div></div>");
		var $img=$("<img>")
		var $decCon=$("<div></div>");

		$miniatura.attr("class","thumbnail");
		$decCon.attr("class","caption");
		$img.attr("src",this.img);
		$img.attr("data-toggle","modal"); 
		$img.attr("data-target","#myModal"); 
		$decCon.append("<h3>"+this.nombre+"</h3>");
		$decCon.append("<p>"+this.desc+"</p>");
		$miniatura.append($img);
		$miniatura.append($decCon);

		return $miniatura;
	}

}

function inicializarCuadros(){

	var $albumnes=$("#albumnes");
	var $artistas=$("#artistas");
	var $canciones=$("#canciones");

	var min= new miniatura("mus.jpg","Musica","Esta es la descripcion");
	var $row=$("<div></div>");
	$row.attr("class","row");

	for(var i=0;i<6;i++){
		var $col=$("<div></div>");
		//data-toggle="modal" data-target="#myModal
		$col.attr("class","col-md-4 col-xs-12 col-sm-6 col-lg-2"); 
		
		$col.append(min.crearMiniatura());
		$row.append($col);
	}

	$albumnes.append($row.clone());
	$artistas.append($row.clone());
	$canciones.append($row.clone());
}

