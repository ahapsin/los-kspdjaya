/** @type {import('tailwindcss').Config} */
const appbackdrop = import.meta.env.VITE_APP_BACKDROP;
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        spacing: {
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        extend: {
            backgroundImage: {
                hero: "url('https://img.freepik.com/premium-photo/image-young-asian-woman-with-white-board_296537-8100.jpg?w=826')",
                landing:
                    "url('http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/kTxCMn2XqBLUslF7VfFwVNDR3Sk21ac8GnfV9AUU.png')",
                family:
                    "url('https://img.freepik.com/premium-photo/image-asian-family-background_296537-9927.jpg?w=360')",
            },
            colors: {
                cf: {
                    '50': '#eff5ff',
                    '100': '#dbe9fe',
                    '200': '#bfd9fe',
                    '300': '#94c2fc',
                    '400': '#61a0f9',
                    '500': '#3c7cf5',
                    '600': '#265cea',
                    '700': '#1e49d7',
                    '800': '#1f3bae',
                    '900': '#213b94',
                    '950': '#172354',
                },
                pr: {
                    DEFAULT: "#009b4f",
                    50: "#edfff5",
                    100: "#d6ffeb",
                    200: "#afffd7",
                    300: "#71ffb9",
                    400: "#2dfb94",
                    500: "#02e575",
                    600: "#00bf5d",
                    700: "#009b4f",
                    800: "#06753f",
                    900: "#085f36",
                    950: "#00361c",
                },
                sf: {
                    DEFAULT: "#f9fbff",
                    drk: {
                        DEFAULT: "#07182e",
                        100: "#07182e",
                        200: "#212d42",
                        300: "#394357",
                        400: "#535b6d",
                        500: "#6e7484",
                        600: "#898e9b",
                    },
                },
                greenhaze: {
                    DEFAULT: "#009b4f",
                    50: "#edfff5",
                    100: "#d6ffeb",
                    200: "#afffd7",
                    300: "#71ffb9",
                    400: "#2dfb94",
                    500: "#02e575",
                    600: "#00bf5d",
                    700: "#009b4f",
                    800: "#06753f",
                    900: "#085f36",
                    950: "#00361c",
                },
                opr: "#ffffff",
                sc: {
                    DEFAULT: "#314258",
                    50: "#f5f7fa",
                    100: "#eaeef4",
                    200: "#d1dae6",
                    300: "#a8bbd1",
                    400: "#7a97b6",
                    500: "#597a9e",
                    600: "#456084",
                    700: "#394e6b",
                    800: "#314258",
                    900: "#2e3b4c",
                    ot: "#d1dae6",
                },
                tr: "#faa954",
                accent: "#fde047",
                otr: "#ffffff",
                er: "#b3261e",
                oer: "#ffffff",
                prc: "#e6eef8",
                oprc: "#003271",
                osc: "#1f283a",
                trc: "#ffead4",
                otrc: "#733b00",
                erc: "#f9dedc",
                oerc: "#410e0b",
                sfd: {
                    DEFAULT: "#eaeef3",
                    drk: "#121518",
                },
                osf: {
                    DEFAULT: "#2a2e34",
                    drk: "#e0e4e9",
                },
                osfv: {
                    DEFAULT: "#4b515a",
                    drk: "#c4c9d0",
                },
                ol: {
                    DEFAULT: "#6b7684",
                    drk: "#8f9399",
                },
                olv: {
                    DEFAULT: "#93a0b1",
                    drk: "#45494f",
                },
                signal: {
                    red: "#ff0000",
                    redsf: "#ffdddd",
                    green: "#006400",
                    greensf: "#ccffbb",
                    yellow: "#d1bf00",
                    yellowsf: "#fbffe7",
                },
                sfb: {
                    DEFAULT: "#fbfdff",
                    drk: "#313943",
                },
                sfcls: {
                    DEFAULT: "#fafcff",
                    drk: "#0d1013",
                },
                sfcl: {
                    DEFAULT: "#f1f4f8",
                    drk: "#1b1d20",
                },
                sfc: {
                    DEFAULT: "#edf0f3",
                    drk: "#1f2226",
                },
                sfch: {
                    DEFAULT: "#e6e9ed",
                    drk: "#292c30",
                },
                sfchs: {
                    DEFAULT: "#dadde1",
                    drk: "#3c4148",
                },
            },
        },
    },
    plugins: [],
};
