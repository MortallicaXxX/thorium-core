// const autoprefixer = require('autoprefixer')
// const postcss = require('postcss')

import postcss from 'postcss';
import autoprefixer = require('autoprefixer');
import * as ObjectCSS from 'json-to-css';

export interface CssObject{
  [x:string]:string|CssObject
}

const StyleSheets:Map<string,StylePatern> = new Map();

type StylePatern = {token:string} & postcss.Result;

export const style = async (cssObject?:CssObject):Promise<StylePatern> => {

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

export const createStyleSheet = (cssObject:CssObject):Promise<StylePatern> => {
  return new Promise((next) => {
    style(cssObject)
    .then((result) => {
      StyleSheets.set(result.token , result);
      next(result);
    })
  })
}

export const getStyleSheet = (sheetToken:string) => {
  return ( StyleSheets.has(sheetToken) ? StyleSheets.get(sheetToken) : null );
}