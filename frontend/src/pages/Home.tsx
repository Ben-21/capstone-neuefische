import Gallery from "./Gallery.tsx";
import styled from "@emotion/styled";
import {StyledBody} from "../GlobalStyles.tsx";


export default function Home() {
    return (
        <StyledBody>
            <Main>
                <Gallery/>
            </Main>
        </StyledBody>
    )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
