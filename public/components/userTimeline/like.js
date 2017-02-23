import React from 'react';
import { Button } from 'semantic-ui-react';

const Like = (props) => (
  <div className='likeContainer'>
    <Button
      color='red'
      content='Like'
      icon='heart'
      label={
        {
          basic: true,
          color: 'red',
          pointing: 'left',
          content: '2,048'
        }
      }
    />
  </div>
)

export default Like;


