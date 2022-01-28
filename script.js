enchant();

window.onload = function () {
	const game = new Game(400, 500);  				//画面サイズを400*500にする。（このサイズだとスマホでも快適なのでおススメ）

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分

	//タイトル
	const titleImgUrl = "title.png";						//game.htmlからの相対パス
	game.preload([titleImgUrl]);					//データを読み込んでおく

	//スタートボタン画像
	const startImgUrl = "start.png";						//game.htmlからの相対パス
	game.preload([startImgUrl]);					//データを読み込んでおく

	//クリック音読み込み
	const clickSndUrl = "click.wav";						//game.htmlからの相対パス
	game.preload([clickSndUrl]); 				//データを読み込んでおく

	//舞ちゃん
	const maiImgUrl = "mai.png";						//game.htmlからの相対パス
	game.preload([maiImgUrl]);					//データを読み込んでおく

	//プリン
	const purinImgUrl = "purin.png";						//game.htmlからの相対パス
	game.preload([purinImgUrl]);					//データを読み込んでおく

	//ボタン画像
	const buttonImgUrl = "button.png";						//game.htmlからの相対パス
	game.preload([buttonImgUrl]);					//データを読み込んでおく

	//GAMEOVER画像
	const gameoverImgUrl = "gameover.png";						//game.htmlからの相対パス
	game.preload([gameoverImgUrl]);					//データを読み込んでおく

	//CLEAR画像
	const clearImgUrl = "clear.png";						//game.htmlからの相対パス
	game.preload([clearImgUrl]);					//データを読み込んでおく

	//リトライボタン
	const retryImgUrl = "retry.png";						//game.htmlからの相対パス
	game.preload([retryImgUrl]);					//データを読み込んでおく

	//ツイートボタン
	const tweetImgUrl = "tweet.png";						//game.htmlからの相対パス
	game.preload([tweetImgUrl]);					//データを読み込んでおく		

	//読み込み終わり
	/////////////////////////////////////////////////


	game.onload = function () {					//ロードが終わった後にこの関数が呼び出されるので、この関数内にゲームのプログラムを書こう

		/////////////////////////////////////////////////
		//グローバル変数 

		let point = 0;									//ポイント
		let state = 0;								//現在のゲーム状態
		let theta = 0;
		let theta2 = 0;
		let size = 1;

		//グローバル変数終わり
		/////////////////////////////////////////////////

		const titleScene = new Scene();					//シーン作成
		game.pushScene(titleScene);  					//mainSceneシーンオブジェクトを画面に設置
		titleScene.backgroundColor = "black"; 			//mainSceneシーンの背景は黒くした

		//タイトル画面
		const titleImg = new Sprite(400, 500);			//画像サイズ
		titleImg.moveTo(0, 0);							//舞ちゃんの位置
		titleImg.image = game.assets[titleImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		titleScene.addChild(titleImg);						//mainSceneにこの画像を貼り付ける

		//ボタン
		const startImg = new Sprite(140, 60);			//画像サイズ
		startImg.moveTo(130, 420);						//ボタンの位置
		startImg.image = game.assets[startImgUrl];	//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		titleScene.addChild(startImg);					//mainSceneにこの画像を貼り付ける

		startImg.ontouchend = function () {				//ボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			game.popScene();					//mainSceneシーンを外す
			game.pushScene(mainScene);				//endSceneシーンを読み込ませる
		};




		const mainScene = new Scene();					//シーン作成
		//game.pushScene(mainScene);  					//mainSceneシーンオブジェクトを画面に設置
		mainScene.backgroundColor = "black"; 			//mainSceneシーンの背景は黒くした

		//ポイント表示テキスト
		const scoreText = new Label(); 					//テキストはLabelクラス
		scoreText.font = "20px Meiryo";					//フォントはメイリオ 20px 変えたかったらググってくれ
		scoreText.color = 'rgba(255,255,255,1)';		//色　RGB+透明度　今回は白
		scoreText.width = 400;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		scoreText.moveTo(0, 30);						//移動位置指定
		mainScene.addChild(scoreText);					//mainSceneシーンにこの画像を埋め込む

		scoreText.text = "現在：" + size;					//テキストに文字表示 Pointは変数なので、ここの数字が増える

		//舞ちゃん
		const maiImg = new Sprite(400, 500);			//画像サイズ
		maiImg.moveTo(0, 0);							//舞ちゃんの位置
		maiImg.image = game.assets[maiImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		mainScene.addChild(maiImg);						//mainSceneにこの画像を貼り付ける

		//プリン
		const purinImg = new Sprite(60, 40);			//画像サイズ
		purinImg.moveTo(118, 100);						//プリンの位置
		purinImg.image = game.assets[purinImgUrl];		//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		mainScene.addChild(purinImg);					//mainSceneにこの画像を貼り付ける
		
		//ボタン
		const buttonImg = new Sprite(140, 60);			//画像サイズ
		buttonImg.moveTo(130, 420);						//ボタンの位置
		buttonImg.image = game.assets[buttonImgUrl];	//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		mainScene.addChild(buttonImg);					//mainSceneにこの画像を貼り付ける


		buttonImg.ontouchend = function () {				//ボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			point++;									    //Pointを1増やす
			if(state == 2){
				game.assets[clickSndUrl].clone().play();		//クリックの音を鳴らす。
			}


			//ポイントによって状態Stateを変更する
			if (point < 1) {
				state = 1;
			} else if (point < 2) {
				state = 2;
			} else {
				state = 3;
			}

		};



		///////////////////////////////////////////////////
		//メインループ
		game.onenterframe = function () {
			if (state == 0) { 							//state=0のとき、初期セット状態(Pointの状態を０にして)
				purinImg.x = 170;						//プリンのx座標を指定
				purinImg.y = 370;						//プリンのy座標を指定
				theta = 0;
				theta2 = 0;
				size = 1;
				point = 0;  							//point初期化
				state = 1;							//ゲームスタート状態に移行
			}
			if (state == 1) {							//ゲームスタート　プリンの大きさが変わる
				theta += 5;
				size = 1 + Math.sin(theta / 60) * 0.5;　　　　　　　　　　　　　　　　//プリンのサイズをつかさどる関数
				purinImg.tl.scaleTo(size,size,0);　　　　　　　　　　　　　　　　　　　//プリンのサイズを変更
				purinImg.x = 170 - Math.sin(theta / 90) * 0.5;						//プリンのｘ座標を指定
				purinImg.y = 370 - Math.sin(theta / 90) * 0.5;						//プリンのy座標を指定				
			}
			if (state == 2) {							//プリンが左右に移動
				theta2 += 5;
				purinImg.x = 170 + Math.sin(theta2 / 70) * 100; // x座標を振幅100pxのサイン波で移動				
			}
			if (state == 3) {							//プリンが飛んでいく
				purinImg.y += -10;				
			}

			//ゲームオーバー判定
			if (purinImg.y <= -100) {						//画面上端にプリンが到達してしまったら
				game.popScene();					　　　　//mainSceneシーンを外す
				game.pushScene(endScene);				　　//endSceneシーンを読み込ませる

			}

			//クリア判定
			if (140 + 30*size <= purinImg.x && purinImg.x <= 208 - 30*size &&  purinImg.y <= 184) {		//プリンが舞の口の高さに到達
				purinImg.y = 100
				game.popScene();					//mainSceneシーンを外す
				game.pushScene(endScene2);				//endSceneシーンを読み込ませる
				//ゲームオーバー後のテキスト表示
				ClearText.text = "あなたの記録：" + (Math.round(200*size-100)) + "点";				//テキストに文字表示 
			}

		};



		////////////////////////////////////////////////////////////////
		//GAMEOVER画面
		const endScene = new Scene();
		endScene.backgroundColor = "blue";
		const gameoverImg = new Sprite(400, 500);			//画像サイズ
		gameoverImg.moveTo(0, 0);							//位置
		gameoverImg.image = game.assets[gameoverImgUrl];	//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene.addChild(gameoverImg);						//endSceneにこの画像を貼り付ける

		//CLEAR画面
		const endScene2 = new Scene();
		endScene2.backgroundColor = "green";
		const clearImg = new Sprite(400, 500);			//画像サイズ
		clearImg.moveTo(0, 0);							//位置
		clearImg.image = game.assets[clearImgUrl];		//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene2.addChild(clearImg);					//endScene2にこの画像を貼り付ける

		//CLEAR
		const ClearText = new Label(); 					//テキストはLabelクラス
		ClearText.font = "20px Meiryo";					//フォントはメイリオ 20px
		ClearText.color = 'rgba(0,0,0,1)';				//色　RGB+透明度
		ClearText.width = 400;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		ClearText.moveTo(100, 410);						//移動位置指定
		endScene2.addChild(ClearText);					//endScene2シーンにこの画像を埋め込む

		//リトライボタン
		const retryBtn = new Sprite(140, 40);			//画像サイズ
		retryBtn.moveTo(130, 440);						//リトライボタンの位置
		retryBtn.image = game.assets[retryImgUrl];		//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene.addChild(retryBtn);					//endSceneにこのリトライボタン画像を貼り付ける  

		//リトライボタン2
		const retryBtn2 = new Sprite(140, 40);			//画像サイズ
		retryBtn2.moveTo(40, 440);						//リトライボタンの位置
		retryBtn2.image = game.assets[retryImgUrl];		//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene2.addChild(retryBtn2);					//endSceneにこのリトライボタン画像を貼り付ける  
		

		retryBtn.ontouchend = function () {				//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			state = 0;
			game.popScene();							//endSceneシーンを外す
			game.pushScene(mainScene);					//mainSceneシーンを入れる
		};

		retryBtn2.ontouchend = function () {			//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			state = 0;
			game.popScene();							//endSceneシーンを外す
			game.pushScene(mainScene);					//mainSceneシーンを入れる
		};


		//ツイートボタン
		const tweetBtn = new Sprite(140, 40);				//画像サイズ
		tweetBtn.moveTo(230, 440);						//ツイートボタンの位置
		tweetBtn.image = game.assets[tweetImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene2.addChild(tweetBtn);					//endScene2にこのツイートボタン画像を貼り付ける  
		

		tweetBtn.ontouchend = function () {				//S_Tweetボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			//ツイートＡＰＩに送信
			//結果ツイート時にURLを貼るため、このゲームのURLをここに記入してURLがツイート画面に反映されるようにエンコードする
			const url = encodeURI("https://shishidonagi.github.io/");
			window.open("http://twitter.com/intent/tweet?text=私が舞ちゃんに食べさせたプリンの大きさは"
			 + (Math.round(200*size-100)) + "点" + "&hashtags=舞ちゃんにプリンを食べさせるゲーム&url="
			 + url) ;
			 //ハッシュタグ
		};

	};
	game.start();
};
