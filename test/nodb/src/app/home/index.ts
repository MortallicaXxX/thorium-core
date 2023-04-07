import { NodeTemplate , DesignSystem , PaternArea } from "../../../../../dist";

import { 
  FluentCard , 
  FluentButton, 
  FluentFlipper,
  FluentCombobox,
  FluentOption,
  FluentTextField
} from "../../fluents-component";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import { data } from "./data/data.v1";

// const HomePatern = DesignSystem().register('thorium' , {
//   baseName : 'home',
//   childrens : [PaternArea()]
// });

// export const Home = HomePatern.connector();

const ChartPatern = DesignSystem().register('thorium' , {
  baseName : 'chart',
  childrens : [PaternArea()],
  proto : {
    afterMounting(target){
      console.log(target)
      let root = am5.Root.new(target);

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      let container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      }));

      let series = container.children.push(am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 1,
        valueField: "token",
        categoryField: "type",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
      }));
      
      series.get("colors").setAll({
        step: 2
      });
      
      series.links.template.set("strength", 0.5);
      
      series.data.setAll([data]);
      
      series.set("selectedDataItem", series.dataItems[0]);
      
      
      // Make stuff animate on load
      series.appear(1000, 100);

    }
  }
})

const ChartConnector = ChartPatern.connector();

const chart = ():NodeTemplate => {
  return {
    localName : 'container',
    attr : { 'local-name' : 'chart-container' },
    childrens : [ ChartConnector() ]
  }
}

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
    },
    'chart' : chart()
  }
})
  
export const HomeView = HomeViewPatern.connector();