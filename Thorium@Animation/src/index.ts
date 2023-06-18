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

let timeout = 1000;

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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('magic');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('twisterInDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('twisterInUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swap');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('puffIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('puffOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('vanishIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('vanishOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeftReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeftReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRightReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownLeftOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openDownRightOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpLeftOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('openUpRightOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveDownReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveUpReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveLeftReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('perspectiveRightReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('rotateRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideDownReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideUpReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideLeftReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('slideRightReturn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swashOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('swashIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('foolishIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('holeOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinRightOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinLeftOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinUpOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinDownOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinRightIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinLeftIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinUpIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('tinDownIn');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('bombRightOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('bombLeftOut');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('boingInUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('boingOutDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceOutLeft');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInUp');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInRight');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInDown');
    }, timeout)
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
    setTimeout( ( ) => {
      target.classList.remove('magictime');
      target.classList.remove('spaceInLeft');
    }, timeout)
  }
}

