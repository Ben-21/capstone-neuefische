import Gallery from "./Gallery.tsx";
import {StyledBody, StyledMain} from "../GlobalStyles.tsx";


export default function Home() {
    return (
        <StyledBody>
            <StyledMain>
                <Gallery/>
            </StyledMain>
        </StyledBody>
    )
}
