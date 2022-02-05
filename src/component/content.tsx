import React from "react";
import { Address, Company, User } from "../types/users";
import styled from "@emotion/styled/macro";
import { observer } from "mobx-react-lite";
import store from "../store/store";

const Content: React.FC = () => {
  const keys = ["", ...Object.keys(store.getFilteredUsersData()[0] || {})];

  return (
    <>
      {keys.length > 0 && (
        <Table>
          <thead>
            <tr>
              {keys.map((title: string) => {
                return <TableHead>{title}</TableHead>;
              })}
            </tr>
          </thead>
          <TableBody>
            {store.getFilteredUsersData().map((user: User) => (
              <TableRow key={user.id as string}>
                <InputContainer>
                  <input type="checkbox" />
                </InputContainer>
                {keys.map((k) => {
                  if (k === "") return null;
                  let name = user[k];
                  if (k === "company") {
                    name = (user[k] as Company).name;
                  }
                  if (k === "address") {
                    name = (user[k] as Address).street;
                  }
                  return <TableCell>{name}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
const TableRow = styled.tr`
  cursor: pointer;
  text-align: left;

  &:nth-child(odd) {
    background-color: #61dafb;
  }

  &:hover {
    background-color: yellow;
  }
`;

const TableCell = styled.td`
  padding: 13px;
`;

const InputContainer = styled(TableCell)`
  padding: 30px 15px;
  display: flex;
  justify-content: center;
`;

const TableHead = styled.th`
  text-align: left;
  text-transform: capitalize;
`;

const TableBody = styled.tbody`
  border-radius: 10px;
  border: 3px solid red;
`;

const Table = styled.table`
  border: 2px solid red;
  border-collapse: collapse;
`;

export default observer(Content);
