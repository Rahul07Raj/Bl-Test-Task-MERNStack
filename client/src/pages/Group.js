import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../apis";

const Group = () => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  console.log(members);
  const [selectedMember, setSelectedMember] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [ownerId, setOwnerId] = useState(""); // New state for owner ID

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseUrl + "user/all");
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch token from your authentication system and set it to state
    const authToken = sessionStorage.getItem("token"); // Assuming you're storing the token in sessionStorage
    setToken(authToken);
    // Fetch owner ID from your authentication system and set it to state
    const authOwnerId = sessionStorage.getItem("userId"); // Assuming you're storing the user ID in sessionStorage
    setOwnerId(authOwnerId);
    fetchUsers();
  }, []);

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  console.log("token",token)
  const handleAddMember = () => {
    // Find the user object corresponding to the selectedMember ID
    const selectedUser = users.find((user) => user._id === selectedMember);
    // Push the selected user's name to the members array
    setMembers([...members, selectedUser.name]);
    setSelectedMember("");
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        baseUrl + "group/create-group",
        { name, members }, // Include owner ID in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("error",error);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="6">
      <VStack spacing="4">
        <FormControl id="name">
          <FormLabel>Group Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="members">
          <FormLabel>Members</FormLabel>
          {members.map((member, index) => (
            <Box key={index}>{member}</Box>
          ))}
          <Select
            value={selectedMember}
            onChange={handleMemberChange}
            placeholder="Select member"
          >
            {users.length > 0 &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </Select>
          <Button onClick={handleAddMember} mt="2">
            Add Member
          </Button>
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="blue">
          Create Group
        </Button>
      </VStack>
    </Box>
  );
};

export default Group;
