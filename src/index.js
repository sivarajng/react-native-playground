require('./styles/reset.css')
require('./styles/index.css')

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import screenfull from 'screenfull'

import Workspace from './components/workspace/Workspace'
import { getHashString, setHashString } from './utils/HashString'
import DefaultCode from './constants/DefaultCode'
import { prefix, prefixAndApply } from './utils/PrefixInlineStyles'
import { appendCSS } from './utils/Styles'
import diff from './utils/Diff'
import defaultLibs from './utils/TypeScriptDefaultLibs'

// >>>>>>>>>>>>>>>>>>>>>>>>> JARAVIS <<<<<<<<<<<<<<<<<<<<<<<<<<<<
const custom_style = {
  // tab: { backgroundColor: 'rgb(250,250,250)' },
  tab: { backgroundColor: '#2196F3' },
  header: {
    backgroundColor: 'rgb(250,250,250)',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 1px',
    zIndex: 10,
  },
  headerText: { color: '#AAA', fontWeight: 'normal' },
  transpilerHeader: {
    backgroundColor: 'rgb(240,240,240)',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 1px',
    zIndex: 10,
  },
  transpilerHeaderText: { color: '#888', fontWeight: 'normal' },
  tabText: { color: 'rgb(193 248 255)' },
  tabTextActive: { color: '#FFF', fontWeight: 'bold' },
}

const custom_libs = [
  [
    'moment',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js',
  ],
  ['lodash', 'https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js'],
  [
    'react-native-animatable',
    'https://cdn.rawgit.com/dabbott/8335f232c8c90ef056ac5912e6cd4b38/raw/88841a962dc104b02b9e9919c5ad7a46c6c382d9/react-native-animatable.js',
  ],
  [
    'redux',
    'Redux',
    'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js',
  ],
  [
    'react-redux',
    'ReactRedux',
    'https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux.min.js',
  ],
  [
    'redux-persist',
    'redux-persist',
    'https://cdnjs.cloudflare.com/ajax/libs/redux-persist/4.0.0-alpha7/redux-persist.js',
  ],
]

const custom_files = [
  [
    'App.js',
    "import React, { Component } from \"react\";\nimport {\n  View,\n  Text,\n  Image,\n  Button,\n  TouchableOpacity,\n  FlatList,\n  ScrollList,\n} from \"react-native\";\nimport { connect } from \"react-redux\";\nimport moment from \"moment\";\nimport _ from \"lodash\";\n\nimport { actions } from \"./reducer\";\n\nclass App extends Component {\n  setData = (obj) => {\n    this.props.dispatch(actions.set(obj));\n  };\n\n  render() {\n    return (\n      <View style={{ flex: 1, justifyContent: \"center\", alignItems: \"center\" }}>\n        <Text>React Native Playground</Text>\n        <Text style={{ color: \"red\", fontWeight: \"bold\" }}>\n          {this.props.title}\n        </Text>\n      </View>\n    );\n  }\n}\n\nexport default connect(({ title }) => ({ title }))(App);\n",
  ],
  [
    'reducer.js',
    "// The types of actions that you can dispatch to modify the state of the store\nexport const types = {\n  SET: \"SET\",\n};\n\n// Helper functions to dispatch actions, optionally with payloads\nexport const actions = {\n  set: (obj) => {\n    return { type: types.SET, payload: obj };\n  },\n};\n\n// Initial state of the store\nconst initialState = {\n  title: \"DUCG - Dev Under Coding Ground\",\n};\n\n// Function to handle actions and update the state of the store.\n// Notes:\n// - The reducer must return a new state object. It must never modify\n// the state object. State objects should be treated as immutable.\n// - We set `state` to our `initialState` by default. Redux will\n// call reducer() with no state on startup, and we are expected to\n// return the initial state of the app in this case.\nexport const reducer = (state = initialState, action) => {\n  const { todos } = state;\n  const { type, payload } = action;\n\n  switch (type) {\n    case types.SET: {\n      return {\n        ...state,\n        ...payload,\n      };\n    }\n  }\n\n  return state;\n};\n",
  ],
  [
    'style.js',
    "export default styles = {\n  container: {\n    flex: 1,\n  },\n};",
  ],
  [
    'index.js',
    "import { AppRegistry, View } from \"react-native\";\nimport { createStore } from \"redux\";\nimport { Provider } from \"react-redux\";\nimport { persistStore, autoRehydrate } from \"redux-persist\";\n\n// Import the reducer and create a store\nimport { reducer } from \"./reducer\";\n\n// Add the autoRehydrate middleware to your redux store\nconst store = createStore(reducer, undefined, autoRehydrate());\n\n// Enable persistence\npersistStore(store);\n\n// Import the App container component\nimport App from \"./App\";\n\n// Pass the store into the Provider\nconst AppWithStore = () => (\n  <Provider store={store}>\n    <App />\n  </Provider>\n);\n\nAppRegistry.registerComponent(\"App\", () => AppWithStore);\n",
  ],



]
// >>>>>>>>>>>>>>>>>>>>>>>>> JARAVIS <<<<<<<<<<<<<<<<<<<<<<<<<<<<

const style = prefix({
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'stretch',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
})

let {
  title = '',
  code = DefaultCode,
  files = JSON.stringify(custom_files), //default '[]',
  entry,
  initialTab,
  platform = 'android',
  statusBarHeight = '16',
  statusBarColor = 'rgba(0,0,0,0.5)',
  width = '320',
  scale = '1',
  assetRoot = '',
  vendorComponents = JSON.stringify(custom_libs), //default '[]',
  styles = JSON.stringify(custom_style), //default '{}',
  fullscreen = 'false',
  sharedEnvironment = 'false',
  panes = JSON.stringify(['editor', 'player']),
  transpilerTitle = '',
  playerTitle = '',
  workspacesTitle = '',
  workspaces = JSON.stringify([]),
  playerStyleSheet = 'reset',
  playerCSS = '',
  workspaceCSS = '',
  console = JSON.stringify({
    enabled: false,
    visible: false,
    maximized: false,
    collapsible: true,
    showFileName: true,
    showLineNumber: true,
    renderReactElements: true,
  }),
  playground = JSON.stringify({
    enabled: false,
    renderReactElements: true,
    debounceDuration: 200,
  }),
  typescript = JSON.stringify({
    enabled: false,
    /* libs */
    /* types */
  }),
} = getHashString()

const typescriptOptions = Object.assign(
  { libs: defaultLibs, types: [] },
  JSON.parse(typescript)
)

const consoleOptions = JSON.parse(console)
const playgroundOptions = JSON.parse(playground)

if (workspaceCSS) {
  appendCSS(workspaceCSS)
}

if (typescriptOptions.enabled && !(entry || initialTab)) {
  entry = 'index.tsx'
  initialTab = 'App.tsx'
} else {
  entry = 'index.js'
  initialTab = 'App.js'
}

const parsedFiles = JSON.parse(files)
let fileMap

if (parsedFiles.length > 0) {
  // Build a map of {filename => code}
  fileMap = parsedFiles.reduce((fileMap, [filename, code]) => {
    fileMap[filename] = code
    return fileMap
  }, {})

  // If entry file is invalid, choose the first file
  if (!fileMap.hasOwnProperty(entry)) {
    entry = parsedFiles[0][0]
  }
} else {
  // If no files are given, use the code param
  fileMap = { [entry]: code }
}

if (!fileMap.hasOwnProperty(initialTab)) {
  initialTab = entry
}

function workspacesStepDiff(targetStep, sourceStep) {
  const {
    workspace: { files: sourceFiles },
  } = sourceStep
  const {
    workspace: { files: targetFiles },
  } = targetStep

  const result = {}

  Object.keys(targetFiles).forEach((filename, index) => {
    if (!(filename in sourceFiles)) {
      result[filename] = {
        type: 'added',
        ranges: diff('', targetFiles[filename]).added,
      }
    } else {
      result[filename] = {
        type: 'changed',
        ranges: diff(sourceFiles[filename], targetFiles[filename]).added,
      }
    }
  })

  return result
}

class WorkspaceContainer extends Component {
  state = { activeStepIndex: 0 }

  handleChangeActiveStepIndex = (activeStepIndex) => {
    this.setState({ activeStepIndex })
  }

  getWorkspaceProps = () => {
    const { activeStepIndex } = this.state

    const parsedWorkspaces = JSON.parse(workspaces)

    const workspaceProps = {
      title,
      files: fileMap,
      entry,
      initialTab,
      platform,
      statusBarHeight: parseFloat(statusBarHeight),
      statusBarColor,
      assetRoot,
      scale: parseFloat(scale),
      width: parseFloat(width),
      vendorComponents: JSON.parse(vendorComponents),
      externalStyles: JSON.parse(styles),
      sharedEnvironment: sharedEnvironment === 'true',
      fullscreen: fullscreen === 'true' && screenfull.enabled,
      panes: JSON.parse(panes),
      transpilerTitle,
      workspacesTitle,
      workspaces: parsedWorkspaces,
      playerTitle,
      playerStyleSheet,
      playerCSS,
      onChange: setHashString,
      consoleOptions,
      playgroundOptions,
      typescriptOptions,
      activeStepIndex: activeStepIndex,
      onChangeActiveStepIndex: this.handleChangeActiveStepIndex,
    }

    if (!parsedWorkspaces || parsedWorkspaces.length === 0) {
      return workspaceProps
    }

    if (activeStepIndex > 0) {
      const workspaceDiff = workspacesStepDiff(
        parsedWorkspaces[activeStepIndex],
        parsedWorkspaces[activeStepIndex - 1]
      )

      workspaceProps.diff = workspaceDiff
    }

    return Object.assign(
      workspaceProps,
      parsedWorkspaces[activeStepIndex].workspace
    )
  }

  render() {
    const { activeStepIndex } = this.state

    return (
      <div style={style}>
        <Workspace key={activeStepIndex} {...this.getWorkspaceProps()} />
      </div>
    )
  }
}

const mount = document.getElementById('react-root')

// Set mount node to flex in a vendor-prefixed way
prefixAndApply({ display: 'flex' }, mount)

ReactDOM.render(<WorkspaceContainer />, mount)
