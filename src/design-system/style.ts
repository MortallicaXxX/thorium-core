// const autoprefixer = require('autoprefixer')
// const postcss = require('postcss')

import postcss from 'postcss';
import autoprefixer = require('autoprefixer');
import * as ObjectCSS from 'json-to-css';

export interface CssObject{
  [x:string]:string|CssObject
}

type StylePatern = {token:string} & postcss.Result;

interface CssPatern{
  css: string,
  // minimal whitespace
  minified: string,
  // array of used classes if any
  classes: string[],
  // array of used ids if any
  ids: string[],
  // array of used selectors
  selectors:string[],
  // ast of this css object
  parsed: [string,Record<string,string>][],
}

export const style = async ( cssObject?:CssObject):Promise<StylePatern> => {

  let s = ObjectCSS.of(cssObject);
  // let css:CssPatern = CSSOM(cssObject);

  return new Promise((next) => {
    postcss([autoprefixer])
    .process( s , {from : undefined})
    .then(result => {
      (result as StylePatern).token = crypto.randomUUID();
      next((result as StylePatern))
    })
  })

}