import { data } from 'Data/data';
var colors = [
  '#e57373',
  '#f06292',
  '#ba68c8',
  '#9575cd',
  '#7986cb',
  '#64b5f6',
  '#ff8a65',
  '#ce93d8',
  '#9fa8da'
];

var itemStyle = {
  star0: {
    color: colors[0]
  },
  star1: {
    color: colors[1]
  },
  star2: {
    color: colors[2]
  },
  star3: {
    color: colors[3]
  },
  star4: {
    color: colors[4]
  },
  star5: {
    color: colors[5]
  },
  star6: {
    color: colors[6]
  },
  star7: {
    color: colors[7]
  },
  star8: {
    color: colors[8]
  }
};

export function getOption(params) {
  for (var j = 0; j < data.length; ++j) {
    var level1 = data[j].children;
    for (var i = 0; i < level1.length; ++i) {
      var block = level1[i].children;

      for (var star = 0; star < block.length; ++star) {

        let currName = Number(block[star].name);
        var val = Number(currName);
        var vv = val % 7;
        var style;

        switch (vv) {
          case 0:

            style = itemStyle.star0;
            break;
          case 1:

            style = itemStyle.star1;
            break;
          case 2:

            style = itemStyle.star2;
            break;
          case 3:

            style = itemStyle.star3;
            break;
          case 4:

            style = itemStyle.star4;
            break;
          case 5:

            style = itemStyle.star5;
            break;
          case 6:

            style = itemStyle.star6;
            break;
          case 7:

            style = itemStyle.star7;
            break;
          default:

            style = itemStyle.star5;
            break;
        }

        block[star].label = {
          color: style.color,
          downplay: {
            opacity: 0.5
          }
        };

        if (block[star].children) {
          style = {
            opacity: 1,
            color: style.color
          };
          let children = block[star].children;
          for (let index = 0; index < children.length; index++) {
            const book = children[index];
            book.value = 1;
            book.itemStyle = style;

            book.label = {
              color: style.color
            };

          }
        }
      }

      level1[i].itemStyle = {
        // color: data[j].itemStyle.color
      };
    }
  }

  let option = {
    color: colors,
    series: [
      {
        type: 'sunburst',
        center: ['50%', '50%'],
        data: data,
        sort: function(a, b) {

          if (a.depth === 1) {
            // let v = b.getValue() - a.getValue();
            // https://www.echartsjs.com/option.html#series-sunburst.sort
            return null;
          } else {
            let v2 = a.dataIndex - b.dataIndex;
            // console.log('v:',v2, a,b)
            return v2;
          }
        },
        label: {
          rotate: 'radial'
          //color: bgColor
        },
        itemStyle: {
          //borderColor: bgColor,
          borderWidth: 2
        },
        levels: [
          {},
          {
            r0: 0,
            r: '38%',
            label: {
              rotate: 0,
              fontSize: 18,
              color: '#212121'
              //fontWeight:600
            }
          },
          {
            r0: '30%',
            r: '61%',
            itemStyle: {
              //shadowBlur: 2,
              //shadowColor: colors[2],
              // color: 'transparent'
            },
            label: {
              // rotate: 'tangential',
              fontSize: 12,
              color: '#212121'
            }
          },
          {
            r0: '62%',
            r: '67%',
            itemStyle: {
              //shadowBlur: 2,
              //shadowColor: colors[2],
              color: 'transparent'
            },
            label: {
              rotate: 'tangential',
              fontSize: 12,
              color: colors[0]
            }
          },
          {
            r0: '68%',
            r: '70%',
            itemStyle: {
              //shadowBlur: 80,
              //shadowColor: colors[5]
            },
            label: {
              position: 'outside',
              //textShadowBlur: 5,
              //textShadowColor: '#333',
              fontSize: 16
            },
            downplay: {
              label: {
                opacity: 0.5
              }
            }
          }
        ]
      }
    ]
  };

  return option;
}
