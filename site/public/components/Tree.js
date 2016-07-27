import React, { Component } from 'react'
import get from 'lodash/get'
import update from 'react-update'
import Tree, { SelectTree } from 'c/Tree'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Warn from '../Warn'
import Panel from '../Panel'

const codeData = `[{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd'
        }, {
          name: 'ioio'
        }, {
          name: 'tutrut',
          children: [{
            name: 'dasd'
          }]
        }]
      }, {
        name: '配置中心',
      }, {
        name: '配置中心2',
        children: [{
          name: 'dsads'
        }]
      }]`

const data = [{
  name: '数据工厂',
  open: true,
  children: [{
    name: 'adsdsd'
  }, {
    name: 'ioio'
  }, {
    name: 'tutrut',
    children: [{
      name: 'dasd'
    }]
  }]
}, {
  name: '配置中心',
}, {
  name: '配置中心2',
  children: [{
    name: 'dsads'
  }]
}]


// =======================================================================

const codeBasic = `import Tree from 'bfd-ui/lib/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  render() {
    return <Tree defaultData={this.state.data} />
  }
})`

const Basic = React.createClass({

  getInitialState() {
    return { data }
  },

  render() {
    return <Tree defaultData={this.state.data} />
  }
})


// =======================================================================

const codeCustomRender = `import Tree from 'bfd-ui/lib/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  render() {
    return <Tree defaultData={this.state.data} render={data => <a href="">{data.name}</a>} />
  }
})`

const CustomRender = React.createClass({

  getInitialState() {
    return {
      data: data
    }
  },

  render() {
    return <Tree defaultData={this.state.data} render={data => <a href="">{data.name}</a>} />
  }
})


// =======================================================================

const codeCustomIcon = `import Tree from 'bfd-ui/lib/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  getIcon(data) {
    return data.open ? 'folder-open' : 'folder'
  },

  render() {
    return <Tree defaultData={this.state.data} getIcon={this.getIcon} />
  }
})`

const CustomIcon = React.createClass({

  getInitialState() {
    return {
      data: data
    }
  },

  getIcon(data) {
    return data.open ? 'folder-open' : 'folder'
  },

  render() {
    return <Tree defaultData={this.state.data} getIcon={this.getIcon} />
  }
})


// =======================================================================

const codeDynamic = `import Tree from 'bfd-ui/lib/Tree'

export default React.createClass({
  
  getInitialState() {
    return {
      data: [{
        pid: 0,
        name: '数据工厂',
        isParent: true
      }, {
        pid: 1,
        name: '配置中心',
        isParent: true
      }]
    }
  },

  render() {
    return (
      <Tree 
        defaultData={this.state.data} 
        getUrl={item => '/data/tree-children.json?pid=' + item.pid} 
      />
    ) 
  }
})
`

const Dynamic = React.createClass({

  getInitialState() {
    return {
      data: [{
        pid: 0,
        name: '数据工厂',
        isParent: true
      }, {
        pid: 1,
        name: '配置中心',
        isParent: true
      }]
    }
  },

  render() {
    return (
      <Tree 
        defaultData={this.state.data} 
        getUrl={item => '/data/tree-children.json?pid=' + item.pid} 
      />
    ) 
  }
})


// =======================================================================

const codeActiveable = `import Tree from 'bfd-ui/lib/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd',
          active: true
        }, {
          name: 'ioio'
        }, {
          name: 'tutrut',
          children: [{
            name: 'dasd'
          }]
        }]
      }, {
        name: '配置中心',
      }, {
        name: '配置中心2',
        children: [{
          name: 'dsads'
        }]
      }]
    }
  },

  handleActive(data) {
    console.log(data)
  },

  render() {
    return <Tree defaultData={this.state.data} onActive={this.handleActive} />
  }
})`

const Activeable = React.createClass({

  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd',
          active: true
        }, {
          name: 'ioio'
        }, {
          name: 'tutrut',
          children: [{
            name: 'dasd'
          }]
        }]
      }, {
        name: '配置中心',
      }, {
        name: '配置中心2',
        children: [{
          name: 'dsads'
        }]
      }]
    }
  },

  handleActive(data) {
    console.log(data)
  },

  render() {
    return <Tree defaultData={this.state.data} onActive={this.handleActive} />
  }
})


// =======================================================================

const codeSelectable = `
import update from 'react-update'
import get from 'lodash/get'
import { SelectTree } from 'bfd-ui/lib/Tree'

class Selectable extends Component {
  
  constructor() {
    super()
    this.update = update.bind(this)
    this.state = {
      test: 1,
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd',
          open: true,
          children: [{
            name: 'leaf'
          }]
        }, {
          name: 'cssd'
        }]
      }, {
        name: '配置中心',
        children: [{
          name: 'dsads'
        }]
      }, {
        name: '配置中心2'
      }]
    }
  }

  updateChildren(item, path, checked) {
    if (!item || !item.children) return
    path = path = [...path, 'children']
    item.children.forEach((item, i) => {
      if (item.checked !== checked) {
        this.update('set', [...path, i, 'checked'], checked)  
      }
      this.updateChildren(item, [...path, i], checked)
    })
  }

  updateParent(data, path, checked) {
    if (path.length <= 1) return
    const parent = get(data, path.slice(1))
    if (checked) {
      checked = parent.children.filter(item => !item.checked).length === 0
    }
    data = this.update('set', [...path, 'checked'], checked)
    this.updateParent(data, path.slice(0, -2), checked)
  }

  handleSelect(data, item, path, checked) {
    // 所有子级节点是否选中
    this.updateChildren(item, ['data', ...path], checked)
    // 所有父级节点是否选中
    this.updateParent(data, ['data', ...path.slice(0, -2)], checked)
  }

  render() {
    return (
      <SelectTree 
        data={this.state.data} 
        onChange={data => this.update('set', 'data', data)} 
        onSelect={this.handleSelect.bind(this)} 
      />
    )
  }
}`

class Selectable extends Component {
  
  constructor() {
    super()
    this.update = update.bind(this)
    this.state = {
      test: 1,
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd',
          open: true,
          children: [{
            name: 'leaf'
          }]
        }, {
          name: 'cssd'
        }]
      }, {
        name: '配置中心',
        children: [{
          name: 'dsads'
        }]
      }, {
        name: '配置中心2'
      }]
    }
  }

  updateChildren(item, path, checked) {
    if (!item || !item.children) return
    path = path = [...path, 'children']
    item.children.forEach((item, i) => {
      if (item.checked !== checked) {
        this.update('set', [...path, i, 'checked'], checked)  
      }
      this.updateChildren(item, [...path, i], checked)
    })
  }

  updateParent(data, path, checked) {
    if (path.length <= 1) return
    const parent = get(data, path.slice(1))
    if (checked) {
      checked = parent.children.filter(item => !item.checked).length === 0
    }
    data = this.update('set', [...path, 'checked'], checked)
    this.updateParent(data, path.slice(0, -2), checked)
  }

  handleSelect(data, item, path, checked) {
    // 所有子级节点是否选中
    this.updateChildren(item, ['data', ...path], checked)
    // 所有父级节点是否选中
    this.updateParent(data, ['data', ...path.slice(0, -2)], checked)
  }

  render() {
    return (
      <SelectTree 
        data={this.state.data} 
        onChange={data => this.update('set', 'data', data)} 
        onSelect={this.handleSelect.bind(this)} 
      />
    )
  }
}

export default () => {
  return (
    <div>
      <h1>树 @hai.jiang</h1>

      <Panel title="基础展示" code={codeBasic}>
        <Basic />
      </Panel>

      <Panel title="自定义节点" code={codeCustomRender}>
        <CustomRender />
      </Panel>

      <Panel title="自定义图标" code={codeCustomIcon}>
        <CustomIcon />
      </Panel>

      <Panel title="动态数据" code={codeDynamic}>
        <p>数据量过大时，适合动态加载，需要指定 isParent 字段以及 getUrl 属性</p>
        <Dynamic />
      </Panel>

      <Panel title="节点可点中（单节点）" code={codeActiveable}>
        <p>点中一个节点做一些操作，指定 onActive 属性即可激活此功能，默认点中可指定 active 字段，整个 Tree 同时只有一个节点处于点中状态</p>
        <Activeable  />
      </Panel>

      <Panel title="节点可勾选" code={codeSelectable}>
        <Selectable />
      </Panel>

      <h2>Tree</h2>
      <Props>
        <Prop name="data" type="array">
          <p>数据源，固定字段格式如下</p>
          <Pre>
{`[{
  name: '配置中心', // 显示的字符,
  open: true, // 是否展开，默认不展开就不需要这个字段了
  isParent: true, // 是否父节点，用于动态加载场景
  children: [] //子节点
}]`}
          </Pre>
        </Prop>
        <Prop name="defaultData" type="array">
          <p>数据源</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>数据改变后的回调</p>
        </Prop>
        <Prop name="render" type="function">
          <p>节点渲染逻辑，参数为当前节点数据，默认渲染 data.name</p>
        </Prop>
        <Prop name="getIcon" type="function">
          <p>设置图标，参数为当前节点数据，可动态判断</p>
          <Pre>
{`<Tree getIcon={data => data.open ? 'folder-open' : 'folder'} />`}
          </Pre>
        </Prop>
        <Prop name="getUrl" type="function">
          <p>设置动态加载的数据源 URL，参数为当前节点数据以及节点路径下的数据集合，可动态判断</p>
          <Pre>
{`<Tree getUrl={(data, pathData) => '/api/node?pid=' + data.id} />`}
          </Pre>
          <p>返回格式同 data 属性</p>
          <Warn>动态加载方式需同时指定 isParent 字段以及 getUrl 属性</Warn>
        </Prop>
        <Prop name="onActive" type="function">
          <p>点中一个节点后的回调，参数为节点路径下数据集合</p>
          <Warn>默认点中状态可指定 active 字段，整个 Tree 同时只有一个节点处于点中状态</Warn>
        </Prop>
        <Prop name="dataFilter" type="function">
          <p>过滤 getUrl 方式返回数据并返回</p>
        </Prop>
      </Props>

      <h2>SelectTree</h2>
      <Props>
        <Prop name="{ ...Tree }">
          <p>支持所有 Tree 属性，data 格式多出 checked 字段</p>
          <Pre>
{`[{
  name: '配置中心', // 显示的字符,
  open: true, // 是否展开，默认不展开就不需要这个字段了
  checked: true, // 是否选中，默认不选中就不需要这个字段了
  children: [] //子节点
}]`}
          </Pre>
        </Prop>
        <Prop name="onSelect" type="function">
          <p>复选框勾选后的回调</p>
        </Prop>
      </Props>
    </div>
  )
}