import { DesignSystem , PaternArea } from "../../../../../dist";

import { 
  FluentCard , 
  FluentButton, 
  FluentFlipper,
  FluentCombobox,
  FluentOption,
  FluentTextField
} from "../../fluents-component";

// const HomePatern = DesignSystem().register('thorium' , {
//   baseName : 'home',
//   childrens : [PaternArea()]
// });

// export const Home = HomePatern.connector();

const HomeViewPatern = DesignSystem().register('views' , {
  baseName : 'home',
  defaultView : 'home',
  views : {
    'home' : {
      localName : 'home',
      childrens : [
        { 
          localName : 'div', 
          childrens : [
            FluentCard({ 
              attr : { name : 'search' },
              childrens : [
                FluentTextField({ attr : {  appearance : 'default' , placeholder : 'search' } })
              ]
            }),
          ]
        },
        {
          localName : 'div',
          childrens: [
            FluentCard({ 
              attr : { name : 'container' },
              childrens : [
                { localName : 'div' ,
                  attr: { name : 'projects' },
                  childrens : [
                    { localName : 'h3' , attr : { text : 'Projects' } },
                    { 
                      localName : 'div',
                      attr:  { name : 'selector' },
                      childrens : [
                        FluentButton({ 
                          attr : { appearance : 'accent' , text : 'New Project' },
                        }),
                        FluentCombobox({
                          childrens : [
                            FluentOption({ attr : { text : 'project 1' } }),
                            FluentOption({ attr : { text : 'project 2' } }),
                            FluentOption({ attr : { text : 'project 3' } }),
                            FluentOption({ attr : { text : 'project 4' } }),
                            FluentOption({ attr : { text : 'project 5' } }),
                          ]
                        })
                      ]
                    }
                  ]
                },
                { localName : 'h1' , attr : { text : 'Active DB' } }
              ]
            })
          ]
        }
      ]
    }
  }
})
  
export const HomeView = HomeViewPatern.connector();