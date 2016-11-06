
	var girl = null;
	var donut = null;
  var loadBar = null;
var cursors;

var PLState = {


init: function(){
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignVertically = true;
  this.scale.pageAlignHorizontally = true;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 100;
},

preload: function() {
    this.game.load.image("audio","assets/audioFile.png");
    this.game.load.image("chatBox","assets/chatBox.png");
    this.game.load.image("cpp","assets/cppFile.png");
    this.game.load.image("exec","assets/execFile.png");

    //this.game.load.start();
},

create : function() {
    this.game.add.text(0,10, "Hurry!! Lilac has a lot of work to do...\n get to the bottom right corner, quick!", { font: "30px Courier", fill: 'white'} );
    donut = this.game.add.sprite(this.game.width / 4, this.game.height / 4 , 'donut');
    this.game.physics.arcade.enable(donut);
    donut.body.allowGravity = false;
    donut.immovable = true;

    girl = this.game.add.sprite(100, 0, 'girl');
    girl.frame = 0;
    var rightWalk = girl.animations.add('rightWalk', [1,2,3], 10, true);
    var lefttWalk = girl.animations.add('leftWalk', [4, 5, 6], 10, true);
    this.game.physics.arcade.enable(girl);
    girl.body.collideWorldBounds = true;
    cursors = this.game.input.keyboard.createCursorKeys();

},



update : function(){
  if (girl.x < this.game.width && girl.x > this.game.width - 200 ){
        this.game.state.start("gs");
  }
    girl.body.velocity.x = 0;
    //girl.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        girl.body.velocity.x = -200;
        girl.animations.play('leftWalk');
    }
    else if (cursors.right.isDown)
    {
        girl.body.velocity.x = 200;
        girl.animations.play('rightWalk');
    }
    if (cursors.left.isUp && cursors.right.isUp){
          girl.animations.stop();
          girl.frame = 0;
    }
  }
};