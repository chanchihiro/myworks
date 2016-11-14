$(function(){

	$("#gallery").each(function(){


		//乱数を設定する
		var val = Math.round( Math.random()*10);
		//#gallery要素がギャラリーのコンテナーになる
		var $container = $(this);

		//オプションを設定しMasonryを準備
		$container.masonry({
			columnWidth:240,
			gutter:15,
			itemSelector:".gallery-item", //整列対象の設定
			isAnimated: true, //スムースアニメーション設定
			isFitWidth: true, //親要素の幅サイズがピッタリ
			isResizable:true
		});

		//JASONファイルをリクエストして成功したら関数を実行
		$.getJSON("photo.json",function(data){

			//ループで生成したDOM要素を一時的に保存する配列
			var elements = [];

			//JSONの配列(data)の要素(item)ごとにループ処理
			$.each(data,function(i,item){

				//配列の要素からHTML文字列を生成
				var itemHTML =
					"<li class='gallery-item is-loading'>"+
					"<a href='"+item.images.large+"'>"+
					"<img src='"+item.images.thumb+
					"' alt='"+item.title+"'>"+
					"</a>"+"</li>";

				//HTML文字列をDOM要素化して配列に追加
				elements.push($(itemHTML).get(0));
			});

			//DOMを挿入
			$container.append(elements);

			//画像の読み込みが完了したらMasonryレイアウト
			$container.imagesLoaded(function(){
				$(elements).removeClass("is-loading");
				$container.masonry("appended",elements);
			});
		});
	});

});