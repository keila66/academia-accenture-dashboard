import styled from "styled-components";
import { mixins } from "../../styles/mixins";

//estilização da pagina do Login
export const Styled = {
    Error: styled.p`
        align-self: center;
        justify-self: center;
        color: ${mixins.colors.red};
        font-family: ${mixins.fonts.semi_bold};
        font-size: ${mixins.typograph.paragraph}
    `
}