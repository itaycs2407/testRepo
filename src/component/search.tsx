import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled/macro";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<Props> = ({ value, setValue }) => {
  return (
    <Container>
      <Input
        type="text"
        autoFocus
        placeholder="Type to search..."
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  padding: 5px 10px;
  border-radius: 12px;
  outline: 2px grey solid;
  border: none;

  &:focus {
    outline: 2px lightskyblue solid;
    border: none;
  }
`;

export default Search;
