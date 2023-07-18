import { VirtualElement } from "../virtual-element";

export type TEventName = 'mousedown' | 'mouseup' | 'keydown' | 'keyup' | string;
export type TEventHandler = (event:MouseEvent|KeyboardEvent , ve?:VirtualElement) => void;

export type TEvent = {
  id:string;
  handler : TEventHandler;
};

export type TEventStack = Map<string , TEvent>;

const eventsStack:Map< TEventName , TEventStack > = new Map();

export const Event = () => {

  return {
    addEventListener : ( eventName:TEventName , handler:(event:MouseEvent|KeyboardEvent) => void ) => {
      let eventId = crypto.randomUUID().toString();
      let stack = eventsStack.get(eventName);

      if(!stack)return false;

      if(!stack.has(eventId))stack.set(eventId , {
        id : eventId,
        handler : handler
      });
      else return false;

      return stack.get(eventId);
    },
    removeEventListener : ( eventId ) => {
      
      Array.from( eventsStack.values() , (stack) => {
        if(stack.has(eventId))return stack.delete(eventId);
        else return false;
      } ).includes(true);

    }
  }

}

const GlobalMouseDown = ( event:MouseEvent ) => {

  if(eventsStack.has('mousedown'))[...eventsStack.get('mousedown').values()].map(( e ) => {
    e.handler( event );
  })

}

const GlobalMouseUp = ( event:MouseEvent ) => {

  if(eventsStack.has('mousedup'))[...eventsStack.get('mousedup').values()].map(( e ) => {
    e.handler( event );
  })

}

document.addEventListener( 'mousedown' , GlobalMouseDown);
document.addEventListener( 'mouseup' , GlobalMouseUp);

