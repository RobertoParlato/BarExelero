import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import React from 'react';
import logo from '../logo.svg'

function Header() {

  return (
    <Menu fluid id='menu' inverted >
      <Container text>
          <Menu.Item
            header
            name='home'
            active
          >
            <Image 
              size='mini'
              src={logo}
              style={{ marginRight: '1em' }}
            />
            Bar Exelero
          </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Header;
