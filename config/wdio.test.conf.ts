import { config as baseConfig } from "../wdio.conf";
export const config = Object.assign(baseConfig, {
    //Test environment key values
    environment: "TEST",
    GoogleURL:"https://www.google.com",
    reqresBaseUrl: "https://reqres.in",
    nopcommerceUrl: "https://admin-demo.nopcommerce.com/login",
    sauceDemoApp: "https://www.saucedemo.com/"
})
