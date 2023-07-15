import { NodeTemplate } from "../dom-render";

export const isPrototypeAttribute = ( attributeName:string ):boolean => {
  return attributeName[0] == '_' ? true : false;
}

export const getPrototypeName = ( attributeName:string ) => {
  return attributeName.slice(1);
}

export const htmlToNodeTemplate = ( srcElement:HTMLElement ):NodeTemplate<any> => {

  /// Attributes & Prototypes

  let elementAttributes = srcElement.attributes;
  let attributesKey = Object.keys( elementAttributes );
  let [attributesMap , prototypesMap] = attributesKey.reduce( (arr , key) => {

    let attribute = elementAttributes[key];
    let attributeName = attribute.name;
    let attributeValue = attribute.value;

    // attributes
    if( !isPrototypeAttribute(attributeName) )arr[0].push( [ attributeName , attributeValue ] );
    // prototypes
    else arr[1].push( [ getPrototypeName(attributeName) , eval(attributeValue) ] );

    return arr;
  } , [ [ ] , [ ] ] );

  let attributes = Object.fromEntries( new Map(attributesMap) ) as Record<string , string> ;
  let prototypes = Object.fromEntries( new Map(prototypesMap) ) as Record<string , any>;

  /// Childrens

  let childrens = [];
  if(srcElement.children.length > 0)childrens = [...srcElement.children].reduce( ( arr , element:HTMLElement ) => {
    arr.push( htmlToNodeTemplate(element) )
    return arr;
  } , [] );

  return {
    localName : String(srcElement.tagName).toLowerCase(),
    attr : attributes,
    childrens : childrens,
    proto : prototypes,
  } as NodeTemplate<any>;

}