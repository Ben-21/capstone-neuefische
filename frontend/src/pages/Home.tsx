import Gallery from "./Gallery.tsx";
import styled from "@emotion/styled";


export default function Home() {
    return (
        <div>
            <StyledH1>Be Human</StyledH1>
            <Gallery/>
        </div>
    )
}


const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
`;