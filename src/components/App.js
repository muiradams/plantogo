import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LoadingSpinner from './LoadingSpinner';

// Required for material-ui buttons
injectTapEventPlugin();

export default class App extends Component {
  render() {
    // Change default colors for all Material-UI components
    const muiTheme = getMuiTheme({
      palette: {
        borderColor: '#3F51B5',
        primary1Color: '#3F51B5',
        pickerHeaderColor: '#3F51B5',
        primary2Color: '#3F51B5',
        textColor: '#3F51B5',
        disabledColor: '#687486',
        accent1Color: '#3F51B5',
      },
    });

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <LoadingSpinner />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
