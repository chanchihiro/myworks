$(function(){

	$("#gallery").each(function(){
		//乱数を設定する
		// var val = Math.round( Math.random()*10);

		//#gallery要素がギャラリーのコンテナーになる
		var $container = $(this),
			$loadmorebutton = $("#load-more"),
			$filter = $("#gallery-filter"),
			addItemCount = 10, //一度に何枚を表示するか
			added = 0, //表示済みのアイテム
			allData = [], //全てのJSONデータ
			filteredData = []; //フィルタリングされたJSONデータ

		//オプションを設定しMasonryを準備
		$container.masonry({
			columnWidth:280, //カラムの幅を設定
			gutter:30, //隙間の大きさを設定
			itemSelector:".gallery-item", //整列対象の設定
			isAnimated: true, //スムースアニメーション設定
			isFitWidth: true, //親要素の幅サイズがピッタリ
			isResizable:true
		});

		//JASONファイルをリクエストして成功したら関数を実行
		$.getJSON("photo.json",initGallery);

		//ギャラリーを初期化する関数の作成
		function initGallery (data){
			//取得したJSONデータを使えるように格納する
			allData = data;
			//フィルタリングされた時にそのデータを保持するため
			filteredData = allData;
			//最初のアイテム群を表示
			addItems();
			//追加ボタンが押されたら追加で表示
			$loadmorebutton.on("click",addItems);
			//フィルターのラジオボタンが変更されたらフィルタリングを実行
			$filter.on("change",'input[type="radio"]',filterItems);

			//アイテムのリンクにホバーエフェクト処理を登録
			$container.on("mouseenter mouseleave",".gallery-item a",hoverDirection);
		}


		//アイテムを作成しドキュメントを挿入する
		function addItems(filter){
			var elements = [],
				slicedData = filteredData.slice(added,added + addItemCount); //追加するデータの配列

			//sliceDataの要素ごとにDOM要素を作成ループ処理
			$.each(slicedData,function(i,item){
				var itemHTML = 
					"<li class='gallery-item is-loading'>"+
					"<a href='"+item.url+"' class='iframe'>"+
					"<img src='"+item.images.thumb+"' alt='"+item.title+"'>"+
					"<span class='caption'>"+"<img src='img/shupan2.png' class='shupan'>"+
					"<span class='iner'>"+
					"</span>"+"</span>"+
					"</a>"+"</li>";
				elements.push($(itemHTML).get(0));
			});

			//DOM要素の配列をコンテナーに挿入し、Masonryレイアウトを実行
			$container.append(elements).imagesLoaded(function(){
				$(elements).removeClass('is-loading');
				$container.masonry("appended",elements);

				//フィルタリング時は再配置
				if(filter){
					$container.masonry();
				}
			});


			//colorboxの起動
			$(function(){
				$("a").colorbox({
					maxWidth:"85%",
					maxHeight:"100%",
					"background-color":"rgba(0,0,0,0)"
				});
			});


			//追加済みのアイテム数の更新
			added += slicedData.length;

			//JSONデータが全て追加し終わっていたら追加ボタンを消す
			if(added<filteredData.length){
				$loadmorebutton.show();
			}else{
				$loadmorebutton.hide();
			}

			$(".iframe").colorbox({
			    iframe:true,
			    width:"100%",
			    height:"130%",
			    opacity: 0.7
			});


		}


		//アイテムをフィルタリングする
		function filterItems(){
			var key = $(this).val(), //チェックされたラジオボタンのvalue
				//追加済みのMasonryアイテム
				masonryItems = $container.masonry("getItemElements");

			//Masonryアイテムを削除
			$container.masonry("remove",masonryItems);

			//フィルタリング済のアイテムのデータをリセットと追加済のアイテム数をリセット
			filteredData = [];
			added = 0;

			if(key === "all"){
				//allがチェックされた場合、全てのJSONデータを格納
				filteredData = allData;
			}else{
				//all以外の場合、キーと一致するデータを抽出
				filteredData = $.grep(allData,function(item){
					return item.category === key;
				});
			}

			//アイテムを追加
			addItems(true);
		}

		function hoverDirection(event){
			var $overlay = $(this).find(".caption"),
				side = getMouseDirection(event),
				animateTo,
				positionIn = {
					top: "0%",
					left: "0%"
				},
				positionOut = (function(){
					switch (side){
						//case0:top case1:right case2:bottom case3:left
						case 0: return {top:"-100%",left:"0%"};
								break;
						case 1: return {top:"0%",left:"100%"};
								break;
						case 2: return {top:"100%",left:"0%"};
								break;
						default: return {top:"0%",left:"-100%"};
								break;
					}
				})();

			if(event.type === "mouseenter"){
				animateTo = positionIn;
				$overlay.css(positionOut);
			}else{
				animateTo = positionOut;
			}
			$overlay.stop(true).animate(animateTo,150);
		}

        // マウスの方向を検出する関数
        // http://stackoverflow.com/a/3647634
        function getMouseDirection (event) {
            var $el = $(event.currentTarget),
                offset = $el.offset(),
                w = $el.outerWidth(),
                h = $el.outerHeight(),
                x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
                y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
                direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
            return direction;
        }


	});
});