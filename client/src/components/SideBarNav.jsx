import { Flex, List, ListItem, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom"
import { SlHome } from "react-icons/sl";

function SideBarNav() {
    return (
      <List align='center' spacing={3}>
        <ListItem>
          <NavLink to='/'><Icon as={SlHome} /> Home</NavLink>
        </ListItem>

		<ListItem>
          <NavLink to='/message'>Message</NavLink>
        </ListItem>

		<ListItem>
          <NavLink to='/explore'>Explore</NavLink>
        </ListItem>

		<ListItem>
          <NavLink to='/notification'>Notification</NavLink>
        </ListItem>

		<ListItem>
          <NavLink to='/profile'>Profile</NavLink>
        </ListItem>
      </List>
      );
}

export default SideBarNav;