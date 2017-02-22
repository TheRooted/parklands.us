import React from 'react';
import { Button } from 'semantic-ui-react';

const Vote = (props) => (
  <div>
    <Button
      color='red'
      content='Vote'
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

export default Vote;