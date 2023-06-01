import 'magic.css/magic.css';

/**
/// MAGIC EFFECTS
magic - ✅
twisterInDown - ✅
twisterInUp - ✅
swap - ✅
/// BLING
puffIn - ✅
puffOut - ✅
vanishIn - ✅
vanishOut - ✅
/// STATIC EFFECTS
openDownLeft - ✅
openDownRight - ✅
openUpLeft - ✅
openUpRight - ✅
openDownLeftReturn - ✅
openDownLeftReturn - ✅
openUpLeftReturn - ✅
openUpRightReturn - ✅
/// STATIC EFFECTS OUT
openDownLeftOut - ✅
openDownRightOut - ✅
openUpLeftOut - ✅
openUpRightOut - ✅
/// PERSPECTIVE
perspectiveDown - ✅
perspectiveUp - ✅
perspectiveLeft - ✅
perspectiveRight - ✅
perspectiveDownReturn - ✅
perspectiveUpReturn - ✅
perspectiveLeftReturn - ✅
perspectiveRightReturn - ✅
/// ROTATE
rotateDown - ✅
rotateUp - ✅
rotateLeft - ✅
rotateRight - ✅
/// SLIDE
slideDown - ✅
slideUp - ✅
slideLeft - ✅
slideRight - ✅
slideDownReturn - ✅
slideUpReturn - ✅
slideLeftReturn - ✅
slideRightReturn - ✅
/// MATH
swashOut - ✅
swashIn - ✅
foolishIn - ✅
holeOut - ✅
/// TIN
tinRightOut - ✅
tinLeftOut - ✅
tinUpOut - ✅
tinDownOut - ✅
tinRightIn - ✅
tinRightIn - ✅
tinUpIn - ✅
tinDownIn - ✅
/// BOMB
bombRightOut - ✅
bombLeftOut - ✅
/// BOING
boingInUp - ✅
boingOutDown - ✅
/// ON THE SPACE
spaceOutUp - ✅
spaceOutRight - ✅
spaceOutDown - ✅
spaceOutLeft - ✅
spaceInUp - ✅
spaceInRight - ✅
spaceInDown - ✅
spaceInLeft - ✅
*/

/// MAGIC EFFECTS

let interval = 1500;

/** 
 * Ajoute l'effet de magie à l'élément cible
 * 
 * @param target HTMLElement
 * @returns 
 */
export const Magic = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('magic');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('magic');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le tordant vers le bas
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TwisterInDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('twisterInDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('twisterInDown');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le tordant vers le bas
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TwisterInUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('twisterInUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('twisterInUp');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const Swap = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('swap');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swap');
    }, interval)
  }
}

/// BLING

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PuffIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('puffIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('puffIn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PuffOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('puffOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('puffOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const VanishIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('vanishIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('vanishIn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const VanishOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('vanishOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('vanishOut');
    }, interval)
  }
}


/// STATIC EFFECTS

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenDownLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openDownLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeft');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenDownRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openDownRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownRight');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeft');
    }, interval)
  }
};

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRight');
    }, interval)
  }
};

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenDownLeftReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openDownLeftReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeftReturn');
    }, interval)
  }
}

// const openDownLeftReturn = (target:HTMLElement) => {
//   target.classList.add('magictime');
//   target.classList.add('vanishOut');
// }

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpLeftReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpLeftReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeftReturn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpRightReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpRightReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRightReturn');
    }, interval)
  }
}


/// STATIC EFFECTS OUT
/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenDownLeftOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openDownLeftOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeftOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenDownRightOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openDownRightOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownRightOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpLeftOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpLeftOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeftOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const OpenUpRightOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('openUpRightOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRightOut');
    }, interval)
  }
}

/// PERSPECTIVE

/**
 * Anime l'élément cible en le faisant descendre avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveDown');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant monter avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveUp');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la gauche avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveLeft');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la droite avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveRight');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant remonter avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveDownReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveDownReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveDownReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant redescendre avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveUpReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveUpReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveUpReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la gauche avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveLeftReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveLeftReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveLeftReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la droite avec un effet de perspective
 * 
 * @param target HTMLElement
 * @returns 
 */
export const PerspectiveRightReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('perspectiveRightReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveRightReturn');
    }, interval)
  }
}

/// ROTATE
/**
 * Anime l'élément cible en le faisant tourner vers le bas
 * 
 * @param target HTMLElement
 * @returns 
 */
export const RotateDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('rotateDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateDown');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant tourner vers le haut
 * 
 * @param target HTMLElement
 * @returns 
 */
export const RotateUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('rotateUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateUp');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant tourner vers la gauche
 * 
 * @param target HTMLElement
 * @returns 
 */
export const RotateLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('rotateLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateLeft');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant tourner vers la droite
 * 
 * @param target HTMLElement
 * @returns 
 */
export const RotateRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('rotateRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateRight');
    }, interval)
  }
}

/// SLIDE
/**
 * Anime l'élément cible en le faisant glisser vers le bas
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideDown');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers le haut
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideUp');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la gauche
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideLeft');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la droite
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideRight');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers le bas et en le faisant revenir à sa position d'origine
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideDownReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideDownReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideDownReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers le haut et en le faisant revenir à sa position d'origine
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideUpReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideUpReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideUpReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la gauche et en le faisant revenir à sa position d'origine
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideLeftReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideLeftReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideLeftReturn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant glisser vers la droite et en le faisant revenir à sa position d'origine
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SlideRightReturn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('slideRightReturn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideRightReturn');
    }, interval)
  }
}


/// MATH
/**
 * Anime l'élément cible en le faisant disparaître avec un effet de balancement vers l'extérieur
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SwashOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('swashOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swashOut');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant apparaître avec un effet de balancement
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SwashIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('swashIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swashIn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant apparaître de manière folle
 * 
 * @param target HTMLElement
 * @returns 
 */
export const FoolishIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('foolishIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('foolishIn');
    }, interval)
  }
}

/**
 * Anime l'élément cible en le faisant disparaître avec un effet de trou
 * 
 * @param target HTMLElement
 * @returns 
 */
export const HoleOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('holeOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('holeOut');
    }, interval)
  }
}


/// TIN
/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinRightOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinRightOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinRightOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinLeftOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinLeftOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinLeftOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinUpOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinUpOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinUpOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinDownOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinDownOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinDownOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinRightIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinRightIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinRightIn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinLeftIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinLeftIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinLeftIn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinUpIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinUpIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinUpIn');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const TinDownIn = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('tinDownIn');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinDownIn');
    }, interval)
  }
}


/// BOMB
/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const BombRightOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('bombRightOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('bombRightOut');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const BombLeftOut = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('bombLeftOut');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('bombLeftOut');
    }, interval)
  }
}


/// BOING
/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const BoingInUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('boingInUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('boingInUp');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const BoingOutDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('boingOutDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('boingOutDown');
    }, interval)
  }
}


/// ON THE SPACE
/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceOutUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceOutUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutUp');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceOutRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceOutRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutRight');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceOutDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceOutDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutDown');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceOutLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceOutLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutLeft');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceInUp = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceInUp');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInUp');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceInRight = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceInRight');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInRight');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceInDown = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceInDown');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInDown');
    }, interval)
  }
}

/**
 * 
 * 
 * @param target HTMLElement
 * @returns 
 */
export const SpaceInLeft = (target:HTMLElement) => {
  if(target.classList.contains('magictime'))return ;
  else{
    target.classList.add('magictime');
    target.classList.add('spaceInLeft');
    setInterval( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInLeft');
    }, interval)
  }
}

