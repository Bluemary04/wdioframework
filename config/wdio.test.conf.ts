import { config as baseConfig } from "../wdio.conf";
export const config = Object.assign(baseConfig, {
    //Test environment key values
    environment: "TEST",
    googleURL:"https://www.google.com",
    reqresBaseUrl: "https://reqres.in",
    nopcommerceBaseUrl: "https://admin-demo.nopcommerce.com"
})
