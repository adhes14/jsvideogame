/*
 * Rules:
 * Every final level must be the start of the next level
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🍖',
    'PLAYER': '🐶',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '❤️'
};

const maps = [];
maps.push(`
    I--------X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    XXXXXXXX-X
    -XXXXXXX-X
    -XXXXXXX-X
    -XXXXXXX-X
    -XXXXXXX-X
    O---------
`);
maps.push(`
    O--XX----X
    X--XX-XX-X
    XX----XX-X
    X--XX-XX-X
    X-XXX--X--
    --XXXX-XX-
    -X--XX--X-
    -X--XXX-X-
    -XXXI---X-
    ---XXXXXX-
`);
maps.push(`
    ------X---
    -XXXX-X-X-
    -X----X-X-
    -X-XXXXXX-
    -X--------
    IXXXXXXXX-
    XX--------
    ---XXXXXXX
    -XXXO----X
    -----XXX-X
`);