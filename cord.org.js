var tree;
var cloud;
var raindrop;
var Cat;
var Fish;
var Apple;
var kid2;

function moving_north(this_sprite) {
  moveInDirection(this_sprite, 5, "North");
}

function moving_south(this_sprite) {
  moveInDirection(this_sprite, 5, "South");
}

function growing(this_sprite) {
  changePropBy(this_sprite, "scale", 1);
}

function math_random_int(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function sprite(this_sprite) {
  moveInDirection(this_sprite, math_random_int(-1, 1), "North");
  edgesDisplace(this_sprite);
}

function moving_west(this_sprite) {
  moveInDirection(this_sprite, 5, "West");
}

function stop_cat(this_sprite) {
  turn(this_sprite, math_random_int(-1, 1), "right");
  edgesDisplace(this_sprite);
}

function jump(this_sprite) {
  turn(this_sprite, math_random_int(-5, 5), "right");
  edgesDisplace(this_sprite);
}

function jittering(this_sprite) {
  changePropBy(this_sprite, "scale", math_random_int(-1, 1));
}

function rain(this_sprite) {
  moveInDirection(this_sprite, 3, "South");
}

function moving_east(this_sprite) {
  moveInDirection(this_sprite, 5, "East");
}

function spinning_right(this_sprite) {
  turn(this_sprite, 6, "right");
}

function wandering(this_sprite) {
  if (math_random_int(0, 5) == 0) {
    changePropBy(this_sprite, "direction", math_random_int(-25, 25));
  }
  moveForward(this_sprite, 1);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", math_random_int(135, 225));
  }
}

function swimming_left_and_right(this_sprite) {
  if (getProp(this_sprite, "direction") == 0) {
    mirrorSprite(this_sprite, "right");
  } else if (getProp(this_sprite, "direction") == 180) {
    mirrorSprite(this_sprite, "left");
  }
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function patrolling(this_sprite) {
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function shrinking(this_sprite) {
  changePropBy(this_sprite, "scale", -1);
}

function spinning_left(this_sprite) {
  turn(this_sprite, 6, "left");
}

function moving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveInDirection(this_sprite, 5, "North");
  }
  if (isKeyPressed("down")) {
    moveInDirection(this_sprite, 5, "South");
  }
  if (isKeyPressed("left")) {
    moveInDirection(this_sprite, 5, "West");
  }
  if (isKeyPressed("right")) {
    moveInDirection(this_sprite, 5, "East");
  }
}

function driving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveForward(this_sprite, 5);
  }
  if (isKeyPressed("down")) {
    moveBackward(this_sprite, 5);
  }
  if (isKeyPressed("left")) {
    changePropBy(this_sprite, "direction", -5);
    changePropBy(this_sprite, "rotation", -5);
  }
  if (isKeyPressed("right")) {
    changePropBy(this_sprite, "direction", 5);
    changePropBy(this_sprite, "rotation", 5);
  }
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
  }
}

playSound('sound://category_background/repitition.mp3');
setBackgroundImage("https://studio.code.org/api/v1/animation-library/yatDsUkvGtT_.fSv68qi1d4YJDMHdGnS/category_backgrounds/tree_island.png");
createNewSprite({name: 'tree'}, "cactus_1", ({"x":379,"y":209}));
setProp({name: 'tree'}, "scale", 50);
createNewSprite({name: 'cloud'}, "cloud", ({"x":359,"y":28}));
setProp({name: 'cloud'}, "scale", 70);
createNewSprite({name: 'raindrop'}, "cloud", ({"x":356,"y":31}));
setProp({name: 'raindrop'}, "scale", 30);
createNewSprite({name: 'Cat'}, "brown_cat_1", ({"x":57,"y":296}));
setProp({name: 'Cat'}, "scale", 70);
createNewSprite({name: 'Fish'}, "fish_pink_2", ({"x":334,"y":331}));
setProp({name: 'Fish'}, "scale", 50);
createNewSprite({name: 'Apple'}, "red_apple_1", ({"x":14,"y":174}));
setProp({name: 'Apple'}, "scale", 30);
createNewSprite({name: 'kid2'}, "kid_2_1", ({"x":21,"y":368}));
setProp({name: 'kid2'}, "scale", 60);

spriteClicked("when", {name: 'cloud'}, function (extraArgs) {
  addBehaviorSimple({name: 'raindrop'}, new Behavior(moving_south, []));
});

spriteClicked("when", {name: 'kid2'}, function (extraArgs) {
  addBehaviorSimple({name: 'kid2'}, new Behavior(moving_north, []));
});

checkTouching("when", {name: 'raindrop'}, {name: 'tree'}, function (extraArgs) {
  destroy({name: 'raindrop'});
  playSound('sound://category_pop/cute_water_bubble.mp3');
  changePropBy({name: 'tree'}, "scale", 20);
});

checkTouching("when", {name: 'Apple'}, {name: 'kid2'}, function (extraArgs) {
  destroy({name: 'Apple'});
  playSound('sound://category_animals/cartoon_creature_accent_1.mp3');
  setProp({name: 'kid2'}, "scale", 80);
  addBehaviorSimple({name: 'kid2'}, new Behavior(moving_south, []));
  addBehaviorSimple({name: 'kid2'}, new Behavior(sprite, []));
});

checkTouching("when", {name: 'Cat'}, {name: 'Fish'}, function (extraArgs) {
  destroy({name: 'Fish'});
  playSound('sound://category_pop/puzzle_game_drop_bubble_02.mp3');
  changePropBy({name: 'Cat'}, "scale", 30);
});

spriteClicked("when", {name: 'Cat'}, function (extraArgs) {
  addBehaviorSimple({name: 'Cat'}, new Behavior(moving_west, []));
  addBehaviorSimple({name: 'Cat'}, new Behavior(stop_cat, []));
});
