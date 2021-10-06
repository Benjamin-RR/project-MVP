import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root{
        --defaultHeight: 500px;
        --IconHeight: 30px;
        --IconWidth: 30px;
        --color-Header-Footer: #5a608d;
        --image-Header-Footer: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d4f67' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
        --background-color-card: #5a608d;
        --background-image-card: url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 10 12c1.67 0 3.182-.683 4.27-1.785A5.998 5.998 0 0 0 14 12h2a4 4 0 0 1 4-4V6c-1.67 0-3.182.683-4.27 1.785C15.905 7.22 16 6.622 16 6c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 20 6V4a4 4 0 0 1-4-4h-2c0 .622.095 1.221.27 1.785A5.982 5.982 0 0 0 10 0C8.33 0 6.818.683 5.73 1.785 5.905 1.22 6 .622 6 0H4a4 4 0 0 1-4 4v2c1.67 0 3.182.683 4.27 1.785A5.998 5.998 0 0 1 4 6c0-.622.095-1.221.27-1.785A5.982 5.982 0 0 1 0 6v2a4 4 0 0 1 4 4h2zm-4 0a2 2 0 0 0-2-2v2h2zm16 0a2 2 0 0 1 2-2v2h-2zM0 2a2 2 0 0 0 2-2H0v2zm20 0a2 2 0 0 1-2-2h2v2zm-10 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");

        --background-color-default:  #233f6d;
        --background-image-default: url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 10 12c1.67 0 3.182-.683 4.27-1.785A5.998 5.998 0 0 0 14 12h2a4 4 0 0 1 4-4V6c-1.67 0-3.182.683-4.27 1.785C15.905 7.22 16 6.622 16 6c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 20 6V4a4 4 0 0 1-4-4h-2c0 .622.095 1.221.27 1.785A5.982 5.982 0 0 0 10 0C8.33 0 6.818.683 5.73 1.785 5.905 1.22 6 .622 6 0H4a4 4 0 0 1-4 4v2c1.67 0 3.182.683 4.27 1.785A5.998 5.998 0 0 1 4 6c0-.622.095-1.221.27-1.785A5.982 5.982 0 0 1 0 6v2a4 4 0 0 1 4 4h2zm-4 0a2 2 0 0 0-2-2v2h2zm16 0a2 2 0 0 1 2-2v2h-2zM0 2a2 2 0 0 0 2-2H0v2zm20 0a2 2 0 0 1-2-2h2v2zm-10 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='%23222765' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E");

        --background-color-alternative: #3c5289;
        --background-image-alternative: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23403d70' fill-opacity='0.47'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        color: black;
        box-sizing: border-box;
        font-size: 100%;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    h1,
    label,
    button {
    color: black;
    font-family: var(--font-heading);
    /* text-shadow: var(--neon); */
    font-size: 32px;
    text-align: center;
    }
    h2,
    h3 {
        color: black;
        font-family: var(--font-heading);
        font-size: 16px;
        text-align: center;
    }
    p,
    a,
    li,
    blockquote,
    input {
    font-family: var(--font-body);
    }

    input {
        font-size: 24px;
        height: 42px;
        border: 2px solid var(--color-orange);
        border-radius: 4px;
        padding: 0 12px;
    }





`