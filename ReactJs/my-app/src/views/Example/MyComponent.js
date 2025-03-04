import React from 'react'

class MyComponent extends React.Component {
    /* 
      JSX 
      fragment <> </>
      state 
    */
    render() {

        let name = 'Eric';

        return (
            <>
              <div> 
                 Hello {name}
              </div>
            </>
          
        )
    }
}

export default MyComponent;
