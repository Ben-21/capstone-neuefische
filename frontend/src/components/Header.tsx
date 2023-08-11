import styled from "@emotion/styled";
import {useFetch} from "../hooks/useFetch.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


export default function Header() {

    const checkPage = useFetch (state => state.checkPage);
    const location = useLocation();
    const [page, setPage] = useState("");


    useEffect(() => {
        setPage(checkPage(location.pathname));
    }, [location, checkPage]);



    return (
        <>
        <StyledHeader>
            <StyledSvgHandsLeft width="65" height="43" viewBox="0 0 65 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.1872 26.7265L50.7532 26.262C52.9598 24.2315 54.7435 22.7551 57.3289 21.2166C58.3451 20.6136 59.4333 20.0806 60.5637 19.6313L60.6 19.6183C61.444 19.2805 61.9867 18.4605 62.0046 17.4821C62.0376 15.6848 61.6 12.666 59.3271 8.4876C56.9584 4.11977 54.5729 2.31925 52.9889 1.57798C52.2961 1.24683 51.5404 1.24059 50.9053 1.55938L50.8925 1.57207L50.8202 1.60556C50.6447 1.67296 50.4521 1.74987 50.2439 1.83351C48.6673 2.46486 46.0304 3.52045 43.0974 3.32034C41.6686 3.21848 40.2918 3.49352 39.1215 4.11611L33.9782 6.83763L30.0669 9.64457L29.6927 9.13099L33.6541 6.29164L38.8202 3.55695C40.0968 2.87884 41.5913 2.57908 43.1424 2.68819C45.9247 2.8811 48.3809 1.89629 50.0049 1.24602C50.2007 1.16739 50.3829 1.09461 50.5503 1.03005L50.5645 1.02097C51.3883 0.585326 52.3725 0.579736 53.2637 1.00571C54.932 1.78669 57.4378 3.66751 59.8894 8.18719C62.2277 12.486 62.6773 15.6209 62.6432 17.4935C62.621 18.7118 61.9076 19.7783 60.827 20.2104L60.7896 20.2237C59.702 20.6564 58.6441 21.1748 57.6566 21.7602C55.1195 23.2703 53.3633 24.7246 51.1872 26.7265ZM48.2714 31.0973C48.2426 31.0973 48.2135 31.0969 48.1844 31.0963C47.366 31.0774 46.5554 30.7807 45.9019 30.261L46.301 29.7666C46.846 30.1997 47.5201 30.4473 48.1994 30.4627C49.0677 30.4917 49.8703 30.128 50.3891 29.4875C51.0238 28.7022 51.1358 27.6059 50.6809 26.6269C50.4776 26.1825 50.1617 25.7821 49.7671 25.4672L39.3354 17.182C38.323 16.3981 37.8201 16.0516 37.3767 15.7458C36.7978 15.3467 36.2976 15.0022 34.9003 13.8544L35.3075 13.3661C36.6839 14.4968 37.1738 14.8347 37.7409 15.2255C38.1914 15.5358 38.7017 15.8879 39.7312 16.6852L50.1668 24.9731C50.6394 25.3499 51.0176 25.8307 51.2614 26.3635C51.8176 27.5604 51.6742 28.9101 50.887 29.884C50.26 30.6581 49.3105 31.0973 48.2714 31.0973ZM10.0169 23.2474C9.58875 22.8735 9.13234 22.5036 8.60362 22.0758C8.18919 21.7404 7.72612 21.3653 7.18672 20.9159C6.20869 20.0971 5.12444 19.3155 3.96283 18.5922L3.95151 18.5875C2.82755 17.8868 2.21921 16.6524 2.38111 15.4304C2.62091 13.5363 3.58459 10.4828 6.81108 6.70213C10.1884 2.74796 13.2231 1.45737 15.1745 1.0709C16.1953 0.859451 17.255 1.09816 18.0763 1.72553L18.0958 1.74058C18.7775 2.1587 19.3534 2.71141 19.9622 3.29615C21.1041 4.3926 22.2849 5.52651 24.4225 6.10583C24.5269 6.13754 26.8018 6.84231 30.0522 9.12282L29.6837 9.63994C26.5254 7.42415 24.2671 6.72132 24.2447 6.71444C21.9588 6.09475 20.6622 4.85001 19.5182 3.75163C18.9249 3.18177 18.3643 2.64331 17.7276 2.2598L17.6622 2.20739C17.0136 1.71284 16.1454 1.51821 15.302 1.69156C13.4476 2.05904 10.5564 3.2968 7.29815 7.11176C4.17322 10.7735 3.24377 13.7003 3.01432 15.5109C2.88275 16.5052 3.36451 17.4735 4.27104 18.0393L4.28198 18.044C5.48882 18.7945 6.59777 19.5939 7.5978 20.431C8.13426 20.8781 8.59506 21.2511 9.00721 21.5848C9.54065 22.0167 10.0015 22.3898 10.4386 22.7716L10.0169 23.2474ZM33.4914 42.3098C33.463 42.3098 33.4347 42.3095 33.4056 42.3088C32.286 42.2827 30.9115 41.7052 29.7288 40.764L28.0017 39.3926L28.4006 38.8976L30.1283 40.2693C31.2055 41.127 32.4363 41.6525 33.4208 41.6752C34.0198 41.6904 34.525 41.5214 34.9368 41.1762C35.6598 40.6393 36.0561 39.9525 36.0676 39.2308C36.0792 38.5358 35.7293 37.855 35.1082 37.3627L35.5067 36.8676L36.9565 38.0181C37.5046 38.4538 38.1799 38.7023 38.8583 38.7178C39.7238 38.7376 40.5264 38.3821 41.0445 37.7398C41.4804 37.2006 41.6762 36.5094 41.5963 35.7943C41.5078 34.999 41.0803 34.2441 40.424 33.7232L40.4237 33.7228L40.8222 33.2278L42.5127 34.5676C43.9119 35.5328 45.6055 35.4189 46.5217 34.2815C46.9823 33.7092 47.1735 32.9782 47.0598 32.223C46.9442 31.4633 46.5324 30.7661 45.9001 30.2603L46.301 29.7672C47.0577 30.3727 47.5516 31.2113 47.6915 32.1289C47.8312 33.0607 47.5931 33.9655 47.0206 34.677C45.9066 36.0589 43.8046 36.231 42.131 35.075L42.0834 35.0371C42.155 35.2608 42.2049 35.491 42.2311 35.7243C42.3296 36.6081 42.0852 37.4645 41.5427 38.1362C40.8995 38.9335 39.9143 39.3818 38.8433 39.3514C38.0564 39.3332 37.2745 39.0565 36.6317 38.5703C36.6843 38.7896 36.7099 39.0142 36.7061 39.2411C36.6911 40.1632 36.2038 41.0267 35.3339 41.6717C34.8338 42.0918 34.2101 42.3098 33.4914 42.3098ZM23.3985 35.7333L23.3923 35.7266L23.8551 35.2898L23.3985 35.7333ZM34.2403 24.3326C32.9689 24.3326 31.8194 23.6261 31.11 22.3102L27.3503 15.3201C26.502 13.7429 26.2815 12.4408 26.6765 11.3391L26.7103 11.2455L26.791 11.1878L33.0466 6.7268L33.4194 7.24167L27.2474 11.643C26.9609 12.5504 27.1795 13.6569 27.9134 15.022L31.6731 22.0117C32.743 23.996 34.5112 23.9677 35.8083 23.2802C36.7918 22.7557 37.8522 21.2238 36.7392 19.154L34.5262 15.0441L35.2545 10.914L35.8837 11.023L35.1933 14.9384L37.3021 18.8554C38.4827 21.0502 37.5689 23.0607 36.11 23.8385C35.4821 24.1715 34.8474 24.3326 34.2403 24.3326ZM14.3264 19.7351L11.1979 22.3072C10.6301 22.7719 10.2794 23.4311 10.2101 24.1631C10.1412 24.8954 10.3619 25.608 10.8324 26.1689C11.3014 26.7331 11.9657 27.0807 12.7034 27.1495C13.4449 27.2182 14.1594 26.9989 14.7247 26.5319L17.8739 23.9428C18.4785 23.4481 18.8414 22.7134 18.87 21.9268C18.8944 21.2511 18.6701 20.5957 18.2389 20.0816C17.4901 19.1787 16.2074 18.8507 15.1109 19.2758L14.3264 19.7351ZM12.9696 27.7954C12.8618 27.7954 12.7529 27.7906 12.6438 27.7804C11.7356 27.696 10.9179 27.2671 10.3407 26.5731C9.76181 25.8828 9.4893 25.0051 9.57439 24.104C9.65976 23.2028 10.0916 22.3914 10.791 21.8187L13.9804 19.2021L14.8509 18.6966C16.2294 18.1473 17.7888 18.5414 18.731 19.6774C19.2617 20.3103 19.5382 21.1176 19.5079 21.9499C19.473 22.9172 19.0256 23.8219 18.2805 24.4316L15.1325 27.0193C14.5198 27.5255 13.7615 27.7954 12.9696 27.7954ZM23.9713 28.504C23.3517 28.504 22.7292 28.7087 22.2153 29.1288L19.0467 31.7315C17.8872 32.6967 17.7276 34.428 18.6925 35.5897C19.6659 36.7502 21.4147 36.9128 22.5899 35.9506L25.7385 33.3576C26.343 32.8628 26.706 32.1277 26.7345 31.3412C26.7589 30.6657 26.5348 30.0103 26.1036 29.4962C25.5576 28.842 24.7673 28.504 23.9713 28.504ZM20.8272 37.2111C19.847 37.2111 18.874 36.7964 18.2009 35.9937C17.013 34.5638 17.2095 32.4337 18.6382 31.2448L21.8091 28.6405C23.2536 27.458 25.4005 27.6609 26.5949 29.0915C27.1262 29.7251 27.4028 30.5322 27.3725 31.3643C27.3375 32.3313 26.8901 33.2363 26.1451 33.8464L22.9973 36.4386C22.3629 36.9582 21.5931 37.2111 20.8272 37.2111ZM21.1827 22.8779C20.5437 22.8779 19.932 23.0947 19.4371 23.5013L15.1318 27.0447C13.9636 28.0043 13.8006 29.728 14.7676 30.8872C15.2337 31.4458 15.8943 31.7909 16.6283 31.8585C17.3619 31.926 18.0766 31.7082 18.639 31.244L22.9502 27.7046C23.5511 27.2086 23.9123 26.4773 23.9407 25.6982C23.9647 25.0292 23.7403 24.3772 23.3094 23.8631C22.843 23.3039 22.1824 22.9587 21.4481 22.8903C21.3593 22.882 21.271 22.8779 21.1827 22.8779ZM16.8914 32.5043C16.7846 32.5043 16.6771 32.4995 16.5692 32.4894C15.6653 32.4058 14.8506 31.9804 14.2757 31.2911C13.0841 29.863 13.2852 27.7393 14.7243 26.5569L19.0297 23.0135C19.724 22.4433 20.6026 22.1756 21.508 22.2596C22.4118 22.3436 23.2261 22.7697 23.8007 23.4584C24.332 24.092 24.6082 24.8958 24.5786 25.7208V25.7211C24.5437 26.6803 24.0987 27.5808 23.3577 28.1922L19.0467 31.7315C18.436 32.2353 17.6806 32.5043 16.8914 32.5043ZM26.8643 34.0222C26.3704 34.0222 25.8722 34.1653 25.4329 34.4602C25.3534 34.5089 25.2904 34.5601 25.2266 34.6105L23.7206 35.8497C23.1983 36.2772 22.8758 36.8835 22.8112 37.5576C22.7466 38.2327 22.9492 38.8897 23.3817 39.4079C24.2778 40.4798 25.8887 40.631 26.9729 39.7433L28.4833 38.501C29.0414 38.0443 29.3763 37.366 29.4024 36.6394C29.4249 36.0194 29.2189 35.4149 28.822 34.9368C28.3196 34.3374 27.5973 34.0222 26.8643 34.0222ZM25.3493 40.955C24.4308 40.955 23.5195 40.5653 22.8903 39.8117C22.3488 39.1635 22.0947 38.3415 22.1755 37.498C22.256 36.6549 22.6602 35.896 23.3134 35.3614L24.8238 34.1189C24.9126 34.0484 24.9974 33.9824 25.0868 33.9279C26.4391 33.0198 28.2619 33.2762 29.3139 34.5331C29.8109 35.1318 30.0687 35.8877 30.0405 36.6623C30.0075 37.57 29.5885 38.4181 28.8901 38.9891L27.3803 40.2316C26.786 40.7178 26.0655 40.955 25.3493 40.955ZM45.9058 30.2637L39.5448 25.3568L39.9365 24.8566L46.2973 29.7637L45.9058 30.2637ZM40.4277 33.7257L35.0702 29.5937L35.4618 29.0931L40.8194 33.2251L40.4277 33.7257ZM35.1126 37.3657L30.5663 33.8606L30.9579 33.3601L35.5043 36.8652L35.1126 37.3657ZM40.8164 16.7887C39.1628 16.7887 38.2456 16.3371 38.1618 16.2937L38.4567 15.7319L38.3093 16.0129L38.4555 15.7312C38.4998 15.7534 42.9258 17.8828 50.3937 12.0979L50.7864 12.5973C46.3633 16.0238 42.9671 16.7887 40.8164 16.7887Z" fill="black"/>
            </StyledSvgHandsLeft>
            <StyledH1>Be Human</StyledH1>
            <StyledSvgHandsRight width="65" height="43" viewBox="0 0 65 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.1872 26.7265L50.7532 26.262C52.9598 24.2315 54.7435 22.7551 57.3289 21.2166C58.3451 20.6136 59.4333 20.0806 60.5637 19.6313L60.6 19.6183C61.444 19.2805 61.9867 18.4605 62.0046 17.4821C62.0376 15.6848 61.6 12.666 59.3271 8.4876C56.9584 4.11977 54.5729 2.31925 52.9889 1.57798C52.2961 1.24683 51.5404 1.24059 50.9053 1.55938L50.8925 1.57207L50.8202 1.60556C50.6447 1.67296 50.4521 1.74987 50.2439 1.83351C48.6673 2.46486 46.0304 3.52045 43.0974 3.32034C41.6686 3.21848 40.2918 3.49352 39.1215 4.11611L33.9782 6.83763L30.0669 9.64457L29.6927 9.13099L33.6541 6.29164L38.8202 3.55695C40.0968 2.87884 41.5913 2.57908 43.1424 2.68819C45.9247 2.8811 48.3809 1.89629 50.0049 1.24602C50.2007 1.16739 50.3829 1.09461 50.5503 1.03005L50.5645 1.02097C51.3883 0.585326 52.3725 0.579736 53.2637 1.00571C54.932 1.78669 57.4378 3.66751 59.8894 8.18719C62.2277 12.486 62.6773 15.6209 62.6432 17.4935C62.621 18.7118 61.9076 19.7783 60.827 20.2104L60.7896 20.2237C59.702 20.6564 58.6441 21.1748 57.6566 21.7602C55.1195 23.2703 53.3633 24.7246 51.1872 26.7265ZM48.2714 31.0973C48.2426 31.0973 48.2135 31.0969 48.1844 31.0963C47.366 31.0774 46.5554 30.7807 45.9019 30.261L46.301 29.7666C46.846 30.1997 47.5201 30.4473 48.1994 30.4627C49.0677 30.4917 49.8703 30.128 50.3891 29.4875C51.0238 28.7022 51.1358 27.6059 50.6809 26.6269C50.4776 26.1825 50.1617 25.7821 49.7671 25.4672L39.3354 17.182C38.323 16.3981 37.8201 16.0516 37.3767 15.7458C36.7978 15.3467 36.2976 15.0022 34.9003 13.8544L35.3075 13.3661C36.6839 14.4968 37.1738 14.8347 37.7409 15.2255C38.1914 15.5358 38.7017 15.8879 39.7312 16.6852L50.1668 24.9731C50.6394 25.3499 51.0176 25.8307 51.2614 26.3635C51.8176 27.5604 51.6742 28.9101 50.887 29.884C50.26 30.6581 49.3105 31.0973 48.2714 31.0973ZM10.0169 23.2474C9.58875 22.8735 9.13234 22.5036 8.60362 22.0758C8.18919 21.7404 7.72612 21.3653 7.18672 20.9159C6.20869 20.0971 5.12444 19.3155 3.96283 18.5922L3.95151 18.5875C2.82755 17.8868 2.21921 16.6524 2.38111 15.4304C2.62091 13.5363 3.58459 10.4828 6.81108 6.70213C10.1884 2.74796 13.2231 1.45737 15.1745 1.0709C16.1953 0.859451 17.255 1.09816 18.0763 1.72553L18.0958 1.74058C18.7775 2.1587 19.3534 2.71141 19.9622 3.29615C21.1041 4.3926 22.2849 5.52651 24.4225 6.10583C24.5269 6.13754 26.8018 6.84231 30.0522 9.12282L29.6837 9.63994C26.5254 7.42415 24.2671 6.72132 24.2447 6.71444C21.9588 6.09475 20.6622 4.85001 19.5182 3.75163C18.9249 3.18177 18.3643 2.64331 17.7276 2.2598L17.6622 2.20739C17.0136 1.71284 16.1454 1.51821 15.302 1.69156C13.4476 2.05904 10.5564 3.2968 7.29815 7.11176C4.17322 10.7735 3.24377 13.7003 3.01432 15.5109C2.88275 16.5052 3.36451 17.4735 4.27104 18.0393L4.28198 18.044C5.48882 18.7945 6.59777 19.5939 7.5978 20.431C8.13426 20.8781 8.59506 21.2511 9.00721 21.5848C9.54065 22.0167 10.0015 22.3898 10.4386 22.7716L10.0169 23.2474ZM33.4914 42.3098C33.463 42.3098 33.4347 42.3095 33.4056 42.3088C32.286 42.2827 30.9115 41.7052 29.7288 40.764L28.0017 39.3926L28.4006 38.8976L30.1283 40.2693C31.2055 41.127 32.4363 41.6525 33.4208 41.6752C34.0198 41.6904 34.525 41.5214 34.9368 41.1762C35.6598 40.6393 36.0561 39.9525 36.0676 39.2308C36.0792 38.5358 35.7293 37.855 35.1082 37.3627L35.5067 36.8676L36.9565 38.0181C37.5046 38.4538 38.1799 38.7023 38.8583 38.7178C39.7238 38.7376 40.5264 38.3821 41.0445 37.7398C41.4804 37.2006 41.6762 36.5094 41.5963 35.7943C41.5078 34.999 41.0803 34.2441 40.424 33.7232L40.4237 33.7228L40.8222 33.2278L42.5127 34.5676C43.9119 35.5328 45.6055 35.4189 46.5217 34.2815C46.9823 33.7092 47.1735 32.9782 47.0598 32.223C46.9442 31.4633 46.5324 30.7661 45.9001 30.2603L46.301 29.7672C47.0577 30.3727 47.5516 31.2113 47.6915 32.1289C47.8312 33.0607 47.5931 33.9655 47.0206 34.677C45.9066 36.0589 43.8046 36.231 42.131 35.075L42.0834 35.0371C42.155 35.2608 42.2049 35.491 42.2311 35.7243C42.3296 36.6081 42.0852 37.4645 41.5427 38.1362C40.8995 38.9335 39.9143 39.3818 38.8433 39.3514C38.0564 39.3332 37.2745 39.0565 36.6317 38.5703C36.6843 38.7896 36.7099 39.0142 36.7061 39.2411C36.6911 40.1632 36.2038 41.0267 35.3339 41.6717C34.8338 42.0918 34.2101 42.3098 33.4914 42.3098ZM23.3985 35.7333L23.3923 35.7266L23.8551 35.2898L23.3985 35.7333ZM34.2403 24.3326C32.9689 24.3326 31.8194 23.6261 31.11 22.3102L27.3503 15.3201C26.502 13.7429 26.2815 12.4408 26.6765 11.3391L26.7103 11.2455L26.791 11.1878L33.0466 6.7268L33.4194 7.24167L27.2474 11.643C26.9609 12.5504 27.1795 13.6569 27.9134 15.022L31.6731 22.0117C32.743 23.996 34.5112 23.9677 35.8083 23.2802C36.7918 22.7557 37.8522 21.2238 36.7392 19.154L34.5262 15.0441L35.2545 10.914L35.8837 11.023L35.1933 14.9384L37.3021 18.8554C38.4827 21.0502 37.5689 23.0607 36.11 23.8385C35.4821 24.1715 34.8474 24.3326 34.2403 24.3326ZM14.3264 19.7351L11.1979 22.3072C10.6301 22.7719 10.2794 23.4311 10.2101 24.1631C10.1412 24.8954 10.3619 25.608 10.8324 26.1689C11.3014 26.7331 11.9657 27.0807 12.7034 27.1495C13.4449 27.2182 14.1594 26.9989 14.7247 26.5319L17.8739 23.9428C18.4785 23.4481 18.8414 22.7134 18.87 21.9268C18.8944 21.2511 18.6701 20.5957 18.2389 20.0816C17.4901 19.1787 16.2074 18.8507 15.1109 19.2758L14.3264 19.7351ZM12.9696 27.7954C12.8618 27.7954 12.7529 27.7906 12.6438 27.7804C11.7356 27.696 10.9179 27.2671 10.3407 26.5731C9.76181 25.8828 9.4893 25.0051 9.57439 24.104C9.65976 23.2028 10.0916 22.3914 10.791 21.8187L13.9804 19.2021L14.8509 18.6966C16.2294 18.1473 17.7888 18.5414 18.731 19.6774C19.2617 20.3103 19.5382 21.1176 19.5079 21.9499C19.473 22.9172 19.0256 23.8219 18.2805 24.4316L15.1325 27.0193C14.5198 27.5255 13.7615 27.7954 12.9696 27.7954ZM23.9713 28.504C23.3517 28.504 22.7292 28.7087 22.2153 29.1288L19.0467 31.7315C17.8872 32.6967 17.7276 34.428 18.6925 35.5897C19.6659 36.7502 21.4147 36.9128 22.5899 35.9506L25.7385 33.3576C26.343 32.8628 26.706 32.1277 26.7345 31.3412C26.7589 30.6657 26.5348 30.0103 26.1036 29.4962C25.5576 28.842 24.7673 28.504 23.9713 28.504ZM20.8272 37.2111C19.847 37.2111 18.874 36.7964 18.2009 35.9937C17.013 34.5638 17.2095 32.4337 18.6382 31.2448L21.8091 28.6405C23.2536 27.458 25.4005 27.6609 26.5949 29.0915C27.1262 29.7251 27.4028 30.5322 27.3725 31.3643C27.3375 32.3313 26.8901 33.2363 26.1451 33.8464L22.9973 36.4386C22.3629 36.9582 21.5931 37.2111 20.8272 37.2111ZM21.1827 22.8779C20.5437 22.8779 19.932 23.0947 19.4371 23.5013L15.1318 27.0447C13.9636 28.0043 13.8006 29.728 14.7676 30.8872C15.2337 31.4458 15.8943 31.7909 16.6283 31.8585C17.3619 31.926 18.0766 31.7082 18.639 31.244L22.9502 27.7046C23.5511 27.2086 23.9123 26.4773 23.9407 25.6982C23.9647 25.0292 23.7403 24.3772 23.3094 23.8631C22.843 23.3039 22.1824 22.9587 21.4481 22.8903C21.3593 22.882 21.271 22.8779 21.1827 22.8779ZM16.8914 32.5043C16.7846 32.5043 16.6771 32.4995 16.5692 32.4894C15.6653 32.4058 14.8506 31.9804 14.2757 31.2911C13.0841 29.863 13.2852 27.7393 14.7243 26.5569L19.0297 23.0135C19.724 22.4433 20.6026 22.1756 21.508 22.2596C22.4118 22.3436 23.2261 22.7697 23.8007 23.4584C24.332 24.092 24.6082 24.8958 24.5786 25.7208V25.7211C24.5437 26.6803 24.0987 27.5808 23.3577 28.1922L19.0467 31.7315C18.436 32.2353 17.6806 32.5043 16.8914 32.5043ZM26.8643 34.0222C26.3704 34.0222 25.8722 34.1653 25.4329 34.4602C25.3534 34.5089 25.2904 34.5601 25.2266 34.6105L23.7206 35.8497C23.1983 36.2772 22.8758 36.8835 22.8112 37.5576C22.7466 38.2327 22.9492 38.8897 23.3817 39.4079C24.2778 40.4798 25.8887 40.631 26.9729 39.7433L28.4833 38.501C29.0414 38.0443 29.3763 37.366 29.4024 36.6394C29.4249 36.0194 29.2189 35.4149 28.822 34.9368C28.3196 34.3374 27.5973 34.0222 26.8643 34.0222ZM25.3493 40.955C24.4308 40.955 23.5195 40.5653 22.8903 39.8117C22.3488 39.1635 22.0947 38.3415 22.1755 37.498C22.256 36.6549 22.6602 35.896 23.3134 35.3614L24.8238 34.1189C24.9126 34.0484 24.9974 33.9824 25.0868 33.9279C26.4391 33.0198 28.2619 33.2762 29.3139 34.5331C29.8109 35.1318 30.0687 35.8877 30.0405 36.6623C30.0075 37.57 29.5885 38.4181 28.8901 38.9891L27.3803 40.2316C26.786 40.7178 26.0655 40.955 25.3493 40.955ZM45.9058 30.2637L39.5448 25.3568L39.9365 24.8566L46.2973 29.7637L45.9058 30.2637ZM40.4277 33.7257L35.0702 29.5937L35.4618 29.0931L40.8194 33.2251L40.4277 33.7257ZM35.1126 37.3657L30.5663 33.8606L30.9579 33.3601L35.5043 36.8652L35.1126 37.3657ZM40.8164 16.7887C39.1628 16.7887 38.2456 16.3371 38.1618 16.2937L38.4567 15.7319L38.3093 16.0129L38.4555 15.7312C38.4998 15.7534 42.9258 17.8828 50.3937 12.0979L50.7864 12.5973C46.3633 16.0238 42.9671 16.7887 40.8164 16.7887Z" fill="black"/>
            </StyledSvgHandsRight>
        </StyledHeader>
            {page !== "/" && <StyledSubHeader>
            {page === "details" && <StyledH3>Project Detail</StyledH3>}
            {page === "edit" && <StyledH3>Edit Project</StyledH3>}
            {page === "add" && <StyledH3>Add Project</StyledH3>}
            {page === "donate" && <StyledH3>Donate</StyledH3>}
            {page === "volunteer" && <StyledH3>Volunteer</StyledH3>}
        </StyledSubHeader>}
            </>
    )
}

const StyledH1 = styled.h1`
  margin: 0;
  position: absolute;
  transform: translate(-50%);
  top: 9px;
  left: 50%;
  color: #000;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.4em;
  font-style: normal;
  font-weight: 700;
  `;

const StyledH3 = styled.h3`
  margin: 0;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
  color: #000;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.9em;
  font-style: normal;
  font-weight: 500;
  `;

const StyledHeader = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-radius: 0 0 10px 10px;
  background: var(--orange, #FFB34F);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const StyledSubHeader = styled.div`
  position: fixed;
  z-index: 1;
  width: 172px;
  height: 21px;
  top: 60px;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 0 0 10px 10px;
  background: #FFB34F;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const StyledSvgHandsLeft = styled.svg`
  position: absolute;
  width: 65px;
  height: 43px;
  top: 9px;
  left: 12px;
`;

const StyledSvgHandsRight = styled.svg`
  position: absolute;
  width: 65px;
  height: 43px;
  top: 9px;
  right: 12px;
`;
