﻿class GameOver extends Scene {
    scoreRankLabel: Label;
    constructor(
        public gameover: StaticImage,
        public playagain: Button,
        public moregames: Button) {
        super(gameover, playagain, moregames);
        this.gameover.centerTo(Game.viewport);
        this.moregames.position.set(220, 280);
        this.playagain.position.set(450, 280);
        this.gameover.position.y -= 50;
        this.scoreRankLabel = new Label("", Color.red);
        this.scoreRankLabel.position.set(150, 250);
        this.add(this.scoreRankLabel);
    }

    update(frameSpan: number) {
        this.visible = GameWorld.lives <= 0;
        if (this.visible) {
            if (!Game.audios['music'].paused) {
                Game.audios['music'].pause();
            }
            super.update(frameSpan);
            if (Keyboard.pressed(Keys.enter) || this.playagain.pressed) {
                GameWorld.reset();
                if (Game.audios['music'].paused) {
                    Game.audios['music'].play();
                }
            }
            if(this.moregames.pressed){
              window.open("http://canvasgames.net/", "_blank");
            }
        }
    }
} 