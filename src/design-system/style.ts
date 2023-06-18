// const autoprefixer = require('autoprefixer')
// const postcss = require('postcss')

import postcss from 'postcss';
import autoprefixer = require('autoprefixer');
import * as ObjectCSS from 'json-to-css';

export interface CssObject{
  [x:string]:string|CssObject
}

export const StyleSheets:Map<string,StylePatern> = new Map();

export type StylePatern = {token:string,cssObject:CssObject,result:({token:string} & postcss.Result)};

export const style = async (cssObject?:CssObject):Promise<StylePatern['result']> => {

  let s = ObjectCSS.of(cssObject);
  // let css:CssPatern = CSSOM(cssObject);

  return new Promise((next) => {
    postcss([autoprefixer])
    .process( s , {from : undefined})
    .then(result => {
      (result as StylePatern['result']).token = crypto.randomUUID();
      next((result as StylePatern['result']))
    })
  })

}

export const createStyleSheet = (cssObject:CssObject):Promise<StylePatern> => {
  return new Promise((next) => {
    style(cssObject)
    .then((result:({token:string} & postcss.Result)) => {

      StyleSheets.set(result.token , {
        token : result.token,
        cssObject : cssObject,
        result : result
      });
      
      next(StyleSheets.get(result.token));
    })
  })
}

export const getStyleSheet = (sheetToken:string) => {
  return ( StyleSheets.has(sheetToken) ? StyleSheets.get(sheetToken) : null );
}