import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { baseUrl } from "../apis";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(baseUrl + "group/all");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb="4">
        All Groups
      </Heading>
      <List spacing="3">
        {groups.map((group) => (
          <ListItem
            key={group._id}
            p="3"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Heading as="h3" size="md" mb="2">
              {group.name}
            </Heading>
            {/* Add additional group details as needed */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllGroups;
