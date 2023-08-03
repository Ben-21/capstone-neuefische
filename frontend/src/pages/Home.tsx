import Gallery from "./Gallery.tsx";
import styled from "@emotion/styled";


export default function Home() {
    return (
        <StyledBody>
            <Main>
                <Gallery/>
            </Main>
        </StyledBody>
    )
}




const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  margin-top: 101px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
