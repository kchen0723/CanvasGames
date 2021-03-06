// Tick Tick Game
// Junfeng Liu @ 2015-2-21

class Sprites {
    background_title = new StaticImage(new SpriteImage(Game.images['title']));
    background_help = new StaticImage(new SpriteImage(Game.images['help']));
    background_sky = new StaticImage(new SpriteImage(Game.images['sky']));
    levelselect = new StaticImage(new SpriteImage(Game.images['levelselect']));
    options = new StaticImage(new SpriteImage(Game.images['options']));
    cloud_1 = new StaticImage(new SpriteImage(Game.images['cloud_1']));
    cloud_2 = new StaticImage(new SpriteImage(Game.images['cloud_2']));
    cloud_3 = new StaticImage(new SpriteImage(Game.images['cloud_3']));
    cloud_4 = new StaticImage(new SpriteImage(Game.images['cloud_4']));
    cloud_5 = new StaticImage(new SpriteImage(Game.images['cloud_5']));
    mountain_1 = new StaticImage(new SpriteImage(Game.images['mountain_1']));
    mountain_2 = new StaticImage(new SpriteImage(Game.images['mountain_2']));

    overlay_gameover = new Button(new SpriteImage(Game.images['titles'], new Rectangle(0, 0, 660, 231)));
    overlay_welldone = new Button(new SpriteImage(Game.images['titles'], new Rectangle(660, 0, 660, 231)));

    frame_hint = new StaticImage(new SpriteImage(Game.images['frame_hint']));
    timer = new StaticImage(new SpriteImage(Game.images['timer']));

    button_back = new Button(new SpriteImage(Game.images['buttons'], new Rectangle(0, 0, 236, 54)));
    button_help = new Button(new SpriteImage(Game.images['buttons'], new Rectangle(236, 0, 236, 54)));
    button_play = new Button(new SpriteImage(Game.images['buttons'], new Rectangle(472, 0, 236, 54)));
    button_options = new Button(new SpriteImage(Game.images['buttons'], new Rectangle(708, 0, 236, 54)));
    button_quit = new Button(new SpriteImage(Game.images['buttons'], new Rectangle(944, 0, 128, 54)));
    level_solved = new SpriteImage(Game.images['level_solved']);
    level_unsolved = new SpriteImage(Game.images['level_unsolved']);
    level_locked = new SpriteImage(Game.images['level_locked']);

    enemiesButton = new ToggleButton(new SpriteSheet(Game.images['controls'], 1, 2, 0, new Rectangle(0, 0, 259, 49)), 1, 0);
    icehotButton = new ToggleButton(new SpriteSheet(Game.images['controls'], 1, 2, 0, new Rectangle(0, 0, 259, 49)), 1, 0);
    ticksButton = new ToggleButton(new SpriteSheet(Game.images['controls'], 1, 2, 0, new Rectangle(0, 60, 282, 33)), 1, 0);
    musicSlider = new Slider(new SpriteImage(Game.images['controls'], new Rectangle(520, 0, 290, 30)), new SpriteImage(Game.images['controls'], new Rectangle(814, 2, 41, 24)), 5, 5, 4);

    platform = new SpriteImage(Game.images['platforms'], new Rectangle(0, 0, 72, 55));
    platform_hot = new SpriteImage(Game.images['platforms'], new Rectangle(72, 0, 72, 55));
    platform_ice = new SpriteImage(Game.images['platforms'], new Rectangle(144, 0, 72, 55));
    wall = new SpriteImage(Game.images['platforms'], new Rectangle(216, 0, 72, 55));
    wall_hot = new SpriteImage(Game.images['platforms'], new Rectangle(288, 0, 72, 55));
    wall_ice = new SpriteImage(Game.images['platforms'], new Rectangle(360, 0, 72, 55));

    goal = new StaticImage(new SpriteImage(Game.images['goal']));
    water = new SpriteImage(Game.images['water']);

    levelButtons: LevelButton[] = [];

    constructor() {
        // title
        this.button_play.centerHorizontally(Game.viewport, 540);
        this.button_play.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        };
        this.button_options.centerHorizontally(Game.viewport, 600);
        this.button_options.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.options.id);
        };
        this.button_help.centerHorizontally(Game.viewport, 660);
        this.button_help.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.help.id);
        };
        this.button_back.centerHorizontally(Game.viewport, 750);
        this.button_back.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.title.id);
        };

        // options
        this.enemiesButton.position.set(770, 396);
        this.enemiesButton.on = GameWorld.options.enableEnemies;
        this.enemiesButton.change = function (value) {
            GameWorld.options.enableEnemies = value;
        }
        this.icehotButton.position.set(770, 476);
        this.icehotButton.on = GameWorld.options.enableIceAndHot;
        this.icehotButton.change = function (value) {
            GameWorld.options.enableIceAndHot = value;
        }
        this.ticksButton.position.set(755, 562);
        this.ticksButton.on = GameWorld.options.timerTicks == 30;
        this.ticksButton.change = function (value) {
            GameWorld.options.timerTicks = value ? 30 : 60;
        }
        this.musicSlider.position = new Vector2(748, 644);
        this.musicSlider.value = GameWorld.options.volume;
        this.musicSlider.change = function (value) {
            Game.audios['music'].volume = value * 0.5;
            GameWorld.options.volume = value;
        }

        // playing
        this.background_sky.position.y = Game.viewport.height - this.background_sky.height;
        this.frame_hint.centerHorizontally(Game.viewport, 10);
        this.timer.position.set(10, 10);
        this.button_quit.position.set(Game.viewport.width - this.button_quit.width - 10, 10);
        this.button_quit.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        };

        // level finish
        this.overlay_welldone.centerTo(Game.viewport);
        this.overlay_welldone.click = function () {
            GameWorld.nextLevel();
        };

        // game over
        this.overlay_gameover.centerTo(Game.viewport);
        this.overlay_gameover.click = function () {
            GameWorld.gotoLevel(GameWorld.currentLevel.levelIndex);
        };
    }
}

class Scenes {
    title = new Scene(this.sprites.background_title, this.sprites.button_play, this.sprites.button_options, this.sprites.button_help);
    help = new Scene(this.sprites.background_help, this.sprites.button_back);
    levelselect = new Scene(this.sprites.levelselect, this.sprites.button_back);
    options = new Scene(this.sprites.options, this.sprites.enemiesButton, this.sprites.icehotButton, this.sprites.ticksButton, this.sprites.musicSlider, this.sprites.button_back);
    playing = new Scene(this.sprites.background_sky, null, this.sprites.button_quit, GameWorld.player.timer, GameWorld.player, this.sprites.overlay_welldone, this.sprites.overlay_gameover);

    constructor(public sprites: Sprites) {
        for (var i = 0; i < GameData.levels.length; i++) {
            var level_button = new LevelButton(i);
            this.levelselect.add(level_button);
            GameWorld.sprites.levelButtons.push(level_button);
        }
        this.levelselect.onEnter = this.updateLevelButtons;
    }

    updateLevelButtons() {
        for (var i = 0; i < GameWorld.sprites.levelButtons.length; i++) {
            var level_button = GameWorld.sprites.levelButtons[i];
            if (i < GameWorld.score) {
                level_button.state = "solved";
            } else if (i == GameWorld.score) {
                level_button.state = "unsolved";
            } else {
                level_button.state = "locked";
            }
        }
    }
}

class GameWorld {
    static sprites: Sprites;
    static scenes: Scenes;
    static currentLevel: Level;
    static player: Player;
    static options = GameSettings.load(GameOptions);
    static scores = GameSettings.load(ScoreSheet);
    static get score(): number {
        return GameWorld.scores.maxScore;
    }

    static run() {
        Game.init(1440, 825);

        Game.loadImages("image/",
            "buttons.png", "controls.png",
            "celebrate@14.png", "cloud_1.png", "cloud_2.png", "cloud_3.png", "cloud_4.png", "cloud_5.png", "die@5.png",
            "electrocute@6x5.png", "explode@5x5.png", "flame@9.png", "frame_hint.png",
            "titles.png", "goal.png", "help.jpg", "idle.png", "jump@14.png",
            "levelselect.jpg", "level_locked.png", "level_solved.png", "level_unsolved.png",
            "mountain_1.png", "mountain_2.png", "platforms.png", "options.jpg",
            "rocket@3.png", "run@13.png", "sky.jpg", "sneeze@9.png", "sparky_idle.png", "timer.png", "title.jpg",
            "turtle_idle.png", "water.png"
            );
            
        if(Device.isPC){
            Game.loadAudios("audio/", "music", "player_die", "player_explode", "player_fall", "player_jump", "player_won", "water_collected");
        }

        Game.start(function () {
            GameWorld.sprites = new Sprites();
            GameWorld.player = new Player();
            GameWorld.scenes = new Scenes(GameWorld.sprites);
            Game.scenes.switchTo(GameWorld.scenes.title.id);
            Sound.Play(Game.audios['music'], GameWorld.options.volume * 0.5, true);
        });
    }

    static gotoLevel(levelIndex) {
        var level = new Level(levelIndex);
        GameWorld.scenes.playing.objects[1] = level;
        GameWorld.currentLevel = level;
        GameWorld.player.reset();
        GameWorld.sprites.overlay_welldone.visible = false;
        GameWorld.sprites.overlay_gameover.visible = false;
        Game.scenes.switchTo(GameWorld.scenes.playing.id);
    }

    static nextLevel() {
        var levelIndex = GameWorld.currentLevel.levelIndex + 1;
        if (levelIndex < GameData.levels.length) {
            GameWorld.gotoLevel(levelIndex);
        } else {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        }
    }
};