import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { User, UsersData } from "./types/users";
import Search from "./component/search";
import Content from "./component/content";

function App() {
  const [rawData, setRawData] = useState<UsersData>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UsersData>([]);
  const [myModal, setMyModal] = useState<Array<string>>([]);

  useEffect(() => {
    axios.get("./assets/users.json").then((res) => {
      setRawData(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = rawData.filter((user: User) =>
      user.name.toLowerCase().includes(searchValue)
    );
    notify(filtered.length);
    setFilteredUsers(filtered);
  }, [searchValue]);

  const notify = (resultsNumber: number) => {
    setMyModal((prev) => [...prev, `There are ${resultsNumber} results `]);
    setTimeout(() => setMyModal((prev) => prev.slice(1)), 2000);
    toast(`There are ${resultsNumber} results`);
  };

  if (rawData.length === 0) return null;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container>
        <Header>My Data</Header>
        <Search value={searchValue} setValue={setSearchValue} />
        <Content users={filteredUsers} />
      </Container>

      <ModalContainer>
        {myModal.map((modal) => (
          <ModalItem>{modal}</ModalItem>
        ))}
      </ModalContainer>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  min-width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const headerAnimation = keyframes`
  from {
    opacity: 0;
   }
  
  to { 
    opacity: 1;
  }
  
`;

const Header = styled.h1`
  color: blue;
  animation: ${headerAnimation} 2s ease-in;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalItem = styled.div`
  width: fit-content;
  height: 20px;
  padding: 3px 15px;
  margin: 5px 15px;
  border: 1px solid red;
  border-radius: 10px;
  background-color: white;
  animation: ${headerAnimation} 1s ease-in;
`;

export default App;
