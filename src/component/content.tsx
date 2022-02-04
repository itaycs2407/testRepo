import React from "react";
import { User } from "../types/users";
import styled from "@emotion/styled/macro";

interface Props {
  users: Array<User>;
}

const Content: React.FC<Props> = ({ users }) => (
  <>
    {users.length > 0 ? (
      <UsersContainer>
        {users.map((user: User) => (
          <Card key={user.id}>{user.name}</Card>
        ))}
      </UsersContainer>
    ) : (
      <span>No Content to show....</span>
    )}
  </>
);

const UsersContainer = styled.div`
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled.div`
  background-color: white;
  user-select: none;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.58);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.18);
  }
`;

export default Content;
