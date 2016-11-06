
	var girl = null;
	var platformGroup = null;
	var hit = null;
	var cursors = null;
	var jumped = false;
	var textNotifGroup = {};
	var remindNotifGroup = {};
	var timer1;
	var imageChoice = ['textNotif', 'remindNotif'];
	var reminders = ["do your HW", "call your mom", "make doc appt.", "apply for intern"];
	var reminderObjects = [];
	var texts = ["you suck at math??", "delete it, fat", "get off insta?", "can u help"];
	var newEnemy = false;
	var goodOne = false;
	var nice = null;

var GameState = {


init: function(){
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignVertically = true;
  this.scale.pageAlignHorizontally = true;

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 1000;
},

preload: function() {
	this.game.load.image("background","assets/background.png"); 
	this.game.load.image("webpage","assets/webPage.png"); 
	this.game.load.image("textNotif","assets/textNotif.png");
	this.game.load.image("remindNotif","assets/reminderNotif.png");
	this.game.load.image("friendTextNotif","assets/friendTextNotif.png");  
    this.game.load.image("audio","assets/audioFile.png");
    this.game.load.image("chatBox","assets/chatBox.png");
    this.game.load.image("cpp","assets/cppFile.png");
    this.game.load.image("exec","assets/execFile.png");
    this.game.load.image("dock","assets/dockBar.png");
},



updateNotif : function(){
	newEnemy = !newEnemy;
}, 

updateGood : function(){
	goodOne = !goodOne;
},


create : function() {

	timer1 = this.game.time.create(false);
    timer1.loop(10000, this.updateNotif, this.game);
    timer1.loop(30000, this.updateGood, this.game);
    timer1.start();

	this.game.add.tileSprite(0, 0, 800, 460, 'background');



	textNotifGroup = this.game.add.group();
	remindNotifGroup = this.game.add.group();
	remindNotifGroup.enableBody = true;
	textNotifGroup.enableBody = true;


	platformGroup = this.game.add.group();


    platformGroup.create(0,0, 'exec');
    platformGroup.create(0, 60, 'exec');
    //platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'exec');
    

    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'audio');
    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'audio');
    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'audio');

    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'cpp');
    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'cpp');
    platformGroup.create(this.game.rnd.between(0, 500), this.game.rnd.between(0, 350), 'cpp');


    platformGroup.create(200, 145, 'chatBox');
    platformGroup.create(250, 175, 'webpage');
    platformGroup.create(180, 360, 'dock');

    this.game.physics.enable(platformGroup, Phaser.Physics.ARCADE);
    platformGroup.setAll('body.allowGravity', false);
    platformGroup.setAll('body.immovable', true);

    girl = this.game.add.sprite(200, 0, 'girl');
    girl.frame = 0;
    var rightWalk = girl.animations.add('rightWalk', [1,2,3], 10, true);
    var lefttWalk = girl.animations.add('leftWalk', [4, 5, 6], 10, true);
    this.game.physics.arcade.enable(girl);
    girl.body.collideWorldBounds = true;

    cursors = this.game.input.keyboard.createCursorKeys();



},

update : function(){
	//console.log("UPDATE");
	this.game.physics.arcade.collide(girl, platformGroup);
	if (this.game.physics.arcade.collide(girl, remindNotifGroup) || this.game.physics.arcade.collide(girl, textNotifGroup)){
		this.game.state.start("bs");
	}
	if (this.game.physics.arcade.collide(girl, nice)){
		remindNotifGroup.callAll('kill');
		textNotifGroup.callAll('kill');
		nice.kill();

	}
	girl.body.velocity.x = 0;
    girl.body.velocity.y = 100; 
    var rand = Math.round(Math.random());
    if (newEnemy){
		if( rand == 1){
			var s = remindNotifGroup.create(this.game.width - 147, 0, 'remindNotif');
    		remindNotifGroup.setAll('body.allowGravity', false);
			//var textObj = this.game.add.text(this.game.width - 140,10, reminders[Math.floor(Math.random() * reminders.length)], { font: "12px Courier", fill: 'white'} );
			newEnemy = !newEnemy;
        	s.body.collideWorldBounds = true;
        	s.body.bounce.setTo(0.8, 0.8);
        	s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);

			}
		else if(rand == 0){
			var t = textNotifGroup.create(this.game.width - 147, 0, 'textNotif');
			//this.game.add.text(this.game.width - 140,10, texts[Math.floor(Math.random() * texts.length)], { font: "12px Courier", fill: 'white'} );
			newEnemy = !newEnemy;
			textNotifGroup.setAll('body.allowGravity', false);
        	t.body.collideWorldBounds = true;
        	t.body.bounce.setTo(0.8, 0.8);
        	t.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
		}
	}
	if (goodOne){
			nice = this.game.add.sprite (this.game.width - 147, 0, 'friendTextNotif');
			this.game.physics.enable(nice, Phaser.Physics.ARCADE);
    		nice.body.allowGravity = false;
			//var textObj = this.game.add.text(this.game.width - 140,10, reminders[Math.floor(Math.random() * reminders.length)], { font: "12px Courier", fill: 'white'} );
			goodOne = !goodOne;
        	nice.body.collideWorldBounds = true;
        	nice.body.bounce.setTo(0.8, 0.8);
        	nice.body.velocity.setTo(10 + Math.random() * 80, 10 + Math.random() * 80);
	}

    if (cursors.left.isDown)
    {
    	girl.animations.play('leftWalk');
        girl.body.velocity.x = -100;
    }
    else if (cursors.right.isDown)
    {
    	girl.animations.play('rightWalk');
        girl.body.velocity.x = 100;
    }
    if (cursors.left.isUp && cursors.right.isUp){
    	girl.animations.stop();
    	girl.frame = 0;
    }
    if(cursors.up.isDown && jumped == false){
    	girl.body.velocity.y = -2200;
    	jumped = true;
    }
    else if (cursors.up.isUp && jumped == true){
    	girl.body.velocity.y = 100;
    	jumped = false;
    }

  }

};