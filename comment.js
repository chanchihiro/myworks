$(function(){
	$("#filter-all").on("click",function(){
		$(".namae").empty();
		$(".namae").append("<h3>野口 千紘 &lt; ﾉｸﾞﾁ ﾁﾋﾛ &gt;</h3><p>法政大学社会学部メディア社会学科3年。21歳。<br>現在は株式会社ペパボでデザイナー、LifeisTech!でメンターをしています。<br>大学では経験のデザインの研究をしており、UXを意識したデザインが好きです。<br>三度の飯より雑誌が好きで、WIRED,KINFOLKが好きです。</p>");
	});
	$("#filter-people").on("click",function(){
		$(".namae").empty();
		$(".namae").append("<h3>WEB</h3><p>ずっとsketch派でしたが、最近XDに乗り換えました。<br>Sketch / Adobe XD / Prott / Illustlator / Photoshop / HTML / CSS / SCSS / Jade / javascript / jQuery</p>");
	});
	$("#filter-animals").on("click",function(){
		$(".namae").empty();
		$(".namae").append("<h3>DTP</h3><p>イラレをいじることが好きなのでロゴも作ったりしてステッカーを作るのが趣味です。<br>Illustlator / Photoshop / Drawing / Shooting</p>");
	});
	$("#filter-nature").on("click",function(){
		$(".namae").empty();
		$(".namae").append("<h3>APPLICATION</h3><p>基本的にwebの技術しかないので、ハイブリッドモバイルアプリ開発サービスのMonacaを使用しています。<br>Monaca / Cordova / javascript / HTML / CSS / Prott / XD</p>");
	});
		$("#filter-plantes").on("click",function(){
		$(".namae").empty();
		$(".namae").append("<h3>ZINE</h3><p>雑誌はどちゃくそ好きで、毎月気に入った雑誌を4冊買うのが楽しみで生きています。<br>Illustlator / Photoshop / Interview / Communication</p>");
	});
});