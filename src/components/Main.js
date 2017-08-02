require('normalize.css/normalize.css');
require('styles/app.less');

import React from 'react';


class AppComponent extends React.Component {
  render() {

    return (

      <div className="stage">
        <div className="updn">
        </div>
        <div className="handle"></div>
        <div className="bg"></div>

      </div>


    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
