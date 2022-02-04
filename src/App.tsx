import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { User } from "./types/users";
import Search from "./component/search";
import Content from "./component/content";
import store from "./store/store";
import { observer } from "mobx-react-lite";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [myModal, setMyModal] = useState<Array<string>>([]);

  useEffect(() => {
    store.fetchRawData();
  }, []);

  useEffect(() => {
    const filtered = store.getUsersData().filter((user: User) => {
      return user.name.toLowerCase().includes(searchValue);
    });

    notify(filtered.length);

    store.setFiltered(filtered);
  }, [searchValue]);

  const notify = (resultsNumber: number) => {
    setMyModal((prev) => [...prev, `There are ${resultsNumber} results `]);
    setTimeout(() => setMyModal((prev) => prev.slice(1)), 2000);
    toast(`There are ${resultsNumber} results`);
  };

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
        <Content />
      </Container>

      <ModalContainer>
        {myModal.map((modal, index) => (
          <ModalItem key={index}>{modal}</ModalItem>
        ))}
      </ModalContainer>
    </>
  );
};

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

export default observer(App);
