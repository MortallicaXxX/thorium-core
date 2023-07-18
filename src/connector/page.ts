import DesignSystem from '../design-system';
import { ConnectorTemplate } from '.';

export const Page = ( options:ConnectorTemplate<any> & { name:string } ) => {

  let patern = DesignSystem().register( 'page' , {
    baseName : options.name,
    attr : {},
    childrens : [{ localName : 'slot' }],
    proto : {}
  })

  return patern.connector()({...options , ...{ attr : { context : `${options.name}-page` } }});

}