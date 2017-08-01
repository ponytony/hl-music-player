require('normalize.css/normalize.css');
require('styles/app.less');

import React from 'react';
import LockBar from './lockbar';
import Control from './control';
import List from './list';

class AppComponent extends React.Component {
  render() {
    let control=Control,
    lockbar=LockBar,
    list=List;
    return (

      <div className="stage">
        <div className="updn">
            {LockBar}
        </div>
        <div className="handle"></div>
        <div className="bg"></div>
          {control}

        {list}
      </div>


    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
