import Gallery from "./Gallery.tsx";
import styled from "@emotion/styled";


export default function Home() {
    return (
        <StyledBody>
            <Main>
                <StyledH1>Be Human</StyledH1>
                <Gallery/>
            </Main>
        </StyledBody>
    )
}


const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
`;

const StyledBody = styled.body`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
